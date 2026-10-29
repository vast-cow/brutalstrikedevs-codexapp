import { startCli } from "./helpers.mjs";
import assert from "node:assert/strict";
import { isDeepStrictEqual } from "node:util";
import { execFileSync } from "node:child_process";
import { cp, mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";
import test from "node:test";
import { parse } from "acorn";
import {
  checkAssets,
  generateAssets,
  parseModule,
  projectRoot,
  readTree,
  validateModules,
} from "../scripts/build-assets.mjs";

// Normalize syntactic spelling, associative logical grouping, and build URLs.
// Keep identifiers, expression order, literal values, and tagged template raws.
export function normalize(node, tagged = false) {
  if (Array.isArray(node)) return node.map((value) => normalize(value));
  if (!node || typeof node !== "object") return node;
  if (node.type === "LogicalExpression") {
    const operands = [];
    const collect = (child) => {
      if (child.type === node.type && child.operator === node.operator) {
        collect(child.left);
        collect(child.right);
      } else operands.push(normalize(child));
    };
    collect(node);
    return { type: node.type, operator: node.operator, operands };
  }
  const result = {};
  for (const [key, value] of Object.entries(node)) {
    if (
      ["start", "end"].includes(key) ||
      (key === "raw" && node.type === "Literal")
    )
      continue;
    result[key] = normalize(
      value,
      node.type === "TaggedTemplateExpression" && key === "quasi",
    );
  }
  if (node.type === "Literal" && typeof node.value === "string") {
    result.value = node.value.replace(/^(\/?assets\/)[a-f0-9]{20}\//, "$1");
  }
  if (
    node.type === "Property" &&
    !node.computed &&
    node.key.type === "Literal" &&
    typeof node.key.value === "string"
  ) {
    result.key = { type: "Identifier", name: node.key.value };
  }
  if (node.type === "TemplateLiteral" && !tagged) {
    for (const quasi of result.quasis) delete quasi.value.raw;
  }
  if (
    [
      "WhileStatement",
      "DoWhileStatement",
      "ForStatement",
      "ForInStatement",
      "ForOfStatement",
    ].includes(node.type) &&
    result.body.type !== "BlockStatement"
  ) {
    result.body = { type: "BlockStatement", body: [result.body] };
  }
  if (node.type === "Property") result.shorthand = false;
  return result;
}

const production = await checkAssets();
const source = await readTree(join(projectRoot, "dist"));

test("all chunks retain their syntax trees, exports, and license comments", () => {
  for (const [name, bytes] of production) {
    if (!name.startsWith("assets/") || !name.endsWith(".js")) continue;
    const original = source.get(`assets/${basename(name)}`).toString();
    const generated = bytes.toString();
    assert.ok(
      bytes.length < Buffer.byteLength(original) * 0.8,
      `${name} should be minified`,
    );
    assert.ok(
      isDeepStrictEqual(
        normalize(parseModule(generated)),
        normalize(parseModule(original)),
      ),
      `${name}: equivalent syntax tree`,
    );
    const comments = [];
    parse(original, {
      ecmaVersion: "latest",
      sourceType: "module",
      onComment: comments,
    });
    for (const comment of comments) {
      if (/@license|@copyright|@preserve|^!/.test(comment.value))
        assert.ok(
          generated.includes(comment.value),
          `${name}: license preserved`,
        );
    }
  }
});

test("CSS, icons, manifest, and Service Worker policy are preserved; no maps leak", () => {
  for (const [name, bytes] of source) {
    if (name.endsWith(".js") || name === "index.html") continue;
    const target = [...production.keys()].find(
      (key) =>
        key === name ||
        (key.startsWith("assets/") && basename(key) === basename(name)),
    );
    assert.deepEqual(production.get(target), bytes, name);
  }
  const cacheName = /const CACHE_NAME = ['"][^'"]+['"]/;
  assert.equal(
    production.get("sw.js").toString().replace(cacheName, "CACHE"),
    source.get("sw.js").toString().replace(cacheName, "CACHE"),
  );
  assert.notEqual(
    production.get("sw.js").toString(),
    source.get("sw.js").toString(),
  );
  for (const [name, bytes] of production) {
    assert.ok(!name.endsWith(".map"));
    if (/\.(js|css)$/.test(name))
      assert.doesNotMatch(bytes.toString(), /sourceMappingURL=/);
  }
  const manifest = JSON.parse(production.get("manifest.webmanifest"));
  for (const icon of manifest.icons)
    assert.ok(production.has(icon.src.replace(/^\//, "")));
});

test("missing dynamic chunks and preload assets fail validation", () => {
  const broken = new Map(production);
  broken.delete(
    [...broken.keys()].find(
      (name) => name.includes("ThreadConversation-") && name.endsWith(".js"),
    ),
  );
  assert.throws(() => validateModules(broken), /Missing asset/);
});

test("generation is deterministic, detects stale files, and versions edits", async (t) => {
  const root = await mkdtemp(join(tmpdir(), "codexapp-assets-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(join(projectRoot, "dist"), join(root, "dist"), { recursive: true });
  await cp(
    join(projectRoot, "dist-production"),
    join(root, "dist-production"),
    { recursive: true },
  );
  await mkdir(join(root, "scripts"));
  await cp(
    join(projectRoot, "scripts/build-assets.mjs"),
    join(root, "scripts/build-assets.mjs"),
  );
  await cp(
    join(projectRoot, "package-lock.json"),
    join(root, "package-lock.json"),
  );
  assert.deepEqual(await generateAssets(root), production);
  await writeFile(join(root, "dist-production/stale.js"), "// obsolete");
  await assert.rejects(checkAssets(root), /Production assets are stale/);
  await rm(join(root, "dist-production/stale.js"));
  const chunk = [...source.keys()].find(
    (name) => name.startsWith("assets/") && name.endsWith(".js"),
  );
  await writeFile(
    join(root, "dist", chunk),
    source.get(chunk).toString() + "\nconsole.debug('asset edit');\n",
  );
  await assert.rejects(checkAssets(root), /Production assets are stale/);
  const changed = await generateAssets(root);
  assert.notEqual(
    changed.get("index.html").toString(),
    production.get("index.html").toString(),
  );
  assert.notEqual(
    changed.get("sw.js").toString(),
    production.get("sw.js").toString(),
  );
  for (const name of changed.keys())
    if (name.startsWith("assets/")) assert.ok(!production.has(name));
  assert.deepEqual(await generateAssets(root), changed);
});

test("Express serves production bytes, SPA routes, PWA assets, and revalidation headers", async (t) => {
  const { origin, stop } = await startCli();
  t.after(stop);
  for (const [name, bytes] of production) {
    const response = await fetch(`${origin}/${name}`);
    assert.equal(response.status, 200, name);
    assert.equal(response.headers.get("cache-control"), "no-cache", name);
    if (name.endsWith(".js"))
      assert.match(response.headers.get("content-type"), /javascript/);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), bytes, name);
  }
  const response = await fetch(`${origin}/chat/test-thread`);
  assert.equal(await response.text(), production.get("index.html").toString());
  assert.equal(response.headers.get("cache-control"), "no-cache");
  const jsName = [...production.keys()].find(
    (name) => name.endsWith(".js") && name.startsWith("assets/"),
  );
  const first = await fetch(`${origin}/${jsName}`);
  await first.arrayBuffer();
  const cached = await fetch(`${origin}/${jsName}`, {
    headers: {
      "If-None-Match": first.headers.get("etag"),
      "Cache-Control": "max-age=0",
    },
  });
  assert.equal(cached.status, 304);
  const readableUrl = await fetch(`${origin}/assets/${basename(jsName)}`);
  assert.notEqual(
    await readableUrl.text(),
    source.get(`assets/${basename(jsName)}`).toString(),
  );
});

test("npm package includes production assets and excludes editable sources/build tools", async (t) => {
  const cache = await mkdtemp(join(tmpdir(), "codexapp-pack-"));
  t.after(() => rm(cache, { recursive: true, force: true }));
  assert.ok(
    process.env.npm_execpath,
    "Run this test through npm run test:assets",
  );
  const result = execFileSync(
    process.execPath,
    [process.env.npm_execpath, "pack", "--dry-run", "--json", "--cache", cache],
    { cwd: projectRoot, encoding: "utf8" },
  );
  const [report] = JSON.parse(result);
  const names = new Set(report.files.map((file) => file.path));
  for (const name of production.keys())
    assert.ok(names.has(`dist-production/${name}`), name);
  assert.ok(names.has("dist-cli/index.js"));
  assert.ok(names.has("scripts/fix-pty-native-build.cjs"));
  for (const name of names)
    assert.ok(
      !/^(dist\/|node_modules\/|tests\/|scripts\/build-assets)/.test(name),
      name,
    );
  const pkg = JSON.parse(
    await readFile(join(projectRoot, "package.json"), "utf8"),
  );
  for (const hook of ["prepare", "prepack", "install", "postinstall"])
    assert.equal(pkg.scripts[hook], undefined);
  for (const tool of [
    "prettier",
    "terser",
    "acorn",
    "acorn-walk",
    "playwright",
  ])
    assert.equal(pkg.dependencies[tool], undefined);
});
