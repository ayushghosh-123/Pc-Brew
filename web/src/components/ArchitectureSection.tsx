"use client";

import * as React from "react";
import {
  Layers,
  Terminal,
  Sparkles,
  Send,
  MessageSquare,
  CheckCircle2,
  Cpu,
  ArrowRight,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";

export const ArchitectureSection: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  const modes = [
    {
      id: "agent",
      title: "1. Agentic Terminal Mode",
      badge: "pcbrew start",
      icon: Terminal,
      desc: "Autonomous AI pairing terminal. Executes tool loops, reads files, discovers structure, stages file edits in virtual memory, and presents unified diffs for interactive user approval.",
      features: [
        "Interactive REPL with slash command palette (/config, /agent, /plan, /ask, /cmd, /sysinfo)",
        "Zero-mutation safety layer: AI writes to an in-memory staging overlay first",
        "Unified colored diff viewer before any byte touches your filesystem",
        "Autonomous directory exploration and codebase structural analysis",
      ],
      flow: [
        "Prompt Input",
        "AI Reasoning (OpenRouter)",
        "Tool Execution Loop",
        "Unified Diff Staged",
        "User Approval [y/n]",
        "Committed to Disk",
      ],
    },
    {
      id: "plan",
      title: "2. Strategic Plan Mode",
      badge: "/plan <goal>",
      icon: Layers,
      desc: "High-level goal decomposition. Breaks down complex requests into clean, ordered, toggleable execution steps with optional live web scraping via Firecrawl.",
      features: [
        "Generates clean architectural blueprints before writing code",
        "Toggle individual steps on or off in interactive terminal checklists",
        "Firecrawl integration for scraping live job portals or documentation",
        "Converts complex full-stack features into bite-sized actionable items",
      ],
      flow: [
        "Goal Defined",
        "Web/Codebase Scanned",
        "Step Decomposition",
        "Interactive Checkbox Selection",
        "Agent Dispatched per Step",
      ],
    },
    {
      id: "telegram",
      title: "3. Telegram Bot Gateway",
      badge: "pcbrew telegram",
      icon: Send,
      desc: "Remote AI assistant on your phone. Connects via Telegraf and allows you to run /ask, /agent, and /plan tasks from anywhere with Telegram inline keyboard buttons.",
      features: [
        "Cryptographic owner verification against TELEGRAM_OWNER_ID",
        "Interactive inline buttons for step toggling and agent approval",
        "Real-time progress streaming and markdown message formatting",
        "Long-running autonomous agent execution dispatched asynchronously",
      ],
      flow: [
        "Telegram /command",
        "Owner ID Check",
        "Task Worker Dispatched",
        "Inline Diff Keyboard",
        "Phone One-Tap Approval",
      ],
    },
    {
      id: "whatsapp",
      title: "4. WhatsApp Laptop Controller",
      badge: "pcbrew whatsapp",
      icon: MessageSquare,
      desc: "Turn your WhatsApp into a remote shell and AI controller for your laptop. Execute terminal commands (/cmd), check laptop battery and specs (/sysinfo), open apps (/open), and code remotely.",
      features: [
        "Baileys socket engine with persistent auth (.whatsapp_auth/)",
        "Zero-friction pairing via terminal QR code or /claim command",
        "Full laptop shell access: /cmd git status, /cmd dir, /cmd shutdown",
        "Hardware telemetry: battery, memory, CPU load, and uptime directly in chat",
        "App launcher: /open chrome, /open vs-code, /open https://github.com",
      ],
      flow: [
        "Scan QR Once",
        "Send /cmd or /agent",
        "Executed on Local Laptop",
        "Terminal Output Clipped & Sent",
        "Complete Control in Chat",
      ],
    },
  ];

  const currentMode = modes[activeTab] ?? modes[0];

  return (
    <Section id="architecture" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Core Capabilities & Workflow"
        title="System Architecture: How It Works"
        description="Four synchronized operational modes powered by the Vercel AI SDK, OpenRouter LLMs, Baileys WhatsApp sockets, and Telegraf."
      />

      {/* Mode Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {modes.map((m, idx) => {
          const Icon = m.icon;
          const isSelected = activeTab === idx;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`p-3.5 rounded-[8px] border text-left transition-all font-mono ${
                isSelected
                  ? "bg-card border-coral shadow-sm text-primary"
                  : "bg-page border-border-subtle hover:border-border-accent text-secondary hover:text-primary"
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <Icon
                  className={`h-4 w-4 ${
                    isSelected ? "text-coral" : "text-muted"
                  }`}
                />
                <span className="text-xs font-bold truncate">
                  {m.title.split(". ")[1]}
                </span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-[4px] bg-elevated border border-border-subtle text-muted block w-fit truncate">
                {m.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Selected Mode Detail Card */}
      <Card className="p-6 border-border-subtle bg-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border-subtle gap-3">
          <div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-primary">
              {currentMode.title}
            </h3>
            <p className="text-xs sm:text-sm text-secondary mt-1 max-w-2xl leading-relaxed">
              {currentMode.desc}
            </p>
          </div>
          <span className="px-3 py-1 rounded-[4px] border border-border-accent bg-accent-soft text-coral text-xs font-mono font-bold self-start sm:self-auto">
            {currentMode.badge}
          </span>
        </div>

        {/* Features List */}
        <div>
          <h4 className="text-xs font-mono uppercase text-muted font-bold mb-3 flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-coral" />
            <span>Key Subsystems & Safeguards</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {currentMode.features.map((feat, i) => (
              <div
                key={i}
                className="p-3 rounded-[6px] bg-elevated border border-border-subtle flex items-start gap-2.5 text-xs text-secondary"
              >
                <CheckCircle2 className="h-4 w-4 text-sea-green shrink-0 mt-0.5" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Execution Flow Diagram */}
        <div className="pt-2 border-t border-border-subtle/60">
          <h4 className="text-xs font-mono uppercase text-muted font-bold mb-3 flex items-center gap-2">
            <Cpu className="h-3.5 w-3.5 text-sea-green" />
            <span>Execution Lifecycle</span>
          </h4>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {currentMode.flow.map((node, i) => (
              <React.Fragment key={i}>
                <div className="px-3 py-2 rounded-[6px] bg-elevated border border-border-subtle text-primary font-medium shadow-sm">
                  {node}
                </div>
                {i < currentMode.flow.length - 1 && (
                  <ArrowRight className="h-3.5 w-3.5 text-coral shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
};
