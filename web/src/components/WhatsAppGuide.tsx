"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, QrCode, Smartphone, Terminal, Laptop, ShieldCheck, Check, Copy, Flame, Play } from "lucide-react";

export const WhatsAppGuide: React.FC = () => {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [activeTab, setActiveTab] = useState<"qr" | "commands">("commands");
  const [waMessages, setWaMessages] = useState<
    { sender: "user" | "bot"; text: string; time: string }[]
  >([
    {
      sender: "user",
      text: "/sysinfo",
      time: "23:02",
    },
    {
      sender: "bot",
      text: "💻 *Host Telemetry Report*\n\n• *OS:* Windows 11 (win32)\n• *Memory:* 16 GB Total (9.4 GB Free)\n• *CPU:* 8 Cores (Load: 14%)\n• *Battery:* 100% (Charging)\n• *Session:* Active and ready",
      time: "23:02",
    },
    {
      sender: "user",
      text: "/cmd git status",
      time: "23:03",
    },
    {
      sender: "bot",
      text: "⏳ *Executing on laptop:*\n`git status`...\n\n⚡ *Command:* `git status`\n*Exit Code:* 0\n```\nOn branch main\nChanges to be committed: modified README.md\n```",
      time: "23:03",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");

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
        reply = `🚀 Target opened on laptop screen: ${text.replace("/open", "").trim()}`;
      } else if (text.startsWith("/cmd") || text.startsWith("$")) {
        reply = `⚡ *Laptop Shell Exec:* \`${text}\`\n*Exit:* 0\n\`\`\`\nDone. Execution completed on host system.\n\`\`\``;
      } else if (text.startsWith("/agent")) {
        reply = `🤖 *Autonomous Agent Started on Laptop:*\nWorking on task... Send \`/diff\` to review staged changes or \`/approve\` to apply.`;
      } else {
        reply = `📱 Command received on laptop. Type \`/help\` for full controller suite.`;
      }

      setWaMessages((prev) => [...prev, { sender: "bot", text: reply, time: now }]);
    }, 450);
  };

  return (
    <section id="whatsapp" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-emerald-400 text-xs uppercase tracking-wider mb-1">
          <MessageSquare className="w-4 h-4 text-emerald-400" />
          <span>Remote Laptop Controller</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          WHATSAPP INTEGRATION <span className="text-emerald-400">// OPERATE LAPTOP VIA CHAT</span>
        </h2>
        <p className="mt-2 text-sm text-agent-dim max-w-3xl">
          Powered by the Baileys library. Turns your private WhatsApp into a secure remote control console for executing terminal commands, querying system hardware, and driving AI agents on your laptop.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Setup Details (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Step 1: Phone number */}
          <div className="p-5 rounded-xl bg-agent-card/80 border border-agent-border space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs flex items-center justify-center font-bold">
                1
              </span>
              <h3 className="text-sm font-bold text-white">Set Your Phone Number in .env</h3>
            </div>
            <p className="text-xs text-agent-dim leading-relaxed">
              Add your mobile phone number with your international country code (no leading plus sign or dashes):
            </p>
            <div className="p-3 rounded bg-black/60 border border-agent-border/60 text-xs text-emerald-300">
              WHATSAPP_OWNER_NUMBER=919876543210
            </div>
            <p className="text-[11px] text-agent-dim">
              Example: For India (+91) with number 9876543210, use <code className="text-emerald-300">919876543210</code>. For US (+1), use <code className="text-emerald-300">1XXXXXXXXXX</code>.
            </p>
          </div>

          {/* Step 2: Start & Scan */}
          <div className="p-5 rounded-xl bg-agent-card/80 border border-agent-border space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs flex items-center justify-center font-bold">
                2
              </span>
              <h3 className="text-sm font-bold text-white">Launch Mode & Scan Terminal QR Code</h3>
            </div>
            <p className="text-xs text-agent-dim leading-relaxed">
              Run <code className="text-emerald-300 font-bold">pcbrew whatsapp</code>. A dynamic QR code will render directly in your terminal.
            </p>
            <div className="p-3 rounded bg-agent-bg/80 border border-agent-border text-xs text-slate-300 space-y-1">
              <div>📱 <strong>On your phone:</strong></div>
              <div>Open WhatsApp ➔ <strong>Settings</strong> ➔ <strong>Linked Devices</strong> ➔ <strong>Link a Device</strong></div>
              <div>Point your phone camera at the terminal QR code to link!</div>
            </div>
            <div className="text-[11px] text-agent-dim flex items-center space-x-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-agent-green" />
              <span>
                Session keys are saved locally in <code className="text-slate-200">.whatsapp_auth/</code>. You only scan once!
              </span>
            </div>
          </div>

          {/* Step 3: Device Claim Safeguard */}
          <div className="p-5 rounded-xl bg-agent-card/80 border border-agent-border space-y-3">
            <div className="flex items-center space-x-2.5">
              <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs flex items-center justify-center font-bold">
                3
              </span>
              <h3 className="text-sm font-bold text-white">Pairing Fallback: /claim Command</h3>
            </div>
            <p className="text-xs text-agent-dim leading-relaxed">
              If your phone account connects via multiple device JIDs, simply message <code className="text-emerald-300 font-bold">/claim</code> or <code className="text-emerald-300 font-bold">/auth</code> from WhatsApp. The bot dynamically authorizes your session as the master laptop operator.
            </p>
            <button
              onClick={copyWhatsAppRun}
              className="w-full py-2.5 px-4 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-matrix"
            >
              <Terminal className="w-4 h-4" />
              <span>Launch: pcbrew whatsapp</span>
              {copiedCmd ? <Check className="w-4 h-4 text-white ml-2" /> : <Copy className="w-4 h-4 ml-2" />}
            </button>
          </div>
        </div>

        {/* WhatsApp Mobile Chat Simulator (5 cols) */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl border-2 border-agent-border bg-[#0b141a] shadow-2xl overflow-hidden max-w-sm mx-auto">
            {/* WhatsApp Header */}
            <div className="bg-[#202c33] px-4 py-3 border-b border-[#2a3942] flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-white leading-none">Laptop Terminal Controller</p>
                  <p className="text-[10px] text-emerald-400">online • pcbrew agent</p>
                </div>
              </div>
              <Smartphone className="w-4 h-4 text-slate-400" />
            </div>

            {/* Chat Body */}
            <div className="p-3 space-y-3 h-[420px] overflow-y-auto text-xs bg-[#0b141a] bg-opacity-95">
              {waMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${
                    msg.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-lg p-2.5 leading-relaxed text-xs relative ${
                      msg.sender === "user"
                        ? "bg-[#005c4b] text-white rounded-br-none"
                        : "bg-[#202c33] text-slate-200 border border-[#2a3942] rounded-bl-none"
                    }`}
                  >
                    <pre className="whitespace-pre-wrap font-sans text-xs">{msg.text}</pre>
                    <div className="text-[9px] text-slate-400 text-right mt-1">
                      {msg.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form
              onSubmit={handleSendWA}
              className="p-2.5 bg-[#202c33] border-t border-[#2a3942] flex items-center space-x-2"
            >
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Try: /sysinfo, /cmd dir, /open..."
                className="flex-1 bg-[#111b21] rounded-full px-3 py-1.5 text-xs text-white placeholder:text-slate-500 outline-none border border-[#2a3942]"
              />
              <button
                type="submit"
                className="w-7 h-7 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white flex items-center justify-center shrink-0 transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
