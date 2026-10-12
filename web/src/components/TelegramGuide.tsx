"use client";

import * as React from "react";
import { Send, ShieldAlert, Check, Copy, Bot, Smartphone } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/ui/button";

export const TelegramGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [chatMessages, setChatMessages] = React.useState<
    { sender: "user" | "bot"; text: string; buttons?: string[] }[]
  >([
    {
      sender: "bot",
      text: "PC BREW Bot Online\n\nAuthorized session established.\n\nCommands:\n• /ask <question>\n• /agent <task>\n• /plan <goal>",
    },
    {
      sender: "user",
      text: "/agent Implement token refresher in auth.ts",
    },
    {
      sender: "bot",
      text: "⚡ Staged Diff Approval Needed\n\nFile: modes/telegram/auth.ts\n- return tokenValid;\n+ return await refreshToken(token);\n\nApprove changes to local workspace?",
      buttons: ["✅ Approve Diff", "❌ Reject Diff"],
    },
  ]);
  const [userInput, setUserInput] = React.useState("");

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const text = userInput.trim();
    setUserInput("");

    setChatMessages((prev) => [...prev, { sender: "user", text }]);

    setTimeout(() => {
      if (text.startsWith("/plan")) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Plan Generated: 3 Steps\n\n1. Inspect schema\n2. Generate endpoints\n3. Write unit tests\n\nClick below to toggle steps:",
            buttons: ["Toggle 1", "Toggle 2", "Toggle 3", "Run Plan"],
          },
        ]);
      } else if (text.startsWith("/ask")) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "Codebase Insight:\nYour Telegram integration uses Telegraf with inline keyboard callbacks for non-blocking asynchronous confirmations.",
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `Received: "${text}". Agent dispatched task to local workspace.`,
          },
        ]);
      }
    }, 500);
  };

  return (
    <Section id="telegram" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Remote Telemetry & Operations"
        title="Telegram Bot: Setup & Attach Guide"
        description="Control your local development workspace, review staged diffs, and spawn AI agents directly from your mobile Telegram app."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step-by-Step Instructions (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Step 1 */}
          <Card className="p-5 border-border-subtle bg-card space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-accent-soft text-coral border border-border-accent text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-sm font-bold text-primary font-display">
                Create Bot with @BotFather
              </h3>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Open the Telegram app and search for <strong className="text-coral">@BotFather</strong>. Send the command <code className="text-primary font-mono bg-elevated px-1 py-0.5 rounded-[4px] border border-border-subtle">/newbot</code>, give it a name and username (e.g. <code className="text-primary font-mono bg-elevated px-1 py-0.5 rounded-[4px] border border-border-subtle">my_pcbrew_bot</code>). BotFather will reply with your unique API Token.
            </p>
            <div className="p-3 rounded-[6px] bg-elevated border border-border-subtle text-xs text-secondary font-mono flex items-center justify-between">
              <span className="truncate text-muted">Format: 7123456789:AAHq_xyzABC...</span>
              <span className="text-[11px] text-coral font-bold shrink-0 ml-2">Keep Secret!</span>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-5 border-border-subtle bg-card space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-accent-soft text-coral border border-border-accent text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-sm font-bold text-primary font-display">
                Get Your Telegram User ID (Auth Protection)
              </h3>
            </div>
            <p className="text-xs text-secondary leading-relaxed">
              Search for <strong className="text-coral">@userinfobot</strong> on Telegram and send any message. It will reply with your numerical Id (e.g. <code className="text-primary font-mono bg-elevated px-1 py-0.5 rounded-[4px] border border-border-subtle">123456789</code>).
            </p>
            <div className="p-3 rounded-[6px] bg-accent-soft border border-border-accent text-xs text-secondary flex items-start gap-2">
              <ShieldAlert className="w-4 h-4 text-coral shrink-0 mt-0.5" />
              <span>
                <strong className="text-coral">Crucial Safeguard:</strong> PC Brew checks every incoming Telegram command against this ID. Anyone else messaging your bot will be rejected immediately.
              </span>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-5 border-border-subtle bg-card space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="w-6 h-6 rounded-full bg-accent-soft text-coral border border-border-accent text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="text-sm font-bold text-primary font-display">
                Add Variables & Launch Gateway
              </h3>
            </div>
            <div className="p-3 rounded-[6px] bg-elevated border border-border-subtle text-xs font-mono space-y-1">
              <div className="text-muted"># Add to config or run pcbrew setup</div>
              <div className="text-sea-green">TELEGRAM_BOT_TOKEN=7123456789:AAHq_xyzABC...</div>
              <div className="text-sea-green">TELEGRAM_OWNER_ID=123456789</div>
            </div>
            <div className="pt-2">
              <Button
                variant="primary"
                onClick={() => copyToClipboard("pcbrew telegram", "cmd-tg")}
                className="w-full gap-2 font-mono text-xs"
              >
                <Bot className="w-4 h-4" />
                <span>Run: pcbrew telegram</span>
                {copiedKey === "cmd-tg" ? (
                  <Check className="w-4 h-4 text-sea-green ml-2" />
                ) : (
                  <Copy className="w-4 h-4 ml-2" />
                )}
              </Button>
            </div>
          </Card>
        </div>

        {/* Telegram Mobile UI Interactive Simulator (5 cols) */}
        <div className="lg:col-span-5">
          <Card className="rounded-[12px] border border-border-subtle bg-card shadow-lg overflow-hidden max-w-sm mx-auto">
            {/* Telegram Header */}
            <div className="bg-elevated px-4 py-3 border-b border-border-subtle flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-coral text-on-accent font-bold flex items-center justify-center text-xs">
                  PB
                </div>
                <div>
                  <p className="font-bold text-primary leading-none">PC Brew Bot</p>
                  <p className="text-[10px] text-sea-green mt-0.5">bot • online</p>
                </div>
              </div>
              <Smartphone className="w-4 h-4 text-muted" />
            </div>

            {/* Chat Body */}
            <div className="p-3 space-y-3 h-[360px] overflow-y-auto text-xs bg-page">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-[8px] p-2.5 leading-relaxed text-xs font-sans ${
                      msg.sender === "user"
                        ? "bg-coral text-on-accent rounded-br-none"
                        : "bg-elevated text-primary border border-border-subtle rounded-bl-none"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-xs">{msg.text}</pre>
                  </div>

                  {msg.buttons && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                      {msg.buttons.map((b, bi) => (
                        <button
                          key={bi}
                          type="button"
                          className="px-2.5 py-1 text-[11px] rounded-[4px] bg-interactive-hover hover:bg-interactive text-primary border border-border-subtle transition-all font-mono"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendChat}
              className="p-2.5 bg-elevated border-t border-border-subtle flex items-center gap-2"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type /ask, /plan, /agent..."
                className="flex-1 bg-surface rounded-[6px] px-3 py-1.5 text-xs text-primary placeholder:text-muted/60 outline-none border border-border-subtle focus:border-coral font-mono"
              />
              <Button
                type="submit"
                variant="primary"
                size="icon"
                className="h-7 w-7 rounded-[6px] flex-shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </Section>
  );
};
