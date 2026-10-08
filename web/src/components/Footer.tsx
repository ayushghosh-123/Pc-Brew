"use client";

import React from "react";
import { Terminal, ShieldCheck, Cpu, Coffee } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-agent-border/60 bg-agent-bg/95 font-mono py-12 px-4 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-agent-dim">
        <div className="flex items-center space-x-3">
          <div className="w-7 h-7 rounded bg-agent-card border border-agent-accent/40 flex items-center justify-center text-agent-accent">
            <Coffee className="w-4 h-4 text-agent-accentBright" />
          </div>
          <div>
            <p className="font-bold text-slate-200">PC BREW // AGENTIC TERMINAL & REMOTE CONTROLLER</p>
            <p className="text-[11px] text-agent-dim">
              Powered by Bun • Vercel AI SDK • Baileys • Telegraf • OpenRouter • Conf
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-6 text-[11px]">
          <span className="flex items-center space-x-1.5 text-agent-green">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Virtual Memory Safety Overlay</span>
          </span>
          <span className="flex items-center space-x-1.5 text-agent-cyan">
            <Cpu className="w-3.5 h-3.5" />
            <span>Zero Unapproved Disk Mutations</span>
          </span>
        </div>

        <div className="text-right text-[11px]">
          <p>© 2026 PC Brew. Open-source agentic workstation.</p>
        </div>
      </div>
    </footer>
  );
};
