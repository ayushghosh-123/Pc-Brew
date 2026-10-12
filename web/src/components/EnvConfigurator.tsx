"use client";

import * as React from "react";
import { Shield, Copy, Check, Key, Eye, EyeOff, Cpu } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeader } from "@/components/primitives/SectionHeader";
import { Card } from "@/components/primitives/Card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const EnvConfigurator: React.FC = () => {
  const [provider, setProvider] = React.useState<
    "openrouter" | "openai" | "anthropic" | "google"
  >("openrouter");
  const [openRouterKey, setOpenRouterKey] = React.useState("");
  const [openRouterModel, setOpenRouterModel] = React.useState("openrouter/free");
  const [openAiKey, setOpenAiKey] = React.useState("");
  const [openAiModel, setOpenAiModel] = React.useState("gpt-4o-mini");
  const [anthropicKey, setAnthropicKey] = React.useState("");
  const [anthropicModel, setAnthropicModel] = React.useState(
    "claude-3-5-sonnet-latest"
  );
  const [geminiKey, setGeminiKey] = React.useState("");
  const [geminiModel, setGeminiModel] = React.useState("gemini-1.5-flash");

  const [telegramToken, setTelegramToken] = React.useState("");
  const [telegramOwnerId, setTelegramOwnerId] = React.useState("");
  const [whatsappOwnerNumber, setWhatsappOwnerNumber] = React.useState("");
  const [firecrawlKey, setFirecrawlKey] = React.useState("");
  const [showSecrets, setShowSecrets] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const generateEnvString = () => {
    let aiBlock = "";
    if (provider === "openrouter") {
      aiBlock = `# Active Provider: OpenRouter
AI_PROVIDER=openrouter
OPENROUTER_API_KEY=${openRouterKey || "sk-or-v1-xxxxxxxxxxxxxxxxxxxx"}
OPENROUTER_DEFAULT_MODEL=${openRouterModel || "openrouter/free"}`;
    } else if (provider === "openai") {
      aiBlock = `# Active Provider: OpenAI
AI_PROVIDER=openai
OPENAI_API_KEY=${openAiKey || "sk-proj-xxxxxxxxxxxxxxxxxxxx"}
OPENAI_MODEL=${openAiModel || "gpt-4o-mini"}`;
    } else if (provider === "anthropic") {
      aiBlock = `# Active Provider: Anthropic Claude
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=${anthropicKey || "sk-ant-api03-xxxxxxxxxxxxxxxxxxxx"}
ANTHROPIC_MODEL=${anthropicModel || "claude-3-5-sonnet-latest"}`;
    } else if (provider === "google") {
      aiBlock = `# Active Provider: Google Gemini
AI_PROVIDER=google
GEMINI_API_KEY=${geminiKey || "AIzaSyxxxxxxxxxxxxxxxxxxxx"}
GOOGLE_MODEL=${geminiModel || "gemini-1.5-flash"}`;
    }

    return `${aiBlock}

# Telegram Integration (Optional)
TELEGRAM_BOT_TOKEN=${telegramToken || ""}
TELEGRAM_OWNER_ID=${telegramOwnerId || ""}

# WhatsApp Laptop Controller (Optional: Phone number with country code, no +)
WHATSAPP_OWNER_NUMBER=${whatsappOwnerNumber || ""}

# Web Search & Scraping (Optional for Firecrawl)
FIRECRAWL_API_KEY=${firecrawlKey || ""}`;
  };

  const copyEnv = () => {
    navigator.clipboard.writeText(generateEnvString());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="env-config" className="py-16 border-b border-border-subtle">
      <SectionHeader
        eyebrow="Configuration Tool"
        title="Environment Generator: Any LLM Provider"
        description="PC Brew supports any major LLM key: OpenRouter, OpenAI, Anthropic Claude, or Google Gemini. Select your provider, enter your keys, and generate a ready-to-use configuration."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
        {/* Input Form (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-5 border-border-subtle bg-card space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="text-sm font-bold text-primary flex items-center gap-2">
                <Key className="h-4 w-4 text-coral" />
                <span>Provider & Key Parameters</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSecrets(!showSecrets)}
                className="text-xs text-muted hover:text-primary flex items-center gap-1 transition-colors"
              >
                {showSecrets ? (
                  <EyeOff className="h-3.5 w-3.5" />
                ) : (
                  <Eye className="h-3.5 w-3.5" />
                )}
                <span>{showSecrets ? "Hide Values" : "Show Values"}</span>
              </button>
            </div>

            {/* Provider Switcher */}
            <div>
              <label className="text-xs text-secondary font-semibold block mb-1.5 flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-sea-green" />
                <span>Select LLM Engine:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(["openrouter", "openai", "anthropic", "google"] as const).map(
                  (p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setProvider(p)}
                      className={`py-2 px-2 text-[11px] rounded-[4px] font-bold capitalize transition-all border ${
                        provider === p
                          ? "bg-coral text-on-accent border-coral shadow-sm"
                          : "bg-elevated text-muted border-border-subtle hover:border-coral hover:text-primary"
                      }`}
                    >
                      {p === "openrouter"
                        ? "OpenRouter"
                        : p === "openai"
                        ? "OpenAI"
                        : p === "anthropic"
                        ? "Claude"
                        : "Gemini"}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Provider Fields */}
            {provider === "openrouter" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    OPENROUTER_API_KEY{" "}
                    <span className="text-status-error">*required</span>
                  </label>
                  <Input
                    type={showSecrets ? "text" : "password"}
                    placeholder="sk-or-v1-..."
                    value={openRouterKey}
                    onChange={(e) => setOpenRouterKey(e.target.value)}
                  />
                  <span className="text-[10px] text-muted mt-1 block">
                    Get free or paid key at openrouter.ai/keys
                  </span>
                </div>
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    OPENROUTER_DEFAULT_MODEL
                  </label>
                  <Input
                    type="text"
                    placeholder="openrouter/free"
                    value={openRouterModel}
                    onChange={(e) => setOpenRouterModel(e.target.value)}
                  />
                </div>
              </div>
            )}

            {provider === "openai" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    OPENAI_API_KEY{" "}
                    <span className="text-status-error">*required</span>
                  </label>
                  <Input
                    type={showSecrets ? "text" : "password"}
                    placeholder="sk-proj-..."
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                  />
                  <span className="text-[10px] text-muted mt-1 block">
                    Get key from platform.openai.com/api-keys
                  </span>
                </div>
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    OPENAI_MODEL
                  </label>
                  <Input
                    type="text"
                    placeholder="gpt-4o-mini"
                    value={openAiModel}
                    onChange={(e) => setOpenAiModel(e.target.value)}
                  />
                </div>
              </div>
            )}

            {provider === "anthropic" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    ANTHROPIC_API_KEY (Claude){" "}
                    <span className="text-status-error">*required</span>
                  </label>
                  <Input
                    type={showSecrets ? "text" : "password"}
                    placeholder="sk-ant-api03-..."
                    value={anthropicKey}
                    onChange={(e) => setAnthropicKey(e.target.value)}
                  />
                  <span className="text-[10px] text-muted mt-1 block">
                    Get key from console.anthropic.com
                  </span>
                </div>
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    ANTHROPIC_MODEL
                  </label>
                  <Input
                    type="text"
                    placeholder="claude-3-5-sonnet-latest"
                    value={anthropicModel}
                    onChange={(e) => setAnthropicModel(e.target.value)}
                  />
                </div>
              </div>
            )}

            {provider === "google" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    GEMINI_API_KEY (Google){" "}
                    <span className="text-status-error">*required</span>
                  </label>
                  <Input
                    type={showSecrets ? "text" : "password"}
                    placeholder="AIzaSy..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                  />
                  <span className="text-[10px] text-muted mt-1 block">
                    Get key from aistudio.google.com/app/apikey
                  </span>
                </div>
                <div>
                  <label className="text-xs text-secondary font-semibold block mb-1">
                    GOOGLE_MODEL
                  </label>
                  <Input
                    type="text"
                    placeholder="gemini-1.5-flash"
                    value={geminiModel}
                    onChange={(e) => setGeminiModel(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-border-subtle space-y-3">
              {/* TELEGRAM_BOT_TOKEN */}
              <div>
                <label className="text-xs text-secondary font-semibold block mb-1">
                  TELEGRAM_BOT_TOKEN <span className="text-muted">(optional)</span>
                </label>
                <Input
                  type={showSecrets ? "text" : "password"}
                  placeholder="7123456789:AAH..."
                  value={telegramToken}
                  onChange={(e) => setTelegramToken(e.target.value)}
                />
              </div>

              {/* TELEGRAM_OWNER_ID */}
              <div>
                <label className="text-xs text-secondary font-semibold block mb-1">
                  TELEGRAM_OWNER_ID{" "}
                  <span className="text-muted">(from @userinfobot)</span>
                </label>
                <Input
                  type="text"
                  placeholder="123456789"
                  value={telegramOwnerId}
                  onChange={(e) => setTelegramOwnerId(e.target.value)}
                />
              </div>

              {/* WHATSAPP_OWNER_NUMBER */}
              <div>
                <label className="text-xs text-secondary font-semibold block mb-1">
                  WHATSAPP_OWNER_NUMBER{" "}
                  <span className="text-muted">(country code + number)</span>
                </label>
                <Input
                  type="text"
                  placeholder="919876543210"
                  value={whatsappOwnerNumber}
                  onChange={(e) => setWhatsappOwnerNumber(e.target.value)}
                />
              </div>

              {/* FIRECRAWL_API_KEY */}
              <div>
                <label className="text-xs text-secondary font-semibold block mb-1">
                  FIRECRAWL_API_KEY{" "}
                  <span className="text-muted">(optional for scraping)</span>
                </label>
                <Input
                  type={showSecrets ? "text" : "password"}
                  placeholder="fc-..."
                  value={firecrawlKey}
                  onChange={(e) => setFirecrawlKey(e.target.value)}
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Live .env Code Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-5 border-border-subtle bg-card space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <span className="text-xs font-bold text-primary">
                Generated Configuration Preview
              </span>
              <Button
                variant="secondary"
                size="sm"
                onClick={copyEnv}
                className="gap-1.5 font-mono text-xs"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-sea-green" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </Button>
            </div>

            <pre className="p-4 rounded-[6px] bg-elevated border border-border-subtle text-xs text-sea-green whitespace-pre overflow-x-auto leading-relaxed">
              {generateEnvString()}
            </pre>

            <div className="p-3 rounded-[6px] bg-surface border border-border-subtle text-[11px] text-muted leading-relaxed">
              💡 <strong>Usage:</strong> Run <code className="text-primary font-bold">pcbrew setup</code> to configure interactively in your terminal, or save this as <code className="text-primary font-bold">.env</code> in your root directory.
            </div>
          </Card>
        </div>
      </div>
    </Section>
  );
};
