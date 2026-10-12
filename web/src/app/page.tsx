"use client";

import * as React from "react";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuickStartSection } from "@/components/sections/QuickStartSection";
import { GlobalSetupGuide } from "@/components/GlobalSetupGuide";
import { TerminalSimulator } from "@/components/TerminalSimulator";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { IntegrationsGridSection } from "@/components/sections/IntegrationsGridSection";
import { TelegramGuide } from "@/components/TelegramGuide";
import { WhatsAppGuide } from "@/components/WhatsAppGuide";
import { EnvConfigurator } from "@/components/EnvConfigurator";
import { CommandsCheatsheet } from "@/components/CommandsCheatsheet";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-page text-primary flex flex-col font-sans selection:bg-selection selection:text-primary">
      {/* 1. Header with logo, workstation nav, theme toggle, and mobile Sheet nav */}
      <Header />

      {/* Main Workstation Sections */}
      <main className="flex-1 w-full">
        {/* 2. Hero: 3D ASCII-art Torus with GSAP animations & workstation copy */}
        <HeroSection />

        {/* 3. Quick Start: Real CLI workflow tabs (link, setup, start, wakeup, whatsapp, telegram) */}
        <QuickStartSection />

        {/* 4. Global Multi-System Setup Guide (Windows, macOS, Linux, Binary compilation) */}
        <GlobalSetupGuide />

        {/* 5. Live Interactive Agentic Terminal Simulator */}
        <TerminalSimulator />

        {/* 6. Feature Grid: 6 core capabilities */}
        <FeatureGridSection />

        {/* 7. Architecture & StateGraph Multi-Mode Execution Lifecycle */}
        <ArchitectureSection />

        {/* 8. Integrations Grid: 15 ecosystem runtimes, models & socket bridges */}
        <IntegrationsGridSection />

        {/* 9. Telegram Remote Review Gateway Guide */}
        <TelegramGuide />

        {/* 10. WhatsApp Remote Laptop Controller Guide */}
        <WhatsAppGuide />

        {/* 11. Multi-Provider Environment Configurator & Conf Storage */}
        <EnvConfigurator />

        {/* 12. Unified Commands & Slash Keyboards Matrix */}
        <CommandsCheatsheet />
      </main>

      {/* 13. Focused Personal Workstation Footer */}
      <FooterSection />
    </div>
  );
}
