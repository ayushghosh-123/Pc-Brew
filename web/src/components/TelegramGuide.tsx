"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Key, UserCheck, ShieldAlert, Check, Copy, Bot, Smartphone, ExternalLink } from "lucide-react";

export const TelegramGuide: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [chatMessages, setChatMessages] = useState<
    { sender: "user" | "bot"; text: string; buttons?: string[] }[]
  >([
    {
      sender: "bot",
      text: "☕ *PC Brew Bot Online*\n\nWelcome back, operator! Authorized session established.\n\nCommands:\n• `/ask <question>`\n• `/agent <task>`\n• `/plan <goal>`",
    },
    {
      sender: "user",
      text: "/agent Implement token refresher in auth.ts",
    },
    {
      sender: "bot",
      text: "⚡ *Agent Staged Diff Approval Needed*\n\nFile: `modes/telegram/auth.ts`\n```diff\n- return tokenValid;\n+ return await refreshToken(token);\n```\nApprove changes to local workspace?",
      buttons: ["✅ Approve Diff", "❌ Reject Diff"],
    },
  ]);
  const [userInput, setUserInput] = useState("");

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
            text: "📋 *Plan Generated: 3 Steps*\n\n1️⃣ Inspect schema\n2️⃣ Generate endpoints\n3️⃣ Write unit tests\n\nClick below to toggle steps:",
            buttons: ["Toggle 1️⃣", "Toggle 2️⃣", "Toggle 3️⃣", "🚀 Run Plan"],
          },
        ]);
      } else if (text.startsWith("/ask")) {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: "🧠 *Codebase Insight:*\nYour Telegram integration uses Telegraf with inline keyboard callbacks for non-blocking asynchronous confirmations.",
          },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          {
            sender: "bot",
            text: `🤖 Received: "${text}". Agent dispatched task to local workspace.`,
          },
        ]);
      }
    }, 500);
  };

  return (
    <section id="telegram" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-sky-400 text-xs uppercase tracking-wider mb-1">
          <Send className="w-4 h-4 text-sky-400" />
          <span>Remote Telemetry & Operations</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          TELEGRAM BOT <span className="text-sky-400">// SETUP & ATTACH GUIDE</span>
        </h2>
        <p className="mt-2 text-sm text-agent-dim max-w-3xl">
          Control your local development workspace, review staged diffs, and spawn AI agents directly from your mobile Telegram app.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step-by-Step Instructions (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Step 1 */}
          <div className="p-5 rounded-xl bg-agent-card/80 border border-agent-border space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-sm font-bold text-white">Create Bot with @BotFather</h3>
            </div>
            <p className="text-xs text-agent-dim leading-relaxed">
              Open the Telegram app and search for <strong className="text-sky-400">@BotFather</strong>. Send the command <code className="text-slate-200">/newbot</code>, give it a name and username (e.g. <code className="text-slate-200">my_pcbrew_bot</code>). BotFather will reply with your unique API Token.
            </p>
            <div className="p-3 rounded bg-black/60 border border-agent-border/60 text-xs text-slate-300 font-mono flex items-center justify-between">
              <span className="truncate text-agent-dim">Format: 7123456789:AAHq_xyzABC...</span>
              <span className="text-[11px] text-sky-400 shrink-0 ml-2">Keep Secret!</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-xl bg-agent-card/80 border border-agent-border space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-sm font-bold text-white">Get Your Telegram User ID (Auth Protection)</h3>
            </div>
            <p className="text-xs text-agent-dim leading-relaxed">
              Search for <strong className="text-sky-400">@userinfobot</strong> on Telegram and send any message. It will reply with your numerical Id (e.g. <code className="text-slate-200">123456789</code>).
            </p>
            <div className="p-3 rounded bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>Crucial Safeguard:</strong> PC Brew checks every incoming Telegram command against this ID. Anyone else messaging your bot will be rejected immediately.
              </span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-xl bg-agent-card/80 border border-agent-border space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/40 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="text-sm font-bold text-white">Add Variables to .env & Launch</h3>
            </div>
            <div className="p-3 rounded bg-black/60 border border-agent-border/60 text-xs space-y-1">
              <div className="text-agent-dim"># Add to .env or run pcbrew setup</div>
              <div className="text-emerald-300">TELEGRAM_BOT_TOKEN=7123456789:AAHq_xyzABC...</div>
              <div className="text-emerald-300">TELEGRAM_OWNER_ID=123456789</div>
            </div>
            <div className="pt-2">
              <button
                onClick={() => copyToClipboard("pcbrew telegram", "cmd-tg")}
                className="w-full py-2.5 px-4 rounded bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-neon"
              >
                <Bot className="w-4 h-4" />
                <span>Run: pcbrew telegram</span>
                {copiedKey === "cmd-tg" ? <Check className="w-4 h-4 text-emerald-300 ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
              </button>
            </div>
          </div>
        </div>

        {/* Telegram Mobile UI Interactive Simulator (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border-2 border-agent-border bg-[#0e1621] shadow-2xl overflow-hidden max-w-sm mx-auto">
            {/* Telegram Header */}
            <div className="bg-[#17212b] px-4 py-3 border-b border-[#242f3d] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold">
                  PB
                </div>
                <div>
                  <p className="font-bold text-white leading-none">PC Brew Bot</p>
                  <p className="text-[10px] text-sky-400">bot • online</p>
                </div>
              </div>
              <Smartphone className="w-4 h-4 text-slate-400" />
            </div>

            {/* Chat Body */}
            <div className="p-3 space-y-3 h-[380px] overflow-y-auto text-xs bg-[#0e1621]/95">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 leading-relaxed text-xs ${
                      msg.sender === "user"
                        ? "bg-[#2b5278] text-white rounded-br-none"
                        : "bg-[#182533] text-slate-200 border border-[#2b3c4f] rounded-bl-none"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-xs">{msg.text}</pre>
                  </div>

                  {msg.buttons && (
                    <div className="mt-2 flex flex-wrap gap-1.5 max-w-[85%]">
                      {msg.buttons.map((b, bi) => (
                        <button
                          key={bi}
                          className="px-2.5 py-1 text-[11px] rounded bg-[#2b5278]/60 hover:bg-[#2b5278] text-sky-200 border border-sky-400/30 transition-all"
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
              className="p-2.5 bg-[#17212b] border-t border-[#242f3d] flex items-center space-x-2"
            >
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="Type /ask, /plan, /agent..."
                className="flex-1 bg-[#0e1621] rounded-full px-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none border border-[#242f3d]"
              />
              <button
                type="submit"
                className="w-7 h-7 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
