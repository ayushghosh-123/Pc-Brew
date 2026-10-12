"use client";

import * as React from "react";
import { Header } from "@/components/sections/Header";
import { HeroSection } from "@/components/sections/HeroSection";
import { QuickStartSection } from "@/components/sections/QuickStartSection";
import { TerminalSimulator } from "@/components/TerminalSimulator";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BlogHighlightsSection } from "@/components/sections/BlogHighlightsSection";
import { FeatureGridSection } from "@/components/sections/FeatureGridSection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { IntegrationsGridSection } from "@/components/sections/IntegrationsGridSection";
import { TelegramGuide } from "@/components/TelegramGuide";
import { WhatsAppGuide } from "@/components/WhatsAppGuide";
import { EnvConfigurator } from "@/components/EnvConfigurator";
import { CommandsCheatsheet } from "@/components/CommandsCheatsheet";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { PressSection } from "@/components/sections/PressSection";
import { NewsletterSection } from "@/components/sections/NewsletterSection";
import { FooterSection } from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-page text-primary flex flex-col font-sans selection:bg-selection selection:text-primary">
      {/* 1. Header with logo, nav, social icons, theme toggle, and mobile Sheet nav */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        {/* 2 & 3. ASCII-art Hero, Eyebrow, H1, Lede, 3 CTAs */}
        <HeroSection />

        {/* 4. Quick Start: Segmented tabs & 3 OS Download cards */}
        <QuickStartSection />

        {/* Live Interactive Terminal Console */}
        <TerminalSimulator />

        {/* 5. Testimonials: Infinite marquee */}
        <TestimonialsSection />

        {/* 6. Blog Highlights: 1 featured + 2 smaller */}
        <BlogHighlightsSection />

        {/* 7. Feature Grid: 6 interactive cards */}
        <FeatureGridSection />

        {/* Architecture & Multi-Mode Execution Lifecycle */}
        <ArchitectureSection />

        {/* 8. Integrations Grid: 15 interactive tiles */}
        <IntegrationsGridSection />

        {/* Telegram Interactive Gateway Guide */}
        <TelegramGuide />

        {/* WhatsApp Remote Shell Controller Guide */}
        <WhatsAppGuide />

        {/* Multi-Provider Environment Configurator */}
        <EnvConfigurator />

        {/* Unified Commands Matrix */}
        <CommandsCheatsheet />

        {/* 9. Showcase: Community Builds */}
        <ShowcaseSection />

        {/* 10. Press: Featured in developer media & 4-link row */}
        <PressSection />

        {/* 11. Newsletter, Foundation text & Sponsor logos */}
        <NewsletterSection />
      </main>

      {/* Footer with 3 link columns */}
      <FooterSection />
    </div>
  );
}
