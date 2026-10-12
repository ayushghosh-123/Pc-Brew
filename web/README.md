# OpenClaw Design Language System for PCBREW

This is a pixel-faithful, original-code recreation of the OpenClaw design language (reference: [openclaw.ai](https://openclaw.ai/)) adapted for PCBREW, maintaining dark-first developer tool aesthetics, strict tokens, zero hardcoded hex colors outside the token file, responsive layouts, and full accessibility.

## File Structure

```text
web/
├── src/
│   ├── app/
│   │   ├── globals.css         # Single source of truth for tokens, themes & @theme inline
│   │   ├── layout.tsx          # Font definition (Inter), metadata, ThemeProvider (data-theme)
│   │   └── page.tsx            # Main landing page composing all sections
│   ├── components/
│   │   ├── theme-provider.tsx  # next-themes wrapper with data-theme attribute
│   │   ├── ui/                 # Token-remapped shadcn/ui primitives
│   │   │   ├── button.tsx      # Button (primary, secondary, ghost, icon, pill)
│   │   │   ├── tabs.tsx        # Segmented tabs (container, triggers, content)
│   │   │   ├── input.tsx       # Elevated input with coral focus ring
│   │   │   ├── sheet.tsx       # Accessible mobile navigation drawer
│   │   │   └── dropdown-menu.tsx
│   │   ├── primitives/         # Reusable design system primitives
│   │   │   ├── Section.tsx     # Semantic container (max-w-content 1200px / max-w-narrow)
│   │   │   ├── SectionHeader.tsx # Display title, eyebrow, and section links
│   │   │   ├── Eyebrow.tsx     # Monospace uppercase coral eyebrow
│   │   │   ├── Card.tsx        # 8px radius, 1px border, interactive states
│   │   │   ├── Pill.tsx        # 28px min-height tag pills
│   │   │   ├── TerminalBlock.tsx # Monospace command box with prompt & copy
│   │   │   └── Marquee.tsx     # Dual-row infinite testimonial ticker
│   │   └── sections/           # Full-page sections
│   │       ├── Header.tsx      # Nav, social links, theme toggle, mobile Sheet
│   │       ├── HeroSection.tsx # ASCII-art ring, H1, lede, 3 CTAs, stats
│   │       ├── QuickStartSection.tsx # Segmented install tabs & 3 OS cards
│   │       ├── TestimonialsSection.tsx # Marquee testimonials
│   │       ├── BlogHighlightsSection.tsx # 1 featured + 2 smaller cards
│   │       ├── FeatureGridSection.tsx # 6 interactive feature cards
│   │       ├── IntegrationsGridSection.tsx # 15 ecosystem tiles
│   │       ├── ShowcaseSection.tsx # 4 community build cards
│   │       ├── PressSection.tsx # 4 press mentions & 4-link row
│   │       ├── NewsletterSection.tsx # Form, foundation text, sponsor logos
│   │       └── FooterSection.tsx # 3 link columns, legal & copyright
│   └── lib/
│       └── utils.ts            # ClassName merge helper (clsx + tailwind-merge)
└── tailwind.config.ts          # Tailwind config exposing CSS variable tokens
```

## Design Tokens & Single Source of Truth

All design tokens are defined in `src/app/globals.css` under `:root`, `[data-theme="dark"]`, and `[data-theme="light"]`, and exposed to Tailwind via `@theme inline` and `tailwind.config.ts`:

- **Dark Theme (Default):**
  - Page Background: `#101012`
  - Surface: `#19191C`
  - Elevated: `#202024`
  - Text: Primary `#EDEDED`, Secondary `#BCBCC4`, Muted `#9A9AA2`
  - Accent: Coral `#F5654A`, Hover `#E05540`, Deep `#B23A28`
  - Secondary Accent: Sea-green `#4FC8AE`
  - Borders: Subtle `rgb(154 154 162 / .18)`, Accent `rgb(245 101 74 / .4)`
  - Card: `rgb(25 25 28 / .72)`
  - Focus Ring: `rgb(79 200 174 / .72)`

- **Light Theme:**
  - Page Background: `#F6F5F3`
  - Surface: `#ECEAE6`
  - Elevated: `#FFFFFF`
  - Text: Primary `#17171A`, Secondary `#46464E`, Muted `#63636C`
  - Accent: `#B33A26`, Sea-green `#14806E`
  - Border Subtle: `rgb(23 23 26 / .14)`

## Estimated Values (`/* estimated */`)

The following values were estimated based on the reference implementation and marked in code:
- `--chart-line`: `rgb(237 237 237 / 0.08)` in dark mode and `rgb(23 23 26 / 0.08)` in light mode for the radial dot grid mask in the hero and section backgrounds.
- Spacing `5`: `20px` added to standard Tailwind spacing scale between `16px` and `24px`.
- Modal backdrop opacity on light theme: `rgb(0 0 0 / 0.4)` to maintain contrast over light surfaces.

## How to Swap Fonts

The default font is configured using `next/font/google` in `src/app/layout.tsx`:

```tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
```

To swap to a licensed font such as **Switzer** or **Sentient**:
1. Download the font files or load them via Fontshare in `layout.tsx` using `next/font/local` or `<link>` in the `<head>`:
   ```html
   <link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700&f[]=sentient@400i&display=swap" rel="stylesheet" />
   ```
2. Update `fontFamily` in `tailwind.config.ts` or `--font-inter` in `globals.css`:
   ```ts
   fontFamily: {
     display: ["Switzer", "Inter", "sans-serif"],
     body: ["Switzer", "Inter", "sans-serif"],
     serif: ["Sentient", "Georgia", "serif"],
   }
   ```
