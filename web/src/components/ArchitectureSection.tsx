"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Terminal, Sparkles, Send, MessageSquare, Shield, CheckCircle2, FileCode, Cpu, ArrowRight } from "lucide-react";

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const modes = [
    {
      id: "agent",
      title: "1. Agentic Terminal Mode",
      badge: "pcbrew start",
      icon: Terminal,
      color: "border-agent-accent text-agent-accentBright",
      desc: "Autonomous AI pairing terminal. Executes tool loops, reads files, discovers structure, stages file edits in virtual memory, and presents unified diffs for interactive user approval.",
      features: [
        "Interactive REPL with slash command palette (/config, /agent, /plan, /ask, /cmd, /sysinfo)",
        "Zero-mutation safety layer: AI writes to an in-memory staging overlay first",
        "Unified colored diff viewer before any byte touches your filesystem",
        "Autonomous directory exploration and codebase structural analysis",
      ],
      flow: ["Prompt Input", "AI Reasoning (OpenRouter)", "Tool Execution Loop", "Unified Diff Staged", "User Approval [y/n]", "Committed to Disk"],
    },
    {
      id: "plan",
      title: "2. Strategic Plan Mode",
      badge: "/plan <goal>",
      icon: Layers,
      color: "border-agent-cyan text-agent-cyan",
      desc: "High-level goal decomposition. Breaks down complex requests into clean, ordered, toggleable execution steps with optional live web scraping via Firecrawl.",
      features: [
        "Generates clean architectural blueprints before writing code",
        "Toggle individual steps on or off in interactive terminal checklists",
        "Firecrawl integration for scraping live job portals or documentation",
        "Converts complex full-stack features into bite-sized actionable items",
      ],
      flow: ["Goal Defined", "Web/Codebase Scanned", "Step Decomposition", "Interactive Checkbox Selection", "Agent Dispatched per Step"],
    },
    {
      id: "telegram",
      title: "3. Telegram Bot Gateway",
      badge: "pcbrew telegram",
      icon: Send,
      color: "border-sky-500 text-sky-400",
      desc: "Remote AI assistant on your phone. Connects via Telegraf and allows you to run /ask, /agent, and /plan tasks from anywhere with Telegram inline keyboard buttons.",
      features: [
        "Cryptographic owner verification against TELEGRAM_OWNER_ID",
        "Interactive inline buttons for step toggling and agent approval",
        "Real-time progress streaming and markdown message formatting",
        "Long-running autonomous agent execution dispatched asynchronously",
      ],
      flow: ["Telegram /command", "Owner ID Check", "Task Worker Dispatched", "Inline Diff Keyboard", "Phone One-Tap Approval"],
    },
    {
      id: "whatsapp",
      title: "4. WhatsApp Laptop Controller",
      badge: "pcbrew whatsapp",
      icon: MessageSquare,
      color: "border-emerald-500 text-emerald-400",
      desc: "Turn your WhatsApp into a remote shell and AI controller for your laptop. Execute terminal commands (/cmd), check laptop battery and specs (/sysinfo), open apps (/open), and code remotely.",
      features: [
        "Baileys socket engine with persistent auth (.whatsapp_auth/)",
        "Zero-friction pairing via terminal QR code or /claim command",
        "Full laptop shell access: /cmd git status, /cmd dir, /cmd shutdown",
        "Hardware telemetry: battery, memory, CPU load, and uptime directly in chat",
        "App launcher: /open chrome, /open vs-code, /open https://github.com",
      ],
      flow: ["Scan QR Once", "Send /cmd or /agent", "Executed on Local Laptop", "Terminal Output Clipped & Sent", "Complete Control in Chat"],
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-agent-accent text-xs uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4 text-agent-accentBright" />
          <span>Core Capabilities & Workflow</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          SYSTEM ARCHITECTURE <span className="text-agent-accent">// HOW IT WORKS</span>
        </h2>
        <p className="mt-2 text-sm text-agent-dim max-w-3xl">
          Four synchronized operational modes powered by the Vercel AI SDK, OpenRouter LLMs, Baileys WhatsApp sockets, and Telegraf.
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {modes.map((m, idx) => {
          const Icon = m.icon;
          const isSelected = activeTab === idx;
          return (
            <button
              key={m.id}
              onClick={() => setActiveTab(idx)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? `bg-agent-card border-agent-accent shadow-amberNeon`
                  : "bg-agent-bg/80 border-agent-border/60 hover:border-agent-border text-agent-dim hover:text-white"
              }`}
            >
              <div className="flex items-center space-x-2 mb-1.5">
                <Icon className={`w-4 h-4 ${isSelected ? m.color : "text-agent-dim"}`} />
                <span className="text-xs font-bold truncate text-slate-200">{m.title.split(". ")[1]}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-black/60 border border-agent-border/50 text-agent-dim block w-fit truncate">
                {m.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Mode Detail */}
      {(() => {
        const currentMode = modes[activeTab] ?? modes[0];
        return (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="rounded-xl border border-agent-border bg-agent-card/80 p-6 space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-agent-border/60 gap-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                  <span>{currentMode.title}</span>
                </h3>
                <p className="text-xs text-agent-dim mt-1">{currentMode.desc}</p>
              </div>
              <span className="px-3 py-1 rounded bg-black/70 border border-agent-accent/40 text-agent-accentBright text-xs font-bold self-start sm:self-auto">
                {currentMode.badge}
              </span>
            </div>

            {/* Features List */}
            <div>
              <h4 className="text-xs uppercase text-slate-300 font-bold mb-3 flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-agent-accent" />
                <span>Key Subsystems & Safeguards</span>
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentMode.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-agent-bg/80 border border-agent-border/60 flex items-start space-x-2.5 text-xs text-slate-300"
                  >
                    <CheckCircle2 className="w-4 h-4 text-agent-green shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Flow Diagram */}
            <div className="pt-2">
              <h4 className="text-xs uppercase text-slate-300 font-bold mb-3 flex items-center space-x-2">
                <Cpu className="w-3.5 h-3.5 text-agent-cyan" />
                <span>Execution Lifecycle</span>
              </h4>
              <div className="flex flex-wrap items-center gap-2 text-xs">
                {currentMode.flow.map((node, i) => (
                  <React.Fragment key={i}>
                    <div className="px-3 py-2 rounded-lg bg-black/80 border border-agent-border/80 text-slate-200 font-semibold shadow-sm">
                      {node}
                    </div>
                    {i < currentMode.flow.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-agent-accent shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })()}
    </section>
  );
};
