"use client";

import * as React from "react";
import { Coffee, Github, MessageSquare, Twitter } from "lucide-react";
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
              Autonomous agentic terminal & remote laptop controller running on your machine.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                className="h-7 w-7 rounded-[4px] border border-border-subtle bg-card flex items-center justify-center text-muted hover:text-primary transition-colors"
              >
                <Github className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Discord community"
                className="h-7 w-7 rounded-[4px] border border-border-subtle bg-card flex items-center justify-center text-muted hover:text-primary transition-colors"
              >
                <MessageSquare className="h-3.5 w-3.5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="h-7 w-7 rounded-[4px] border border-border-subtle bg-card flex items-center justify-center text-muted hover:text-primary transition-colors"
              >
                <Twitter className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Col 1: Product */}
          <div>
            <h4 className="font-mono text-xs font-[700] uppercase text-coral mb-3 tracking-wider">
              Product
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li>
                <a href="#quickstart" className="hover:text-primary transition-colors">
                  Install
                </a>
              </li>
              <li>
                <a href="#simulator" className="hover:text-primary transition-colors">
                  Terminal Simulator
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#showcase" className="hover:text-primary transition-colors">
                  Showcase
                </a>
              </li>
              <li>
                <a href="#integrations" className="hover:text-primary transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Resources */}
          <div>
            <h4 className="font-mono text-xs font-[700] uppercase text-coral mb-3 tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li>
                <a href="#setup" className="hover:text-primary transition-colors">
                  Setup Guide
                </a>
              </li>
              <li>
                <a href="#telegram" className="hover:text-primary transition-colors">
                  Telegram Bot Guide
                </a>
              </li>
              <li>
                <a href="#whatsapp" className="hover:text-primary transition-colors">
                  WhatsApp Bridge Guide
                </a>
              </li>
              <li>
                <a href="#env-config" className="hover:text-primary transition-colors">
                  Configurator Tool
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-primary transition-colors">
                  Engineering Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Project */}
          <div>
            <h4 className="font-mono text-xs font-[700] uppercase text-coral mb-3 tracking-wider">
              Project
            </h4>
            <ul className="space-y-2 text-xs font-mono text-muted">
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="#press" className="hover:text-primary transition-colors">
                  Press & Shoutouts
                </a>
              </li>
              <li>
                <a href="#architecture" className="hover:text-primary transition-colors">
                  System Architecture
                </a>
              </li>
              <li>
                <a href="#cheatsheet" className="hover:text-primary transition-colors">
                  Commands Matrix
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  MIT License
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border-subtle/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted font-mono">
          <p>© 2026 PCBREW. Open-source assistant & terminal infrastructure.</p>
          <div className="flex items-center gap-4">
            <span className="text-secondary">MIT Licensed</span>
            <span>·</span>
            <span className="text-sea-green">Privacy-Preserving</span>
          </div>
        </div>
      </Section>
    </footer>
  );
};
