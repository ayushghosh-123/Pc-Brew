"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Pill } from "@/components/primitives/Pill";

interface ShowcaseItem {
  source: string;
  title: string;
  summary: string;
  tags: string[];
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    source: "WORKFLOW",
    title: "10-Agent Background Fleet Running Across 2 Mac Minis",
    summary:
      "A complete PCBREW setup monitoring 3 Git repos, triaging failing CI builds on GitHub Actions, generating patch diffs, and pinging the team on Telegram for approval.",
    tags: ["multi-agent", "ci-cd", "automation"],
  },
  {
    source: "MOBILE BRIDGE",
    title: "Voice-Guided Production Debugging from WhatsApp",
    summary:
      "An on-call engineer used WhatsApp voice notes to prompt PCBREW to inspect server logs, isolate a memory leak in a Docker container, restart the service, and commit a hotfix.",
    tags: ["whatsapp", "production", "devops"],
  },
  {
    source: "LOCAL OS",
    title: "Personal Coding Workstation with Scheduled Crons",
    summary:
      "PCBREW timeblocks tasks, runs overnight repo linters, generates weekly changelogs from git history, and organizes scratch experiments into documented markdown notes.",
    tags: ["crons", "personal-os", "productivity"],
  },
  {
    source: "AGENTIC BOT",
    title: "Telegram Bot Controlling Laptop Files & CLI Terminal",
    summary:
      "One chat thread controlling VS Code workspaces, reading local databases, launching browser test scripts, and sending screenshot proofs back to the user.",
    tags: ["telegram", "browser", "shell"],
  },
];

export const ShowcaseSection: React.FC = () => {
  return (
    <Section id="showcase" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Community Builds"
        title="What developers are automating."
        description="Real workflows and multi-agent systems powered by PCBREW in production."
        actionText="View showcase"
        actionHref="#showcase"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHOWCASE_ITEMS.map((item) => (
          <Card
            key={item.title}
            interactive
            className="p-6 flex flex-col justify-between border-border-subtle bg-page hover:bg-surface group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] font-bold text-coral uppercase tracking-wider">
                  {item.source}
                </span>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-muted group-hover:text-primary transition-colors">
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>

              <h3 className="font-display font-[700] text-base sm:text-lg text-primary mb-2.5 leading-snug">
                {item.title}
              </h3>

              <p className="text-secondary text-xs sm:text-[13px] leading-relaxed mb-6">
                {item.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-4 border-t border-border-subtle/50 mt-auto">
              {item.tags.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
};
