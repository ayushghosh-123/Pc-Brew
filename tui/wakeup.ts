import { select, isCancel } from "@clack/prompts";
import chalk from "chalk";
import figlet from "figlet";
import { runCliMode } from "../modes/cli";
import { runTelegramMode } from "../modes/telegram";
import { runWhatsAppMode } from "../modes/whatsapp";
import { runInteractiveSetup } from "../config/setup";

const BANNER_FONT = "ANSI Shadow";
const SHADOW = chalk.hex("#b68f2dff");
const FACE = chalk.hex("#fbfbfbff").bold;

function printBannerWithShadow(ascii: string) {
  const bannerLines = ascii.replace(/\s+$/, "").split("\n");
  const maxLen = Math.max(...bannerLines.map((l) => l.length), 0);
  const rowWidth = maxLen + 2;

  for (const line of bannerLines) {
    console.log(SHADOW(("  " + line).padEnd(rowWidth)));
  }
  process.stdout.write(`\x1b[${bannerLines.length}A`);
  for (const line of bannerLines) {
    console.log(FACE(line.padEnd(rowWidth)));
  }
  console.log();
}

export async function runwakeup() {
  let ascii: string;

  try {
    ascii = figlet.textSync("PC Brew", {
      font: BANNER_FONT,
    });
  } catch {
    ascii = "PC Brew";
  }
  printBannerWithShadow(ascii);

  const mode = await select({
    message: "Which mode do you want to proceed with?",
    options: [
      { value: "cli", label: "CLI (Agent, Plan & Ask)" },
      { value: "telegram", label: "Telegram Gateway" },
      { value: "whatsapp", label: "WhatsApp (Operate Laptop via Chat)" },
      { value: "config", label: "⚙️  Configure APIs (OpenRouter, Telegram, WhatsApp)" },
      { value: "exit", label: "Exit" },
    ],
  });

  if (isCancel(mode) || mode === "exit") {
    console.log(chalk.dim("\n Goodbye. \n"));
    return;
  }

  if (mode === "cli") {
    await runCliMode();
  } else if (mode === "telegram") {
    console.log(chalk.dim("Starting telegram mode..."));
    await runTelegramMode();
  } else if (mode === "whatsapp") {
    await runWhatsAppMode();
  } else if (mode === "config") {
    await runInteractiveSetup();
  }
}