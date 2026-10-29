# 🔥 codexapp

### 🚀 Run Codex App UI Anywhere: Linux, Windows, or Termux on Android 🚀

[![npm](https://img.shields.io/npm/v/@brutalstrikedevs/codexapp?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/@brutalstrikedevs/codexapp)
[![platform](https://img.shields.io/badge/Platform-Linux%20%7C%20Windows%20%7C%20Android-blue?style=for-the-badge)](#-quick-start)
[![node](https://img.shields.io/badge/Node-18%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![license](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](./LICENSE)

> **Codex UI in your browser. No drama. One command.**
>  
> **Yes, that is your Codex desktop app experience exposed over web UI. Yes, it runs cross-platform.**

```text
 ██████╗ ██████╗ ██████╗ ███████╗██╗  ██╗██╗   ██╗██╗
██╔════╝██╔═══██╗██╔══██╗██╔════╝╚██╗██╔╝██║   ██║██║
██║     ██║   ██║██║  ██║█████╗   ╚███╔╝ ██║   ██║██║
██║     ██║   ██║██║  ██║██╔══╝   ██╔██╗ ██║   ██║██║
╚██████╗╚██████╔╝██████╔╝███████╗██╔╝ ██╗╚██████╔╝██║
 ╚═════╝ ╚═════╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚═╝
```

---

## 🤯 What Is This?
**`codexapp`** is a lightweight bridge that gives you a browser-accessible UI for Codex app-server workflows.

You run one command. It starts a local web server. You open it from your machine, your LAN, or wherever your setup allows.  

**TL;DR 🧠: Codex app UI, unlocked for Linux, Windows, and Termux-powered Android setups.**

---

## ⚡ Quick Start
> **The main event.**

```bash
# 📦 Clone the prebuilt distribution once
git clone --branch brutalstrikedevs-codexapp --single-branch https://github.com/vast-cow/codex-mobile.git /path/to/codexapp

# 🔓 Run the local package
npx --yes --install-links --package="/path/to/codexapp" codexapp --no-tunnel

# 🌐 Then open in browser
# http://localhost:5900
```

Replace `/path/to/codexapp` with the absolute path where you want to save the repository.
The clone command selects the prebuilt `brutalstrikedevs-codexapp` branch.
Run the clone command only for initial setup; reuse the local path for subsequent launches.

`--install-links` makes npm pack the local checkout and install it with its dependencies
in the npm cache. No separate `npm install` or global installation is required.
The first run needs network access to download dependencies.
Keep `--install-links` before `codexapp`, as it is an npm option.
See [npm's install-links documentation](https://docs.npmjs.com/cli/v11/using-npm/config/#install-links).

If your shell is already in the cloned repository on Linux or Termux, you can use:

```bash
npx --yes --install-links --package="$PWD" codexapp --no-tunnel --port 5900
```

The npm package name is `@brutalstrikedevs/codexapp`; the executable is `codexapp`.
The default port is `5900`; use `--port <port>` to override it.

By default, `codexapp` starts without a tunnel. Use `--tunnel` to enable a cloudflared tunnel:

```bash
npx --yes --install-links --package="/path/to/codexapp" codexapp --tunnel
```

When enabled, it prints the tunnel URL and terminal QR code in startup output.
You can also explicitly disable the tunnel with `--no-tunnel`.

To disable web UI authentication, use `--no-password`:

```bash
npx --yes --install-links --package="/path/to/codexapp" codexapp --no-password
```

This also skips password file generation and the `Generated password file` startup message.
With the default `0.0.0.0` bind address, anyone who can reach the server can use the web UI without authentication.
By default, an automatically generated password is saved to `$CODEX_HOME/codexui-password` (default: `~/.codex/codexui-password`), and its path is shown at startup.

If you are using a provider or AI gateway that is already authenticated and do not want `codexapp` to force `codex login` during startup, use:

```bash
npx --yes --install-links --package="/path/to/codexapp" codexapp --no-login
```

By default, `codexapp` leaves the sandbox mode to Codex's configuration.
Use `--sandbox-mode` to override it explicitly:

```bash
npx --yes --install-links --package="/path/to/codexapp" codexapp --sandbox-mode workspace-write
```

Supported modes are `read-only`, `workspace-write`, and `danger-full-access`.
You can also set `CODEXUI_SANDBOX_MODE`; the CLI option takes precedence.

### Linux 🐧

After cloning the repository as shown above:

```bash
node -v   # should be 18+
npx --yes --install-links --package="/path/to/codexapp" codexapp
```

### Windows 🪟 (PowerShell)

Replace `C:/path/to/codexapp` with your preferred local directory. Clone it once, then
reuse the `npx` command to launch it again.

```powershell
node -v   # 18+
git clone --branch brutalstrikedevs-codexapp --single-branch https://github.com/vast-cow/codex-mobile.git C:/path/to/codexapp
npx --yes --install-links --package="C:/path/to/codexapp" codexapp
```

### Termux (Android) 🤖
```bash
pkg update && pkg upgrade -y
pkg install nodejs git -y
git clone --branch brutalstrikedevs-codexapp --single-branch https://github.com/vast-cow/codex-mobile.git "$HOME/codexapp"
npx --yes --install-links --package="$HOME/codexapp" codexapp
```

Android background requirements:

1. Keep `codexapp` running in the current Termux session (do not close it).
2. In Android settings, disable battery optimization for `Termux`.
3. Keep the persistent Termux notification enabled so Android is less likely to kill it.
4. Optional but recommended in Termux:
```bash
termux-wake-lock
```
5. Open the shown URL in your Android browser. If the app is killed, return to Termux and run `npx --yes --install-links --package="$HOME/codexapp" codexapp` again.

---

## iPhone / iPad via Tailscale Serve

If you want to use codexUI from iPhone or iPad Safari, serving it over HTTPS is recommended.

A practical private setup is to run codexUI locally and publish it inside your tailnet with Tailscale Serve:

```powershell
npx --yes --install-links --package="C:/path/to/codexapp" codexapp --no-tunnel --port 5900
tailscale serve --bg 5900
```

Then open:

```text
https://<your-machine>.<your-tailnet>.ts.net
```

This setup worked well in practice for:

- iPhone Safari access
- Add to Home Screen
- the built-in dictation / transcription feature in the app
- viewing the same projects and conversations from the Windows host

Notes:

- Tailscale Serve keeps access private to your tailnet
- on iOS, HTTPS / secure context appears to be important for mobile browser access and dictation
- some minor mobile Safari CSS issues may still exist, but they do not prevent normal use
- depending on proxying details, authentication behavior may differ from direct remote access
- if conversations created in the web UI do not immediately appear in the Windows app, restarting the Windows app may refresh them

---

## ✨ Features
> **The payload.**

- 🚀 One-command launch after cloning with `npx --yes --install-links --package="/path/to/codexapp" codexapp`
- 🌍 Cross-platform support for Linux, Windows, and Termux on Android
- 🖥️ Browser-first Codex UI flow on `http://localhost:5900`
- 🌐 LAN-friendly access from other devices on the same network
- 🧪 Remote/headless-friendly setup for server-based Codex usage
- 🔌 Works with reverse proxies and tunneling setups
- ⚡ No global install required for quick experimentation
- 🎙️ Built-in hold-to-dictate voice input with transcription to composer draft
- 🤖 Optional Telegram bot bridge: send messages to bot, forward into mapped thread, send assistant reply back to Telegram
- 💾 Project portability: export a project as a ZIP from project or thread menus, including matching Codex chat JSONL history under `.codex-project/chats/`
- 📦 Project import: restore exported project ZIPs from the browser via `Import Project`
- 🔁 Imported chats are rewritten for the destination `CODEX_HOME`, project path, and currently selected provider/model so they can be resumed in the new environment
- ⚙️ Project ZIP performance: exports stream ZIP bytes with response backpressure handling and skip generated/git-ignored folders; imports still buffer the selected ZIP once because the browser upload arrives as a single file

### Telegram Bot Bridge (Optional)

Set these environment variables before starting `codexapp`:

```bash
export TELEGRAM_BOT_TOKEN="<your-telegram-bot-token>"
export TELEGRAM_ALLOWED_USER_IDS="<your-telegram-user-id>,<optional-second-id>"
export TELEGRAM_DEFAULT_CWD="$PWD" # optional, defaults to current working directory
npx --yes --install-links --package="/path/to/codexapp" codexapp
```

`TELEGRAM_ALLOWED_USER_IDS` is required for safe access. Only allowlisted Telegram user IDs can use the bridge. If no allowed user IDs are configured, incoming Telegram messages are rejected.

To find your Telegram user ID:

1. Send a message to your bot.
2. Run `curl "https://api.telegram.org/bot<your-telegram-bot-token>/getUpdates"`.
3. Read `message.from.id` from the returned update payload.

Bot commands:

- `/start` show quick help and thread picker
- `/threads` list recent threads and pick one
- `/newthread` create and map a new Codex thread for this Telegram chat
- `/thread <threadId>` map current Telegram chat to an existing thread
- `/current` show currently connected thread for this chat
- `/history` show recent history for current thread
- `/status` show bridge/mapping status
- `/whoami` show your Telegram user/chat IDs and authorization state
- `/help` show command reference

Outgoing assistant messages are sent with Telegram `parse_mode=HTML` for formatting, with automatic plain-text fallback if HTML delivery fails.

---

## 🧩 Recent Product Features (from main commits)
> **Not just launch. Actual UX upgrades.**

- 🗂️ Searchable project picker in new-thread flow
- ➕ "Create Project" button next to "Select folder" with browser prompt
- 📌 New projects get pinned to top automatically
- 🧠 Smart default new-project name suggestion via server-side free-directory scan (`New Project (N)`)
- 🔄 Project order persisted globally to workspace roots state
- 🧵 Optimistic in-progress threads preserved during refresh/poll cycles
- 📱 Mobile drawer sidebar in desktop layout (teleported overlay + swipe-friendly structure)
- 🎛️ Skills Hub mobile-friendly spacing/toolbar layout improvements
- 🪟 Skill detail modal tuned for mobile sheet-style behavior
- 🧪 Skills Hub event typing fix for `SkillCard` select emit compatibility
- 🎙️ Voice dictation flow in composer (`hold to dictate` -> transcribe -> append text)

---

## 🌍 What Can You Do With This?

| 🔥 Use Case | 💥 What You Get |
|---|---|
| 💻 Linux workstation | Run Codex UI in browser without depending on desktop shell |
| 🪟 Windows machine | Launch web UI and access from Chrome/Edge quickly |
| 📱 Termux on Android | Start service in Termux and control from mobile browser |
| 🧪 Remote dev box | Keep Codex process on server, view UI from client device |
| 🌐 LAN sharing | Open UI from another device on same network |
| 🧰 Headless workflows | Keep terminal + browser split for productivity |
| 🔌 Custom routing | Put behind reverse proxy/tunnel if needed |
| ⚡ Fast experiments | `npx` run without full global setup |

---

## 🏗️ Architecture

```text
┌─────────────────────────────┐
│  Browser (Desktop/Mobile)   │
└──────────────┬──────────────┘
               │ HTTP/WebSocket
┌──────────────▼──────────────┐
│         codexapp            │
│  (Express + Vue UI bridge)  │
└──────────────┬──────────────┘
               │ RPC/Bridge calls
┌──────────────▼──────────────┐
│      Codex App Server       │
└─────────────────────────────┘
```

---

## 🎯 Requirements
- ✅ Node.js `18+`
- ✅ Git available on `PATH` to clone the repository
- ✅ Codex app-server environment available
- ✅ Browser access to host/port
- ✅ Microphone permission (only for voice dictation)

---

## 🐛 Troubleshooting

| ❌ Problem | ✅ Fix |
|---|---|
| Port already in use | Run on a free port or stop old process |
| `ERR_MODULE_NOT_FOUND` for `commander` or another dependency | Include `--install-links` before `codexapp` so npm installs dependencies in its cache |
| `npx` fails | Update npm/node, then retry |
| Termux install fails | `pkg update && pkg upgrade` then reinstall `nodejs` |
| Can’t open from other device | Check firewall, bind address, and LAN routing |

---

## Prebuilt distribution and validation

This branch ships compiled `dist/` and `dist-cli/` files with runtime dependencies only.
Build tools, Vitest, and source development belong in the development checkout.
Update the compiled files there before bringing a release into this branch.
There are no automatic build or install hooks in this package; this follows
[npm's guidance for prebuilt Git dependencies](https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#git-urls-as-dependencies).

`node-pty` remains optional. The CLI already repairs broken native-build symlinks
when loading terminal support and fixes spawn-helper permissions before opening a terminal.
If native PTY support cannot load, the web UI remains available and reports that the
integrated terminal is unavailable. For a local installation, you can also run
`npm run repair:pty` from the package directory to invoke the repair manually.

GitHub Actions checks packaging and installation from the tested GitHub commit with
npm 10.9.9 and npm 11 on Linux and Windows. It checks CLI help, HTTP delivery of the
built UI, and a real integrated-terminal command. The HTTP/PTY smoke check uses a
stand-in for Codex's version check; it does not validate authenticated Codex workflows.
Termux still requires a device check: run the local-package command above, open a thread's
terminal, and verify command input/output, resizing, and closing the terminal.

---

## 🤝 Contributing
Issues and PRs are welcome.  
Bring bug reports, platform notes, and setup improvements.

---

## ⭐ Star This Repo
If you believe Codex UI should be accessible from **any machine, any OS, any screen**, star this project and share it. ⭐

<div align="center">
Built for speed, portability, and a little bit of chaos 😏
</div>

---

Forked from [pavel-voronin/codex-web-local](https://github.com/pavel-voronin/codex-web-local) by Pavel Voronin.
