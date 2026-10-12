"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-[8px] text-[14px] font-[700] leading-none transition-all duration-[160ms] ease-[cubic-bezier(.23,1,.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-[3px] focus-visible:ring-offset-page active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-coral text-on-accent hover:bg-coral-hover active:bg-coral-deep border border-transparent shadow-sm",
        secondary:
          "bg-accent-soft border border-border-accent text-coral hover:bg-interactive-hover active:bg-coral-deep",
        ghost:
          "bg-transparent text-secondary hover:bg-interactive hover:text-primary border border-transparent",
        outline:
          "bg-page text-primary border border-border-subtle hover:bg-surface hover:border-coral",
      },
      size: {
        default: "min-h-[40px] px-4 py-2",
        sm: "min-h-[32px] px-3 py-1.5 text-[13px]",
        lg: "min-h-[44px] px-6 py-2.5 text-[15px]",
        icon: "h-10 w-10 min-h-[40px] p-0 flex items-center justify-center",
        pill: "min-h-[28px] px-3 py-1 text-[12px] font-[650] rounded-[8px] border border-border-subtle bg-card",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
