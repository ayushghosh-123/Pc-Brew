import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import chalk from "chalk";
import figlet from "figlet";
import { renderTerminalMarkdown } from "./terminal-md";
import { getAgentModel } from "../ai";
import { ActionTracker } from "../modes/agent/action-tracker";
import { ToolExecutor } from "../modes/agent/too-executer";
import { createAgentTools } from "../modes/agent/agent-tools";
import { defaultAgentConfig } from "../modes/agent/types";
import { runApprovalFlow } from "../modes/agent/approval";
import { generatePlan } from "../modes/plan/planner";
import { printPlan } from "../modes/plan/selection";
import { executeSystemCommand, getSystemInfo } from "../modes/whatsapp/system";
import { runwakeup } from "./wakeup";
import { ToolLoopAgent, stepCountIs, tool } from "ai";
import { z } from "zod";
import { createWebTools } from "../modes/plan/web-tools";
import { runInteractiveSetup } from "../config/setup";

const THEME_ACCENT = chalk.hex("#b68f2dff");
const THEME_FACE = chalk.hex("#fbfbfbff").bold;

function printAgenticBanner(): void {
  try {
    const ascii = figlet.textSync("PC Brew", { font: "ANSI Shadow" });
    const bannerLines = ascii.replace(/\s+$/, "").split("\n");
    const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
    const rowWidth = maxLen + 2;

    for (const line of bannerLines) {
      console.log(THEME_ACCENT("  " + line.padEnd(rowWidth)));
    }
    process.stdout.write(`\x1b[${bannerLines.length}A`);
    for (const line of bannerLines) {
      console.log(THEME_FACE(line.padEnd(rowWidth)));
    }
    console.log();
  } catch {
    console.log(THEME_FACE("=== PC Brew Agentic Terminal ==="));
  }

  console.log(chalk.dim("  Agentic Workspace Terminal • Type ") + chalk.bold.cyan("/help") + chalk.dim(" for slash commands\n"));
}

function showHelp(): void {
  console.log([
    THEME_ACCENT.bold("💡 Available Slash Commands:"),
    `  ${chalk.cyan("/plan <goal>")}    — Generate a step-by-step implementation plan`,
    `  ${chalk.cyan("/agent <task>")}   — Run autonomous agent on codebase (with staged approvals)`,
    `  ${chalk.cyan("/ask <question>")} — Query AI about codebase & architecture`,
    `  ${chalk.cyan("/cmd <command>")}  — Execute terminal command directly ($ <command> works too)`,
    `  ${chalk.cyan("/sysinfo")}        — Show laptop system telemetry (RAM, CPU, battery, OS)`,
    `  ${chalk.cyan("/config")}         — Configure API keys step-by-step (OpenRouter, Telegram, WhatsApp)`,
    `  ${chalk.cyan("/mode")}           — Open the full TUI Wakeup menu (CLI / Telegram / WhatsApp)`,
    `  ${chalk.cyan("/clear")}          — Clear the terminal screen`,
    `  ${chalk.cyan("/exit")}           — Quit the agentic terminal session`,
    "",
    chalk.dim("Tip: You can also type natural language directly to ask questions or give instructions!"),
    "",
  ].join("\n"));
}

async function handleTerminalAsk(question: string): Promise<void> {
  const config = defaultAgentConfig();
  config.tools.allowFileCreation = false;
  config.tools.allowFileModification = false;
  config.tools.allowFolderCreation = false;
  config.tools.allowShellExecution = false;

  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);

  const tools = {
    read_file: tool({
      description: "Read a text file from the workspace.",
      inputSchema: z.object({ path: z.string() }),
      execute: async ({ path: p }) => executor.readFile(p),
    }),
    list_files: tool({
      description: "List files and directories under a path.",
      inputSchema: z.object({ path: z.string(), recursive: z.boolean().optional().default(false) }),
      execute: async ({ path: p, recursive }) => executor.listFiles(p, recursive),
    }),
    search_files: tool({
      description: "Find files matching a glob pattern.",
      inputSchema: z.object({ root: z.string(), pattern: z.string(), content_contains: z.string().optional() }),
      execute: async ({ root, pattern, content_contains }) => executor.searchFiles(root, pattern, content_contains),
    }),
    analyze_codebase: tool({
      description: "Summarize structure: file counts, size, extensions.",
      inputSchema: z.object({ path: z.string().default(".") }),
      execute: async ({ path: p }) => executor.analyzeCodebase(p),
    }),
    ...(process.env.FIRECRAWL_API_KEY ? createWebTools(tracker) : {}),
  };

  const agent = new ToolLoopAgent({
    model: getAgentModel(),
    stopWhen: stepCountIs(20),
    tools,
  });

  process.stdout.write(chalk.dim("Thinking...\n"));
  const result = await agent.generate({ prompt: question });
  const answer = result.text?.trim() || "(no answer returned)";
  console.log("\n" + renderTerminalMarkdown(answer) + "\n");
}

