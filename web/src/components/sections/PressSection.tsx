"use client";

import * as React from "react";
import {
  ExternalLink,
  MessageSquare,
  FileText,
  Github,
  Compass,
} from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";

interface PressItem {
  outlet: string;
  date: string;
  title: string;
  summary: string;
  author: string;
}

const PRESS_ITEMS: PressItem[] = [
  {
    outlet: "Hacker News Frontpage",
    date: "October 2026",
    title: "PCBREW: The Open Agentic Terminal That Never Modifies Code Without Permission",
    summary:
      "A developer CLI built on Bun that solves the dangerous hallucinatory writes problem with virtual unified staging buffers and mobile chat approvals.",
    author: "HN Staff",
  },
  {
    outlet: "TypeScript Weekly",
    date: "September 2026",
    title: "How PCBREW Types Complex Multi-Platform Terminal and Socket Events",
    summary:
      "A technical walkthrough of strict TypeScript event streams connecting WhatsApp Baileys WebSockets to Vercel AI SDK function calling.",
    author: "TS Weekly Editor",
  },
  {
    outlet: "DevTools Digest",
    date: "September 2026",
    title: "The Return of Native Local Developer Sovereignty",
    summary:
      "Why engineers are migrating away from locked SaaS coding clouds toward lightweight open-source agent daemons running directly on local machines.",
    author: "Elena Rostova",
  },
  {
    outlet: "CLI Tools Monthly",
    date: "August 2026",
    title: "Top 10 Agentic Terminal Environments for Senior Pair-Programming",
    summary:
      "PCBREW earns top honors for its instant setup, cross-platform compatibility, and zero-telemetry architecture.",
    author: "Marcus Ray",
  },
];

export const PressSection: React.FC = () => {
  return (
    <Section id="press" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Press & Coverage"
        title="Featured across developer media."
        description="Articles and independent engineering reviews analyzing PCBREW's architecture and performance."
        actionText="View all press"
        actionHref="#press"
      />

      {/* 4 Press Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRESS_ITEMS.map((item) => (
          <Card
            key={item.title}
            interactive
            className="p-6 flex flex-col justify-between border-border-subtle bg-page hover:bg-surface"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2.5">
                <span className="font-mono text-[11px] font-bold text-coral uppercase tracking-wider">
                  {item.outlet}
                </span>
                <span className="font-mono text-xs text-muted">{item.date}</span>
              </div>

              <h3 className="font-display font-[700] text-base sm:text-lg text-primary mb-2 leading-snug">
                {item.title}
              </h3>

              <p className="text-secondary text-xs sm:text-[13px] leading-relaxed mb-4">
                {item.summary}
              </p>
            </div>

            <div className="pt-3 border-t border-border-subtle/50 flex items-center justify-between text-xs font-mono text-muted mt-auto">
              <span>By {item.author}</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </div>
          </Card>
        ))}
      </div>

      {/* 4-Link Row */}
      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-[8px] border border-border-subtle bg-card hover:bg-surface hover:border-coral transition-colors flex items-center gap-3 font-mono text-xs text-secondary hover:text-primary"
        >
          <MessageSquare className="h-4 w-4 text-coral flex-shrink-0" />
          <div>
            <div className="font-bold text-primary">Discord</div>
            <div className="text-[10px] text-muted">Join community</div>
          </div>
        </a>

        <a
          href="#docs"
          className="p-4 rounded-[8px] border border-border-subtle bg-card hover:bg-surface hover:border-coral transition-colors flex items-center gap-3 font-mono text-xs text-secondary hover:text-primary"
        >
          <FileText className="h-4 w-4 text-coral flex-shrink-0" />
          <div>
            <div className="font-bold text-primary">Documentation</div>
            <div className="text-[10px] text-muted">Read guides</div>
          </div>
        </a>

        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-[8px] border border-border-subtle bg-card hover:bg-surface hover:border-coral transition-colors flex items-center gap-3 font-mono text-xs text-secondary hover:text-primary"
        >
          <Github className="h-4 w-4 text-coral flex-shrink-0" />
          <div>
            <div className="font-bold text-primary">GitHub</div>
            <div className="text-[10px] text-muted">Source code</div>
          </div>
        </a>

        <a
          href="#showcase"
          className="p-4 rounded-[8px] border border-border-subtle bg-card hover:bg-surface hover:border-coral transition-colors flex items-center gap-3 font-mono text-xs text-secondary hover:text-primary"
        >
          <Compass className="h-4 w-4 text-coral flex-shrink-0" />
          <div>
            <div className="font-bold text-primary">Ecosystem</div>
            <div className="text-[10px] text-muted">Explore plugins</div>
          </div>
        </a>
      </div>
    </Section>
  );
};
