"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  href?: string;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ interactive = false, className, children, href, ...props }, ref) => {
    const isClickable = interactive || !!href;
    const baseClasses = cn(
      "rounded-[8px] border border-border-subtle bg-card text-primary shadow-sm overflow-hidden",
      isClickable &&
        "cursor-pointer transition-all duration-[200ms] ease-[cubic-bezier(.23,1,.32,1)] hover:border-border-accent hover:bg-surface hover:shadow-md hover:-translate-y-[1px] active:scale-[0.995] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-page",
      className
    );

    if (href) {
      return (
        <a href={href} className={cn("block", baseClasses)}>
          {children}
        </a>
      );
    }

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

