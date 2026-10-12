"use client";

import * as React from "react";
import { Download, Terminal, Laptop, Check, Copy } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TerminalBlock } from "@/components/primitives/TerminalBlock";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/ui/button";

export const QuickStartSection: React.FC = () => {
  return (
    <Section id="quickstart" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Quick Start"
        title="Get PCBREW running in seconds."
        description="Pick your preferred setup: install the CLI globally, run the one-liner, or grab the native companion app."
        actionText="All install options"
        actionHref="#setup"
      />

      {/* Segmented Tabs */}
      <Tabs defaultValue="oneliner" className="w-full">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
          <TabsList>
            <TabsTrigger value="apps">Apps</TabsTrigger>
            <TabsTrigger value="oneliner">One-liner</TabsTrigger>
            <TabsTrigger value="npm">npm / Bun</TabsTrigger>
            <TabsTrigger value="hackable">Hackable</TabsTrigger>
          </TabsList>

          <span className="font-mono text-xs text-muted hidden sm:inline-block">
            Supports macOS, Windows & Linux
          </span>
        </div>

        {/* 1. Apps tab (OS Cards) */}
        <TabsContent value="apps" className="space-y-4">
          <div className="p-4 rounded-[8px] border border-border-subtle bg-surface">
            <div className="text-sm font-display font-bold text-primary mb-1">
              Native Companion Apps
            </div>
            <p className="text-xs text-muted">
              Prepackaged companion apps with background daemon, Telegram gateway, and WhatsApp bridge included.
            </p>
          </div>
        </TabsContent>

        {/* 2. One-liner tab */}
        <TabsContent value="oneliner" className="space-y-3">
          <TerminalBlock
            comment="Universal setup script. Automatically installs dependencies and registers global commands."
            command="curl -fsSL https://pcbrew.dev/install.sh | bash"
            secondaryComment="Run the interactive onboarding configuration wizard"
            secondaryCommand="pcbrew setup"
          />
        </TabsContent>

        {/* 3. npm / bun tab */}
        <TabsContent value="npm" className="space-y-3">
          <TerminalBlock
            comment="Install via Bun or npm globally"
            command="bun add -g pcbrew"
            secondaryComment="Or install with npm"
            secondaryCommand="npm install -g pcbrew"
          />
        </TabsContent>

        {/* 4. Hackable tab */}
        <TabsContent value="hackable" className="space-y-3">
          <TerminalBlock
            comment="Clone repository and link local workspace for source hacking"
            command="git clone https://github.com/pcbrew/pcbrew.git && cd pcbrew"
            secondaryComment="Install dependencies and link CLI binary into your PATH"
            secondaryCommand="bun install && npm link --force"
          />
        </TabsContent>
      </Tabs>

      {/* 3 OS Download Cards: macOS, Windows, Linux with "New" badge */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* macOS Card */}
        <Card className="p-5 flex flex-col justify-between border-border-subtle bg-card hover:border-border-accent">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-base font-bold text-primary">macOS</span>
              <span className="font-mono text-[11px] text-muted">v1.0.0</span>
            </div>
            <p className="font-mono text-xs text-secondary mb-4">
              macOS 14+ · Apple Silicon & Intel
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <Button asChild variant="primary" size="default" className="w-full">
              <a href="#quickstart" className="gap-2">
                <Download className="h-4 w-4" />
                <span>Download Universal DMG</span>
              </a>
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="secondary" size="sm" className="text-xs">
                <a href="#quickstart">Apple Silicon</a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="text-xs">
                <a href="#quickstart">Intel Mac</a>
              </Button>
            </div>
          </div>
        </Card>

        {/* Windows Card */}
        <Card className="p-5 flex flex-col justify-between border-border-subtle bg-card hover:border-border-accent">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-display text-base font-bold text-primary">Windows</span>
              <span className="font-mono text-[11px] text-muted">v1.0.0</span>
            </div>
            <p className="font-mono text-xs text-secondary mb-4">
              Windows 10/11 · x64 & ARM64
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <Button asChild variant="primary" size="default" className="w-full">
              <a href="#quickstart" className="gap-2">
                <Download className="h-4 w-4" />
                <span>Download Setup (x64)</span>
              </a>
            </Button>
            <Button asChild variant="secondary" size="sm" className="text-xs w-full">
              <a href="#quickstart">Download ARM64 Installer</a>
            </Button>
          </div>
        </Card>

        {/* Linux Card with "New" badge */}
        <Card className="p-5 flex flex-col justify-between border-border-subtle bg-card hover:border-border-accent">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="font-display text-base font-bold text-primary">Linux</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded-[4px] border border-border-accent bg-accent-soft font-mono text-[10px] font-bold text-coral uppercase tracking-wider">
                  New
                </span>
              </div>
              <span className="font-mono text-[11px] text-muted">v1.0.0</span>
            </div>
            <p className="font-mono text-xs text-secondary mb-4">
              Ubuntu, Debian, Fedora, Arch · x64 & ARM64
            </p>
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <Button asChild variant="primary" size="default" className="w-full">
              <a href="#quickstart" className="gap-2">
                <Download className="h-4 w-4" />
                <span>Download AppImage</span>
              </a>
            </Button>
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="secondary" size="sm" className="text-xs">
                <a href="#quickstart">.deb Package</a>
              </Button>
              <Button asChild variant="secondary" size="sm" className="text-xs">
                <a href="#quickstart">.rpm Package</a>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </Section>
  );
};
