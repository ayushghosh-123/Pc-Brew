import makeWASocket, {
  useMultiFileAuthState,
  DisconnectReason,
  type WASocket,
} from "@whiskeysockets/baileys";
import qrcode from "qrcode-terminal";
import pino from "pino";
import chalk from "chalk";
import path from "node:path";
import { handleWhatsAppMessage } from "./handlers.ts";

export async function runWhatsAppMode(): Promise<void> {
  const authDir = path.resolve(process.cwd(), ".whatsapp_auth");

  console.log(chalk.bold.cyan("\n📱 Starting WhatsApp Laptop Controller Mode..."));
  console.log(chalk.dim(`Session directory: ${authDir}\n`));

  let isStopping = false;

  async function startSocket(): Promise<WASocket> {
    const { state, saveCreds } = await useMultiFileAuthState(authDir);

    const sock = makeWASocket({
      auth: state,
      logger: pino({ level: "silent" }),
    });

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        console.log(chalk.cyan("\n======================================================="));
        console.log(chalk.bold.yellow("📲 Scan the QR code below with WhatsApp to connect:"));
        console.log(chalk.dim("On your phone: WhatsApp > Settings > Linked Devices > Link a Device"));
        console.log(chalk.cyan("=======================================================\n"));
        qrcode.generate(qr, { small: true });
        console.log(chalk.dim("\nWaiting for WhatsApp scan...\n"));
      }

      if (connection === "open") {
        console.log(chalk.bold.green("\n✅ WhatsApp connected successfully!"));
        console.log(chalk.green("You can now operate your laptop directly from your WhatsApp chat."));
        console.log(chalk.dim("Send /help in WhatsApp to see all available system commands.\n"));
      }

      if (connection === "close") {
        const errorOutput = (lastDisconnect?.error as { output?: { statusCode?: number } })?.output;
        const statusCode = errorOutput?.statusCode;
        const loggedOut = statusCode === DisconnectReason.loggedOut;

        if (loggedOut) {
          console.log(chalk.red("\n❌ Device was logged out of WhatsApp."));
          console.log(chalk.yellow("Delete the .whatsapp_auth folder and re-run to scan a new QR code.\n"));
        } else if (!isStopping) {
          console.log(chalk.yellow("\n⚠️ Connection lost. Reconnecting to WhatsApp..."));
          void startSocket();
        }
      }
    });

    sock.ev.on("messages.upsert", async (event) => {
      if (event.type !== "notify") return;

      for (const msg of event.messages) {
        try {
          await handleWhatsAppMessage(sock, msg);
        } catch (err: unknown) {
          console.error("[WhatsApp] Error processing message:", err);
        }
      }
    });

    return sock;
  }

  const activeSock = await startSocket();

  await new Promise<void>((resolve) => {
    const cleanup = () => {
      if (isStopping) return;
      isStopping = true;
      console.log(chalk.yellow("\nStopping WhatsApp mode..."));
      try {
        activeSock.end(undefined);
      } catch {
        // ignore close error
      }
      resolve();
    };

    process.once("SIGINT", cleanup);
    process.once("SIGTERM", cleanup);
  });
}
