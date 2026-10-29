import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import { startCli } from "../tests/helpers.mjs";

// An optional package directory also exercises a packed/installed distribution.
const root = process.argv[2]
  ? resolve(process.argv[2])
  : fileURLToPath(new URL("../", import.meta.url));
const { origin, stop } = await startCli(root);
let browser;
try {
  browser = await chromium.launch({
    executablePath:
      process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined,
    headless: true,
  });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  const assetResponses = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.url().includes("/assets/"))
      assetResponses.push([response.url(), response.status()]);
  });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.waitForFunction(
    () => document.querySelector("#app")?.children.length > 0,
  );
  assert.match(await page.locator("body").innerText(), /Start new thread/);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null);
  const production = join(root, "dist-production");
  const [version] = await readdir(join(production, "assets"));
  const names = await readdir(join(production, "assets", version));
  const chunks = names.filter((name) => name.endsWith(".js"));
  for (const chunk of chunks) {
    const url = `/assets/${version}/${chunk}`;
    const response = await context.request.get(origin + url);
    assert.equal(response.status(), 200);
    assert.deepEqual(
      await response.body(),
      await readFile(join(production, "assets", version, chunk)),
    );
    await page.evaluate((url) => import(url).then(() => true), url);
  }
  // Exercise the browser's style loader for every lazy-route stylesheet too.
  for (const css of names.filter((name) => name.endsWith(".css"))) {
    await page.evaluate(
      (url) =>
        new Promise((resolve, reject) => {
          const link = document.createElement("link");
          link.rel = "stylesheet";
          link.href = url;
          link.onload = resolve;
          link.onerror = reject;
          document.head.append(link);
        }),
      `/assets/${version}/${css}`,
    );
  }
  await page.reload({ waitUntil: "networkidle" });
  const cacheNames = await page.evaluate(() => window.caches.keys());
  assert.ok(cacheNames.includes(`codexweb-shell-${version}`));
  await context.setOffline(true);
  await page.reload({ waitUntil: "load" });
  await page.waitForFunction(
    () => document.querySelector("#app")?.children.length > 0,
  );
  assert.deepEqual(errors, []);
  assert.ok(
    assetResponses.length > 0 &&
      assetResponses.every(([, status]) => status === 200),
  );
  console.log(
    `Browser passed: ${chunks.length} modules, all styles, production HTTP bytes, Service Worker cache, offline shell, no page errors.`,
  );
} finally {
  await browser?.close();
  await stop();
}
