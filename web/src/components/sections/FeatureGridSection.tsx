"use client";

import * as React from "react";
import {
  Laptop,
  MessageSquare,
  Send,
  ShieldCheck,
  Cpu,
  Terminal,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";

interface FeatureItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: Laptop,
    title: "Runs on Your Machine",
    description:
      "Native on macOS, Windows, or Linux. Connect hosted, OpenRouter, or local Ollama models. Your code and files never leave your workstation.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Remote Shell",
    description:
      "Execute terminal commands, open applications, and monitor build outputs straight from your phone over WhatsApp. Zero port forwarding required.",
  },
  {
    icon: Send,
    title: "Telegram Bot Gateway",
    description:
      "Review staged code diffs and approve terminal plans using intuitive Telegram inline keyboards and real-time status updates.",
  },
  {
    icon: ShieldCheck,
    title: "Safe Virtual Staging",
    description:
      "Every generated edit is held in memory as a unified diff. Inspect before applying; never worry about an agent corrupting your project files.",
  },
  {
    icon: Cpu,
    title: "OpenRouter & Model Freedom",
    description:
      "Seamlessly switch between Claude 3.5 Sonnet, GPT-4o, DeepSeek-V3, or local Llama instances without rewriting a single agent tool.",
  },
  {
    icon: Terminal,
    title: "Single Binary CLI Suite",
    description:
      "Installed globally in one step. Run interactive terminals, headless background daemons, or multi-agent queues with clean CLI flags.",
  },
];

export const FeatureGridSection: React.FC = () => {
  return (
    <Section id="features" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="What It Does"
        title="Built for developers who value sovereignty."
        description="Every capability designed from scratch to keep you in control of your tools, your data, and your code."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {FEATURES.map((item) => {
          const Icon = item.icon;
          return (
            <Card
              key={item.title}
              interactive
              className="p-6 flex flex-col justify-start border-border-subtle bg-page hover:bg-surface group"
            >
              <div className="h-10 w-10 rounded-[6px] border border-border-subtle bg-elevated flex items-center justify-center text-muted group-hover:text-coral group-hover:border-border-accent transition-colors mb-4">
                <Icon className="h-5 w-5" />
              </div>

              <h3 className="font-mono text-xs font-[700] uppercase tracking-wider text-coral mb-2">
                {item.title}
              </h3>

              <p className="text-secondary text-xs sm:text-[13px] leading-relaxed">
                {item.description}
              </p>
            </Card>
          );
        })}
      </div>
    </Section>
  );
};
