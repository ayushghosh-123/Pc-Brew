# PC Brew (pcbrew) ☕💻
> **Autonomous Agentic Coding Terminal & Remote Laptop Controller**  
> Built with **TypeScript**, **Bun**, **Vercel AI SDK**, **OpenRouter**, **Telegraf**, **Baileys (WhatsApp)**, and **Conf**.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Interactive API Setup Wizard (`pcbrew setup`)](#-interactive-api-setup-wizard-pcbrew-setup)
- [Global Accessibility & Multi-System Setup](#-global-accessibility--multi-system-setup)
  - [Current System Setup](#1-current-system-setup)
  - [Setup on Other Windows Systems](#2-setup-on-other-windows-systems)
  - [Setup on macOS (Apple Silicon & Intel)](#3-setup-on-macos)
  - [Setup on Linux (Ubuntu, Debian, VPS, Docker)](#4-setup-on-linux)
  - [Standalone Binary Compilation (Zero Dependencies)](#5-standalone-binary-compilation-zero-dependencies)
- [Environment Configuration & Config Store](#️-environment-configuration--config-store)
- [How to Attach & Use Telegram](#-how-to-attach--use-telegram)
- [How to Attach & Use WhatsApp (Laptop Controller)](#-how-to-attach--use-whatsapp-laptop-controller)
- [Interactive Next.js Web UI Companion (`web/`)](#-interactive-nextjs-web-ui-companion)
- [Master Resources Directory (`RESOURCES.md`)](#-master-resources-directory)
- [Comprehensive Command Reference](#-comprehensive-command-reference)
  - [CLI & Terminal Entrypoints](#1-cli--terminal-entrypoints)
  - [Agentic Terminal Slash Commands](#2-agentic-terminal-slash-commands)
  - [Telegram Bot Commands & Keyboards](#3-telegram-bot-commands--keyboards)
  - [WhatsApp Laptop Controller Commands](#4-whatsapp-laptop-controller-commands)
- [Safety & Virtual Memory Staging Architecture](#-safety--virtual-memory-staging-architecture)
- [TypeScript & Development](#-typescript--development)

---

## 🌟 Overview

`pcbrew` (PC Brew) transforms your workspace into an intelligent agentic environment and a remote-controllable workstation:
1. **Interactive Agentic Terminal**: A local terminal REPL with autonomous AI tool loops (`read_file`, `list_files`, `search_files`, `analyze_codebase`, `create_file`, `modify_file`), an in-memory staging overlay, and unified diff approvals.
2. **Interactive Setup Wizard**: Run `pcbrew setup` to configure all required API keys one-by-one with automatic global persistence.
3. **Remote Telegram Gateway**: Command your workspace remotely via Telegram with inline keyboard buttons for step toggling and code approvals.
4. **WhatsApp Laptop Controller**: Turn your WhatsApp chat into a remote shell for your laptop—execute terminal commands (`/cmd`), view hardware telemetry (`/sysinfo`), open applications (`/open`), and approve AI code diffs on the go.
5. **Agent Terminal Web UI**: A companion Next.js frontend built with Framer Motion, Tailwind CSS, and GSAP that simulates the agentic terminal experience.

---

## 🚀 Key Features

- **Interactive API Wizard**: Run `pcbrew setup` to configure OpenRouter, Telegram, and WhatsApp keys one by one.
- **Global CLI Availability**: Run `pcbrew` from any folder on your machine without needing a local `.env`.
- **Virtual Memory Staging Overlay**: AI file edits are staged in memory (`ActionTracker`); zero unapproved writes touch your disk.
- **Unified Diff Approvals**: Review color-coded diff additions (`+`) and deletions (`-`) before committing.
- **Full Shell Remote Execution**: Execute PowerShell/Bash commands directly from WhatsApp or Telegram.
- **Hardware Telemetry**: Query live laptop CPU load, available RAM, battery percentage, and operating system stats over chat.
- **Multi-Model Support**: Powered by OpenRouter (supports free models, Claude 3.5 Sonnet, GPT-4o, DeepSeek, etc.).

---

## ⚙️ Interactive API Setup Wizard (`pcbrew setup`)

PC Brew includes a step-by-step interactive setup wizard powered by `@clack/prompts` and `conf`. It prompts for each configuration key one by one and saves them permanently in your system user profile.

```bash
pcbrew setup
# or
pcbrew config
```

### Setup Steps Prompted One-by-One:
1. **OpenRouter API Key** (`sk-or-v1-...` from [openrouter.ai/keys](https://openrouter.ai/keys)) — Required for AI models.
2. **Default Model ID** (press Enter for `openrouter/free`, or custom e.g. `anthropic/claude-3.5-sonnet`).
3. **Telegram Bot Token** (from `@BotFather`, optional).
4. **Telegram Owner User ID** (from `@userinfobot`, required if Telegram token provided).
5. **WhatsApp Owner Number** (with country code e.g. `919876543210`, optional).
6. **Firecrawl API Key** (for live web scraping, optional).

### Automatic First-Run Prompt:
If you run `pcbrew` or `pcbrew start` on a fresh machine where no API key is set, PC Brew automatically asks if you'd like to launch the setup wizard.

---

## 🌐 Global Accessibility & Multi-System Setup

PC Brew registers the global binary `pcbrew`.

### 1. Current System Setup

To make the CLI globally accessible across all PowerShell and Command Prompt windows:

```bash
# In the project root:
npm link --force
```

Verify global accessibility from any directory:

```bash
# Test from any folder:
pcbrew --version
pcbrew --help
pcbrew start
```

---

### 2. Setup on Other Windows Systems

1. **Install Prerequisites**:
   - [Bun](https://bun.sh) (v1.4+ recommended):
     ```powershell
     powershell -c "irm bun.sh/install.ps1 | iex"
     ```
   - [Node.js](https://nodejs.org/) (v20+ recommended)
   - [Git](https://git-scm.com/)

2. **Clone and Install**:
   ```powershell
   git clone <repository-url> pcbrew
   cd pcbrew
   bun install
   ```

3. **Link Globally**:
   ```powershell
   npm link --force
   ```

4. **Add to PATH** (if not already present):
   Ensure `%APPDATA%\npm` and `%USERPROFILE%\.bun\bin` are in your System Environment `Path`.

5. **Run Anywhere**:
   ```powershell
   pcbrew
   ```

---

### 3. Setup on macOS

1. **Install Bun**:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   source ~/.zshrc   # or ~/.bash_profile
   ```

2. **Clone and Install**:
   ```bash
   git clone <repository-url> pcbrew
   cd pcbrew
   bun install
   ```

3. **Make Globally Accessible**:
   ```bash
   # Method A: npm link
   sudo npm link

   # Method B: Direct symlink to /usr/local/bin
   sudo ln -sf "$(pwd)/index.ts" /usr/local/bin/pcbrew
   sudo chmod +x /usr/local/bin/pcbrew
   ```

4. **Verify**:
   ```bash
   which pcbrew
   pcbrew start
   ```

---

### 4. Setup on Linux (Ubuntu / Debian / Arch / VPS)

1. **Install Bun & System Tools**:
   ```bash
   curl -fsSL https://bun.sh/install | bash
   export PATH="$HOME/.bun/bin:$PATH"
   echo 'export PATH="$HOME/.bun/bin:$PATH"' >> ~/.bashrc
   ```

2. **Clone and Install**:
   ```bash
   git clone <repository-url> pcbrew
   cd pcbrew
   bun install
   ```

3. **Make Globally Accessible**:
   ```bash
   sudo npm link
   ```

4. **Optional: Background Service (systemd)**:
   To keep WhatsApp or Telegram running 24/7 on a Linux server:
   ```ini
   # /etc/systemd/system/pcbrew-whatsapp.service
   [Unit]
   Description=PC Brew WhatsApp Controller Daemon
   After=network.target

   [Service]
   Type=simple
   User=ubuntu
   WorkingDirectory=/path/to/pcbrew
   ExecStart=/usr/local/bin/bun index.ts whatsapp
   Restart=always
   RestartSec=5
   EnvironmentFile=/path/to/pcbrew/.env

   [Install]
   WantedBy=multi-user.target
   ```
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now pcbrew-whatsapp.service
   ```

---

### 5. Standalone Binary Compilation (Zero Dependencies)

Bun allows compiling the entire TypeScript CLI and bundled modules into a single standalone binary:

```bash
# Windows
bun build --compile --outfile pcbrew.exe ./index.ts

# macOS / Linux
bun build --compile --outfile pcbrew ./index.ts
chmod +x pcbrew
sudo mv pcbrew /usr/local/bin/
```

This binary runs standalone without requiring Bun or Node to be pre-installed!

---

## ⚙️ Environment Configuration & Config Store

You can configure PC Brew interactively with `pcbrew setup`, or by creating a `.env` file (copied from `.env.example`):

```env
# ===================================================================
# 1. AI PROVIDER (Any LLM Supported)
# Options: openrouter | openai | anthropic | google (auto-detected if omitted)
# ===================================================================
AI_PROVIDER=openrouter

# OpenRouter (Default)
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
OPENROUTER_DEFAULT_MODEL=openrouter/free

# OpenAI (Alternative)
# OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# OPENAI_MODEL=gpt-4o-mini

# Anthropic Claude (Alternative)
# ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxxxxxxxxxxxxxx
# ANTHROPIC_MODEL=claude-3-5-sonnet-latest

# Google Gemini (Alternative)
# GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
# GOOGLE_MODEL=gemini-1.5-flash

# ===================================================================
# 2. TELEGRAM INTEGRATION (Optional)
# ===================================================================
# Get your bot token from @BotFather on Telegram
TELEGRAM_BOT_TOKEN=7123456789:AAHq_exampleToken_xyz

# Your numerical Telegram user ID from @userinfobot (Authorization barrier)
TELEGRAM_OWNER_ID=123456789

# ===================================================================
# 3. WHATSAPP INTEGRATION (Optional: Owner phone authorization)
# ===================================================================
# Your phone number with country code (no '+' or dashes)
# Example: 919876543210 for India, 12025550123 for US
WHATSAPP_OWNER_NUMBER=919876543210

# ===================================================================
# 4. WEB SEARCH & SCRAPING (Optional)
# ===================================================================
# Firecrawl API key for live web scraping in Plan and Ask modes
FIRECRAWL_API_KEY=fc-xxxxxxxxxxxxxxxxxxxx
```

---

## 📲 How to Attach & Use Telegram

### Step 1: Create Your Bot
1. Open the Telegram app and search for `@BotFather`.
2. Send `/newbot`.
3. Choose a display name (e.g. `My PCBrew Bot`) and a username ending in `bot` (e.g. `my_pcbrew_controller_bot`).
4. Copy the HTTP API token provided by BotFather into `TELEGRAM_BOT_TOKEN` in `.env`.

### Step 2: Get Your Owner ID
1. Search for `@userinfobot` on Telegram.
2. Send any message.
3. Copy the numeric `Id` returned (e.g. `123456789`) into `TELEGRAM_OWNER_ID` in `.env`.
   > **Security Note**: PCBrew verifies the sender ID of every incoming message. Unauthorized users cannot trigger commands or view code.

### Step 3: Start Telegram Mode
```bash
pcbrew telegram
# or
bun run telegram
```

### Step 4: Interact with Your Bot
- Open your bot in Telegram and send `/start`.
- Run `/ask <question>` to inspect your codebase.
- Run `/plan <goal>` to generate plans with inline step toggles.
- Run `/agent <task>` to spawn an autonomous coding loop with inline `[Approve]` and `[Reject]` buttons.

---

## 📱 How to Attach & Use WhatsApp (Laptop Controller)

Turn your WhatsApp into a remote shell and AI controller for your laptop.

### Step 1: Set Owner Phone Number
In `.env`, set:
```env
WHATSAPP_OWNER_NUMBER=919876543210
```
*(Use international format without `+`)*

### Step 2: Launch WhatsApp Mode
```bash
pcbrew whatsapp
# or
bun run whatsapp
```

### Step 3: Scan the Terminal QR Code
1. A dynamic QR code will print in your terminal using `qrcode-terminal`.
2. Open WhatsApp on your phone:
   - **Android**: Tap the 3 dots (top right) > **Linked Devices** > **Link a Device**.
   - **iOS**: Tap **Settings** > **Linked Devices** > **Link a Device**.
3. Point your camera at the terminal screen to link.
4. **Session Persistence**: Credentials are saved in `.whatsapp_auth/`. You only need to scan the QR code once!

### Step 4: Authorization Fallback (`/claim` or `/auth`)
If you send a command from your linked WhatsApp and receive an unauthorized prompt, reply with:
```text
/claim
# or
/auth
```
The session dynamically registers your JID as the authorized laptop operator.

### Step 5: Remote Control Commands
Send these messages in your **"Message yourself"** chat or directly to the bot:

| Command | Action | Example |
| :--- | :--- | :--- |
| `/help` | List all commands | `/help` |
| `/sysinfo` | Query laptop telemetry (RAM, CPU, battery, OS) | `/sysinfo` |
| `/cmd <command>` | Execute shell command on laptop ($ works too) | `/cmd dir`<br>`$ git status`<br>`/cmd git pull` |
| `/open <target>` | Launch app or URL on laptop screen | `/open notepad`<br>`/open chrome`<br>`/open https://github.com` |
| `/ls [path]` | Browse files on laptop | `/ls` or `/dir modes` |
| `/agent <task>` | Run autonomous coding agent on laptop | `/agent add error handling to auth.ts` |
| `/diff` | Preview staged diff before applying to disk | `/diff` |
| `/approve` | Apply staged AI modifications to laptop disk | `/approve` |
| `/reject` | Discard staged AI modifications safely | `/reject` |

---

## 💻 Interactive Next.js Web UI Companion

A dedicated Next.js companion app is included in the `web/` directory.

### Tech Stack
- **Next.js 14** (App Router & TypeScript)
- **Tailwind CSS** (Cyberpunk / Agent Terminal theme)
- **Framer Motion** (Smooth transitions & spring animations)
- **GSAP** (GreenSock timeline text decoders)
- **Lucide Icons**

### Features Included
- **Agent Terminal Live Sandbox**: Interactive terminal REPL simulator with slash commands (`/agent`, `/plan`, `/ask`, `/sysinfo`, `/diff`, `/clear`).
- **Global Setup Matrix**: Interactive tabbed guides for Windows, macOS, and Linux with one-click copy buttons.
- **Architecture Explorer**: Deep dive into the 4 operating modes and execution lifecycle.
- **Telegram & WhatsApp Mobile Mockups**: Interactive chat simulators showing real-time mobile command workflows.
- **Live `.env` Generator**: Interactive configuration builder with secret toggles and copy-to-clipboard functionality.
- **Unified Command Cheatsheet**: Searchable, filterable matrix of all CLI, Telegram, and WhatsApp commands.

### Running the Web Frontend

From the project root:
```bash
# Run development server
bun run web:dev

# Or navigate directly:
cd web
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 Comprehensive Command Reference

### 1. CLI & Terminal Entrypoints

| Command | Action |
| :--- | :--- |
| `pcbrew` / `pcbrew start` | Launch interactive Agentic Terminal REPL (`pcbrew ❯`) |
| `pcbrew wakeup` | Interactive banner with mode selector (CLI / Telegram / WhatsApp) |
| `pcbrew telegram` | Launch Telegram Bot mode directly |
| `pcbrew whatsapp` | Launch WhatsApp Laptop Controller mode directly |
| `pcbrew --help` | View Commander CLI help |
| `pcbrew -V` / `--version` | Display current version |

---

### 2. Agentic Terminal Slash Commands

When running `pcbrew start`:

| Slash Command | Description | Example |
| :--- | :--- | :--- |
| `/agent <task>` | Autonomous AI agent loop with staged diff approval | `/agent Refactor error logger in modes/telegram` |
| `/plan <goal>` | High-level goal decomposition into ordered steps | `/plan Build real-time job notifier` |
| `/ask <question>` | Read-only codebase query and exploration | `/ask How does ActionTracker stage modifications?` |
| `/cmd <command>` | Host terminal execution ($ works too) | `/cmd dir` or `$ git status` |
| `/sysinfo` | Host telemetry (CPU, RAM, Battery, OS, Uptime) | `/sysinfo` |
| `/mode` | Open the TUI mode selection menu | `/mode` |
| `/clear` | Clear terminal canvas | `/clear` |
| `/help` | Display command cheat sheet | `/help` |
| `/exit` | Exit agentic terminal | `/exit` |
| *Natural text* | Direct prompt to OpenRouter LLM | `How do I configure WhatsApp auth?` |

---

### 3. Telegram Bot Commands & Keyboards

| Command / Action | Description |
| :--- | :--- |
| `/start` | Welcome message and available commands |
| `/ask <question>` | Query codebase architecture remotely |
| `/agent <task>` | Run coding agent with inline keyboard approvals |
| `/plan <goal>` | Generate plan with interactive step toggle checkboxes |
| `plan_toggle:<id>` | Toggle individual plan steps in inline keyboard |
| `plan_proceed` | Dispatch autonomous agent to execute selected steps |
| `approval_diff` | Send formatted unified diff to chat |
| `approval_accept` | Commit staged changes to local disk |
| `approval_reject` | Discard staged changes without modifying files |

---

### 4. WhatsApp Laptop Controller Commands

| Command | Category | Description | Example |
| :--- | :--- | :--- | :--- |
| `/help` | General | Show full command reference | `/help` |
| `/sysinfo` | Telemetry | Live CPU load, RAM, battery, uptime | `/sysinfo` |
| `/cmd <cmd>` | Shell | Execute shell command on laptop | `/cmd dir`, `$ git push` |
| `/open <target>` | System | Open app or URL on laptop screen | `/open chrome`, `/open notepad` |
| `/ls [path]` | Filesystem | List directory contents | `/ls modes/agent` |
| `/agent <task>` | AI Agent | Run autonomous agent on laptop codebase | `/agent add comments to index.ts` |
| `/diff` | Safety | Preview staged diff in chat | `/diff` |
| `/approve` | Safety | Apply staged diff to laptop filesystem | `/approve` |
| `/reject` | Safety | Discard staged changes safely | `/reject` |
| `/claim` / `/auth` | Security | Authorize sender as master laptop operator | `/claim` |

---

## 🛡️ Safety & Virtual Memory Staging Architecture

To protect your codebase from unintended AI mutations, `PC Brew` implements a strict **Virtual Memory Staging Overlay**:

```text
[ User / Telegram / WhatsApp ]
              │
              ▼
    [ AI Tool Loop (LLM) ]
              │
              ▼
   [ ActionTracker (Memory) ]  <── All create_file / modify_file operations
              │                    are intercepted in an in-memory overlay.
              │                    Zero bytes written to disk.
              ▼
      [ Unified Diff ]         <── Color-coded patch generated with additions (+)
              │                    and deletions (-).
              ▼
      [ User Approval ]        <── Requires explicit confirmation:
        ├── Approved?  ──────────► Committed to disk safely.
        └── Rejected?  ──────────► Discarded; disk untouched.
```

---

## 🧪 TypeScript & Development

Verify type safety across all modules:

```bash
bunx tsc --noEmit
```

Run test or development commands:
```bash
# Start Agentic Terminal
bun run start

# Launch TUI Wakeup Selector
bun run wakeup

# Launch Web UI
bun run web:dev
```
