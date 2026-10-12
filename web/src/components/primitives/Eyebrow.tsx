"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  as?: "p" | "span" | "h2" | "h3";
}

export const Eyebrow: React.FC<EyebrowProps> = ({
  as: Comp = "p",
  className,
  children,
  ...props
}) => {
  return (
    <Comp
      className={cn(
        "font-mono text-xs font-[700] uppercase tracking-[0.08em] text-coral leading-tight block",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
