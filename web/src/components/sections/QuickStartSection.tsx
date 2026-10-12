"use client";

import * as React from "react";
import { Terminal, Shield, Cpu, MessageSquare, Wrench } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TerminalBlock } from "@/components/primitives/TerminalBlock";
import { Card } from "@/components/primitives/Card";

export const QuickStartSection: React.FC = () => {
  return (
    <Section id="quickstart" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Quick Start"
        title="Get PCBREW running in seconds."
        description="Link the CLI binary globally to command your workstation, run the interactive setup wizard, and launch remote gateways."
        actionText="View Multi-System Setup"
        actionHref="#setup"
      />

      {/* Segmented Tabs for CLI Workflows */}
      <Tabs defaultValue="link" className="w-full">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="link">1. Global Link</TabsTrigger>
            <TabsTrigger value="setup">2. Setup Wizard</TabsTrigger>
            <TabsTrigger value="start">3. Agent Terminal</TabsTrigger>
            <TabsTrigger value="wakeup">4. Mode Selector</TabsTrigger>
            <TabsTrigger value="whatsapp">5. WhatsApp Gateway</TabsTrigger>
            <TabsTrigger value="telegram">6. Telegram Bot</TabsTrigger>
          </TabsList>

          <span className="font-mono text-xs text-muted hidden sm:inline-block">
            Bun or Node.js required
          </span>
        </div>

        {/* 1. Global Link tab */}
        <TabsContent value="link" className="space-y-3">
          <TerminalBlock
            comment="Link the local repository globally into your system PATH (PowerShell / Bash)"
            command="npm link --force"
            secondaryComment="Verify global availability from any directory on your computer"
            secondaryCommand="pcbrew --version"
          />
        </TabsContent>

        {/* 2. Setup Wizard tab */}
        <TabsContent value="setup" className="space-y-3">
          <TerminalBlock
            comment="Launch interactive step-by-step configuration wizard"
            command="pcbrew setup"
            secondaryComment="Prompts one-by-one for OpenRouter, model ID, Telegram, and WhatsApp keys"
            secondaryCommand="pcbrew config"
          />
        </TabsContent>

        {/* 3. Agent Terminal tab */}
        <TabsContent value="start" className="space-y-3">
          <TerminalBlock
            comment="Launch the LangGraph autonomous terminal REPL in current directory"
            command="pcbrew start"
            secondaryComment="Executes multi-step tasks with filesystem CRUD and in-memory diff staging"
            secondaryCommand="pcbrew"
          />
        </TabsContent>

        {/* 4. Wakeup tab */}
        <TabsContent value="wakeup" className="space-y-3">
          <TerminalBlock
            comment="Interactive mode selector (Agent, Ask, Plan, Telegram, WhatsApp)"
            command="pcbrew wakeup"
            secondaryComment="Execute a task immediately with the wakeup prompt"
            secondaryCommand='pcbrew wakeup "Audit package.json dependencies and run build"'
          />
        </TabsContent>

        {/* 5. WhatsApp tab */}
        <TabsContent value="whatsapp" className="space-y-3">
          <TerminalBlock
            comment="Start WhatsApp remote laptop controller (scans QR code on first run)"
            command="pcbrew whatsapp"
            secondaryComment="Remotely run /cmd, /sysinfo, /open, and approve diffs from your phone"
            secondaryCommand="bun run index.ts whatsapp"
          />
        </TabsContent>

        {/* 6. Telegram tab */}
        <TabsContent value="telegram" className="space-y-3">
          <TerminalBlock
            comment="Start Telegram bot gateway with inline review buttons"
            command="pcbrew telegram"
            secondaryComment="Receive diff notifications and approve code execution remotely"
            secondaryCommand="bun run index.ts telegram"
          />
        </TabsContent>
      </Tabs>

      {/* 3 Quick Step Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 flex flex-col justify-between border-border-subtle bg-card hover:border-border-accent transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-coral font-mono text-xs font-bold">
                1
              </span>
              <span className="font-display text-base font-bold text-primary">Global Link</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Link the CLI once via <code className="text-coral">npm link --force</code>. Available globally in every terminal window.
            </p>
          </div>
          <div className="mt-4 font-mono text-[11px] text-muted bg-surface px-3 py-2 rounded-[6px] border border-border-subtle">
            npm link --force
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between border-border-subtle bg-card hover:border-border-accent transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-coral font-mono text-xs font-bold">
                2
              </span>
              <span className="font-display text-base font-bold text-primary">Setup Wizard</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Configure your API keys one-by-one with persistent local config store (<code className="text-coral">conf</code>).
            </p>
          </div>
          <div className="mt-4 font-mono text-[11px] text-muted bg-surface px-3 py-2 rounded-[6px] border border-border-subtle">
            pcbrew setup
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between border-border-subtle bg-card hover:border-border-accent transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-coral font-mono text-xs font-bold">
                3
              </span>
              <span className="font-display text-base font-bold text-primary">Agent or Remote</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Run <code className="text-coral">pcbrew start</code> for the terminal REPL or <code className="text-coral">pcbrew whatsapp</code> for remote control.
            </p>
          </div>
          <div className="mt-4 font-mono text-[11px] text-muted bg-surface px-3 py-2 rounded-[6px] border border-border-subtle">
            pcbrew start | whatsapp
          </div>
        </Card>
      </div>
    </Section>
  );
};
