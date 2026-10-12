"use client";

import * as React from "react";
import { Copy, Check, Search, Shield } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Input } from "@/components/ui/input";

interface CommandItem {
  scope: "CLI" | "Telegram" | "WhatsApp";
  cmd: string;
  args?: string;
  desc: string;
  safety: "Safe" | "Staged Diff" | "Shell Execution";
}

const COMMAND_DATA: CommandItem[] = [
  // CLI Commands
  { scope: "CLI", cmd: "pcbrew", desc: "Launch default interactive Agentic Terminal", safety: "Safe" },
  { scope: "CLI", cmd: "pcbrew setup", desc: "Interactive step-by-step API configuration wizard", safety: "Safe" },
  { scope: "CLI", cmd: "pcbrew start", desc: "Start Agentic Terminal directly with slash palette", safety: "Safe" },
  { scope: "CLI", cmd: "pcbrew wakeup", desc: "Wakeup mode selector banner (CLI / Telegram / WhatsApp / Config)", safety: "Safe" },
  { scope: "CLI", cmd: "pcbrew telegram", desc: "Start Telegram Bot listener mode", safety: "Safe" },
  { scope: "CLI", cmd: "pcbrew whatsapp", desc: "Start WhatsApp Laptop Controller with terminal QR", safety: "Safe" },
  { scope: "CLI", cmd: "/plan", args: "<goal>", desc: "Generate strategic ordered implementation plan", safety: "Safe" },
  { scope: "CLI", cmd: "/agent", args: "<task>", desc: "Autonomous AI agent loop with staged file overlays", safety: "Staged Diff" },
  { scope: "CLI", cmd: "/ask", args: "<question>", desc: "Read-only codebase exploration & architecture Q&A", safety: "Safe" },
  { scope: "CLI", cmd: "/cmd", args: "<command>", desc: "Direct terminal execution on host machine", safety: "Shell Execution" },
  { scope: "CLI", cmd: "/sysinfo", desc: "Display laptop telemetry (CPU, RAM, battery, OS)", safety: "Safe" },

  // Telegram Commands
  { scope: "Telegram", cmd: "/start", desc: "Display welcome panel and active bot status", safety: "Safe" },
  { scope: "Telegram", cmd: "/ask", args: "<question>", desc: "Query repository architecture remotely", safety: "Safe" },
  { scope: "Telegram", cmd: "/agent", args: "<task>", desc: "Run coding agent with inline keyboard approvals", safety: "Staged Diff" },
  { scope: "Telegram", cmd: "/plan", args: "<goal>", desc: "Create plan with interactive step toggle buttons", safety: "Safe" },

  // WhatsApp Commands
  { scope: "WhatsApp", cmd: "/help", desc: "Display all laptop controller commands", safety: "Safe" },
  { scope: "WhatsApp", cmd: "/claim", desc: "Pair and authorize your WhatsApp as laptop master operator", safety: "Safe" },
  { scope: "WhatsApp", cmd: "/sysinfo", desc: "Get live hardware telemetry (RAM, CPU load, battery)", safety: "Safe" },
  { scope: "WhatsApp", cmd: "/cmd", args: "<command>", desc: "Run arbitrary terminal command on laptop ($ works too)", safety: "Shell Execution" },
  { scope: "WhatsApp", cmd: "/open", args: "<target>", desc: "Launch app or URL on laptop screen (e.g. /open chrome)", safety: "Safe" },
  { scope: "WhatsApp", cmd: "/ls", args: "[dir]", desc: "Inspect laptop workspace directory contents", safety: "Safe" },
  { scope: "WhatsApp", cmd: "/agent", args: "<task>", desc: "Run autonomous coding agent on laptop codebase", safety: "Staged Diff" },
  { scope: "WhatsApp", cmd: "/diff", desc: "View staged git diff of AI edits before writing to disk", safety: "Safe" },
  { scope: "WhatsApp", cmd: "/approve", desc: "Apply staged AI code modifications to laptop disk", safety: "Staged Diff" },
  { scope: "WhatsApp", cmd: "/reject", desc: "Discard staged AI modifications safely", safety: "Safe" },
];

export const CommandsCheatsheet: React.FC = () => {
  const [filter, setFilter] = React.useState<"ALL" | "CLI" | "Telegram" | "WhatsApp">("ALL");
  const [search, setSearch] = React.useState("");
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  const filtered = COMMAND_DATA.filter((item) => {
    const matchesFilter = filter === "ALL" || item.scope === filter;
    const matchesSearch =
      item.cmd.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase()) ||
      (item.args && item.args.toLowerCase().includes(search.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const copy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <Section id="cheatsheet" className="py-16 border-b border-border-subtle font-mono">
      <SectionHeader
        eyebrow="Unified Reference Matrix"
        title="Command Cheatsheet: All Platforms"
        description="Quick search and one-click copy for every command in PC Brew across local terminal, Telegram, and WhatsApp."
      />

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Scope Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-[8px] bg-elevated border border-border-subtle text-xs">
          {(["ALL", "CLI", "Telegram", "WhatsApp"] as const).map((sc) => (
            <button
              key={sc}
              type="button"
              onClick={() => setFilter(sc)}
              className={`px-3 py-1.5 rounded-[4px] transition-all font-bold ${
                filter === sc
                  ? "bg-coral text-on-accent"
                  : "text-muted hover:text-primary"
              }`}
            >
              {sc}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="h-4 w-4 text-muted absolute left-3 top-3 pointer-events-none" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands..."
            className="pl-9 pr-3 text-xs bg-elevated border-border-subtle text-primary"
          />
        </div>
      </div>

      {/* Commands Table Card */}
      <Card className="border-border-subtle bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border-subtle bg-elevated text-muted text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Command</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Safety Level</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle/50">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-interactive transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-[4px] text-[10px] font-bold ${
                        item.scope === "CLI"
                          ? "bg-accent-soft text-coral border border-border-accent"
                          : item.scope === "Telegram"
                          ? "bg-status-info/10 text-status-info border border-status-info/30"
                          : "bg-sea-green/10 text-sea-green border border-sea-green/30"
                      }`}
                    >
                      {item.scope}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-primary whitespace-nowrap">
                    <code>{item.cmd}</code>
                    {item.args && (
                      <span className="text-muted font-normal ml-1.5">{item.args}</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-secondary">{item.desc}</td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] flex items-center gap-1 font-medium ${
                        item.safety === "Safe"
                          ? "text-status-success"
                          : item.safety === "Staged Diff"
                          ? "text-coral"
                          : "text-status-error"
                      }`}
                    >
                      <Shield className="h-3 w-3" />
                      <span>{item.safety}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => copy(item.cmd)}
                      className="px-2.5 py-1 rounded-[4px] bg-elevated hover:bg-interactive-hover border border-border-subtle text-muted hover:text-primary transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd === item.cmd ? (
                        <Check className="h-3.5 w-3.5 text-sea-green" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  );
};
