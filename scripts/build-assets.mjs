import { createHash } from "node:crypto";
import { readdir, readFile, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "acorn";
import { simple } from "acorn-walk";
import { minify } from "terser";

export const projectRoot = fileURLToPath(new URL("../", import.meta.url));

export async function readTree(root, prefix = "") {
  const files = new Map();
  for (const entry of (
    await readdir(join(root, prefix), { withFileTypes: true })
  ).sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0))) {
    const name = posix.join(prefix, entry.name);
    if (entry.isDirectory()) {
      for (const pair of await readTree(root, name)) files.set(...pair);
    } else if (entry.isFile()) {
      files.set(name, await readFile(join(root, name)));
    } else {
      throw new Error(`Unsupported asset type: ${name}`);
    }
  }
  return files;
}

export function parseModule(code) {
  return parse(code, { ecmaVersion: "latest", sourceType: "module" });
}

// Rewrite only literal Vite preload/root asset URLs. Relative module imports
// stay untouched because every chunk moves into the same versioned directory.
function versionAssetUrls(code, version) {
  const edits = [];
  simple(parseModule(code), {
    Literal(node) {
      if (typeof node.value === "string" && /^\/?assets\//.test(node.value)) {
        edits.push([
          node.start,
          node.end,
          JSON.stringify(node.value.replace("assets/", `assets/${version}/`)),
        ]);
      }
    },
  });
  for (const [start, end, value] of edits.sort((a, b) => b[0] - a[0])) {
    code = code.slice(0, start) + value + code.slice(end);
  }
  return code;
}

export function validateModules(files) {
  const modules = new Map();
  for (const [name, bytes] of files) {
    if (name.endsWith(".js")) modules.set(name, parseModule(bytes.toString()));
  }
  function requireFile(from, reference) {
    const target = reference.startsWith(".")
      ? posix.normalize(posix.join(posix.dirname(from), reference))
      : reference.replace(/^\//, "");
    if (!files.has(target))
      throw new Error(`Missing asset: ${from} -> ${reference}`);
    return target;
  }
  for (const [name, ast] of modules) {
    simple(ast, {
      ImportDeclaration(node) {
        const target = requireFile(name, node.source.value);
        const exports = new Set();
        for (const item of modules.get(target)?.body ?? []) {
          if (item.type === "ExportDefaultDeclaration") exports.add("default");
          if (item.type === "ExportNamedDeclaration") {
            for (const specifier of item.specifiers)
              exports.add(specifier.exported.name ?? specifier.exported.value);
            if (item.declaration?.id) exports.add(item.declaration.id.name);
            for (const decl of item.declaration?.declarations ?? [])
              exports.add(decl.id.name);
          }
        }
        for (const specifier of node.specifiers) {
          if (specifier.type === "ImportNamespaceSpecifier") continue;
          const imported =
            specifier.type === "ImportDefaultSpecifier"
              ? "default"
              : (specifier.imported.name ?? specifier.imported.value);
          if (!exports.has(imported))
            throw new Error(`Missing export: ${target} -> ${imported}`);
        }
      },
      ImportExpression(node) {
        if (typeof node.source.value !== "string")
          throw new Error(
            `Nonliteral dynamic import in ${name}; update asset validation`,
          );
        requireFile(name, node.source.value);
      },
      ExportNamedDeclaration(node) {
        if (node.source) requireFile(name, node.source.value);
      },
      ExportAllDeclaration(node) {
        requireFile(name, node.source.value);
      },
      Literal(node) {
        if (typeof node.value === "string" && /^\/?assets\//.test(node.value))
          requireFile(name, node.value);
      },
    });
  }
  const html = files.get("index.html")?.toString() ?? "";
  for (const match of html.matchAll(/(?:src|href)=["'](\/[^"']+)["']/g))
    requireFile("index.html", match[1]);
}

export async function generateAssets(root = projectRoot) {
  const source = await readTree(join(root, "dist"));
  validateModules(source);
  const digest = createHash("sha256");
  // Include the generator and locked toolchain as well as all frontend bytes.
  for (const name of ["scripts/build-assets.mjs", "package-lock.json"]) {
    digest.update(await readFile(join(root, name)));
  }
  for (const [name, bytes] of source)
    digest.update(name).update("\0").update(bytes).update("\0");
  const version = digest.digest("hex").slice(0, 20);
  const output = new Map();
  for (const [name, bytes] of source) {
    if (name.endsWith(".map")) continue;
    let content = bytes;
    if (name.startsWith("assets/") && name.endsWith(".js")) {
      const result = await minify(versionAssetUrls(bytes.toString(), version), {
        module: true,
        // These chunks are already optimized. Compact without changing names,
        // eliminating code, rebundling, or making new optimization assumptions.
        compress: false,
        mangle: false,
        sourceMap: false,
        format: {
          comments: (_node, comment) =>
            !/^[#@]\s*sourceMappingURL=/.test(comment.value.trim()),
          preserve_annotations: true,
        },
      });
      content = Buffer.from(result.code + "\n");
    } else if (name === "index.html") {
      content = Buffer.from(
        bytes.toString().replaceAll("/assets/", `/assets/${version}/`),
      );
    } else if (name === "sw.js") {
      const original = bytes.toString();
      const updated = original.replace(
        /const CACHE_NAME = ['"][^'"]+['"]/,
        `const CACHE_NAME = 'codexweb-shell-${version}'`,
      );
      if (updated === original)
        throw new Error("Cannot version the Service Worker cache");
      content = Buffer.from(updated);
    }
    if (
      /\.(js|css)$/.test(name) &&
      /[#@]\s*sourceMappingURL=/.test(content.toString())
    ) {
      throw new Error(`Unexpected source map reference in ${name}`);
    }
    const target = name.startsWith("assets/")
      ? name.replace("assets/", `assets/${version}/`)
      : name;
    output.set(target, content);
  }
  validateModules(output);
  return output;
}

export async function checkAssets(root = projectRoot) {
  const expected = await generateAssets(root);
  const actual = await readTree(join(root, "dist-production")).catch(
    (error) => {
      if (error.code === "ENOENT") return new Map();
      throw error;
    },
  );
  const changed = [...new Set([...expected.keys(), ...actual.keys()])].filter(
    (name) =>
      !actual.has(name) || !expected.get(name)?.equals(actual.get(name)),
  );
  if (changed.length)
    throw new Error(
      `Production assets are stale; run npm run build:assets:\n${changed.join("\n")}`,
    );
  return expected;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  if (process.argv.includes("--check")) {
    await checkAssets();
    console.log(
      "Production assets are up to date; module and preload references resolve.",
    );
  } else {
    const files = await generateAssets();
    const destination = join(projectRoot, "dist-production");
    await rm(destination, { recursive: true, force: true });
    for (const [name, content] of files) {
      await mkdir(dirname(join(destination, name)), { recursive: true });
      await writeFile(join(destination, name), content);
    }
    console.log(
      `Generated ${files.size} production files in dist-production/.`,
    );
  }
}
