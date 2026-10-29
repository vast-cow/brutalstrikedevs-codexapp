import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { stripVTControlCharacters } from 'node:util';

// Run against an installed distribution, without Codex credentials or a tunnel.
assert(process.argv[2], 'Pass the installed package directory');
const root = resolve(process.argv[2]);
const scratch = await mkdtemp(join(tmpdir(), 'codexapp-smoke-'));
const child = spawn(process.execPath, [
  join(root, 'dist-cli/index.js'), '--no-tunnel', '--no-open', '--no-login',
  '--no-password', '--port', '15900',
], {
  cwd: scratch,
  env: {
    ...process.env,
    CODEX_HOME: scratch,
    // Node answers --version; no authenticated app-server calls are exercised.
    CODEXUI_CODEX_COMMAND: process.execPath,
    TELEGRAM_BOT_TOKEN: '',
    TELEGRAM_ALLOWED_USER_IDS: '',
    SHELL: process.platform === 'win32' ? process.env.COMSPEC : '/bin/sh',
  },
  stdio: ['ignore', 'pipe', 'pipe'],
});
let output = '';
let spawnError;
child.on('error', error => { spawnError = error; });
child.stdout.on('data', chunk => { output += chunk; });
child.stderr.on('data', chunk => { output += chunk; });

async function waitFor(check, label) {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (spawnError) throw spawnError;
    assert(child.exitCode === null && child.signalCode === null, `Server exited: ${output}`);
    const result = await check();
    if (result) return result;
    await delay(100);
  }
  throw new Error(`Timed out waiting for ${label}\n${output}`);
}

try {
  const match = await waitFor(() => output.match(/Bind:\s+http:\/\/0\.0\.0\.0:(\d+)/), 'server startup');
  const base = `http://127.0.0.1:${match[1]}`;
  async function request(path, body) {
    const response = await fetch(`${base}${path}`, {
      method: body === undefined ? 'GET' : 'POST',
      headers: body === undefined ? {} : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    assert.equal(response.status, 200, `${path}: ${await response.clone().text()}`);
    return response;
  }
  const html = await (await request('/')).text();
  const asset = html.match(/src="(\/assets\/[^"\s]+\.js)"/);
  assert(asset, 'Built frontend script is missing from HTML');
  const script = await request(asset[1]);
  assert.match(script.headers.get('content-type'), /javascript/);

  const availability = await (await request('/codex-api/thread-terminal/status')).json();
  assert.equal(availability.available, true, availability.reason);
  const { session } = await (await request('/codex-api/thread-terminal/attach', {
    threadId: 'distribution-smoke', cwd: scratch, cols: 80, rows: 24,
  })).json();
  await request('/codex-api/thread-terminal/input', {
    sessionId: session.id, data: 'echo codexapp-pty-ok\r',
  });
  await waitFor(async () => {
    const snapshot = await (await request('/codex-api/thread-terminal-snapshot?threadId=distribution-smoke')).json();
    // Require a separate output line, not merely the echoed input command.
    return /(?:^|[\r\n])codexapp-pty-ok[\r\n]/.test(stripVTControlCharacters(snapshot.session?.buffer ?? ''));
  }, 'PTY command output');
  await request('/codex-api/thread-terminal/resize', { sessionId: session.id, cols: 100, rows: 30 });
  await request('/codex-api/thread-terminal/close', { sessionId: session.id });
  console.log('Distribution smoke passed: frontend HTTP and PTY input/output, resize, close');
} finally {
  if (child.pid && child.exitCode === null && child.signalCode === null) {
    const closed = once(child, 'close');
    child.kill();
    const timeout = setTimeout(() => child.kill('SIGKILL'), 7000);
    await closed;
    clearTimeout(timeout);
  }
  await rm(scratch, { recursive: true, force: true });
}
