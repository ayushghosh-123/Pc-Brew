import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        agent: {
          bg: "#06090e",
          card: "#0d111a",
          border: "#1f293d",
          accent: "#b68f2d",
          accentBright: "#f5b72e",
          cyan: "#00f3ff",
          green: "#00ff9d",
          red: "#ff4d4f",
          purple: "#a855f7",
          dim: "#8b949e",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "Cascadia Code",
          "Consolas",
          "Courier New",
          "monospace",
        ],
      },
      animation: {
        "pulse-glow": "pulse-glow 2.5s infinite ease-in-out",
        "scanline": "scanline 8s linear infinite",
        "blink": "blink 1s steps(2, start) infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", filter: "drop-shadow(0 0 15px rgba(182, 143, 45, 0.4))" },
          "50%": { opacity: "0.8", filter: "drop-shadow(0 0 25px rgba(182, 143, 45, 0.7))" },
        },
        "scanline": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
        "blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      boxShadow: {
        neon: "0 0 20px -3px rgba(0, 243, 255, 0.3)",
        amberNeon: "0 0 25px -4px rgba(182, 143, 45, 0.4)",
        matrix: "0 0 20px -3px rgba(0, 255, 157, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
