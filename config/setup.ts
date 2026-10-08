import Conf from "conf";
import { intro, outro, text, select, confirm, spinner, isCancel, cancel } from "@clack/prompts";
import chalk from "chalk";

export interface PcBrewConfig {
  AI_PROVIDER?: "openrouter" | "openai" | "anthropic" | "google" | "auto";
  AI_MODEL?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_DEFAULT_MODEL?: string;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  ANTHROPIC_API_KEY?: string;
  ANTHROPIC_MODEL?: string;
  GEMINI_API_KEY?: string;
  GOOGLE_MODEL?: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_OWNER_ID?: string;
  WHATSAPP_OWNER_NUMBER?: string;
  FIRECRAWL_API_KEY?: string;
}

export const configStore = new Conf<PcBrewConfig>({
  projectName: "pcbrew",
});

/**
 * Hydrates process.env with values stored in Conf if they are not already set.
 */
export function loadStoredConfig(): void {
  const keys: (keyof PcBrewConfig)[] = [
    "AI_PROVIDER",
    "AI_MODEL",
    "OPENROUTER_API_KEY",
    "OPENROUTER_DEFAULT_MODEL",
    "OPENAI_API_KEY",
    "OPENAI_MODEL",
    "ANTHROPIC_API_KEY",
    "ANTHROPIC_MODEL",
    "GEMINI_API_KEY",
    "GOOGLE_MODEL",
    "TELEGRAM_BOT_TOKEN",
    "TELEGRAM_OWNER_ID",
    "WHATSAPP_OWNER_NUMBER",
    "FIRECRAWL_API_KEY",
  ];

  for (const key of keys) {
    if (!process.env[key]) {
      const storedVal = configStore.get(key);
      if (storedVal && typeof storedVal === "string" && storedVal.trim()) {
        process.env[key] = storedVal.trim();
      }
    }
  }
}

/**
 * Checks if at least one valid LLM provider API key is present.
 */
export function hasAnyLlmKey(): boolean {
  return Boolean(
    process.env.OPENROUTER_API_KEY ||
    process.env.OPENAI_API_KEY ||
    process.env.ANTHROPIC_API_KEY ||
    process.env.CLAUDE_API_KEY ||
    process.env.GEMINI_API_KEY ||
    process.env.GOOGLE_GENERATIVE_AI_API_KEY ||
    configStore.get("OPENROUTER_API_KEY") ||
    configStore.get("OPENAI_API_KEY") ||
    configStore.get("ANTHROPIC_API_KEY") ||
    configStore.get("GEMINI_API_KEY")
  );
}

/**
 * Interactive step-by-step setup wizard that prompts for any AI provider API key one by one.
 */
