"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { RotateCcw, Cpu, ShieldAlert, Check, X, Play, Coffee } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/ui/button";

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
  const [inputVal, setInputVal] = React.useState("");
  const [history, setHistory] = React.useState<TerminalLine[]>([
    {
      id: "init-banner",
      type: "system",
      content: ASCII_BANNER,
    },
    {
      id: "init-welcome",
      type: "system",
      content:
        "PC BREW Agentic Terminal initialized • Ready for commands\n✦ Type /help or click any preset below to test autonomous workflows.\n✦ Type /config to run the interactive step-by-step API setup wizard.",
    },
  ]);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const terminalEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim();
    if (!trimmed) return;

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

    if (
      lower === "/config" ||
      lower === "config" ||
      lower === "/setup" ||
      lower === "setup"
    ) {
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
      const goal =
        cmd.replace(/^(\/plan|plan)\s*/, "").trim() ||
        "Automated Resume Matcher & Scraper";
      setHistory((prev) => [
        ...prev,
        {
          id: `plan-${Date.now()}`,
          type: "plan",
          planData: {
            goal,
            steps: [
              {
                id: "S1",
                title: "Target Architecture",
                desc: "Scan job listings schema and config",
                selected: true,
              },
              {
                id: "S2",
                title: "Web Discovery",
                desc: "Invoke Firecrawl scrape tool for portal listings",
                selected: true,
              },
              {
                id: "S3",
                title: "AI Filtering",
                desc: "Pass raw requirements to OpenRouter LLM",
                selected: true,
              },
              {
                id: "S4",
                title: "Telegram Dispatch",
                desc: "Push ranked matches to Telegram bot with alert button",
                selected: true,
              },
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

    if (
      lower.startsWith("/cmd") ||
      lower.startsWith("$") ||
      lower.startsWith("cmd")
    ) {
      const execStr =
        cmd.replace(/^(\/cmd|\$|cmd)\s*/, "").trim() || "dir";
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

    setHistory((prev) => [
      ...prev,
      {
        id: `def-${Date.now()}`,
        type: "output",
        content: `Executed: "${cmd}"
Use /help to see all commands or /config to test API settings.`,
      },
    ]);
  };

  const handleApproveDiff = (id: string) => {
    setHistory((prev) => [
      ...prev.filter((i) => i.id !== id),
      {
        id: `approved-${Date.now()}`,
        type: "output",
        content: `✅ Diff approved by user! Committed patch to modes/agent/too-executer.ts [2 additions, 2 deletions]. Filesystem updated.`,
      },
    ]);
  };

  const handleRejectDiff = (id: string) => {
    setHistory((prev) => [
      ...prev.filter((i) => i.id !== id),
      {
        id: `rejected-${Date.now()}`,
        type: "output",
        content: `❌ Diff rejected and discarded from virtual memory. Local files remained completely untouched.`,
      },
    ]);
  };

  return (
    <Section id="simulator" className="py-16 border-b border-border-subtle">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <span className="font-mono text-xs font-[700] uppercase tracking-wider text-coral block mb-1">
            Live Console
          </span>
          <h2 className="font-display font-[750] text-2xl sm:text-3xl text-primary leading-tight">
            Interactive Agent Terminal
          </h2>
          <p className="text-secondary text-sm mt-1 max-w-[60ch]">
            Test autonomous agent reasoning, interactive diff approvals, and plan generation directly in your browser.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleCommand("/clear")}
          className="self-start sm:self-auto gap-1.5 font-mono text-xs"
        >
          <RotateCcw className="h-3.5 w-3.5 text-muted" />
          <span>Clear Buffer</span>
        </Button>
      </div>

      {/* Quick Chips */}
      <div className="mb-4 flex flex-wrap items-center gap-2 font-mono text-xs">
        <span className="text-muted mr-1">Quick Run:</span>
        <button
          type="button"
          onClick={() => handleCommand("/config")}
          className="px-2.5 py-1 rounded-[4px] border border-border-subtle bg-card hover:bg-surface hover:border-coral text-secondary hover:text-primary transition-all"
        >
          ⚙️ /config (API Setup)
        </button>
        <button
          type="button"
          onClick={() => handleCommand("/agent Optimize error handling")}
          className="px-2.5 py-1 rounded-[4px] border border-border-subtle bg-card hover:bg-surface hover:border-coral text-secondary hover:text-coral transition-all"
        >
          ⚡ /agent (Staged Diff)
        </button>
        <button
          type="button"
          onClick={() => handleCommand("/plan Build remote WhatsApp controller")}
          className="px-2.5 py-1 rounded-[4px] border border-border-subtle bg-card hover:bg-surface hover:border-sea-green text-secondary hover:text-sea-green transition-all"
        >
          📋 /plan (Execution Roadmap)
        </button>
        <button
          type="button"
          onClick={() =>
            handleCommand(
              "/ask How does authorization work in Telegram and WhatsApp?"
            )
          }
          className="px-2.5 py-1 rounded-[4px] border border-border-subtle bg-card hover:bg-surface hover:border-coral text-secondary hover:text-primary transition-all"
        >
          🧠 /ask (Codebase Q&A)
        </button>
        <button
          type="button"
          onClick={() => handleCommand("/sysinfo")}
          className="px-2.5 py-1 rounded-[4px] border border-border-subtle bg-card hover:bg-surface hover:border-coral text-secondary hover:text-primary transition-all"
        >
          💻 /sysinfo (Host Telemetry)
        </button>
        <button
          type="button"
          onClick={() => handleCommand("/help")}
          className="px-2.5 py-1 rounded-[4px] border border-border-subtle bg-card hover:bg-surface hover:border-coral text-secondary hover:text-primary transition-all"
        >
          💡 /help
        </button>
      </div>

      {/* Terminal Window Box */}
      <Card className="border-border-subtle bg-surface shadow-lg overflow-hidden font-mono">
        {/* Window Titlebar */}
        <div className="bg-elevated px-4 py-2.5 border-b border-border-subtle flex items-center justify-between text-xs select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-status-error inline-block opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-status-warning inline-block opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-status-success inline-block opacity-80" />
            <span className="ml-2 font-mono text-secondary font-medium">
              pcbrew — agentic-terminal — 120x35
            </span>
          </div>

          <div className="flex items-center gap-3 text-muted text-[11px]">
            <span className="hidden sm:flex items-center gap-1">
              <Cpu className="h-3.5 w-3.5 text-sea-green" />
              <span>Bun v1.4.2 Native</span>
            </span>
            <span className="px-2 py-0.5 rounded-[4px] border border-status-success/30 bg-status-success/10 text-status-success font-bold text-[10px]">
              OPENROUTER READY
            </span>
          </div>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-4 sm:p-6 min-h-[360px] max-h-[500px] overflow-y-auto space-y-3.5 text-xs sm:text-[13px] bg-page">
          {history.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
            >
              {item.type === "system" && (
                <pre className="text-coral font-bold leading-tight select-none overflow-x-auto whitespace-pre">
                  {item.content}
                </pre>
              )}

              {item.type === "input" && (
                <div className="flex items-start gap-2 text-primary">
                  <span className="text-coral font-bold select-none">pcbrew ❯</span>
                  <span className="text-sea-green font-medium">{item.content}</span>
                </div>
              )}

              {item.type === "output" && (
                <pre className="text-secondary whitespace-pre-wrap leading-relaxed bg-surface/80 p-3 rounded-[6px] border border-border-subtle font-mono">
                  {item.content}
                </pre>
              )}

              {item.type === "plan" && item.planData && (
                <div className="p-4 rounded-[6px] bg-surface border border-sea-green/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                    <span className="text-sea-green font-bold flex items-center gap-2">
                      <span>📋 GENERATED PLAN:</span>
                      <span className="text-primary">{item.planData.goal}</span>
                    </span>
                    <span className="text-[11px] text-muted">4 steps proposed</span>
                  </div>
                  <div className="space-y-2">
                    {item.planData.steps.map((step) => (
                      <div
                        key={step.id}
                        className="flex items-start gap-3 p-2 rounded-[4px] bg-elevated border border-border-subtle text-xs"
                      >
                        <span className="text-sea-green font-bold">{step.id}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-primary">{step.title}</p>
                          <p className="text-muted text-[11px]">{step.desc}</p>
                        </div>
                        <span className="text-status-success text-[10px] px-1.5 py-0.5 rounded-[4px] border border-status-success/30 bg-status-success/10 font-bold">
                          Selected
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.type === "diff" && item.diffData && (
                <div className="p-4 rounded-[6px] bg-surface border border-coral/40 space-y-3">
                  <div className="flex items-center justify-between border-b border-border-subtle pb-2">
                    <div className="flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-coral" />
                      <span className="font-bold text-coral">
                        STAGED UNIFIED DIFF APPROVAL
                      </span>
                      <span className="text-muted font-mono text-xs">
                        ({item.diffData.file})
                      </span>
                    </div>
                    <span className="text-[11px] text-coral font-bold">Disk Untouched</span>
                  </div>

                  <div className="font-mono text-xs p-3 rounded-[4px] bg-page border border-border-subtle space-y-1">
                    {item.diffData.deletions.map((del, i) => (
                      <div
                        key={i}
                        className="text-status-error bg-status-error/10 px-2 py-0.5 rounded-[2px]"
                      >
                        {del}
                      </div>
                    ))}
                    {item.diffData.additions.map((add, i) => (
                      <div
                        key={i}
                        className="text-status-success bg-status-success/10 px-2 py-0.5 rounded-[2px]"
                      >
                        {add}
                      </div>
                    ))}
                  </div>

                  {/* Manual Approval Action */}
                  <div className="flex items-center gap-2 pt-1">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleApproveDiff(item.id)}
                      className="gap-1.5 font-mono text-xs"
                    >
                      <Check className="h-3.5 w-3.5" />
                      <span>[y] Approve & Apply to Disk</span>
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => handleRejectDiff(item.id)}
                      className="gap-1.5 font-mono text-xs text-status-error hover:text-status-error border-status-error/40 bg-status-error/10"
                    >
                      <X className="h-3.5 w-3.5" />
                      <span>[n] Reject & Discard</span>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}

          {isProcessing && (
            <div className="flex items-center gap-2 text-coral text-xs">
              <span className="w-2 h-2 rounded-full bg-coral animate-ping" />
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
          className="p-3 bg-elevated border-t border-border-subtle flex items-center gap-2"
        >
          <span className="text-coral font-bold select-none pl-2 font-mono text-xs sm:text-sm">
            pcbrew ❯
          </span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type /config, /agent, /plan, /ask, /cmd, /sysinfo..."
            className="flex-1 bg-transparent border-0 outline-none text-primary placeholder:text-muted/60 text-xs sm:text-sm font-mono focus:ring-0"
          />
          <Button type="submit" variant="primary" size="sm" className="gap-1 font-mono text-xs">
            <Play className="h-3 w-3 fill-current" />
            <span>EXEC</span>
          </Button>
        </form>
      </Card>
    </Section>
  );
};
