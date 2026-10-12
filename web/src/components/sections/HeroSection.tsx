"use client";

import * as React from "react";
import { Terminal, ArrowRight, ShieldCheck, Cpu } from "lucide-react";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Button } from "@/components/ui/button";

const ASCII_TORUS = `
                ...                    .:.::-::...                  ..--==++xxx++==--::..                                           ..::--==++x+x++==--...                  ..::-::.:.                   .. .               
                . .                   . ..:::.:..                 ..::-=+++++==--::..                                                     ..::--==+++++=-::..                 ....:::.. .                   . .              
                 .                   ..:::::..                  .::--==+++==--.:..                                                           ..::--==++++=--::.                 ...:::.:..                   .               
                                    ....:....                 ..::-=+====::..                                                                     ..::==+====::..                 ..:.:.:..                                  
                                   ..:::.:..                .::--==+==--::.                        ....:.::::-:-:-::::.:....                        .::--==+==--::.                ..:.:.:..                                 
                                  ....:..                 ..::--===--::                       ..::-:-=+=++xxxxXxXxxxx++====:-::..                       .:--===--::..                 ..:.:..                                
                                 ..:.:..                 ..:-=-=--::..                   ..::--++xxX###88@8@@@@@@@@@@@88##XXxx++--::..                   ..::--=-=-:..                 ..:.:..                               
                                .......                 ..:----::..                   ..::==xxX#8#88@8@8888#8#8#8#8#8888@8@88#8#Xxx==::..                   ..::----:..                 .......                              
                               ..:....                .::-----::..                 ..--=+XX##888#8##XXxx++++=+===+=+=++xxXX##88888##XX+=--..                 ..::-----::.                ....:..                             
                              . ... .               ..::-:-::..                 ..:-=+xx#####XX++==--::.:...... ......:.::--==++XX#####xx+=-:..                 ..::-:-::..               . ... .                            
                             .....                 ..::-:-::..                .::==xxXX#XXx+==--::..                       ..:.--==+xXX#XXxx==::.                ..::-:-::..                ......                           
                            . ...                 ..:.:::....               ..:-++xxXxx+=--:. .                                 . .:--=+xxXxx+=--..               ..:.:::.:..                 ... .                          
                             ...                 ..::-::.:.               .::==+xxxx+=--...                                          .:--=+xxxx+==::.               .::::-::..                .....                          
                            . .                 ..:.:::..               ..::==+++==-:..                                                 ..--==+++==::..               ..:::....                 . .                          
                           ...                  ...:::..               ..:-==+=+--::.                                                      ::--+++==-:..               ..:.:...                  . .                         
                            .                   ..:....               ..--===--::..                     . . . ... . . .                     ..::--===-:..               ....:..                   .                          
                                              ...:....               .:--===--:.                   ....:.:::::::::::::.:....                  ...--===--:.               ....:..                                             
                                              ..... .               ..-:---::..                 ....:::::::::::.:::::::::::....                 ..::---::..               . .....                                            
                                             ......                ..::---::.                ..:.:.:::.:....       ....:.:.:::.:..                .::---::..                ......                                           
                                              . .                 ..:::::..                 ....:....                     .........                 ..::-::..                 . .                                            
                                             ...                 ..:::::..                ...:....                           ....:...                ..:::::..                ....                                           
                                              .                  ...:.:..               . .....                                 ..... .               ....:...                  .                                            
                                                                 ..:....               .....                                       ... .               ....:..                                                               
                                                                . ...                   .                                             .                   ... .                                                              
                                                                 ...                                                                                      .....                                                              
                                                                  .                                                                                         .                                                                
`;

export const HeroSection: React.FC = () => {
  return (
    <header className="relative w-full border-b border-border-subtle overflow-hidden text-center pt-8 pb-16 sm:pb-24">
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

      {/* ASCII-art Hero Ring */}
      <div
        aria-hidden="true"
        className="relative z-10 flex justify-center items-center h-[min(28vh,260px)] sm:h-[min(32vh,300px)] overflow-hidden pointer-events-none select-none [mask-image:linear-gradient(transparent_0%,black_35%_75%,transparent_95%)] [WebkitMaskImage:linear-gradient(transparent_0%,black_35%_75%,transparent_95%)]"
      >
        <pre className="font-mono text-[9px] sm:text-[11px] leading-[1.25] tracking-[1px] text-coral opacity-65 flex-shrink-0 m-0">
          {ASCII_TORUS}
        </pre>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-content mx-auto px-4 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 flex flex-col items-center">
        {/* Eyebrow */}
        <Eyebrow className="mb-4">
          Open Source · Autonomous Coding Terminal · Remote Laptop Controller
        </Eyebrow>

        {/* H1 Title */}
        <h1 className="font-mono font-[800] text-coral tracking-normal text-[clamp(2rem,11vw,2.75rem)] sm:text-[clamp(2.25rem,4.25vw,3.5rem)] leading-[1.08] text-center [text-wrap:balance] max-w-[66rem] mx-auto">
          The Autonomous Terminal <br className="hidden sm:inline" />
          that <em className="font-serif italic font-[400] text-primary">really</em> executes code.
        </h1>

        {/* Lede */}
        <p className="mt-5 text-[1.0625rem] leading-[1.6] text-secondary max-w-[42rem] mx-auto [text-wrap:pretty]">
          Executes tasks locally with safe unified diffs, runs commands, and controls your laptop remotely from WhatsApp and Telegram.
          No cloud vendor lock-in. 100% on your machine.
        </p>

        {/* Ownership Subtext */}
        <p className="mt-3 text-xs sm:text-sm text-muted italic max-w-[42rem] mx-auto">
          No mandatory hosted tier. No telemetry lock. MIT licensed.
          <br />
          <span className="font-mono font-bold not-italic text-coral text-[12px] tracking-wider uppercase mt-1 inline-block">
            Your machine. Your API keys. Your local files. Your rules.
          </span>
        </p>

        {/* Three CTAs: Primary, Secondary, Ghost */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
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
        <div className="mt-12 w-full max-w-[50rem] grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm">
            <div className="text-[11px] font-mono text-muted uppercase">Engine</div>
            <div className="text-base font-bold text-coral mt-0.5">Bun + Node.js</div>
            <p className="text-[11px] text-secondary mt-0.5">Fast native execution</p>
          </div>

          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm">
            <div className="text-[11px] font-mono text-muted uppercase">WhatsApp Gateway</div>
            <div className="text-base font-bold text-sea-green mt-0.5">Baileys Socket</div>
            <p className="text-[11px] text-secondary mt-0.5">Full laptop control</p>
          </div>

          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm">
            <div className="text-[11px] font-mono text-muted uppercase">Telegram Bot</div>
            <div className="text-base font-bold text-primary mt-0.5">Telegraf Inline</div>
            <p className="text-[11px] text-secondary mt-0.5">Diff review & buttons</p>
          </div>

          <div className="p-3.5 rounded-[8px] border border-border-subtle bg-card shadow-sm">
            <div className="text-[11px] font-mono text-muted uppercase">Safety Layer</div>
            <div className="text-base font-bold text-status-success mt-0.5">Virtual Staging</div>
            <p className="text-[11px] text-secondary mt-0.5">Zero unapproved writes</p>
          </div>
        </div>
      </div>
    </header>
  );
};
