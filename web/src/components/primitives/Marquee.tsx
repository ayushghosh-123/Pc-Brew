"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  speedSeconds?: number;
  reverse?: boolean;
}

export const Marquee: React.FC<MarqueeProps> = ({
  children,
  speedSeconds = 40,
  reverse = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-max animate-marquee gap-4 py-2 hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none",
          reverse && "[animation-direction:reverse]"
        )}
        style={{
          animationDuration: `${speedSeconds}s`,
        }}
      >
        {/* Original items */}
        <div className="flex gap-4 items-stretch">{children}</div>
        {/* Duplicated items for seamless loop */}
        <div className="flex gap-4 items-stretch" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
};
