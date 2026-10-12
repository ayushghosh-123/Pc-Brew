"use client";

import * as React from "react";
import { Coffee, Terminal, Cpu, ShieldCheck } from "lucide-react";
import { Section } from "@/components/primitives/Section";

export const FooterSection: React.FC = () => {
  return (
    <footer className="w-full bg-page border-t border-border-subtle py-14 transition-colors">
      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 font-display font-[700] text-base text-primary">
              <div className="flex h-6 w-6 items-center justify-center rounded-[4px] bg-accent-soft text-coral border border-border-accent">
                <Coffee className="h-3.5 w-3.5" />
              </div>
              <span>PCBREW</span>
            </div>
            <p className="text-muted text-xs leading-relaxed max-w-xs">
              Autonomous agentic coding terminal & remote laptop controller running 100% on your local machine.
            </p>
            <div className="flex items-center gap-2 pt-1 font-mono text-[11px] text-coral">
              <Terminal className="h-3.5 w-3.5" />
              <span>pcbrew start | wakeup</span>
            </div>
          </div>

          {/* Col 1: Terminal & Setup */}
          <div>
            <h4 className="font-mono text-xs font-[700] uppercase text-coral mb-3 tracking-wider">
              Terminal
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li>
                <a href="#quickstart" className="hover:text-primary transition-colors">
                  Quick Start & Link
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-primary transition-colors">
                  Interactive Simulator
                </a>
              </li>
              <li>
                <a href="#setup" className="hover:text-primary transition-colors">
                  Multi-System Setup
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Core Capabilities
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Gateways & Tools */}
          <div>
            <h4 className="font-mono text-xs font-[700] uppercase text-coral mb-3 tracking-wider">
              Gateways
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li>
                <a href="#whatsapp" className="hover:text-primary transition-colors">
                  WhatsApp Laptop Controller
                </a>
              </li>
              <li>
                <a href="#telegram" className="hover:text-primary transition-colors">
                  Telegram Review Bot
                </a>
              </li>
              <li>
                <a href="#env-config" className="hover:text-primary transition-colors">
                  Environment Configurator
                </a>
              </li>
              <li>
                <a href="#cheatsheet" className="hover:text-primary transition-colors">
                  Commands Matrix
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Architecture */}
          <div>
            <h4 className="font-mono text-xs font-[700] uppercase text-coral mb-3 tracking-wider">
              Architecture
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li>
                <a href="#architecture" className="hover:text-primary transition-colors">
                  LangGraph State Machine
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-primary transition-colors">
                  In-Memory Virtual Staging
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-primary transition-colors">
                  Multi-Model SDK Layer
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-primary transition-colors">
                  Unified Diff Approvals
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>© 2026 PCBREW. Personal workstation automation & agentic runtime.</p>
          <div className="flex items-center gap-4">
            <span className="text-secondary">Local Execution</span>
            <span>·</span>
            <span className="text-sea-green">Zero Telemetry</span>
            <span>·</span>
            <span className="text-coral">Private Keys</span>
          </div>
        </div>
      </Section>
    </footer>
  );
};