export async function runInteractiveSetup(): Promise<void> {
  console.log();
  intro(chalk.bold.hex("#b68f2d")("☕ PC BREW // Multi-Provider LLM & System Setup"));
  console.log(
    chalk.dim(
      "Configure OpenRouter, OpenAI, Anthropic Claude, or Google Gemini keys.\n" +
      `Global Config Store: ${configStore.path}\n`
    )
  );

  // 1. Choose primary AI Provider
  const selectedProvider = await select({
    message: "Select your primary AI Provider:",
    options: [
      {
        value: "openrouter",
        label: "OpenRouter (Default - access 100+ models, free & paid)",
      },
      {
        value: "openai",
        label: "OpenAI (GPT-4o, GPT-4o-mini, o1, o3-mini)",
      },
      {
        value: "anthropic",
        label: "Anthropic Claude (Claude 3.5 Sonnet, Claude 3.5 Haiku)",
      },
      {
        value: "google",
        label: "Google Gemini (Gemini 1.5 Flash, Gemini 1.5 Pro)",
      },
      {
        value: "all",
        label: "Configure Multiple / All Providers",
      },
    ],
  });

  if (isCancel(selectedProvider)) {
    cancel("Configuration setup cancelled.");
    return;
  }

  // 2. OpenRouter Prompt
  let openRouterKey = "";
  let openRouterModel = "";
  if (selectedProvider === "openrouter" || selectedProvider === "all") {
    const curOr = process.env.OPENROUTER_API_KEY || configStore.get("OPENROUTER_API_KEY") || "";
    const resOr = await text({
      message: "Enter OpenRouter API Key (press Enter to skip if not using):",
      placeholder: "sk-or-v1-...",
      initialValue: curOr,
    });
    if (isCancel(resOr)) return cancel("Configuration setup cancelled.");
    openRouterKey = String(resOr || "").trim();

    if (openRouterKey) {
      const curOrModel = process.env.OPENROUTER_DEFAULT_MODEL || configStore.get("OPENROUTER_DEFAULT_MODEL") || "openrouter/free";
      const resOrModel = await text({
        message: "Enter OpenRouter Model ID (press Enter for 'openrouter/free'):",
        placeholder: "openrouter/free",
        initialValue: curOrModel,
      });
      if (isCancel(resOrModel)) return cancel("Configuration setup cancelled.");
      openRouterModel = String(resOrModel || "").trim();
    }
  }

  // 3. OpenAI Prompt
  let openAiKey = "";
  let openAiModel = "";
  if (selectedProvider === "openai" || selectedProvider === "all") {
    const curOai = process.env.OPENAI_API_KEY || configStore.get("OPENAI_API_KEY") || "";
    const resOai = await text({
      message: "Enter OpenAI API Key (press Enter to skip if not using):",
      placeholder: "sk-...",
      initialValue: curOai,
    });
    if (isCancel(resOai)) return cancel("Configuration setup cancelled.");
    openAiKey = String(resOai || "").trim();

    if (openAiKey) {
      const curOaiModel = process.env.OPENAI_MODEL || configStore.get("OPENAI_MODEL") || "gpt-4o-mini";
      const resOaiModel = await text({
        message: "Enter OpenAI Model ID (press Enter for 'gpt-4o-mini'):",
        placeholder: "gpt-4o-mini",
        initialValue: curOaiModel,
      });
      if (isCancel(resOaiModel)) return cancel("Configuration setup cancelled.");
      openAiModel = String(resOaiModel || "").trim();
    }
  }

  // 4. Anthropic Claude Prompt
  let anthropicKey = "";
  let anthropicModel = "";
  if (selectedProvider === "anthropic" || selectedProvider === "all") {
    const curAnt = process.env.ANTHROPIC_API_KEY || configStore.get("ANTHROPIC_API_KEY") || "";
    const resAnt = await text({
      message: "Enter Anthropic Claude API Key (press Enter to skip if not using):",
      placeholder: "sk-ant-...",
      initialValue: curAnt,
    });
    if (isCancel(resAnt)) return cancel("Configuration setup cancelled.");
    anthropicKey = String(resAnt || "").trim();

    if (anthropicKey) {
      const curAntModel = process.env.ANTHROPIC_MODEL || configStore.get("ANTHROPIC_MODEL") || "claude-3-5-sonnet-latest";
      const resAntModel = await text({
        message: "Enter Anthropic Model ID (press Enter for 'claude-3-5-sonnet-latest'):",
        placeholder: "claude-3-5-sonnet-latest",
        initialValue: curAntModel,
      });
      if (isCancel(resAntModel)) return cancel("Configuration setup cancelled.");
      anthropicModel = String(resAntModel || "").trim();
    }
  }

  // 5. Google Gemini Prompt
  let geminiKey = "";
  let geminiModel = "";
  if (selectedProvider === "google" || selectedProvider === "all") {
    const curGem = process.env.GEMINI_API_KEY || configStore.get("GEMINI_API_KEY") || "";
    const resGem = await text({
      message: "Enter Google Gemini API Key (press Enter to skip if not using):",
      placeholder: "AIza...",
      initialValue: curGem,
    });
    if (isCancel(resGem)) return cancel("Configuration setup cancelled.");
    geminiKey = String(resGem || "").trim();

    if (geminiKey) {
      const curGemModel = process.env.GOOGLE_MODEL || configStore.get("GOOGLE_MODEL") || "gemini-1.5-flash";
      const resGemModel = await text({
        message: "Enter Google Gemini Model ID (press Enter for 'gemini-1.5-flash'):",
        placeholder: "gemini-1.5-flash",
        initialValue: curGemModel,
      });
      if (isCancel(resGemModel)) return cancel("Configuration setup cancelled.");
      geminiModel = String(resGemModel || "").trim();
    }
  }

  // 6. Telegram Bot Token
  const curTgToken = process.env.TELEGRAM_BOT_TOKEN || configStore.get("TELEGRAM_BOT_TOKEN") || "";
  const telegramToken = await text({
    message: "Enter Telegram Bot Token from @BotFather (optional, press Enter to skip):",
    placeholder: "7123456789:AAH...",
    initialValue: curTgToken,
  });
  if (isCancel(telegramToken)) return cancel("Configuration setup cancelled.");

  // 7. Telegram Owner ID
  let telegramOwnerId = "";
  if (telegramToken && typeof telegramToken === "string" && telegramToken.trim()) {
    const curTgOwner = process.env.TELEGRAM_OWNER_ID || configStore.get("TELEGRAM_OWNER_ID") || "";
    const resTgOwner = await text({
      message: "Enter your numeric Telegram User ID from @userinfobot (for security):",
      placeholder: "123456789",
      initialValue: curTgOwner,
    });
    if (isCancel(resTgOwner)) return cancel("Configuration setup cancelled.");
    telegramOwnerId = String(resTgOwner || "").trim();
  }

  // 8. WhatsApp Owner Number
  const curWaNum = process.env.WHATSAPP_OWNER_NUMBER || configStore.get("WHATSAPP_OWNER_NUMBER") || "";
  const whatsappNumber = await text({
    message: "Enter WhatsApp Owner Number with country code (e.g. 919876543210, press Enter to skip):",
    placeholder: "919876543210",
    initialValue: curWaNum,
  });
  if (isCancel(whatsappNumber)) return cancel("Configuration setup cancelled.");

  // 9. Firecrawl API Key
  const curFcKey = process.env.FIRECRAWL_API_KEY || configStore.get("FIRECRAWL_API_KEY") || "";
  const firecrawlKey = await text({
    message: "Enter Firecrawl API Key for web scraping (optional, press Enter to skip):",
    placeholder: "fc-...",
    initialValue: curFcKey,
  });
  if (isCancel(firecrawlKey)) return cancel("Configuration setup cancelled.");

  // Save to config store
  const s = spinner();
  s.start("Persisting configuration to system store...");

  if (selectedProvider !== "all") {
    configStore.set("AI_PROVIDER", selectedProvider as PcBrewConfig["AI_PROVIDER"]);
    process.env.AI_PROVIDER = selectedProvider;
  }

  if (openRouterKey) {
    configStore.set("OPENROUTER_API_KEY", openRouterKey);
    process.env.OPENROUTER_API_KEY = openRouterKey;
  }
  if (openRouterModel) {
    configStore.set("OPENROUTER_DEFAULT_MODEL", openRouterModel);
    process.env.OPENROUTER_DEFAULT_MODEL = openRouterModel;
  }

  if (openAiKey) {
    configStore.set("OPENAI_API_KEY", openAiKey);
    process.env.OPENAI_API_KEY = openAiKey;
  }
  if (openAiModel) {
    configStore.set("OPENAI_MODEL", openAiModel);
    process.env.OPENAI_MODEL = openAiModel;
  }

  if (anthropicKey) {
    configStore.set("ANTHROPIC_API_KEY", anthropicKey);
    process.env.ANTHROPIC_API_KEY = anthropicKey;
  }
  if (anthropicModel) {
    configStore.set("ANTHROPIC_MODEL", anthropicModel);
    process.env.ANTHROPIC_MODEL = anthropicModel;
  }

  if (geminiKey) {
    configStore.set("GEMINI_API_KEY", geminiKey);
    process.env.GEMINI_API_KEY = geminiKey;
  }
  if (geminiModel) {
    configStore.set("GOOGLE_MODEL", geminiModel);
    process.env.GOOGLE_MODEL = geminiModel;
  }

  if (typeof telegramToken === "string" && telegramToken.trim()) {
    configStore.set("TELEGRAM_BOT_TOKEN", telegramToken.trim());
    process.env.TELEGRAM_BOT_TOKEN = telegramToken.trim();
  }
  if (telegramOwnerId) {
    configStore.set("TELEGRAM_OWNER_ID", telegramOwnerId);
    process.env.TELEGRAM_OWNER_ID = telegramOwnerId;
  }
  if (typeof whatsappNumber === "string" && whatsappNumber.trim()) {
    configStore.set("WHATSAPP_OWNER_NUMBER", whatsappNumber.trim());
    process.env.WHATSAPP_OWNER_NUMBER = whatsappNumber.trim();
  }
  if (typeof firecrawlKey === "string" && firecrawlKey.trim()) {
    configStore.set("FIRECRAWL_API_KEY", firecrawlKey.trim());
    process.env.FIRECRAWL_API_KEY = firecrawlKey.trim();
  }

  s.stop(chalk.green("Configuration saved successfully!"));

  outro(
    chalk.hex("#b68f2d")(
      `☕ PC Brew is configured!\n` +
      `Active Provider: ${chalk.bold.cyan(selectedProvider.toUpperCase())}\n` +
      `Run ${chalk.bold.white("pcbrew")} or ${chalk.bold.white("pcbrew start")} to launch.`
    )
  );
}

/**
 * Checks if at least one valid LLM provider API key exists; if not, prompts user.
 */
export async function ensureConfigured(): Promise<void> {
  loadStoredConfig();

  if (!hasAnyLlmKey()) {
    console.log(chalk.yellow("\n⚠️  No LLM API key detected on this system (OpenRouter, OpenAI, Claude, or Gemini)."));
    const shouldSetup = await confirm({
      message: "Would you like to run the PC Brew interactive configuration wizard now?",
      initialValue: true,
    });

    if (isCancel(shouldSetup) || !shouldSetup) {
      console.log(chalk.dim("Skipping setup. Some AI features will fail without an API key.\n"));
      return;
    }

    await runInteractiveSetup();
  }
}
