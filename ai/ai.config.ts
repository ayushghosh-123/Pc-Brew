import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export type SupportedAiProvider = "openrouter" | "openai" | "anthropic" | "google" | "auto";

/**
 * Detects the active AI provider based on configuration or present API keys.
 */
export function getActiveAiProvider(): "openrouter" | "openai" | "anthropic" | "google" {
  const configured = (process.env.AI_PROVIDER || "").toLowerCase().trim();

  if (configured === "anthropic" || configured === "claude") {
    return "anthropic";
  }
  if (configured === "openai") {
    return "openai";
  }
  if (configured === "google" || configured === "gemini") {
    return "google";
  }
  if (configured === "openrouter") {
    return "openrouter";
  }

  // Auto-detect based on available keys
  if (process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY) {
    return "anthropic";
  }
  if (process.env.OPENAI_API_KEY) {
    return "openai";
  }
  if (process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return "google";
  }
  
  // Default to OpenRouter
  return "openrouter";
}

/**
 * Returns an instantiated language model for any supported LLM provider.
 */
export function getAgentModel() {
  const provider = getActiveAiProvider();

  switch (provider) {
    case "anthropic": {
      const apiKey = process.env.ANTHROPIC_API_KEY || process.env.CLAUDE_API_KEY;
      const client = createAnthropic({ apiKey });
      const modelId =
        process.env.AI_MODEL ||
        process.env.ANTHROPIC_MODEL ||
        "claude-3-5-sonnet-latest";
      return client(modelId);
    }

    case "openai": {
      const apiKey = process.env.OPENAI_API_KEY;
      const client = createOpenAI({ apiKey });
      const modelId =
        process.env.AI_MODEL ||
        process.env.OPENAI_MODEL ||
        "gpt-4o-mini";
      return client(modelId);
    }

    case "google": {
      const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
      const client = createGoogleGenerativeAI({ apiKey });
      const modelId =
        process.env.AI_MODEL ||
        process.env.GOOGLE_MODEL ||
        "gemini-1.5-flash";
      return client(modelId);
    }

    case "openrouter":
    default: {
      const apiKey = process.env.OPENROUTER_API_KEY;
      const client = createOpenRouter({ apiKey });
      const modelId =
        process.env.AI_MODEL ||
        process.env.OPENROUTER_DEFAULT_MODEL ||
        process.env.OPENROUTER_DEFAULT_MODE ||
        "openrouter/free";
      return client(modelId);
    }
  }
}