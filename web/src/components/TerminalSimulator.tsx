"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, RotateCcw, Cpu, ShieldAlert, Check, X, Play, Coffee } from "lucide-react";

interface TerminalLine {
  id: string;
  type: "input" | "output" | "system" | "diff" | "plan";
  content?: string;
  diffData?: {
    file: string;
    additions: string[];
    deletions: string[];
  };
  planData?: {
    goal: string;
    steps: { id: string; title: string; desc: string; selected: boolean }[];
  };
}

const ASCII_BANNER = `
  ____   ____   ____  ____  _______        __
 |  _ \\ / ___| | __ )|  _ \\| ____\\ \\      / /
 | |_) | |     |  _ \\| |_) |  _|  \\ \\ /\\ / / 
 |  __/| |___  | |_) |  _ <| |___  \\ V  V /  
 |_|    \\____| |____/|_| \\_\\_____|  \\_/\\_/   
`;

export const TerminalSimulator: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([
    {
      id: "init-banner",
      type: "system",
      content: ASCII_BANNER,
    },
    {
      id: "init-welcome",
      type: "system",
      content: "☕ PC Brew Agentic Terminal initialized • Ready for commands\n✦ Type /help or click any preset below to test autonomous workflows.\n✦ Type /config to run the interactive step-by-step API setup wizard.",
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

    // Add user input to history
    const userLine: TerminalLine = {
      id: `usr-${Date.now()}`,
      type: "input",
      content: trimmed,
    };

    setHistory((prev) => [...prev, userLine]);
    setInputVal("");
    setIsProcessing(true);

    setTimeout(() => {
      processCommand(trimmed);
      setIsProcessing(false);
    }, 400);
  };

  const processCommand = (cmd: string) => {
    const lower = cmd.toLowerCase();

    if (lower === "clear" || lower === "/clear") {
      setHistory([]);
      return;
    }

    if (lower === "help" || lower === "/help") {
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `💡 Available Commands in PC Brew:
  /config         Interactive step-by-step API configuration wizard
  /agent <task>   Autonomous coding agent with staged unified diff approvals
  /plan <goal>    Generate ordered, toggleable execution plan
  /ask <query>    Inspect codebase & technical reasoning
  /cmd <command>  Direct host terminal command execution ($ works too)
  /sysinfo        Host telemetry (RAM, CPU, Node/Bun version, Battery)
  /mode           Launch TUI Wakeup Selector (CLI / Telegram / WhatsApp / Config)
  /clear          Clear terminal canvas`,
        },
      ]);
      return;
    }

    if (lower === "/config" || lower === "config" || lower === "/setup" || lower === "setup") {
      setHistory((prev) => [
        ...prev,
        {
          id: `out-${Date.now()}`,
          type: "output",
          content: `☕ PC Brew API Configuration Wizard:
  [1] OpenRouter API Key:     sk-or-v1-******************** [Configured]
  [2] OpenRouter Model:       openrouter/free
  [3] Telegram Bot Token:     7123456789:AAHq_... [Configured]
  [4] Telegram Owner ID:      123456789 (Authorized)
  [5] WhatsApp Owner:         919876543210 (Linked)
  [6] Firecrawl Scraper:      fc-**************** (Active)

✅ Configuration stored permanently in OS config store:
   ~/.config/pcbrew/config.json`,
        },
      ]);
      return;
    }

    if (lower.startsWith("/plan") || lower.startsWith("plan")) {
      const goal = cmd.replace(/^(\/plan|plan)\s*/, "").trim() || "Automated Resume Matcher & Scraper";
      setHistory((prev) => [
        ...prev,
        {
          id: `plan-${Date.now()}`,
          type: "plan",
          planData: {
            goal,
            steps: [
              { id: "S1", title: "Target Architecture", desc: "Scan job listings schema and config", selected: true },
              { id: "S2", title: "Web Discovery", desc: "Invoke Firecrawl scrape tool for portal listings", selected: true },
              { id: "S3", title: "AI Filtering", desc: "Pass raw requirements to OpenRouter LLM", selected: true },
              { id: "S4", title: "Telegram Dispatch", desc: "Push ranked matches to Telegram bot with alert button", selected: true },
            ],
          },
        },
      ]);
      return;
    }

    if (lower.startsWith("/agent") || lower.startsWith("agent")) {
      setHistory((prev) => [
        ...prev,
        {
          id: `agent-thinking-${Date.now()}`,
          type: "output",
          content: `⚡ Agent loop started...
🔍 Tool Call [analyze_codebase]: 34 files indexed in workspace.
📖 Tool Call [read_file]: Reading modes/agent/too-executer.ts...
✏️ Tool Call [stage_file_patch]: Modified modes/agent/too-executer.ts (staged in virtual overlay)`,
        },
        {
          id: `diff-${Date.now()}`,
          type: "diff",
          diffData: {
            file: "modes/agent/too-executer.ts",
            deletions: [
              "- const timeout = 5000;",
              "- return executeUnsafe(command);",
            ],
            additions: [
              "+ const timeout = 12000; // enhanced timeout for long commands",
              "+ return executeSafeSandboxed(command, { timeout, auditLog: true });",
            ],
          },
        },
      ]);
      return;
    }

    if (lower.startsWith("/ask") || lower.startsWith("ask")) {
      setHistory((prev) => [
        ...prev,
        {
          id: `ask-${Date.now()}`,
          type: "output",
          content: `🧠 Codebase Analysis (PC Brew):
PC Brew uses a clean decoupled architecture:
1. 'config/setup': Persistent API storage with 'conf' and '@clack/prompts'.
2. 'modes/agent': Implements virtual memory staging overlay (ActionTracker) so AI never edits disk directly without diff approval.
3. 'modes/telegram': Uses Telegraf with inline keyboards and owner authorization verification.
4. 'modes/whatsapp': Employs Baileys socket with QR authentication, allowing full remote laptop management (/cmd, /sysinfo, /open).
5. 'tui/agentic-terminal': Interactive REPL with real-time markdown streaming and slash commands.`,
        },
      ]);
      return;
    }

    if (lower === "/sysinfo" || lower === "sysinfo") {
      setHistory((prev) => [
        ...prev,
        {
          id: `sys-${Date.now()}`,
          type: "output",
          content: `💻 Host Telemetry:
  OS:          Windows 11 (win32-x64)
  Runtime:     Bun v1.4.2 / Node v24.18.0
  Memory:      16.0 GB Total (9.4 GB Available)
  CPU:         AMD Ryzen / Intel Core (8 Cores)
  Battery:     AC Connected (100% Charged)
  Session:     Active (pcbrew global binary ready)`,
        },
      ]);
      return;
    }

    if (lower.startsWith("/cmd") || lower.startsWith("$") || lower.startsWith("cmd")) {
      const execStr = cmd.replace(/^(\/cmd|\$|cmd)\s*/, "").trim() || "dir";
      setHistory((prev) => [
        ...prev,
        {
          id: `cmd-${Date.now()}`,
          type: "output",
          content: `⚡ Executed on host: "${execStr}" [Exit 0]
Output:
ai/              config/          modes/           tui/             web/
index.ts         package.json     README.md        RESOURCES.md     tsconfig.json`,
        },
      ]);
      return;
    }

    if (lower === "/mode" || lower === "mode" || lower === "wakeup") {
      setHistory((prev) => [
        ...prev,
        {
          id: `wakeup-${Date.now()}`,
          type: "output",
          content: `? Which mode do you want to proceed with?
  ❯ 1. CLI (Agent, Plan & Ask)
    2. Telegram Gateway
    3. WhatsApp (Operate Laptop via Chat)
    4. ⚙️  Configure APIs (OpenRouter, Telegram, WhatsApp)
    5. Exit
Selected: Agentic Terminal active.`,
        },
      ]);
      return;
    }

    // Default response
    setHistory((prev) => [
      ...prev,
      {
        id: `def-${Date.now()}`,
        type: "output",
        content: `Executed prompt via OpenRouter:
"${cmd}"
Agent processed instructions successfully. Type /help to see specialized commands.`,
      },
    ]);
  };

  const handleApproveDiff = (id: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              type: "output",
              content: "✅ Staged patch approved! Unified diff committed to disk safely.",
            }
          : item
      )
    );
  };

  const handleRejectDiff = (id: string) => {
    setHistory((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              type: "output",
              content: "❌ Staged patch rejected. Overlay buffer cleared without disk mutations.",
            }
          : item
      )
    );
  };

  return (
    <section id="simulator" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-agent-border/60">
        <div>
          <div className="flex items-center space-x-2 text-agent-accent font-mono text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4 text-agent-accentBright animate-pulse" />
            <span>Interactive Terminal Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight font-mono text-white">
            PC BREW <span className="text-agent-accent">// AGENTIC TERMINAL SIMULATOR</span>
          </h2>
        </div>
        <div className="mt-3 sm:mt-0 flex items-center space-x-2">
          <button
            onClick={() => handleCommand("/clear")}
            className="px-3 py-1.5 text-xs font-mono rounded bg-agent-card hover:bg-agent-card/80 border border-agent-border text-slate-300 flex items-center space-x-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-agent-dim" />
            <span>Clear Buffer</span>
          </button>
        </div>
      </div>

      {/* Preset Quick Chips */}
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-agent-dim mr-1">Quick Run:</span>
        <button
          onClick={() => handleCommand("/config")}
          className="px-2.5 py-1 rounded bg-agent-card border border-agent-border hover:border-agent-purple text-slate-300 hover:text-agent-purple transition-all"
        >
          ⚙️ /config (API Setup)
        </button>
        <button
          onClick={() => handleCommand("/agent Optimize error handling")}
          className="px-2.5 py-1 rounded bg-agent-card border border-agent-border hover:border-agent-accent text-slate-300 hover:text-agent-accentBright transition-all"
        >
          ⚡ /agent (Staged Diff)
        </button>
        <button
          onClick={() => handleCommand("/plan Build remote WhatsApp controller")}
          className="px-2.5 py-1 rounded bg-agent-card border border-agent-border hover:border-agent-cyan text-slate-300 hover:text-agent-cyan transition-all"
        >
          📋 /plan (Execution Roadmap)
        </button>
        <button
          onClick={() => handleCommand("/ask How does authorization work in Telegram and WhatsApp?")}
          className="px-2.5 py-1 rounded bg-agent-card border border-agent-border hover:border-agent-green text-slate-300 hover:text-agent-green transition-all"
        >
          🧠 /ask (Codebase Q&A)
        </button>
        <button
          onClick={() => handleCommand("/sysinfo")}
          className="px-2.5 py-1 rounded bg-agent-card border border-agent-border hover:border-agent-purple text-slate-300 hover:text-agent-purple transition-all"
        >
          💻 /sysinfo (Laptop Telemetry)
        </button>
        <button
          onClick={() => handleCommand("/help")}
          className="px-2.5 py-1 rounded bg-agent-card border border-agent-border hover:border-slate-400 text-slate-300 transition-all"
        >
          💡 /help
        </button>
      </div>

      {/* Terminal Window Box */}
      <div className="relative rounded-xl border border-agent-border bg-agent-card/90 shadow-2xl backdrop-blur-xl overflow-hidden font-mono">
        {/* CRT Scanline effect */}
        <div className="crt-overlay absolute inset-0 z-10 pointer-events-none opacity-40" />

        {/* Window Titlebar */}
        <div className="bg-[#0b0f19] px-4 py-3 border-b border-agent-border/70 flex items-center justify-between text-xs select-none">
          <div className="flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <span className="ml-3 text-slate-400 font-semibold">pcbrew — agentic-terminal — 120x35</span>
          </div>
          <div className="flex items-center space-x-3 text-agent-dim text-[11px]">
            <span className="flex items-center space-x-1">
              <Cpu className="w-3.5 h-3.5 text-agent-cyan" />
              <span>Bun v1.4.2 Native</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-agent-green border border-emerald-500/30">
              OPENROUTER READY
            </span>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 sm:p-6 min-h-[380px] max-h-[540px] overflow-y-auto space-y-4 text-xs sm:text-sm">
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {item.type === "system" && (
                <pre className="text-agent-accent font-bold leading-tight select-none overflow-x-auto whitespace-pre">
                  {item.content}
                </pre>
              )}

              {item.type === "input" && (
                <div className="flex items-start space-x-2 text-slate-100">
                  <span className="text-agent-accentBright font-bold">pcbrew ❯</span>
                  <span className="text-emerald-300 font-semibold">{item.content}</span>
                </div>
              )}

              {item.type === "output" && (
                <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed bg-[#06080e]/60 p-3 rounded border border-agent-border/40 font-mono">
                  {item.content}
                </pre>
              )}

              {item.type === "plan" && item.planData && (
                <div className="p-4 rounded-lg bg-agent-bg/80 border border-agent-cyan/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-agent-border pb-2">
                    <span className="text-agent-cyan font-bold flex items-center space-x-2">
                      <span>📋 GENERATED PLAN:</span>
                      <span className="text-slate-200">{item.planData.goal}</span>
                    </span>
                    <span className="text-[11px] text-agent-dim">4 steps proposed</span>
                  </div>
                  <div className="space-y-2">
                    {item.planData.steps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-start space-x-3 p-2 rounded bg-agent-card/60 border border-agent-border/50 text-xs"
                      >
                        <span className="text-agent-cyan font-bold">{step.id}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-200">{step.title}</p>
                          <p className="text-agent-dim text-[11px]">{step.desc}</p>
                        </div>
                        <span className="text-agent-green text-[11px] px-1.5 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                          Selected
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.type === "diff" && item.diffData && (
                <div className="p-4 rounded-lg bg-[#080c14] border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-agent-border pb-2">
                    <div className="flex items-center space-x-2">
                      <ShieldAlert className="w-4 h-4 text-agent-accentBright" />
                      <span className="font-bold text-agent-accentBright">
                        STAGED UNIFIED DIFF APPROVAL
                      </span>
                      <span className="text-slate-400 font-mono text-xs">
                        ({item.diffData.file})
                      </span>
                    </div>
                    <span className="text-[11px] text-amber-400">Disk Untouched</span>
                  </div>

                  <div className="font-mono text-xs p-3 rounded bg-black/60 border border-agent-border/60 space-y-1">
                    {item.diffData.deletions.map((del, i) => (
                      <div key={i} className="text-rose-400 bg-rose-950/20 px-2 py-0.5 rounded">
                        {del}
                      </div>
                    ))}
                    {item.diffData.additions.map((add, i) => (
                      <div key={i} className="text-emerald-400 bg-emerald-950/20 px-2 py-0.5 rounded">
                        {add}
                      </div>
                    ))}
                  </div>

                  {/* Manual Approval Action */}
                  <div className="flex items-center space-x-3 pt-1">
                    <button
                      onClick={() => handleApproveDiff(item.id)}
                      className="px-3 py-1.5 text-xs font-mono rounded bg-emerald-600 hover:bg-emerald-500 text-white flex items-center space-x-1.5 font-semibold transition-all shadow-matrix"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>[y] Approve & Apply to Disk</span>
                    </button>
                    <button
                      onClick={() => handleRejectDiff(item.id)}
                      className="px-3 py-1.5 text-xs font-mono rounded bg-agent-card hover:bg-rose-950/40 border border-rose-500/40 text-rose-300 flex items-center space-x-1.5 transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>[n] Reject & Discard</span>
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {isProcessing && (
            <div className="flex items-center space-x-2 text-agent-accent text-xs">
              <span className="w-2 h-2 rounded-full bg-agent-accent animate-ping" />
              <span>PC Brew agent processing via OpenRouter tool loop...</span>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCommand(inputVal);
          }}
          className="p-3 bg-[#090d16] border-t border-agent-border flex items-center space-x-2"
        >
          <span className="text-agent-accentBright font-bold select-none pl-2">pcbrew ❯</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type /config, /agent, /plan, /ask, /cmd, /sysinfo..."
            className="flex-1 bg-transparent border-0 outline-none text-slate-100 placeholder:text-agent-dim text-xs sm:text-sm font-mono focus:ring-0"
          />
          <button
            type="submit"
            className="px-3 py-1.5 rounded bg-agent-accent hover:bg-agent-accentBright text-black font-bold text-xs flex items-center space-x-1 transition-all"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>EXEC</span>
          </button>
        </form>
      </div>
    </section>
  );
};
