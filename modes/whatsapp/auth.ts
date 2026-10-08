import type { WAMessage } from "@whiskeysockets/baileys";

let dynamicOwnerJid: string | null = null;

export function setDynamicOwnerJid(jid: string): void {
  dynamicOwnerJid = jid;
}

export function isWhatsAppOwner(msg: WAMessage): boolean {
  // If sent from the linked account itself (e.g. "Message yourself" / note to self)
  if (msg.key.fromMe) {
    return true;
  }

  const remoteJid = msg.key.remoteJid ?? "";
  if (!remoteJid || remoteJid.endsWith("@g.us") || remoteJid === "status@broadcast") {
    // Ignore group messages or broadcast statuses for system control by default
    return false;
  }

  // Check dynamic owner JID (if paired in this session)
  if (dynamicOwnerJid && remoteJid === dynamicOwnerJid) {
    return true;
  }

  // Check WHATSAPP_OWNER_NUMBER from environment (if provided)
  const configuredNumber = process.env.WHATSAPP_OWNER_NUMBER?.replace(/[^0-9]/g, "");
  if (configuredNumber) {
    const senderNumber = remoteJid.split("@")[0]?.replace(/[^0-9]/g, "");
    return senderNumber === configuredNumber;
  }

  // If no specific owner number is configured and not fromMe, allow pairing on first message or self-use
  return false;
}
