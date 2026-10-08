"use client";

import React, { useState } from "react";
import { Shield, Copy, Check, Key, Eye, EyeOff, Sparkles, Cpu } from "lucide-react";

export const EnvConfigurator: React.FC = () => {
  const [provider, setProvider] = useState<"openrouter" | "openai" | "anthropic" | "google">("openrouter");
  const [openRouterKey, setOpenRouterKey] = useState("");
  const [openRouterModel, setOpenRouterModel] = useState("openrouter/free");
  const [openAiKey, setOpenAiKey] = useState("");
  const [openAiModel, setOpenAiModel] = useState("gpt-4o-mini");
  const [anthropicKey, setAnthropicKey] = useState("");
  const [anthropicModel, setAnthropicModel] = useState("claude-3-5-sonnet-latest");
  const [geminiKey, setGeminiKey] = useState("");
  const [geminiModel, setGeminiModel] = useState("gemini-1.5-flash");

  const [telegramToken, setTelegramToken] = useState("");
  const [telegramOwnerId, setTelegramOwnerId] = useState("");
  const [whatsappOwnerNumber, setWhatsappOwnerNumber] = useState("");
  const [firecrawlKey, setFirecrawlKey] = useState("");
  const [showSecrets, setShowSecrets] = useState(false);
  const [copied, setCopied] = useState(false);

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
    <section id="env-config" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-mono">
      {/* Title */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 text-agent-purple text-xs uppercase tracking-wider mb-1">
          <Shield className="w-4 h-4 text-agent-purple" />
          <span>Multi-Provider LLM & System Setup</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          ENVIRONMENT GENERATOR <span className="text-agent-purple">// ANY LLM PROVIDER</span>
        </h2>
        <p className="mt-2 text-sm text-agent-dim max-w-3xl">
          PC Brew supports any major LLM key: OpenRouter, OpenAI, Anthropic Claude, or Google Gemini. Select your provider, enter your keys, and generate a ready-to-use configuration.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Form (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="p-5 rounded-xl bg-agent-card/80 border border-agent-border space-y-4">
            <div className="flex items-center justify-between border-b border-agent-border pb-3">
              <span className="text-sm font-bold text-white flex items-center space-x-2">
                <Key className="w-4 h-4 text-agent-accentBright" />
                <span>Provider & Key Parameters</span>
              </span>
              <button
                type="button"
                onClick={() => setShowSecrets(!showSecrets)}
                className="text-xs text-agent-dim hover:text-white flex items-center space-x-1"
              >
                {showSecrets ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showSecrets ? "Hide Values" : "Show Values"}</span>
              </button>
            </div>

            {/* Provider Switcher */}
            <div>
              <label className="text-xs text-slate-300 font-semibold block mb-1.5 flex items-center space-x-1.5">
                <Cpu className="w-3.5 h-3.5 text-agent-cyan" />
                <span>Select LLM Engine:</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                {(["openrouter", "openai", "anthropic", "google"] as const).map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setProvider(p)}
                    className={`py-2 px-2 text-[11px] rounded font-bold capitalize transition-all border ${
                      provider === p
                        ? "bg-agent-accent text-black border-agent-accent shadow-amberNeon"
                        : "bg-agent-bg text-agent-dim border-agent-border hover:border-slate-500 hover:text-white"
                    }`}
                  >
                    {p === "openrouter" ? "OpenRouter" : p === "openai" ? "OpenAI" : p === "anthropic" ? "Claude" : "Gemini"}
                  </button>
                ))}
              </div>
            </div>

            {/* Provider Fields */}
            {provider === "openrouter" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    OPENROUTER_API_KEY <span className="text-rose-400">*required</span>
                  </label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    placeholder="sk-or-v1-..."
                    value={openRouterKey}
                    onChange={(e) => setOpenRouterKey(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-agent-accent outline-none text-white"
                  />
                  <span className="text-[10px] text-agent-dim mt-0.5 block">
                    Get free or paid key at openrouter.ai/keys
                  </span>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    OPENROUTER_DEFAULT_MODEL
                  </label>
                  <input
                    type="text"
                    placeholder="openrouter/free"
                    value={openRouterModel}
                    onChange={(e) => setOpenRouterModel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-agent-accent outline-none text-white"
                  />
                </div>
              </div>
            )}

            {provider === "openai" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-emerald-300 font-semibold block mb-1">
                    OPENAI_API_KEY <span className="text-rose-400">*required</span>
                  </label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    placeholder="sk-proj-..."
                    value={openAiKey}
                    onChange={(e) => setOpenAiKey(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-emerald-400 outline-none text-white"
                  />
                  <span className="text-[10px] text-agent-dim mt-0.5 block">
                    Get key from platform.openai.com/api-keys
                  </span>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    OPENAI_MODEL
                  </label>
                  <input
                    type="text"
                    placeholder="gpt-4o-mini"
                    value={openAiModel}
                    onChange={(e) => setOpenAiModel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-emerald-400 outline-none text-white"
                  />
                </div>
              </div>
            )}

            {provider === "anthropic" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-amber-300 font-semibold block mb-1">
                    ANTHROPIC_API_KEY (Claude) <span className="text-rose-400">*required</span>
                  </label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    placeholder="sk-ant-api03-..."
                    value={anthropicKey}
                    onChange={(e) => setAnthropicKey(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-amber-400 outline-none text-white"
                  />
                  <span className="text-[10px] text-agent-dim mt-0.5 block">
                    Get key from console.anthropic.com
                  </span>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    ANTHROPIC_MODEL
                  </label>
                  <input
                    type="text"
                    placeholder="claude-3-5-sonnet-latest"
                    value={anthropicModel}
                    onChange={(e) => setAnthropicModel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-amber-400 outline-none text-white"
                  />
                </div>
              </div>
            )}

            {provider === "google" && (
              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs text-sky-300 font-semibold block mb-1">
                    GEMINI_API_KEY (Google) <span className="text-rose-400">*required</span>
                  </label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    placeholder="AIzaSy..."
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-sky-400 outline-none text-white"
                  />
                  <span className="text-[10px] text-agent-dim mt-0.5 block">
                    Get key from aistudio.google.com/app/apikey
                  </span>
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-semibold block mb-1">
                    GOOGLE_MODEL
                  </label>
                  <input
                    type="text"
                    placeholder="gemini-1.5-flash"
                    value={geminiModel}
                    onChange={(e) => setGeminiModel(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-sky-400 outline-none text-white"
                  />
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-agent-border/60 space-y-3">
              {/* TELEGRAM_BOT_TOKEN */}
              <div>
                <label className="text-xs text-sky-300 font-semibold block mb-1">
                  TELEGRAM_BOT_TOKEN <span className="text-agent-dim">(optional)</span>
                </label>
                <input
                  type={showSecrets ? "text" : "password"}
                  placeholder="7123456789:AAH..."
                  value={telegramToken}
                  onChange={(e) => setTelegramToken(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-sky-400 outline-none text-white"
                />
              </div>

              {/* TELEGRAM_OWNER_ID */}
              <div>
                <label className="text-xs text-sky-300 font-semibold block mb-1">
                  TELEGRAM_OWNER_ID <span className="text-agent-dim">(from @userinfobot)</span>
                </label>
                <input
                  type="text"
                  placeholder="123456789"
                  value={telegramOwnerId}
                  onChange={(e) => setTelegramOwnerId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-sky-400 outline-none text-white"
                />
              </div>

              {/* WHATSAPP_OWNER_NUMBER */}
              <div>
                <label className="text-xs text-emerald-300 font-semibold block mb-1">
                  WHATSAPP_OWNER_NUMBER <span className="text-agent-dim">(country code + number)</span>
                </label>
                <input
                  type="text"
                  placeholder="919876543210"
                  value={whatsappOwnerNumber}
                  onChange={(e) => setWhatsappOwnerNumber(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-emerald-400 outline-none text-white"
                />
              </div>

              {/* FIRECRAWL_API_KEY */}
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  FIRECRAWL_API_KEY <span className="text-agent-dim">(optional for scraping)</span>
                </label>
                <input
                  type={showSecrets ? "text" : "password"}
                  placeholder="fc-..."
                  value={firecrawlKey}
                  onChange={(e) => setFirecrawlKey(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded bg-agent-bg border border-agent-border focus:border-agent-purple outline-none text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live .env Code Preview (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-agent-border bg-[#070b12] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-agent-border/60 pb-3">
              <span className="text-xs font-bold text-slate-200">
                Generated Configuration Preview
              </span>
              <button
                onClick={copyEnv}
                className="flex items-center space-x-1.5 px-3 py-1 text-xs rounded bg-agent-card hover:bg-agent-card/80 border border-agent-border text-agent-accentBright transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-agent-green" />
                    <span className="text-agent-green">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Config</span>
                  </>
                )}
              </button>
            </div>

            <pre className="p-4 rounded-lg bg-black/80 border border-agent-border/60 text-xs text-emerald-300 whitespace-pre overflow-x-auto leading-relaxed">
              {generateEnvString()}
            </pre>

            <div className="p-3 rounded-lg bg-agent-card/60 border border-agent-border text-[11px] text-agent-dim leading-relaxed">
              💡 <strong>Usage:</strong> Run <code className="text-slate-200">pcbrew setup</code> to configure interactively in your terminal, or save this as <code className="text-slate-200">.env</code> in your root directory.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
