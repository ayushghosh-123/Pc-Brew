"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Search, Shield, Filter } from "lucide-react";

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
  const [filter, setFilter] = useState<"ALL" | "CLI" | "Telegram" | "WhatsApp">("ALL");
  const [search, setSearch] = useState("");
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

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
    <section id="commands" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-agent-accent text-xs uppercase tracking-wider mb-1">
          <Terminal className="w-4 h-4 text-agent-accentBright" />
          <span>Unified Reference Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          COMMAND CHEATSHEET <span className="text-agent-accent">// ALL PLATFORMS</span>
        </h2>
        <p className="mt-2 text-sm text-agent-dim max-w-3xl">
          Quick search and one-click copy for every command in PC Brew across local terminal, Telegram, and WhatsApp.
        </p>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        {/* Scope Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-lg bg-agent-card border border-agent-border text-xs">
          {(["ALL", "CLI", "Telegram", "WhatsApp"] as const).map((sc) => (
            <button
              key={sc}
              onClick={() => setFilter(sc)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                filter === sc
                  ? "bg-agent-accent text-black font-bold"
                  : "text-agent-dim hover:text-white"
              }`}
            >
              {sc}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-agent-dim absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands or descriptions..."
            className="w-full sm:w-64 pl-9 pr-3 py-2 text-xs rounded-lg bg-agent-card border border-agent-border focus:border-agent-accent outline-none text-white"
          />
        </div>
      </div>

      {/* Commands Table / Cards */}
      <div className="rounded-xl border border-agent-border bg-agent-card/70 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-agent-border/80 bg-black/50 text-agent-dim text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Command</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Safety Level</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-agent-border/40">
              {filtered.map((item, idx) => (
                <tr key={idx} className="hover:bg-agent-bg/50 transition-colors">
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        item.scope === "CLI"
                          ? "bg-amber-950/40 text-agent-accentBright border border-amber-500/30"
                          : item.scope === "Telegram"
                          ? "bg-sky-950/40 text-sky-400 border border-sky-500/30"
                          : "bg-emerald-950/40 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {item.scope}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white whitespace-nowrap">
                    <code>{item.cmd}</code>
                    {item.args && <span className="text-agent-dim font-normal ml-1.5">{item.args}</span>}
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {item.desc}
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span
                      className={`text-[11px] flex items-center space-x-1 ${
                        item.safety === "Safe"
                          ? "text-agent-green"
                          : item.safety === "Staged Diff"
                          ? "text-amber-400"
                          : "text-rose-400"
                      }`}
                    >
                      <Shield className="w-3 h-3" />
                      <span>{item.safety}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => copy(item.cmd)}
                      className="px-2.5 py-1 rounded bg-black/60 hover:bg-black border border-agent-border text-agent-dim hover:text-white transition-colors"
                      title="Copy command"
                    >
                      {copiedCmd === item.cmd ? (
                        <Check className="w-3.5 h-3.5 text-agent-green" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
