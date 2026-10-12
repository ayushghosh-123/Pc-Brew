"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Terminal, ArrowRight, Cpu } from "lucide-react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/ui/button";
import { AsciiTorus, DEFAULT_ASCII_TORUS } from "@/components/primitives/AsciiTorus";

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const ledeRef = useRef<HTMLParagraphElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect reduced motion settings
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Staggered reveal for Hero typography, CTAs, and stat cards
      tl.fromTo(
        eyebrowRef.current,
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          headingRef.current,
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9 },
          "-=0.5"
        )
        .fromTo(
          ledeRef.current,
          { y: 18, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          subtextRef.current,
          { y: 14, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          ctaRef.current?.children ? Array.from(ctaRef.current.children) : [],
          { y: 18, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          statsRef.current?.children ? Array.from(statsRef.current.children) : [],
          { y: 22, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7, stagger: 0.08 },
          "-=0.3"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={heroRef}
      className="relative w-full border-b border-border-subtle overflow-hidden text-center pt-8 pb-16 sm:pb-24"
    >
      {/* Background Matrix/Subtle Grid Pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25 z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(var(--chart-line) 1px, transparent 1.5px)",
          backgroundSize: "26px 26px",
          maskImage: "linear-gradient(black, transparent 90%)",
          WebkitMaskImage: "linear-gradient(black, transparent 90%)",
        }}
      />

      {/* Animated 3D ASCII-art Hero Torus */}
      <div
        aria-hidden="true"
        className="relative z-10 flex justify-center items-center h-[min(30vh,280px)] sm:h-[min(34vh,320px)] overflow-hidden pointer-events-none select-none [mask-image:linear-gradient(transparent_0%,black_30%_80%,transparent_98%)] [WebkitMaskImage:linear-gradient(transparent_0%,black_30%_80%,transparent_98%)]"
      >
        <AsciiTorus
          staticArt={DEFAULT_ASCII_TORUS}
          interactive={true}
          autoRotate={true}
          showControls={true}
          className="flex-shrink-0"
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-content mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 flex flex-col items-center">
        {/* Eyebrow */}
        <div ref={eyebrowRef}>
          <Eyebrow className="mb-4">
            Open Source · Autonomous Coding Terminal · Remote Laptop Controller
          </Eyebrow>
        </div>

        {/* H1 Title */}
        <h1
          ref={headingRef}
          className="font-mono font-[800] text-coral tracking-normal text-[clamp(2rem,11vw,2.75rem)] sm:text-[clamp(2.25rem,4.25vw,3.5rem)] leading-[1.08] text-center [text-wrap:balance] max-w-[66rem] mx-auto"
        >
          The Autonomous Terminal <br className="hidden sm:inline" />
          that <em className="font-serif italic font-[400] text-primary">really</em> executes code.
        </h1>

        {/* Lede */}
        <p
          ref={ledeRef}
          className="mt-5 text-[1.0625rem] leading-[1.6] text-secondary max-w-[42rem] mx-auto [text-wrap:pretty]"
        >
          Executes tasks locally with safe unified diffs, runs commands, and controls your laptop remotely from WhatsApp and Telegram.
          No cloud vendor lock-in. 100% on your machine.
        </p>

        {/* Ownership Subtext */}
        <p
          ref={subtextRef}
          className="mt-3 text-xs sm:text-sm text-muted italic max-w-[42rem] mx-auto"
        >
          No mandatory hosted tier. No telemetry lock. MIT licensed.
          <br />
          <span className="font-mono font-bold not-italic text-coral text-[12px] tracking-wider uppercase mt-1 inline-block">
            Your machine. Your API keys. Your local files. Your rules.
          </span>
        </p>

        {/* Three CTAs: Primary, Secondary, Ghost */}
        <div
          ref={ctaRef}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Button asChild variant="primary" size="lg">
            <a href="#quickstart" className="inline-flex items-center gap-2">
              <Terminal className="h-4 w-4" />
              <span>Get Started</span>
            </a>
          </Button>

          <Button asChild variant="secondary" size="lg">
            <a href="#simulator" className="inline-flex items-center gap-2">
              <Cpu className="h-4 w-4" />
              <span>Live Terminal Simulator</span>
            </a>
          </Button>

          <Button asChild variant="ghost" size="lg">
            <a href="#setup" className="inline-flex items-center gap-2 text-primary hover:text-coral">
              <span>View Architecture & Docs</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>

        {/* 4 Stat Cards */}
        <div
          ref={statsRef}
          className="mt-12 w-full max-w-[50rem] grid grid-cols-2 md:grid-cols-4 gap-3 text-left"
        >
          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm hover:border-border-accent transition-colors">
            <div className="text-[11px] font-mono text-muted uppercase">Engine</div>
            <div className="text-base font-bold text-coral mt-0.5">Bun + Node.js</div>
            <p className="text-[11px] text-secondary mt-0.5">Fast native execution</p>
          </div>

          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm hover:border-border-accent transition-colors">
            <div className="text-[11px] font-mono text-muted uppercase">WhatsApp Gateway</div>
            <div className="text-base font-bold text-sea-green mt-0.5">Baileys Socket</div>
            <p className="text-[11px] text-secondary mt-0.5">Full laptop control</p>
          </div>

          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm hover:border-border-accent transition-colors">
            <div className="text-[11px] font-mono text-muted uppercase">Telegram Bot</div>
            <div className="text-base font-bold text-primary mt-0.5">Telegraf Inline</div>
            <p className="text-[11px] text-secondary mt-0.5">Diff review & buttons</p>
          </div>

          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm hover:border-border-accent transition-colors">
            <div className="text-[11px] font-mono text-muted uppercase">Safety Layer</div>
            <div className="text-base font-bold text-status-success mt-0.5">Virtual Staging</div>
            <p className="text-[11px] text-secondary mt-0.5">Zero unapproved writes</p>
          </div>
        </div>
      </div>
    </header>
  );
};
