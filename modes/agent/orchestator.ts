import { isCancel, text } from "@clack/prompts";
import chalk from "chalk";
import { defaultAgentConfig } from "./types";
import { ActionTracker } from "./action-tracker";
import { ToolExecutor } from "./too-executer";
import { createAgentTools } from "./agent-tools";
import { renderTerminalMarkdown } from "../../tui/terminal-md";
import { runApprovalFlow } from "./approval";
import { runLangGraphAgent } from "./langgraph-agent";

export async function runAgentMode() {
  console.log(chalk.bold("\n🤖 Agent Mode (Powered by LangGraph)\n"));

  const goal = await text({
    message: "What would you like the agent to do?",
    placeholder: "Concrete task for this codebase…",
  });

  if (isCancel(goal) || !goal.trim()) return;

  const config = defaultAgentConfig();
  const tracker = new ActionTracker();
  const executor = new ToolExecutor(tracker, config);
  const tools = createAgentTools(executor);

  const result = await runLangGraphAgent({
    goal: goal.trim(),
    tools,
    config,
    maxSteps: 40,
  });

  if (result.finalResponse?.trim()) console.log(renderTerminalMarkdown(result.finalResponse));

  const ok = await runApprovalFlow(tracker);
  if (!ok) return executor.clearStaging();

  const { errors } = executor.applyApprovedFromTracker();

  if (errors.length) {
    console.log(chalk.red("\nSome operations reported errors:\n"));
    for (const e of errors) console.log(chalk.red(`  • ${e}`));
  }
  else{
   console.log(chalk.green('\n✓ Applied.\n'));
  }

  executor.clearStaging()
}