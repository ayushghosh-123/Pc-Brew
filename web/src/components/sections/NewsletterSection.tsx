"use client";

import * as React from "react";
import { Send, Check, Shield } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail("");
      }, 3500);
    }
  };

  return (
    <Section className="py-16 border-b border-border-subtle">
      {/* Newsletter Signup Card */}
      <div className="rounded-[8px] border border-border-subtle bg-card p-6 sm:p-10 mb-16">
        <div className="max-w-2xl mx-auto text-center">
          <Eyebrow className="mb-2">Newsletter</Eyebrow>
          <h2 className="font-display font-[750] text-2xl sm:text-3xl text-primary mb-3">
            Stay in the loop.
          </h2>
          <p className="text-secondary text-sm mb-6 max-w-lg mx-auto">
            Get monthly technical releases on new model integrations, terminal tools, security sandboxing, and community skills. No spam.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@domain.com"
              required
              aria-label="Email address for newsletter"
              className="bg-elevated border-border-subtle text-primary"
            />
            <Button type="submit" variant="primary" className="whitespace-nowrap flex-shrink-0">
              {subscribed ? (
                <span className="flex items-center gap-1.5 text-on-accent">
                  <Check className="h-4 w-4" />
                  <span>Subscribed!</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-on-accent">
                  <Send className="h-4 w-4" />
                  <span>Subscribe</span>
                </span>
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Foundation & Governance Notice */}
      <div className="mb-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Eyebrow className="mb-2">Governance</Eyebrow>
          <h3 className="font-display font-bold text-lg text-primary mb-2">
            Independent Stewardship
          </h3>
          <p className="text-muted text-xs leading-relaxed">
            PCBREW is an independent open-source initiative. The core repository is MIT licensed, forever free, with zero proprietary enterprise upsells.
          </p>
        </div>

        <div>
          <Eyebrow className="mb-2">Privacy & Telemetry</Eyebrow>
          <h3 className="font-display font-bold text-lg text-primary mb-2">
            Zero Uninvited Tracking
          </h3>
          <p className="text-muted text-xs leading-relaxed">
            By default, installs send nothing to remote servers. All LLM calls route strictly to your configured API endpoints. No analytics, no prompt harvesting.
          </p>
        </div>

        <div>
          <Eyebrow className="mb-2">Extensibility</Eyebrow>
          <h3 className="font-display font-bold text-lg text-primary mb-2">
            Hackable by Design
          </h3>
          <p className="text-muted text-xs leading-relaxed">
            Built using standard Bun scripts, modular TypeScript classes, and clean CLI flags. Add your own tool plugins or custom chat bridges in minutes.
          </p>
        </div>
      </div>

      {/* Sponsors & Backers Row */}
      <div className="text-center pt-8 border-t border-border-subtle/60">
        <Eyebrow className="mb-4">Ecosystem Backers & Donors</Eyebrow>
        <p className="text-muted text-xs max-w-xl mx-auto mb-6">
          Supported by independent contributors, developer donors, and open source infrastructure partners.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-muted font-mono text-xs opacity-75">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border-subtle bg-elevated">
            <span className="font-bold text-primary">BUN</span>
            <span>RUNTIME</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border-subtle bg-elevated">
            <span className="font-bold text-primary">VERCEL</span>
            <span>AI SDK</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border-subtle bg-elevated">
            <span className="font-bold text-primary">OPENROUTER</span>
            <span>GATEWAY</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-[4px] border border-border-subtle bg-elevated">
            <span className="font-bold text-primary">BAILEYS</span>
            <span>SOCKET</span>
          </div>
        </div>
      </div>
    </Section>
  );
};
