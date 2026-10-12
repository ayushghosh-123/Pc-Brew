"use client";

import * as React from "react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Marquee } from "@/components/primitives/Marquee";
import { Card } from "@/components/primitives/Card";

interface Testimonial {
  quote: string;
  author: string;
  handle: string;
  role: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "PCBREW running on my home workstation is wild. I can text it from WhatsApp while in transit, have it pull GitHub issues, generate clean diffs, and deploy to staging without touching a keyboard.",
    author: "Alex Rivera",
    handle: "@arivera_dev",
    role: "Staff Infrastructure Engineer",
  },
  {
    quote:
      "The safe virtual memory staging is the differentiator. Other coding agents randomly corrupt local directories. PCBREW generates unified diffs and requests approval via Telegram inline keyboard.",
    author: "Elena Rostova",
    handle: "@elena_builds",
    role: "Lead Systems Architect",
  },
  {
    quote:
      "Setup took under 60 seconds with bun. It connects directly to OpenRouter models without weird proprietary gateway subscriptions. It's truly open source developer tooling.",
    author: "Devin Vance",
    handle: "@dvance_cli",
    role: "OSS Contributor",
  },
  {
    quote:
      "Having a full laptop shell bridged to WhatsApp feels like having my computer in my pocket at all times. /cmd, /sysinfo, and /open work flawlessly.",
    author: "Karthik Nair",
    handle: "@knair_tech",
    role: "Full-Stack Tech Lead",
  },
  {
    quote:
      "Finally an agent that respects local boundaries. No forced SaaS telemetry, no unexpected API lockouts. Just fast Bun runtime and complete autonomy.",
    author: "Sarah Lindqvist",
    handle: "@lindqvist_s",
    role: "Security Researcher",
  },
  {
    quote:
      "We run 3 PCBREW instances on our team Mac Minis. We assign tasks through chat channels, and it creates branches and PRs autonomously.",
    author: "Marcus Chen",
    handle: "@mchen_kernel",
    role: "Director of Engineering",
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <Section className="py-16 border-b border-border-subtle overflow-hidden">
      <SectionHeader
        eyebrow="Community & Feedback"
        title="Engineers shipping with PCBREW."
        description="See how developers use autonomous terminal agents and chat bridges to run workflows 24/7."
      />

      <div className="space-y-4">
        {/* Row 1 Marquee */}
        <Marquee speedSeconds={48}>
          {TESTIMONIALS.slice(0, 3).map((item) => (
            <Card
              key={item.handle}
              className="w-[320px] sm:w-[360px] p-4 flex flex-col justify-between border-border-subtle bg-page hover:bg-surface transition-colors flex-shrink-0"
            >
              <p className="text-secondary text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-4">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 pt-2 border-t border-border-subtle/50">
                <div className="h-7 w-7 rounded-[4px] border border-border-subtle bg-elevated flex items-center justify-center font-mono text-[11px] font-bold text-coral flex-shrink-0">
                  {item.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs font-[700] text-coral truncate">
                    {item.handle}
                  </div>
                  <div className="text-[11px] text-muted truncate">{item.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </Marquee>

        {/* Row 2 Marquee (Reverse direction) */}
        <Marquee speedSeconds={52} reverse>
          {TESTIMONIALS.slice(3, 6).map((item) => (
            <Card
              key={item.handle}
              className="w-[320px] sm:w-[360px] p-4 flex flex-col justify-between border-border-subtle bg-page hover:bg-surface transition-colors flex-shrink-0"
            >
              <p className="text-secondary text-xs sm:text-[13px] leading-relaxed mb-4 line-clamp-4">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="flex items-center gap-2.5 pt-2 border-t border-border-subtle/50">
                <div className="h-7 w-7 rounded-[4px] border border-border-subtle bg-elevated flex items-center justify-center font-mono text-[11px] font-bold text-coral flex-shrink-0">
                  {item.author.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="font-mono text-xs font-[700] text-coral truncate">
                    {item.handle}
                  </div>
                  <div className="text-[11px] text-muted truncate">{item.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </Marquee>
      </div>
    </Section>
  );
};
