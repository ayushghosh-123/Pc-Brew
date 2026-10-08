import type { WAMessage, WASocket } from "@whiskeysockets/baileys";
import { isWhatsAppOwner, setDynamicOwnerJid } from "./auth.ts";
import { WHATSAPP_WELCOME } from "./constants.ts";
import {
  executeSystemCommand,
  getSystemInfo,
  openLaptopTarget,
  listDirectory,
} from "./system.ts";
import {
  whatsappApprovalSessions,
  formatApprovalDiff,
} from "./approval.ts";
import {
  runWhatsAppAsk,
  runWhatsAppAgent,
  runWhatsAppPlan,
} from "./agent-run.ts";

export async function handleWhatsAppMessage(sock: WASocket, msg: WAMessage): Promise<void> {
  const remoteJid = msg.key.remoteJid;
  if (!remoteJid || !msg.message) return;

  const rawText =
    msg.message.conversation ||
    msg.message.extendedTextMessage?.text ||
    msg.message.imageMessage?.caption ||
    "";

  const text = rawText.trim();
  if (!text) return;

  const sendMsg = async (jid: string, content: string) => {
    await sock.sendMessage(jid, { text: content });
  };

  // Check authorization
  if (!isWhatsAppOwner(msg)) {
    // If the message is a pair request or owner registration
    if (text.startsWith("/auth") || text.startsWith("/claim")) {
      setDynamicOwnerJid(remoteJid);
      await sendMsg(
        remoteJid,
        "✅ Device claimed! You are now authorized as the laptop operator for this session.\n\nType `/help` to see commands."
      );
      return;
    }

    console.log(`[WhatsApp] Unauthorized message attempt from ${remoteJid}: "${text.slice(0, 50)}"`);
    await sendMsg(
      remoteJid,
      "⛔ *Unauthorized*\n\nThis bot controls a local laptop. Send `/auth` or `/claim` to claim owner access, or use your linked account."
    );
    return;
  }

  console.log(`[WhatsApp] Command received from ${remoteJid}: "${text}"`);

  // 1. Help & Welcome
  if (text === "/help" || text === "/start" || text.toLowerCase() === "help") {
    await sendMsg(remoteJid, WHATSAPP_WELCOME);
    return;
  }

  // 2. Laptop System Info
  if (text === "/sysinfo" || text === "/status") {
    await sendMsg(remoteJid, getSystemInfo());
    return;
  }

  // 3. Shell / Terminal Execution
  if (text.startsWith("/cmd ") || text.startsWith("/exec ") || text.startsWith("$ ")) {
    const cmd = text.replace(/^(\/cmd|\/exec|\$)\s+/, "").trim();
    if (!cmd) {
      await sendMsg(remoteJid, "Usage: `/cmd <command>` (e.g. `/cmd dir` or `/cmd git status`)");
      return;
    }

    await sendMsg(remoteJid, `⏳ Executing on laptop:\n\`${cmd}\`...`);
    const result = await executeSystemCommand(cmd);

    const outText = (result.stdout || result.stderr || "No output returned.").trim();
    const clippedOut = outText.length > 3000 ? outText.slice(0, 3000) + "\n\n... (output truncated)" : outText;

    const response = [
      `⚡ *Command:* \`${cmd}\``,
      `*Exit Code:* ${result.exitCode}`,
      "",
      "```",
      clippedOut,
      "```",
    ].join("\n");

    await sendMsg(remoteJid, response);
    return;
  }

  // 4. Open Target (App / File / URL)
  if (text.startsWith("/open ")) {
    const target = text.replace(/^\/open\s+/, "").trim();
    if (!target) {
      await sendMsg(remoteJid, "Usage: `/open <app or path or url>`");
      return;
    }
    const res = openLaptopTarget(target);
    await sendMsg(remoteJid, res.message);
    return;
  }

  // 5. List Directory
  if (text === "/ls" || text === "/dir" || text.startsWith("/ls ") || text.startsWith("/dir ")) {
    const dirArg = text.replace(/^(\/ls|\/dir)\s*/, "").trim();
    const listing = listDirectory(dirArg || undefined);
    await sendMsg(remoteJid, listing);
    return;
  }

  // 6. Diff & Approval Flow for AI Agent
  if (text === "/diff") {
    const session = whatsappApprovalSessions.get(remoteJid);
    if (!session || session.pending.length === 0) {
      await sendMsg(remoteJid, "No pending code modifications to review.");
      return;
    }
    await sendMsg(remoteJid, formatApprovalDiff(session.pending));
    return;
  }

  if (text === "/approve" || text === "/accept") {
    const session = whatsappApprovalSessions.get(remoteJid);
    if (!session || session.pending.length === 0) {
      await sendMsg(remoteJid, "No pending code modifications to approve.");
      return;
    }
    whatsappApprovalSessions.delete(remoteJid);
    for (const a of session.pending) {
      session.tracker.updateStatus(a.id, "approved", true);
    }
    const { errors } = session.executor.applyApprovedFromTracker();
    session.executor.clearStaging();

    if (errors.length > 0) {
      await sendMsg(remoteJid, `⚠️ Changes applied with errors:\n\n${errors.join("\n")}`);
    } else {
      await sendMsg(remoteJid, "✅ All staged changes have been applied to your laptop codebase.");
    }
    return;
  }

  if (text === "/reject") {
    const session = whatsappApprovalSessions.get(remoteJid);
    if (!session || session.pending.length === 0) {
      await sendMsg(remoteJid, "No pending changes to reject.");
      return;
    }
    whatsappApprovalSessions.delete(remoteJid);
    for (const a of session.pending) {
      session.tracker.updateStatus(a.id, "rejected", false);
    }
    session.executor.clearStaging();
    await sendMsg(remoteJid, "❌ Staged changes discarded. Nothing was applied.");
    return;
  }

  // 7. AI Codebase Commands
  if (text.startsWith("/ask ")) {
    const q = text.replace(/^\/ask\s+/, "").trim();
    if (!q) {
      await sendMsg(remoteJid, "Usage: `/ask <your question>`");
      return;
    }
    await sendMsg(remoteJid, `🔍 Researching: "${q}"...`);
    try {
      await runWhatsAppAsk(remoteJid, q, sendMsg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      await sendMsg(remoteJid, `❌ Error in Ask Mode: ${msg}`);
    }
    return;
  }

  if (text.startsWith("/agent ")) {
    const goal = text.replace(/^\/agent\s+/, "").trim();
    if (!goal) {
      await sendMsg(remoteJid, "Usage: `/agent <task description>`");
      return;
    }
    await sendMsg(remoteJid, `🤖 Agent is working on your laptop task: "${goal}"...`);
    try {
      await runWhatsAppAgent(remoteJid, goal, sendMsg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      await sendMsg(remoteJid, `❌ Error in Agent Mode: ${msg}`);
    }
    return;
  }

  if (text.startsWith("/plan ")) {
    const goal = text.replace(/^\/plan\s+/, "").trim();
    if (!goal) {
      await sendMsg(remoteJid, "Usage: `/plan <your goal>`");
      return;
    }
    await sendMsg(remoteJid, `📋 Generating plan for: "${goal}"...`);
    try {
      await runWhatsAppPlan(remoteJid, goal, sendMsg);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      await sendMsg(remoteJid, `❌ Error in Plan Mode: ${msg}`);
    }
    return;
  }

  // Default fallback for recognized message
  await sendMsg(
    remoteJid,
    `Unrecognized command: "${text}".\n\nSend \`/cmd <command>\` to run on laptop, or \`/help\` for commands.`
  );
}
