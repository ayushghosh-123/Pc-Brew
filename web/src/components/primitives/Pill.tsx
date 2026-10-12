"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface PillProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export const Pill = React.forwardRef<HTMLSpanElement, PillProps>(
  ({ active = false, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex min-h-[28px] items-center gap-1.5 px-3 py-1 rounded-[8px] border border-border-subtle bg-card text-xs font-[650] leading-none text-secondary whitespace-nowrap transition-colors",
          active && "border-coral text-coral bg-accent-soft",
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Pill.displayName = "Pill";
