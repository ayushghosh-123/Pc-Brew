import type { ActionTracker } from "../agent/action-tracker.ts";
import type { ToolExecutor } from "../agent/tool-executor.ts";
import type { ActionLog } from "../agent/types.ts";
import { composeBeforeAfter, formatPatch } from "../agent/diff-view.ts";

export interface WhatsAppApprovalSession {
  tracker: ActionTracker;
  executor: ToolExecutor;
  pending: ActionLog[];
}

export const whatsappApprovalSessions = new Map<string, WhatsAppApprovalSession>();

function groupPending(pending: ActionLog[]) {
  const files = new Map<string, ActionLog[]>();
  const shells: ActionLog[] = [];
  for (const a of pending) {
    if (a.type === "tool_execute") shells.push(a);
    else {
      if (!files.has(a.path)) files.set(a.path, []);
      files.get(a.path)!.push(a);
    }
  }
  return { files, shells };
}

export function formatApprovalSummary(pending: ActionLog[]): string {
  const { files, shells } = groupPending(pending);
  const fileLines = [...files].map(([filePath, actions]) => {
    const types = [...new Set(actions.map((a) => a.type.replace(/_/g, " ")))].join(", ");
    return `• \`${filePath}\` (${types})`;
  });
  const shellLines = shells.map((s) => `• Shell: \`${s.details.command}\``);

  return [
    "⚠️ *Staged changes require your approval:*",
    "",
    ...fileLines,
    ...shellLines,
    "",
    `Total: ${pending.length} change(s).`,
    "",
    "Reply with:",
    "• `/diff` — Preview code diff",
    "• `/approve` — Apply all changes to laptop",
    "• `/reject` — Discard all changes",
  ].join("\n");
}

export function formatApprovalDiff(pending: ActionLog[]): string {
  const { files, shells } = groupPending(pending);
  const parts: string[] = [];

  for (const [filePath, actions] of files) {
    const sorted = [...actions].sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
    const { before, after } = composeBeforeAfter(sorted);
    const patch = formatPatch(filePath, before, after);
    const clippedPatch = patch.length > 2500 ? patch.slice(0, 2500) + "\n... (truncated)" : patch;
    parts.push(`\`\`\`\n${clippedPatch}\n\`\`\``);
  }

  for (const s of shells) {
    parts.push(`*Shell:* \`${s.details.command}\``);
  }

  return parts.length > 0 ? parts.join("\n\n") : "No diff to display.";
}

export async function finishOrApproveWhatsApp(
  jid: string,
  tracker: ActionTracker,
  executor: ToolExecutor,
  noChangesMsg: string,
  sendMessage: (jid: string, text: string) => Promise<unknown>
): Promise<void> {
  const pending = tracker.getPendingMutations();
  if (pending.length === 0) {
    await sendMessage(jid, noChangesMsg);
    return;
  }

  whatsappApprovalSessions.set(jid, { tracker, executor, pending });
  await sendMessage(jid, formatApprovalSummary(pending));
}
