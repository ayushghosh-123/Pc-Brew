import chalk from "chalk";
import { marked, type MarkedExtension } from "marked";
import { markedTerminal } from "marked-terminal";

const THEME_ACCENT = chalk.hex("#b68f2dff"); // Golden shadow amber
const THEME_FACE = chalk.hex("#fbfbfbff").bold; // Crisp bright face

let ready = false;

function ensureMarked(): void {
  if (ready) return;
  const w = Math.max(40, Math.min(process.stdout.columns || 80, 120));

  const terminalRenderer = markedTerminal(
    {
      width: w,
      reflowText: true,
      firstHeading: THEME_FACE.underline,
      heading: THEME_ACCENT.bold,
      code: chalk.yellow,
      codespan: chalk.bold.yellow,
      blockquote: chalk.dim.italic,
      strong: chalk.bold.white,
      em: chalk.italic,
      hr: THEME_ACCENT,
      listitem: chalk.white,
      table: chalk.white,
      showSectionPrefix: false,
      unescape: true,
    },
    {}
  ) as unknown as MarkedExtension;

  marked.use(terminalRenderer);
  ready = true;
}

export function renderTerminalMarkdown(source: string): string {
  ensureMarked();
  return marked.parse(source.trimEnd(), { async: false }) as string;
}