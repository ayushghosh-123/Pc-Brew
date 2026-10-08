import { tool, ToolLoopAgent, stepCountIs } from "ai";
import { z } from "zod";
import { getAgentModel } from "../../ai/ai.config.ts";
import { ActionTracker } from "../agent/action-tracker.ts";
import { ToolExecutor } from "../agent/tool-executor.ts";
import { createAgentTools } from "../agent/agent-tools.ts";
import { defaultAgentConfig, type AgentConfig } from "../agent/types.ts";
import { createWebTools } from "../plan/web-tools.ts";
import { generatePlan } from "../plan/planner.ts";
import { finishOrApproveWhatsApp } from "./approval.ts";

function readOnlyConfig(): AgentConfig {
  const c = defaultAgentConfig();
  c.tools.allowFileCreation = false;
  c.tools.allowFileModification = false;
  c.tools.allowFolderCreation = false;
  c.tools.allowShellExecution = false;
  return c;
}

function agentOptions(config: AgentConfig, maxSteps: number) {
  return {
    model: getAgentModel(),
    stopWhen: stepCountIs(maxSteps),
    instructions: `Workspace root: ${config.codebasePath}`,
  };
}

function createReadOnlyTools(executor: ToolExecutor) {
  return {
    read_file: tool({
      description: "Read a workspace file (relative path).",
      inputSchema: z.object({ path: z.string() }),
      execute: async ({ path: p }) => executor.readFile(p),
    }),
    list_files: tool({
      description: "List files/dirs at a path.",
      inputSchema: z.object({
        path: z.string(),
        recursive: z.boolean().optional().default(false),
      }),
      execute: async ({ path: p, recursive }) =>
        executor.listFiles(p, recursive),
    }),
    search_files: tool({
      description:
        "Find files matching a glob pattern; optional content filter.",
      inputSchema: z.object({
        root: z.string(),
        pattern: z.string(),
        content_contains: z.string().optional(),
      }),
      execute: async ({ root, pattern, content_contains }) =>
        executor.searchFiles(root, pattern, content_contains),
    }),
    analyze_codebase: tool({
      description: "Summarize the codebase structure.",
      inputSchema: z.object({ path: z.string().default(".") }),
      execute: async ({ path: p }) => executor.analyzeCodebase(p),
    }),
  };
}

function extraWebTools(tracker: ActionTracker) {
  return process.env.FIRECRAWL_API_KEY ? createWebTools(tracker) : {};
}

function clipMessage(text: string, max = 3500): string {
  if (text.length <= max) return text;
  return text.slice(0, max) + "\n\n... (truncated for WhatsApp)";
}

export async function runWhatsAppAsk(
  jid: string,
  question: string,
  sendMsg: (jid: string, text: string) => Promise<unknown>
): Promise<void> {
  const config = readOnlyConfig();
  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);
  const tools = { ...createReadOnlyTools(executor), ...extraWebTools(tracker) };

  const agent = new ToolLoopAgent({
    ...agentOptions(config, 20),
    tools,
  });

  const { text } = await agent.generate({ prompt: question });
  await sendMsg(jid, clipMessage(text || "No response generated."));
}

export async function runWhatsAppAgent(
  jid: string,
  goal: string,
  sendMsg: (jid: string, text: string) => Promise<unknown>
): Promise<void> {
  const config = defaultAgentConfig();
  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);
  const tools = createAgentTools(executor);

  const agent = new ToolLoopAgent({
    ...agentOptions(config, 40),
    tools,
  });

  const { text } = await agent.generate({ prompt: goal });
  if (text?.trim()) {
    await sendMsg(jid, clipMessage(text.trim()));
  }

  await finishOrApproveWhatsApp(
    jid,
    tracker,
    executor,
    "✅ Agent task complete. No file changes needed.",
    sendMsg
  );
}

export async function runWhatsAppPlan(
  jid: string,
  goal: string,
  sendMsg: (jid: string, text: string) => Promise<unknown>
): Promise<void> {
  const plan = await generatePlan(goal);
  const stepsList = plan.steps
    .map((s, idx) => `*${idx + 1}. ${s.title}*\n${s.description}`)
    .join("\n\n");

  const responseText = [
    `📋 *Plan Generated: ${plan.goal}*`,
    "",
    stepsList,
    "",
    "To execute this plan with the agent, send:",
    `\`/agent ${plan.goal}\``,
  ].join("\n");

  await sendMsg(jid, clipMessage(responseText));
}
