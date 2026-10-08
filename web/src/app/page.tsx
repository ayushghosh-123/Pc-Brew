"use client";

import React, { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { TerminalSimulator } from "@/components/TerminalSimulator";
import { GlobalSetupGuide } from "@/components/GlobalSetupGuide";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { TelegramGuide } from "@/components/TelegramGuide";
import { WhatsAppGuide } from "@/components/WhatsAppGuide";
import { EnvConfigurator } from "@/components/EnvConfigurator";
import { CommandsCheatsheet } from "@/components/CommandsCheatsheet";
import { Footer } from "@/components/Footer";
import { Terminal, Copy, Check, Coffee } from "lucide-react";
import gsap from "gsap";

export default function Home() {
  const heroTitleRef = useRef<HTMLHeadingElement>(null);
  const heroBadgeRef = useRef<HTMLDivElement>(null);
  const [copiedLink, setCopiedLink] = React.useState(false);

  useEffect(() => {
    // GSAP intro animation
    const ctx = gsap.context(() => {
      if (heroBadgeRef.current) {
        gsap.fromTo(
          heroBadgeRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        );
      }
      if (heroTitleRef.current) {
        gsap.fromTo(
          heroTitleRef.current,
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: "power3.out" }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  const copyQuickStart = () => {
    navigator.clipboard.writeText("bun install && npm link --force && pcbrew setup");
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="min-h-screen bg-agent-bg text-slate-100 flex flex-col font-mono selection:bg-agent-accent selection:text-black">
      {/* Background Matrix Grid Pattern */}
      <div className="fixed inset-0 matrix-grid opacity-30 pointer-events-none z-0" />

      {/* Top Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          {/* Status Badge */}
          <div
            ref={heroBadgeRef}
            className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-agent-card border border-agent-accent/40 text-agent-accent text-xs font-semibold mb-6 shadow-amberNeon"
          >
            <Coffee className="w-3.5 h-3.5 text-agent-accentBright animate-pulse" />
            <span>PC BREW // AUTONOMOUS AGENTIC TERMINAL v1.0.0</span>
          </div>

          {/* Headline */}
          <h1
            ref={heroTitleRef}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-mono text-white max-w-5xl mx-auto leading-tight"
          >
            PC BREW: AGENTIC TERMINAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-agent-accent via-amber-400 to-agent-cyan">
              & REMOTE LAPTOP OS
            </span>
          </h1>

          <p className="mt-6 text-sm sm:text-base text-agent-dim max-w-3xl mx-auto leading-relaxed">
            A developer CLI combining <strong>Bun</strong>, <strong>Vercel AI SDK</strong>, <strong>OpenRouter</strong>, and <strong>Baileys WhatsApp</strong>. Run autonomous coding agents locally with safe staged unified diffs, or control your entire laptop remotely from <strong>WhatsApp</strong> and <strong>Telegram</strong>.
          </p>

          {/* Quick Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono">
            <a
              href="#simulator"
              className="px-5 py-3 rounded-lg bg-agent-accent hover:bg-agent-accentBright text-black font-bold flex items-center space-x-2 transition-all shadow-amberNeon"
            >
              <Terminal className="w-4 h-4 fill-current" />
              <span>Launch Live Terminal Simulator</span>
            </a>

            <button
              onClick={copyQuickStart}
              className="px-5 py-3 rounded-lg bg-agent-card hover:bg-agent-card/80 border border-agent-border hover:border-agent-cyan text-slate-200 flex items-center space-x-2 transition-all"
            >
              <span className="text-agent-cyan">$</span>
              <span>pcbrew setup</span>
              {copiedLink ? (
                <Check className="w-4 h-4 text-agent-green ml-1" />
              ) : (
                <Copy className="w-4 h-4 text-agent-dim ml-1" />
              )}
            </button>
          </div>

          {/* Stats Badges */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-agent-card/80 border border-agent-border">
              <div className="text-xs text-agent-dim">Config Storage</div>
              <div className="text-lg font-bold text-agent-accentBright mt-1">Global conf Store</div>
              <p className="text-[10px] text-agent-dim mt-0.5">Step-by-step API setup</p>
            </div>
            <div className="p-4 rounded-xl bg-agent-card/80 border border-agent-border">
              <div className="text-xs text-agent-dim">WhatsApp Bridge</div>
              <div className="text-lg font-bold text-emerald-400 mt-1">Full Laptop Shell</div>
              <p className="text-[10px] text-agent-dim mt-0.5">/cmd, /sysinfo, /open apps</p>
            </div>
            <div className="p-4 rounded-xl bg-agent-card/80 border border-agent-border">
              <div className="text-xs text-agent-dim">Telegram Integration</div>
              <div className="text-lg font-bold text-sky-400 mt-1">Inline UI Keyboards</div>
              <p className="text-[10px] text-agent-dim mt-0.5">Diff approvals & plan toggles</p>
            </div>
            <div className="p-4 rounded-xl bg-agent-card/80 border border-agent-border">
              <div className="text-xs text-agent-dim">Global Portability</div>
              <div className="text-lg font-bold text-agent-green mt-1">Bun + Node.js</div>
              <p className="text-[10px] text-agent-dim mt-0.5">Windows • macOS • Linux</p>
            </div>
          </div>
        </section>

        {/* 1. Terminal Simulator */}
        <TerminalSimulator />

        {/* 2. Global Setup Guide */}
        <GlobalSetupGuide />

        {/* 3. System Architecture */}
        <ArchitectureSection />

        {/* 4. Telegram Guide */}
        <TelegramGuide />

        {/* 5. WhatsApp Guide */}
        <WhatsAppGuide />

        {/* 6. Environment Generator */}
        <EnvConfigurator />

        {/* 7. Commands Matrix */}
        <CommandsCheatsheet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