async function handleTerminalAgent(goal: string): Promise<void> {
  const config = defaultAgentConfig();
  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);
  const tools = createAgentTools(executor);

  const agent = new ToolLoopAgent({
    model: getAgentModel(),
    stopWhen: stepCountIs(40),
    instructions: [
      `Workspace root: ${config.codebasePath}`,
      "All file mutations must be staged until user approval.",
    ].join("\n"),
    tools,
  });

  console.log(chalk.dim("Agent starting task...\n"));
  const result = await agent.generate({
    prompt: goal,
    onStepFinish: ({ toolCalls }) => {
      for (const tc of toolCalls) {
        const preview = JSON.stringify(tc.input).slice(0, 120);
        console.log(
          chalk.green("  ✓"),
          chalk.bold(String(tc.toolName)),
          chalk.dim(preview + (preview.length >= 120 ? "..." : ""))
        );
      }
    },
  });

  if (result.text?.trim()) {
    console.log("\n" + renderTerminalMarkdown(result.text) + "\n");
  }

  const ok = await runApprovalFlow(tracker);
  if (!ok) {
    executor.clearStaging();
    console.log(chalk.yellow("Changes discarded.\n"));
    return;
  }

  const { errors } = executor.applyApprovedFromTracker();
  if (errors.length) {
    console.log(chalk.red("\nErrors during application:"));
    for (const e of errors) console.log(chalk.red(`  • ${e}`));
  } else {
    console.log(chalk.green("\n✓ All approved changes applied.\n"));
  }

  executor.clearStaging();
}

export async function startAgenticTerminal(): Promise<void> {
  printAgenticBanner();

  const rl = readline.createInterface({ input, output });

  try {
    while (true) {
      const line = await rl.question(chalk.bold.hex("#b68f2dff")("pcbrew > "));
      const trimmed = line.trim();

      if (!trimmed) continue;

      if (trimmed === "/exit" || trimmed === "exit" || trimmed === "quit" || trimmed === ":q") {
        console.log(chalk.dim("\nGoodbye!\n"));
        break;
      }

      if (trimmed === "/help" || trimmed === "help" || trimmed === "?") {
        showHelp();
        continue;
      }

      if (trimmed === "/clear" || trimmed === "clear" || trimmed === "cls") {
        console.clear();
        printAgenticBanner();
        continue;
      }

      if (trimmed === "/sysinfo" || trimmed === "/status") {
        console.log("\n" + getSystemInfo() + "\n");
        continue;
      }

      if (trimmed === "/mode" || trimmed === "/wakeup") {
        await runwakeup();
        continue;
      }

      if (trimmed === "/config" || trimmed === "/setup") {
        await runInteractiveSetup();
        continue;
      }

      if (trimmed.startsWith("/cmd ") || trimmed.startsWith("/exec ") || trimmed.startsWith("$ ")) {
        const cmd = trimmed.replace(/^(\/cmd|\/exec|\$)\s+/, "").trim();
        if (!cmd) {
          console.log(chalk.yellow("Usage: /cmd <command>\n"));
          continue;
        }
        console.log(chalk.dim(`Executing: ${cmd}...`));
        const res = await executeSystemCommand(cmd);
        if (res.stdout) console.log(res.stdout);
        if (res.stderr) console.error(chalk.red(res.stderr));
        console.log(chalk.dim(`(exit code: ${res.exitCode})\n`));
        continue;
      }

      if (trimmed.startsWith("/plan ")) {
        const goal = trimmed.replace(/^\/plan\s+/, "").trim();
        if (!goal) {
          console.log(chalk.yellow("Usage: /plan <goal>\n"));
          continue;
        }
        console.log(chalk.dim("Generating plan..."));
        try {
          const plan = await generatePlan(goal);
          printPlan(plan);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.log(chalk.red(`Error generating plan: ${msg}\n`));
        }
        continue;
      }

      if (trimmed.startsWith("/agent ")) {
        const goal = trimmed.replace(/^\/agent\s+/, "").trim();
        if (!goal) {
          console.log(chalk.yellow("Usage: /agent <task>\n"));
          continue;
        }
        try {
          await handleTerminalAgent(goal);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.log(chalk.red(`Error in agent: ${msg}\n`));
        }
        continue;
      }

      if (trimmed.startsWith("/ask ")) {
        const question = trimmed.replace(/^\/ask\s+/, "").trim();
        if (!question) {
          console.log(chalk.yellow("Usage: /ask <question>\n"));
          continue;
        }
        try {
          await handleTerminalAsk(question);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          console.log(chalk.red(`Error: ${msg}\n`));
        }
        continue;
      }

      // Default: Natural language input routes to ask or agent
      try {
        await handleTerminalAsk(trimmed);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        console.log(chalk.red(`Error: ${msg}\n`));
      }
    }
  } finally {
    rl.close();
  }
}
