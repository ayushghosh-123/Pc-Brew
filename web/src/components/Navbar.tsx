"use client";

import React, { useState } from "react";
import { Terminal, Shield, Send, MessageSquare, Cpu, Copy, Check, Coffee } from "lucide-react";

export const Navbar: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyInstall = () => {
    navigator.clipboard.writeText("npm link --force");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-agent-border/80 bg-agent-bg/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-md bg-agent-card border border-agent-accent/50 flex items-center justify-center text-agent-accent shadow-amberNeon">
            <Coffee className="w-5 h-5 text-agent-accentBright" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold tracking-wider text-agent-accentBright text-lg font-mono">
                PCBREW
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-agent-green flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-agent-green animate-ping" />
                <span>ONLINE</span>
              </span>
            </div>
            <p className="text-[11px] text-agent-dim font-mono tracking-tight hidden sm:block">
              AGENTIC TERMINAL // TELEGRAM & WHATSAPP CONTROLLER
            </p>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-slate-300">
          <a href="#simulator" className="hover:text-agent-cyan transition-colors flex items-center space-x-1">
            <Terminal className="w-3.5 h-3.5 text-agent-cyan" />
            <span>Terminal</span>
          </a>
          <a href="#setup" className="hover:text-agent-accentBright transition-colors flex items-center space-x-1">
            <Cpu className="w-3.5 h-3.5 text-agent-accent" />
            <span>Setup & Bun</span>
          </a>
          <a href="#telegram" className="hover:text-sky-400 transition-colors flex items-center space-x-1">
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>Telegram</span>
          </a>
          <a href="#whatsapp" className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp</span>
          </a>
          <a href="#env-config" className="hover:text-agent-purple transition-colors flex items-center space-x-1">
            <Shield className="w-3.5 h-3.5 text-agent-purple" />
            <span>Config</span>
          </a>
        </nav>

        {/* Global Access Quick Action */}
        <div className="flex items-center space-x-3 font-mono">
          <button
            onClick={copyInstall}
            className="flex items-center space-x-2 px-3 py-1.5 rounded bg-agent-card hover:bg-agent-card/80 border border-agent-border hover:border-agent-accent/50 text-xs text-slate-200 transition-all shadow-sm"
            title="Copy command to install pcbrew globally"
          >
            <span className="text-agent-accent">$</span>
            <span className="text-slate-300 font-bold">pcbrew</span>
            {copied ? (
              <Check className="w-3.5 h-3.5 text-agent-green" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-agent-dim" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
