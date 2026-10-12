"use client";

import * as React from "react";
import { ArrowRight, BookOpen, GitBranch, Shield } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";

export const BlogHighlightsSection: React.FC = () => {
  return (
    <Section id="blog" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Latest Updates"
        title="Engineering notes with docs-level depth."
        description="Deep dives into virtual memory isolation, socket-level WhatsApp integration, and multi-agent coordination."
        actionText="Read all articles"
        actionHref="#blog"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 1. Featured Card (spans 1 col on mobile, 2 cols on desktop) */}
        <Card
          interactive
          className="lg:col-span-2 p-6 flex flex-col justify-between border-border-subtle bg-page hover:bg-surface"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center px-2 py-0.5 rounded-[4px] border border-border-accent bg-accent-soft font-mono text-[11px] font-bold text-coral uppercase tracking-wider">
                Featured
              </span>
              <span className="font-mono text-xs text-muted">October 8, 2026</span>
            </div>

            <h3 className="font-display font-[700] text-xl sm:text-2xl text-primary mb-3 leading-snug">
              Designing Zero-Disk Mutation Staging for Autonomous Terminal Coding
            </h3>

            <p className="text-secondary text-sm leading-relaxed mb-6">
              How PCBREW intercepts file operations through an in-memory staging buffer before disk writes are confirmed.
              Learn how we generate unified git diffs in real time, run automated syntax and linter checks in sandboxes,
              and protect local repos from unpredictable LLM writes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border-subtle/50 mt-auto">
            <div className="flex flex-wrap gap-2">
              <Pill>security</Pill>
              <Pill>virtual-fs</Pill>
              <Pill>architecture</Pill>
            </div>
            <span className="inline-flex items-center gap-1 font-mono text-xs text-coral font-bold">
              <span>Read article</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </Card>

        {/* 2 & 3. Two smaller cards */}
        <div className="flex flex-col gap-4">
          <Card
            interactive
            className="p-5 flex flex-col justify-between border-border-subtle bg-page hover:bg-surface flex-1"
          >
            <div>
              <div className="font-mono text-xs text-coral mb-2">September 29, 2026</div>
              <h4 className="font-display font-[700] text-base text-primary mb-2 leading-tight">
                Controlling Laptops Over Mobile: The Baileys WhatsApp Bridge
              </h4>
              <p className="text-muted text-xs leading-relaxed line-clamp-3">
                Connecting multi-device WhatsApp Web sockets without headless browser overhead. Secure QR auth, persistent sessions, and shell security boundaries.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-subtle/50">
              <Pill>whatsapp</Pill>
              <Pill>remote-os</Pill>
            </div>
          </Card>

          <Card
            interactive
            className="p-5 flex flex-col justify-between border-border-subtle bg-page hover:bg-surface flex-1"
          >
            <div>
              <div className="font-mono text-xs text-coral mb-2">September 22, 2026</div>
              <h4 className="font-display font-[700] text-base text-primary mb-2 leading-tight">
                Why We Chose Bun Runtime for Agentic Tool Execution
              </h4>
              <p className="text-muted text-xs leading-relaxed line-clamp-3">
                Benchmarking process spawn overhead, file read latency, and native TypeScript compilation speeds in CLI agent orchestration.
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border-subtle/50">
              <Pill>bun</Pill>
              <Pill>benchmarks</Pill>
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};
