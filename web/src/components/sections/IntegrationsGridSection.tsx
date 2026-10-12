"use client";

import * as React from "react";
import {
  MessageSquare,
  Send,
  Bot,
  Cpu,
  Github,
  Terminal,
  Globe,
  Radio,
  Sparkles,
  Layers,
  Code2,
  HardDrive,
  Workflow,
  Zap,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";

interface IntegrationTile {
  name: string;
  kind: "Channel" | "Runtime" | "Model" | "Code" | "Gateway" | "Web";
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}

const INTEGRATIONS: IntegrationTile[] = [
  { name: "WhatsApp", kind: "Channel", desc: "Remote laptop shell & chat controller", icon: MessageSquare },
  { name: "Telegram", kind: "Channel", desc: "Inline keyboards & diff approval prompts", icon: Send },
  { name: "Discord", kind: "Channel", desc: "Team server bot & channel dispatcher", icon: Radio },
  { name: "Bun Runtime", kind: "Runtime", desc: "Sub-millisecond process execution", icon: Zap },
  { name: "Node.js", kind: "Runtime", desc: "Cross-platform daemon & process manager", icon: Cpu },
  { name: "Claude 3.5", kind: "Model", desc: "State-of-the-art coding and agent reasoning", icon: Sparkles },
  { name: "GPT-4o", kind: "Model", desc: "Multimodal instruction following & review", icon: Bot },
  { name: "DeepSeek", kind: "Model", desc: "High efficiency code generation", icon: Code2 },
  { name: "OpenRouter", kind: "Gateway", desc: "Access 100+ models with one unified API key", icon: Workflow },
  { name: "GitHub", kind: "Code", desc: "Branches, commits, unified diffs & PRs", icon: Github },
  { name: "Vercel AI SDK", kind: "Gateway", desc: "Streaming tools & structured output parsing", icon: Layers },
  { name: "Baileys", kind: "Channel", desc: "Multi-device WhatsApp socket bridge", icon: MessageSquare },
  { name: "Telegraf", kind: "Channel", desc: "Telegram bot middleware with session state", icon: Send },
  { name: "Playwright", kind: "Web", desc: "Headless web browsing & DOM automation", icon: Globe },
  { name: "Ollama", kind: "Model", desc: "100% offline local model execution", icon: HardDrive },
];

export const IntegrationsGridSection: React.FC = () => {
  const [selected, setSelected] = React.useState<string | null>(null);

  return (
    <Section id="integrations" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Ecosystem"
        title="Works with the tools you already rely on."
        description="Connect your chat channels, local model runtimes, and developer APIs without walled gardens."
        actionText="Browse documentation"
        actionHref="#docs"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {INTEGRATIONS.map((tile) => {
          const Icon = tile.icon;
          const isSelected = selected === tile.name;

          return (
            <Card
              key={tile.name}
              interactive
              onClick={() => setSelected(isSelected ? null : tile.name)}
              className={`p-4 flex flex-col justify-between min-h-[140px] border-border-subtle bg-page hover:bg-surface text-center items-center cursor-pointer transition-all ${
                isSelected ? "border-coral bg-surface shadow-md" : ""
              }`}
            >
              <span className="font-mono text-[10px] font-bold text-coral uppercase tracking-wider self-start">
                {tile.kind}
              </span>

              <div className="h-9 w-9 rounded-[6px] border border-border-subtle bg-elevated flex items-center justify-center text-muted group-hover:text-coral transition-colors my-2">
                <Icon className="h-4 w-4" />
              </div>

              <div className="w-full">
                <div className="font-display text-sm font-bold text-primary truncate">
                  {tile.name}
                </div>
                <div className="text-[11px] text-muted line-clamp-1 mt-0.5">
                  {tile.desc}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
