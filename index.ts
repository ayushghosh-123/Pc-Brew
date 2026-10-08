#!/usr/bin/env bun 

import { Command } from "commander";
import { runwakeup } from "./tui/wakeup";
import { runTelegramMode } from "./modes/telegram";
import { runWhatsAppMode } from "./modes/whatsapp";
import { startAgenticTerminal } from "./tui/agentic-terminal";
import { loadStoredConfig, ensureConfigured, runInteractiveSetup } from "./config/setup";

// Hydrate stored configuration into process.env if not already set
loadStoredConfig();

const program = new Command();

program
  .name("pcbrew")
  .description("PC Brew — Autonomous Agentic Coding Terminal & Remote Laptop Controller")
  .version("1.0.0");

program
  .command("setup")
  .alias("config")
  .description("run interactive step-by-step API configuration wizard")
  .action(async () => {
    await runInteractiveSetup();
  });

program
  .command("start")
  .description("start interactive agentic terminal (agy-style)")
  .action(async () => {
    await ensureConfigured();
    await startAgenticTerminal();
  });

program
  .command("wakeup")
  .description("wakes up the bot with interactive mode selector")
  .action(async () => {
    await ensureConfigured();
    await runwakeup();
  });

program
  .command("telegram")
  .description("run telegram bot mode directly")
  .action(async () => {
    await ensureConfigured();
    await runTelegramMode();
  });

program
  .command("whatsapp")
  .description("run whatsapp laptop controller mode directly")
  .action(async () => {
    await ensureConfigured();
    await runWhatsAppMode();
  });

if (process.argv.length <= 2) {
  await ensureConfigured();
  await startAgenticTerminal();
} else {
  await program.parseAsync(process.argv);
}
