"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  Download,
  Megaphone,
  Mic,
  FileText,
  Menu,
  Sun,
  Moon,
  Github,
  MessageSquare,
  Twitter,
  Coffee,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const navLinks = [
    { label: "Product", href: "#product", active: true },
    { label: "Install", href: "#quickstart", icon: Download },
    { label: "Ecosystem", href: "#architecture" },
    { label: "Integrations", href: "#integrations" },
    { label: "Blog", href: "#blog", icon: Megaphone },
    { label: "Podcast", href: "#press", icon: Mic },
    { label: "Docs", href: "#docs", icon: FileText, external: true },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-page/80 backdrop-blur-md transition-colors">
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        {/* Brand */}
        <a
          href="/"
          className="flex items-center gap-2.5 font-display font-[650] text-[15px] text-primary tracking-wide transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-[6px] border border-border-accent bg-accent-soft text-coral shadow-sm">
            <Coffee className="h-4 w-4" />
          </div>
          <span>PCBREW</span>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-[4px] border border-status-success/30 bg-status-success/10 px-1.5 py-0.5 font-mono text-[10px] font-bold text-status-success">
            <span className="h-1.5 w-1.5 rounded-full bg-status-success animate-pulse" />
            v1.0.0
          </span>
        </a>

        {/* Desktop Nav */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-5 font-mono text-xs font-[500]"
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                className={`inline-flex items-center gap-1.5 transition-colors hover:text-primary py-1 ${
                  item.active ? "text-coral font-bold" : "text-muted"
                }`}
              >
                {Icon && <Icon className="h-3.5 w-3.5 opacity-80" />}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right controls: Social Icons, Theme Toggle, Mobile Sheet Trigger */}
        <div className="flex items-center gap-2">
          {/* Social Links */}
          <div className="hidden sm:flex items-center gap-1">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub repository"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-muted hover:bg-interactive hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord community"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-muted hover:bg-interactive hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <MessageSquare className="h-4 w-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X / Twitter profile"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-muted hover:bg-interactive hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>

          <div className="h-4 w-px bg-border-subtle hidden sm:block mx-1" />

          {/* Theme Toggle Button */}
          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              className="flex h-8 w-8 items-center justify-center rounded-[6px] border border-border-subtle bg-card text-muted hover:bg-interactive-hover hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 transition-transform hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 transition-transform hover:-rotate-12" />
              )}
            </button>
          )}

          {/* Mobile Nav Sheet */}
          <div className="md:hidden">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted hover:text-primary"
                  aria-label="Toggle navigation menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-page border-border-subtle p-6">
                <SheetHeader className="text-left mb-6">
                  <SheetTitle className="flex items-center gap-2 font-display text-base">
                    <Coffee className="h-4 w-4 text-coral" />
                    <span>PCBREW</span>
                  </SheetTitle>
                </SheetHeader>

                <nav className="flex flex-col gap-3 font-mono text-sm">
                  {navLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setSheetOpen(false)}
                        className={`flex items-center gap-2.5 py-2 px-3 rounded-[6px] transition-colors hover:bg-interactive ${
                          item.active ? "text-coral font-bold bg-accent-soft" : "text-secondary"
                        }`}
                      >
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.label}</span>
                      </a>
                    );
                  })}
                </nav>

                <div className="border-t border-border-subtle mt-8 pt-6 flex items-center gap-3">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-[6px] text-muted hover:text-primary hover:bg-interactive"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    href="https://discord.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-[6px] text-muted hover:text-primary hover:bg-interactive"
                  >
                    <MessageSquare className="h-5 w-5" />
                  </a>
                  <a
                    href="https://x.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-[6px] text-muted hover:text-primary hover:bg-interactive"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
