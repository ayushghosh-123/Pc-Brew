"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex min-h-[40px] w-full rounded-[8px] border border-border-subtle bg-elevated px-3 py-2 text-[14px] text-primary transition-all duration-[160ms] ease-[cubic-bezier(.23,1,.32,1)] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted/70 focus-visible:outline-none focus-visible:border-[rgb(245_101_74_/_0.58)] focus-visible:ring-2 focus-visible:ring-[rgb(245_101_74_/_0.22)] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
