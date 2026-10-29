import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { fileURLToPath } from "node:url";
const projectRoot = fileURLToPath(new URL("../", import.meta.url));

// Runs the actual CLI and Express server. Node stands in only for the Codex
// --version probe; this intentionally does not test authenticated Codex RPCs.
export async function startCli(root = projectRoot) {
  const temporaryHome = await mkdtemp(join(tmpdir(), "codexapp-http-"));
  const reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const port = reservation.address().port;
  await new Promise((resolve) => reservation.close(resolve));
  const child = spawn(
    process.execPath,
    [
      join(root, "dist-cli/index.js"),
      "--no-tunnel",
      "--no-open",
      "--no-login",
      "--no-password",
      "--port",
      String(port),
    ],
    {
      cwd: temporaryHome,
      env: {
        ...process.env,
        CODEX_HOME: temporaryHome,
        CODEXUI_CODEX_COMMAND: process.execPath,
        TELEGRAM_BOT_TOKEN: "",
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  let logs = "";
  child.stdout.on("data", (data) => {
    logs += data;
  });
  child.stderr.on("data", (data) => {
    logs += data;
  });
  const stop = async () => {
    if (child.exitCode === null && child.signalCode === null) {
      const exited = once(child, "exit");
      child.kill();
      await exited;
    }
    await rm(temporaryHome, { recursive: true, force: true });
  };
  try {
    for (let i = 0; i < 200; i++) {
      const match = logs.match(/Bind:\s+http:\/\/0\.0\.0\.0:(\d+)/);
      if (match) return { origin: `http://127.0.0.1:${match[1]}`, stop };
      if (child.exitCode !== null) throw new Error(logs);
      await delay(100);
    }
    throw new Error(`CLI startup timed out: ${logs}`);
  } catch (error) {
    await stop();
    throw error;
  }
}
