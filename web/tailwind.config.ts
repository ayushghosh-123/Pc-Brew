import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        page: "var(--bg-page)",
        surface: "var(--bg-surface)",
        elevated: "var(--bg-elevated)",
        primary: {
          DEFAULT: "var(--text-primary)",
          foreground: "var(--text-on-accent)",
        },
        secondary: {
          DEFAULT: "var(--text-secondary)",
          foreground: "var(--accent-coral)",
        },
        muted: {
          DEFAULT: "var(--text-muted)",
          foreground: "var(--text-muted)",
        },
        coral: {
          DEFAULT: "var(--accent-coral)",
          hover: "var(--accent-coral-hover)",
          deep: "var(--accent-coral-deep)",
        },
        "sea-green": "var(--accent-sea-green)",
        "on-accent": "var(--text-on-accent)",
        "border-subtle": "var(--border-subtle)",
        "border-accent": "var(--border-accent)",
        card: {
          DEFAULT: "var(--card-bg)",
          foreground: "var(--text-primary)",
        },
        interactive: {
          DEFAULT: "var(--interactive-bg)",
          hover: "var(--interactive-hover)",
        },
        "accent-soft": "var(--accent-soft)",
        selection: "var(--selection-bg)",
        "focus-ring": "var(--focus-ring)",
        "modal-backdrop": "var(--modal-backdrop)",
        status: {
          success: "var(--status-success)",
          warning: "var(--status-warning)",
          error: "var(--status-error)",
          info: "var(--status-info)",
        },
        // shadcn backward-compatibility tokens
        background: "var(--bg-page)",
        foreground: "var(--text-primary)",
        border: "var(--border-subtle)",
        input: "var(--border-subtle)",
        ring: "var(--focus-ring)",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "Switzer",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "var(--font-inter)",
          "Switzer",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["Sentient", "Georgia", "Times New Roman", "serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        xs: ".75rem",
        sm: ".8125rem",
        base: ".875rem",
        md: ".9375rem",
        lg: "1.0625rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px", /* estimated */
        6: "24px",
        8: "32px",
        12: "48px",
        16: "64px",
      },
      borderRadius: {
        sm: "4px",
        DEFAULT: "8px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        full: "999px",
        control: "8px",
        inset: "4px",
      },
      boxShadow: {
        sm: "0 1px 2px rgb(0 0 0 / .12)",
        md: "0 8px 24px -6px rgb(0 0 0 / .28)",
        lg: "0 24px 48px -12px rgb(0 0 0 / .42)",
      },
      transitionDuration: {
        control: "160ms",
        card: "200ms",
      },
      transitionTimingFunction: {
        eased: "cubic-bezier(.23, 1, .32, 1)",
      },
      maxWidth: {
        content: "75rem", // 1200px
        narrow: "48rem", // 768px
      },
      minHeight: {
        control: "2.75rem", // 44px
      },
      screens: {
        mobile: "42rem", // 672px verified breakpoint
      },
    },
  },
  plugins: [],
};

export default config;
