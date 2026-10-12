"use client";

import * as React from "react";
import { MessageSquare, Laptop, ShieldCheck, Check, Copy, Play, Smartphone } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/ui/button";

export const WhatsAppGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = React.useState(false);
  const [waMessages, setWaMessages] = React.useState<
    { sender: "user" | "bot"; text: string; time: string }[]
  >([
    {
      sender: "user",
      text: "/sysinfo",
      time: "23:02",
    },
    {
      sender: "bot",
      text: "Host Telemetry Report\n\n• OS: Windows 11 (win32)\n• Memory: 16 GB Total (9.4 GB Free)\n• CPU: 8 Cores (Load: 14%)\n• Battery: 100% (Charging)\n• Session: Active and ready",
      time: "23:02",
    },
    {
      sender: "user",
      text: "/cmd git status",
      time: "23:03",
    },
    {
      sender: "bot",
      text: "Executing on laptop: git status...\n\nCommand: git status\nExit Code: 0\nOn branch main\nChanges to be committed: modified README.md",
      time: "23:03",
    },
  ]);
  const [inputMsg, setInputMsg] = React.useState("");

  const copyWhatsAppRun = () => {
    navigator.clipboard.writeText("pcbrew whatsapp");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const text = inputMsg.trim();
    setInputMsg("");

    const now = "23:04";
    setWaMessages((prev) => [...prev, { sender: "user", text, time: now }]);

    setTimeout(() => {
      let reply = "";
      if (text.startsWith("/open")) {
        reply = `Target opened on laptop screen: ${text.replace("/open", "").trim()}`;
      } else if (text.startsWith("/cmd") || text.startsWith("$")) {
        reply = `Laptop Shell Exec: ${text}\nExit: 0\nDone. Execution completed on host system.`;
      } else if (text.startsWith("/agent")) {
        reply = `Autonomous Agent Started on Laptop:\nWorking on task... Send /diff to review staged changes or /approve to apply.`;
      } else {
        reply = `Command received on laptop. Type /help for full controller suite.`;
      }

      setWaMessages((prev) => [...prev, { sender: "bot", text: reply, time: now }]);
    }, 450);
  };

  return (
    <Section id="whatsapp" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Remote Laptop Controller"
        title="WhatsApp Integration: Operate Laptop via Chat"
        description="Powered by the Baileys library. Turns your private WhatsApp into a secure remote control console for executing terminal commands, querying system hardware, and driving AI agents on your laptop."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Setup Details (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step 1: Phone number */}
          <Card className="p-5 border-border-subtle bg-card space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-accent-soft text-coral border border-border-accent text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-sm font-bold text-primary font-display">
                Set Your Phone Number in Configuration
              </h3>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Add your mobile phone number with your international country code (no leading plus sign or dashes):
            </p>
            <div className="p-3 rounded-[6px] bg-elevated border border-border-subtle text-xs text-sea-green font-mono">
              WHATSAPP_OWNER_NUMBER=919876543210
            </div>
            <p className="text-[11px] text-muted font-mono">
              Example: For India (+91) with number 9876543210, use <code className="text-coral">919876543210</code>. For US (+1), use <code className="text-coral">1XXXXXXXXXX</code>.
            </p>
          </Card>

          {/* Step 2: Start & Scan */}
          <Card className="p-5 border-border-subtle bg-card space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-accent-soft text-coral border border-border-accent text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-sm font-bold text-primary font-display">
                Launch Mode & Scan Terminal QR Code
              </h3>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Run <code className="text-coral font-bold font-mono">pcbrew whatsapp</code>. A dynamic QR code will render directly in your terminal.
            </p>
            <div className="p-3 rounded-[6px] bg-elevated border border-border-subtle text-xs text-secondary space-y-1 font-mono">
              <div>📱 <strong>On your phone:</strong></div>
              <div>Open WhatsApp ➔ <strong>Settings</strong> ➔ <strong>Linked Devices</strong> ➔ <strong>Link a Device</strong></div>
              <div>Point your phone camera at the terminal QR code to link!</div>
            </div>
            <div className="text-[11px] text-muted flex items-center gap-1.5 font-mono">
              <ShieldCheck className="h-3.5 w-3.5 text-sea-green flex-shrink-0" />
              <span>
                Session keys are saved locally in <code className="text-primary">.whatsapp_auth/</code>. You only scan once!
              </span>
            </div>
          </Card>

          {/* Step 3: Device Claim Safeguard */}
          <Card className="p-5 border-border-subtle bg-card space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-accent-soft text-coral border border-border-accent text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="text-sm font-bold text-primary font-display">
                Pairing Fallback: /claim Command
              </h3>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              If your phone account connects via multiple device JIDs, simply message <code className="text-coral font-bold font-mono">/claim</code> or <code className="text-coral font-bold font-mono">/auth</code> from WhatsApp. The bot dynamically authorizes your session as the master laptop operator.
            </p>
            <Button
              variant="primary"
              onClick={copyWhatsAppRun}
              className="w-full gap-2 font-mono text-xs"
            >
              <Laptop className="h-4 w-4" />
              <span>Launch: pcbrew whatsapp</span>
              {copiedCmd ? (
                <Check className="h-4 w-4 text-on-accent ml-2" />
              ) : (
                <Copy className="h-4 w-4 ml-2" />
              )}
            </Button>
          </Card>
        </div>

        {/* WhatsApp Mobile Chat Simulator (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="rounded-[12px] border border-border-subtle bg-card shadow-lg overflow-hidden max-w-sm mx-auto">
            {/* WhatsApp Header */}
            <div className="bg-elevated px-4 py-3 border-b border-border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-sea-green text-page font-bold flex items-center justify-center">
                  <Laptop className="h-3.5 w-3.5 text-page" />
                </div>
                <div>
                  <p className="font-bold text-primary leading-none">Laptop Terminal Controller</p>
                  <p className="text-[10px] text-sea-green mt-0.5">online • pcbrew agent</p>
                </div>
              </div>
              <Smartphone className="w-4 h-4 text-muted" />
            </div>

            {/* Chat Body */}
            <div className="p-3 space-y-3 h-[400px] overflow-y-auto text-xs bg-page">
              {waMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-[8px] p-2.5 leading-relaxed text-xs relative font-sans ${
                      msg.sender === "user"
                        ? "bg-sea-green text-page font-medium rounded-br-none"
                        : "bg-elevated text-primary border border-border-subtle rounded-bl-none"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-xs">{msg.text}</pre>
                    <div className="text-[9px] text-muted text-right mt-1 font-mono">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendWA}
              className="p-2.5 bg-elevated border-t border-border-subtle flex items-center gap-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Try: /sysinfo, /cmd dir, /open..."
                className="flex-1 bg-surface rounded-[6px] px-3 py-1.5 text-xs text-primary placeholder:text-muted/60 outline-none border border-border-subtle focus:border-coral font-mono"
              />
              <Button
                type="submit"
                variant="primary"
                size="icon"
                className="h-7 w-7 rounded-[6px] flex-shrink-0"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  );
};
