"use client";

import * as React from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface TerminalBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  command: string;
  comment?: string;
  secondaryCommand?: string;
  secondaryComment?: string;
}

export const TerminalBlock: React.FC<TerminalBlockProps> = ({
  command,
  comment,
  secondaryCommand,
  secondaryComment,
  className,
  ...props
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    const textToCopy = secondaryCommand ? `${command}\n${secondaryCommand}` : command;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={cn(
        "rounded-[8px] border border-border-subtle bg-elevated font-mono text-sm leading-relaxed p-4 transition-colors",
        className
      )}
      {...props}
    >
      {comment && (
        <div className="text-muted text-xs italic mb-1.5 select-none">
          # {comment}
        </div>
      )}

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 overflow-x-auto min-w-0 py-0.5">
          <span className="text-coral font-bold select-none">$</span>
          <span className="text-primary truncate">{command}</span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Command copied" : "Copy command to clipboard"}
          title={copied ? "Copied!" : "Copy"}
          className="flex h-7 w-7 items-center justify-center rounded-[4px] bg-interactive text-muted hover:bg-interactive-hover hover:text-primary transition-all flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-sea-green" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {secondaryComment && (
        <div className="text-muted text-xs italic mt-3 mb-1 select-none">
          # {secondaryComment}
        </div>
      )}

      {secondaryCommand && (
        <div className="flex items-center gap-2.5 overflow-x-auto min-w-0 py-0.5 mt-1">
          <span className="text-coral font-bold select-none">$</span>
          <span className="text-primary truncate">{secondaryCommand}</span>
        </div>
      )}
    </div>
  );
};
