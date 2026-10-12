"use client";

import * as React from "react";
import { Terminal, Package } from "lucide-react";
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
        description="Install the CLI globally with your preferred package manager, or run it directly with npx."
        actionText="View Documentation"
        actionHref="#docs"
      />

      {/* Segmented Tabs for Package Managers */}
      <Tabs defaultValue="npm" className="w-full">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="npm">npm</TabsTrigger>
            <TabsTrigger value="bun">bun</TabsTrigger>
            <TabsTrigger value="pnpm">pnpm</TabsTrigger>
            <TabsTrigger value="yarn">yarn</TabsTrigger>
            <TabsTrigger value="npx">npx</TabsTrigger>
            <TabsTrigger value="source">From Source</TabsTrigger>
          </TabsList>

          <span className="font-mono text-xs text-muted hidden sm:inline-block">
            Node.js 18+ or Bun required
          </span>
        </div>

        {/* 1. npm tab */}
        <TabsContent value="npm" className="space-y-3">
          <TerminalBlock
            comment="Install pcbrew globally via npm"
            command="npm install -g pcbrew"
            secondaryComment="Run the interactive onboarding configuration wizard"
            secondaryCommand="pcbrew setup"
          />
        </TabsContent>

        {/* 2. bun tab */}
        <TabsContent value="bun" className="space-y-3">
          <TerminalBlock
            comment="Install globally using Bun"
            command="bun add -g pcbrew"
            secondaryComment="Run the interactive onboarding configuration wizard"
            secondaryCommand="pcbrew setup"
          />
        </TabsContent>

        {/* 3. pnpm tab */}
        <TabsContent value="pnpm" className="space-y-3">
          <TerminalBlock
            comment="Install globally using pnpm"
            command="pnpm add -g pcbrew"
            secondaryComment="Run the interactive onboarding configuration wizard"
            secondaryCommand="pcbrew setup"
          />
        </TabsContent>

        {/* 4. yarn tab */}
        <TabsContent value="yarn" className="space-y-3">
          <TerminalBlock
            comment="Install globally using Yarn"
            command="yarn global add pcbrew"
            secondaryComment="Run the interactive onboarding configuration wizard"
            secondaryCommand="pcbrew setup"
          />
        </TabsContent>

        {/* 5. npx tab */}
        <TabsContent value="npx" className="space-y-3">
          <TerminalBlock
            comment="Run directly without permanent global installation"
            command="npx pcbrew setup"
            secondaryComment="Or execute a task immediately"
            secondaryCommand='npx pcbrew wakeup "Check system status"'
          />
        </TabsContent>

        {/* 6. From Source tab */}
        <TabsContent value="source" className="space-y-3">
          <TerminalBlock
            comment="Clone repository and link local workspace for source hacking"
            command="git clone https://github.com/pcbrew/pcbrew.git && cd pcbrew"
            secondaryComment="Install dependencies and link CLI binary into your PATH"
            secondaryCommand="bun install && npm link --force"
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
              <span className="font-display text-base font-bold text-primary">Install CLI</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Install the lightweight npm package globally on macOS, Linux, or Windows.
            </p>
          </div>
          <div className="mt-4 font-mono text-[11px] text-muted bg-surface px-3 py-2 rounded-[6px] border border-border-subtle">
            npm i -g pcbrew
          </div>
        </Card>

        <Card className="p-5 flex flex-col justify-between border-border-subtle bg-card hover:border-border-accent transition-colors">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent-soft text-coral font-mono text-xs font-bold">
                2
              </span>
              <span className="font-display text-base font-bold text-primary">Run Setup</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Launch the wizard to configure your preferred LLM provider (OpenAI, Anthropic, Gemini, Groq).
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
              <span className="font-display text-base font-bold text-primary">Connect & Control</span>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Control tasks locally or link your Telegram and WhatsApp bots for remote command execution.
            </p>
          </div>
          <div className="mt-4 font-mono text-[11px] text-muted bg-surface px-3 py-2 rounded-[6px] border border-border-subtle">
            pcbrew telegram | whatsapp
          </div>
        </Card>
      </div>
    </Section>
  );
};
