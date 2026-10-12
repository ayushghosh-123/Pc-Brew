import { StateGraph, Annotation, START, END } from "@langchain/langgraph";
import { generateText, type ModelMessage, type ToolModelMessage, type ToolResultPart } from "ai";
import chalk from "chalk";
import { getAgentModel } from "../../ai";
import type { AgentConfig } from "./types";
import type { createAgentTools } from "./agent-tools";

export interface PendingToolCall {
  id: string;
  toolName: string;
  input: Record<string, unknown>;
}

export const AgentStateAnnotation = Annotation.Root({
  messages: Annotation<ModelMessage[]>({
    reducer: (curr, update) => curr.concat(update),
    default: () => [],
  }),
  stepCount: Annotation<number>({
    reducer: (curr, update) => curr + update,
    default: () => 0,
  }),
  finalResponse: Annotation<string>({
    reducer: (_, next) => next,
    default: () => "",
  }),
  pendingToolCalls: Annotation<PendingToolCall[]>({
    reducer: (_, next) => next,
    default: () => [],
  }),
});

export type AgentGraphState = typeof AgentStateAnnotation.State;

export interface RunLangGraphAgentOptions {
  goal: string;
  tools: ReturnType<typeof createAgentTools>;
  config: AgentConfig;
  maxSteps?: number;
}

export async function runLangGraphAgent(options: RunLangGraphAgentOptions): Promise<{
  finalResponse: string;
  stepCount: number;
  messages: ModelMessage[];
}> {
  const { goal, tools, config, maxSteps = 40 } = options;

  const systemPrompt = [
    `You are an autonomous software engineering agent powered by LangGraph operating on workspace: ${config.codebasePath}`,
    "CAPABILITIES:",
    "- File CRUD: create_file, read_file, modify_file, delete_file, move_file",
    "- Folder CRUD: create_folder, delete_folder, list_files",
    "- Search & Analysis: search_files, analyze_codebase",
    "- Skills & System: list_skills, read_skill, execute_shell",
    "",
    "SAFETY & STAGING POLICY:",
    "- All file/folder mutations and shell commands are STAGED IN-MEMORY overlay until human review and approval.",
    "- Read files before proposing modifications.",
    "- Do not invent files that do not exist; check directory structure first.",
    "- When you finish all requested operations or have answered the user, conclude with a clear summary.",
  ].join("\n");

  const workflow = new StateGraph(AgentStateAnnotation)
    .addNode("reasoner", async (state) => {
      const response = await generateText({
        model: getAgentModel(),
        system: systemPrompt,
        messages: state.messages,
        tools: tools as any,
      });

      const toolCalls = response.toolCalls ?? [];

      if (toolCalls.length > 0) {
        for (const tc of toolCalls) {
          const preview = JSON.stringify(tc.input).slice(0, 160);
          console.log(
            chalk.cyan("  ⚙ [LangGraph]"),
            chalk.bold(String(tc.toolName)),
            chalk.dim(preview + (preview.length >= 160 ? "..." : "")),
          );
        }

        const pending: PendingToolCall[] = toolCalls.map((tc) => ({
          id: tc.toolCallId,
          toolName: tc.toolName,
          input: (tc.input as Record<string, unknown>) ?? {},
        }));

        const assistantMsg: ModelMessage = {
          role: "assistant",
          content: [
            ...(response.text ? [{ type: "text" as const, text: response.text }] : []),
            ...toolCalls.map((tc) => ({
              type: "tool-call" as const,
              toolCallId: tc.toolCallId,
              toolName: tc.toolName,
              input: tc.input,
            })),
          ],
        };

        return {
          messages: [assistantMsg],
          stepCount: 1,
          pendingToolCalls: pending,
          finalResponse: response.text ?? "",
        };
      }

      const assistantMsg: ModelMessage = {
        role: "assistant",
        content: response.text || "Task completed successfully.",
      };

      return {
        messages: [assistantMsg],
        stepCount: 1,
        pendingToolCalls: [],
        finalResponse: response.text ?? "",
      };
    })
    .addNode("tools", async (state) => {
      const toolResults: ToolResultPart[] = [];

      for (const tc of state.pendingToolCalls) {
        const toolObj = (tools as Record<string, any>)[tc.toolName];
        let resultOutput: string;

        if (toolObj && typeof toolObj.execute === "function") {
          try {
            const raw = await toolObj.execute(tc.input);
            resultOutput = typeof raw === "string" ? raw : JSON.stringify(raw);
          } catch (err: any) {
            resultOutput = `Error: ${err.message || String(err)}`;
          }
        } else {
          resultOutput = `Error: Tool '${tc.toolName}' is not defined.`;
        }

        toolResults.push({
          type: "tool-result",
          toolCallId: tc.id,
          toolName: tc.toolName,
          output: {
            type: "text",
            value: resultOutput,
          },
        });
      }

      const toolMsg: ToolModelMessage = {
        role: "tool",
        content: toolResults,
      };

      return {
        messages: [toolMsg],
        pendingToolCalls: [],
      };
    })
    .addEdge(START, "reasoner")
    .addConditionalEdges("reasoner", (state) => {
      if (state.pendingToolCalls.length > 0 && state.stepCount < maxSteps) {
        return "tools";
      }
      return END;
    })
    .addEdge("tools", "reasoner");

  const app = workflow.compile();

  const finalState = await app.invoke({
    messages: [{ role: "user", content: goal }],
    stepCount: 0,
    finalResponse: "",
    pendingToolCalls: [],
  });

  return {
    finalResponse: finalState.finalResponse,
    stepCount: finalState.stepCount,
    messages: finalState.messages,
  };
}
