"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div" | "header" | "footer" | "main";
  narrow?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  as: Comp = "section",
  narrow = false,
  className,
  children,
  ...props
}) => {
  return (
    <Comp
      className={cn(
        "w-full px-4 sm:px-6 lg:px-8 mx-auto",
        narrow ? "max-w-narrow" : "max-w-content",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
