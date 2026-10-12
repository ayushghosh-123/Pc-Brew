"use client";

import * as React from "react";
import { Laptop, Apple, Server, ShieldCheck, Zap, Copy, Check } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const GlobalSetupGuide: React.FC = () => {
  const [copiedIndex, setCopiedIndex] = React.useState<string | null>(null);

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const guides = {
    windows: {
      title: "Windows 10 / 11 (PowerShell & CMD)",
      icon: Laptop,
      steps: [
        {
          id: "win-1",
          name: "Step 1: Install Bun & Clone",
          cmd: "powershell -c \"irm bun.sh/install.ps1 | iex\"\ngit clone <repo_url> pcbrew\ncd pcbrew\nbun install",
          note: "Requires Bun v1.4+ and Node.js v20+ for native module support.",
        },
        {
          id: "win-2",
          name: "Step 2: Link Globally & Setup",
          cmd: "npm link --force\n# OR with Bun:\nbun link\npcbrew setup",
          note: "Creates global shims so you can type 'pcbrew' from any directory, then prompts for API keys.",
        },
        {
          id: "win-3",
          name: "Step 3: Alternative — Standalone Executable",
          cmd: "bun build --compile --outfile pcbrew.exe ./index.ts\n# Move to a directory in your system PATH, e.g.:\nMove-Item pcbrew.exe C:\\Users\\$env:USERNAME\\.bun\\bin\\",
          note: "Compiles a self-contained single .exe that does not even require bun to be installed on target machine!",
        },
        {
          id: "win-4",
          name: "Step 4: Verify Global Accessibility",
          cmd: "where.exe pcbrew\npcbrew --help\npcbrew start",
          note: "Now you can invoke 'pcbrew' anywhere on your Windows PC.",
        },
      ],
    },
    macos: {
      title: "macOS (Apple Silicon & Intel)",
      icon: Apple,
      steps: [
        {
          id: "mac-1",
          name: "Step 1: Install Bun & Dependencies",
          cmd: "curl -fsSL https://bun.sh/install | bash\ngit clone <repo_url> pcbrew\ncd pcbrew\nbun install",
          note: "Bun is blazing fast on macOS with native arm64 optimization.",
        },
        {
          id: "mac-2",
          name: "Step 2: Link Globally into PATH",
          cmd: "npm link\n# or create direct binary symlink:\nsudo ln -sf $(pwd)/index.ts /usr/local/bin/pcbrew\nsudo chmod +x /usr/local/bin/pcbrew\npcbrew setup",
          note: "Instantly exposes 'pcbrew' to your zsh / bash shell.",
        },
        {
          id: "mac-3",
          name: "Step 3: Alternative — Standalone macOS Binary",
          cmd: "bun build --compile --outfile pcbrew ./index.ts\nsudo mv pcbrew /usr/local/bin/\nsudo chmod +x /usr/local/bin/pcbrew",
          note: "Compiles a native Mach-O standalone binary.",
        },
        {
          id: "mac-4",
          name: "Step 4: Test Global Access",
          cmd: "which pcbrew\npcbrew wakeup",
          note: "Launches the interactive ASCII TUI selector.",
        },
      ],
    },
    linux: {
      title: "Linux (Ubuntu / Debian / Arch / VPS)",
      icon: Server,
      steps: [
        {
          id: "lin-1",
          name: "Step 1: Install Bun & System Libs",
          cmd: "curl -fsSL https://bun.sh/install | bash\nexport PATH=\"$HOME/.bun/bin:$PATH\"\ngit clone <repo_url> pcbrew\ncd pcbrew\nbun install",
          note: "Make sure build-essential is installed if compiling native dependencies.",
        },
        {
          id: "lin-2",
          name: "Step 2: Link or Compile Binary",
          cmd: "bun build --compile --outfile /usr/local/bin/pcbrew ./index.ts\nsudo chmod +x /usr/local/bin/pcbrew\npcbrew setup",
          note: "Single ELF binary ready for servers, containers, and headless workstations.",
        },
        {
          id: "lin-3",
          name: "Step 3: Configure Environment Variables",
          cmd: "pcbrew setup\n# Or via config store:\n# ~/.config/pcbrew/config.json",
          note: "Stores secrets securely in user config directory.",
        },
        {
          id: "lin-4",
          name: "Step 4: Optional Background Daemon (systemd)",
          cmd: "sudo systemctl enable --now pcbrew-whatsapp.service",
          note: "Keep Telegram bot or WhatsApp controller online 24/7 on your Linux VPS or mini PC.",
        },
      ],
    },
  };

  return (
    <Section id="setup" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Cross-Platform Deployment"
        title="Global Configuration on Any System"
        description="How to make pcbrew accessible from anywhere on your terminal, whether on your local Windows PC, a Mac, or a headless Linux VPS."
      />

      <Tabs defaultValue="windows" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="windows" className="gap-2">
            <Laptop className="h-4 w-4" />
            <span>Windows</span>
          </TabsTrigger>
          <TabsTrigger value="macos" className="gap-2">
            <Apple className="h-4 w-4" />
            <span>macOS</span>
          </TabsTrigger>
          <TabsTrigger value="linux" className="gap-2">
            <Server className="h-4 w-4" />
            <span>Linux</span>
          </TabsTrigger>
        </TabsList>

        {(["windows", "macos", "linux"] as const).map((osKey) => {
          const active = guides[osKey];
          return (
            <TabsContent key={osKey} value={osKey} className="space-y-4">
              <Card className="p-6 border-border-subtle bg-card space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
                  <div className="flex items-center gap-2">
                    <active.icon className="h-4 w-4 text-coral" />
                    <span className="font-display font-bold text-primary text-base">
                      {active.title}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-muted px-2.5 py-1 rounded-[4px] border border-border-subtle bg-elevated">
                    CLI Entrypoint: index.ts
                  </span>
                </div>

                <div className="space-y-4">
                  {active.steps.map((step) => (
                    <div
                      key={step.id}
                      className="p-4 rounded-[6px] bg-elevated border border-border-subtle hover:border-border-accent transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-display text-xs font-bold text-primary">
                          {step.name}
                        </span>
                        <button
                          type="button"
                          onClick={() => copyCode(step.cmd, step.id)}
                          className="flex items-center gap-1 text-[11px] font-mono text-muted hover:text-primary px-2 py-0.5 rounded-[4px] bg-interactive hover:bg-interactive-hover transition-colors"
                        >
                          {copiedIndex === step.id ? (
                            <>
                              <Check className="h-3 w-3 text-sea-green" />
                              <span className="text-sea-green">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-3 rounded-[4px] bg-page border border-border-subtle text-xs text-sea-green font-mono overflow-x-auto whitespace-pre leading-relaxed">
                        {step.cmd}
                      </pre>

                      <p className="mt-2 text-[11px] text-muted flex items-center gap-1.5 font-mono">
                        <ShieldCheck className="h-3.5 w-3.5 text-coral flex-shrink-0" />
                        <span>{step.note}</span>
                      </p>
                    </div>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className="p-4 rounded-[6px] bg-accent-soft border border-border-accent flex items-start gap-3 text-xs">
                  <Zap className="h-4 w-4 text-coral flex-shrink-0 mt-0.5" />
                  <div className="space-y-1 font-mono">
                    <p className="font-bold text-coral">Global Binaries Configured:</p>
                    <p className="text-secondary leading-relaxed">
                      The primary binary is <code className="text-primary font-bold">pcbrew</code> (with backward-compatible aliases <code className="text-primary font-bold">jobhunt</code>, <code className="text-primary font-bold">jobhunter</code>, and <code className="text-primary font-bold">jobhuntercli</code>). Any of these invoke the unified CLI handler.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </Section>
  );
};
