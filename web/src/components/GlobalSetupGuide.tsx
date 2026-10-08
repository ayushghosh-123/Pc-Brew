"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Terminal, Globe, Check, Copy, Laptop, Apple, Server, ShieldCheck, Zap } from "lucide-react";

export const GlobalSetupGuide: React.FC = () => {
  const [activeOS, setActiveOS] = useState<"windows" | "macos" | "linux">("windows");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyCode = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const guides = {
    windows: {
      title: "Windows 10 / 11 (PowerShell & CMD)",
      icon: Laptop,
      color: "text-agent-cyan",
      steps: [
        {
          name: "Step 1: Install Bun & Clone",
          cmd: "powershell -c \"irm bun.sh/install.ps1 | iex\"\ngit clone <repo_url> pcbrew\ncd pcbrew\nbun install",
          note: "Requires Bun v1.4+ and Node.js v20+ for native module support.",
        },
        {
          name: "Step 2: Link Globally & Setup",
          cmd: "npm link --force\n# OR with Bun:\nbun link\npcbrew setup",
          note: "Creates global shims so you can type 'pcbrew' from any directory, then prompts for API keys.",
        },
        {
          name: "Step 3: Alternative — Standalone Executable",
          cmd: "bun build --compile --outfile pcbrew.exe ./index.ts\n# Move to a directory in your system PATH, e.g.:\nMove-Item pcbrew.exe C:\\Users\\$env:USERNAME\\.bun\\bin\\",
          note: "Compiles a self-contained single .exe that does not even require bun to be installed on target machine!",
        },
        {
          name: "Step 4: Verify Global Accessibility",
          cmd: "where.exe pcbrew\npcbrew --help\npcbrew start",
          note: "Now you can invoke 'pcbrew' anywhere on your Windows PC.",
        },
      ],
    },
    macos: {
      title: "macOS (Apple Silicon & Intel)",
      icon: Apple,
      color: "text-agent-accentBright",
      steps: [
        {
          name: "Step 1: Install Bun & Dependencies",
          cmd: "curl -fsSL https://bun.sh/install | bash\ngit clone <repo_url> pcbrew\ncd pcbrew\nbun install",
          note: "Bun is blazing fast on macOS with native arm64 optimization.",
        },
        {
          name: "Step 2: Link Globally into PATH",
          cmd: "npm link\n# or create direct binary symlink:\nsudo ln -sf $(pwd)/index.ts /usr/local/bin/pcbrew\nsudo chmod +x /usr/local/bin/pcbrew\npcbrew setup",
          note: "Instantly exposes 'pcbrew' to your zsh / bash shell.",
        },
        {
          name: "Step 3: Alternative — Standalone macOS Binary",
          cmd: "bun build --compile --outfile pcbrew ./index.ts\nsudo mv pcbrew /usr/local/bin/\nsudo chmod +x /usr/local/bin/pcbrew",
          note: "Compiles a native Mach-O standalone binary.",
        },
        {
          name: "Step 4: Test Global Access",
          cmd: "which pcbrew\npcbrew wakeup",
          note: "Launches the interactive ASCII TUI selector.",
        },
      ],
    },
    linux: {
      title: "Linux (Ubuntu / Debian / Arch / Cloud VPS)",
      icon: Server,
      color: "text-agent-green",
      steps: [
        {
          name: "Step 1: Install Bun & System Libs",
          cmd: "curl -fsSL https://bun.sh/install | bash\nexport PATH=\"$HOME/.bun/bin:$PATH\"\ngit clone <repo_url> pcbrew\ncd pcbrew\nbun install",
          note: "Make sure build-essential is installed if compiling native dependencies.",
        },
        {
          name: "Step 2: Link or Compile Binary",
          cmd: "bun build --compile --outfile /usr/local/bin/pcbrew ./index.ts\nsudo chmod +x /usr/local/bin/pcbrew\npcbrew setup",
          note: "Single ELF binary ready for servers, containers, and headless workstations.",
        },
        {
          name: "Step 3: Configure Environment Variables",
          cmd: "pcbrew setup\n# Or via config store:\n# ~/.config/pcbrew/config.json",
          note: "Stores secrets securely in user config directory.",
        },
        {
          name: "Step 4: Optional Background Daemon (systemd)",
          cmd: "sudo systemctl enable --now pcbrew-whatsapp.service",
          note: "Keep Telegram bot or WhatsApp controller online 24/7 on your Linux VPS or mini PC.",
        },
      ],
    },
  };

  const active = guides[activeOS];

  return (
    <section id="setup" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-agent-accent text-xs uppercase tracking-wider mb-1">
          <Globe className="w-4 h-4 text-agent-cyan" />
          <span>Cross-Platform Deployment</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          GLOBAL CONFIGURATION <span className="text-agent-cyan">// ANY SYSTEM</span>
        </h2>
        <p className="mt-2 text-sm text-agent-dim max-w-3xl">
          How to make <code className="text-agent-accentBright font-bold">pcbrew</code> accessible from anywhere on your terminal, whether on your local Windows PC, a Mac, or a headless Linux VPS.
        </p>
      </div>

      {/* Operating System Switcher Tabs */}
      <div className="flex border-b border-agent-border/80 mb-6 gap-2">
        {(["windows", "macos", "linux"] as const).map((osKey) => {
          const item = guides[osKey];
          const Icon = item.icon;
          const isSelected = activeOS === osKey;

          return (
            <button
              key={osKey}
              onClick={() => setActiveOS(osKey)}
              className={`flex items-center space-x-2 px-4 py-3 text-xs sm:text-sm font-semibold transition-all border-b-2 -mb-[2px] ${
                isSelected
                  ? `border-agent-cyan text-white bg-agent-card/60 rounded-t-lg`
                  : "border-transparent text-agent-dim hover:text-slate-200"
              }`}
            >
              <Icon className={`w-4 h-4 ${item.color}`} />
              <span className="capitalize">{osKey}</span>
            </button>
          );
        })}
      </div>

      {/* Active Guide Card */}
      <motion.div
        key={activeOS}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="rounded-xl border border-agent-border bg-agent-card/70 p-6 space-y-6"
      >
        <div className="flex items-center justify-between pb-3 border-b border-agent-border/60">
          <div className="flex items-center space-x-2">
            <active.icon className={`w-5 h-5 ${active.color}`} />
            <span className="font-bold text-white text-base">{active.title}</span>
          </div>
          <span className="text-xs text-agent-dim bg-agent-bg px-2.5 py-1 rounded border border-agent-border">
            CLI Entrypoint: index.ts
          </span>
        </div>

        {/* Steps Grid */}
        <div className="space-y-5">
          {active.steps.map((step, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg bg-agent-bg/90 border border-agent-border/60 hover:border-agent-border transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-200">{step.name}</span>
                <button
                  onClick={() => copyCode(step.cmd, idx)}
                  className="flex items-center space-x-1 text-[11px] text-agent-dim hover:text-white px-2 py-0.5 rounded bg-agent-card border border-agent-border/80 transition-colors"
                >
                  {copiedIndex === idx ? (
                    <>
                      <Check className="w-3 h-3 text-agent-green" />
                      <span className="text-agent-green">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code block */}
              <pre className="p-3 rounded bg-black/70 border border-agent-border/40 text-xs text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                {step.cmd}
              </pre>

              <p className="mt-2 text-[11px] text-agent-dim flex items-center space-x-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-agent-accent" />
                <span>{step.note}</span>
              </p>
            </div>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 flex items-start space-x-3 text-xs">
          <Zap className="w-4 h-4 text-agent-green shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-agent-green">Global Binaries Configured:</p>
            <p className="text-slate-300">
              The primary binary is <code className="text-agent-accentBright font-bold">pcbrew</code> (with backward-compatible aliases <code className="text-agent-accentBright font-bold">jobhunt</code>, <code className="text-agent-accentBright font-bold">jobhunter</code>, and <code className="text-agent-accentBright font-bold">jobhuntercli</code>). Any of these invoke the unified CLI handler.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
