"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  actionText,
  actionHref,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6",
        className
      )}
      {...props}
    >
      <div className="space-y-1.5 max-w-[60ch]">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="font-display font-[750] text-[clamp(1.5rem,2.2vw,2rem)] text-primary leading-[1.12] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-secondary leading-[1.65] max-w-[60ch]">
            {description}
          </p>
        )}
      </div>

      {actionText && actionHref && (
        <a
          href={actionHref}
          className="group inline-flex items-center gap-1.5 font-mono text-[13px] font-[500] text-muted hover:text-primary transition-colors flex-shrink-0"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      )}
    </div>
  );
};
