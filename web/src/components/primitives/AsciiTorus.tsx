"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { Play, Pause, Sparkles, RefreshCw } from "lucide-react";

export const DEFAULT_ASCII_TORUS = `
                ...                    .:.::-::...                  ..--==++xxx++==--::..                                           ..::--==++x+x++==--...                  ..::-::.:.                   .. .               
                . .                   . ..:::.:..                 ..::-=+++++==--::..                                                     ..::--==+++++=-::..                 ....:::.. .                   . .              
                 .                   ..:::::..                  .::--==+++==--.:..                                                           ..::--==++++=--::.                 ...:::.:..                   .               
                                    ....:....                 ..::-=+====::..                                                                     ..::==+====::..                 ..:.:.:..                                  
                                   ..:::.:..                .::--==+==--::.                        ....:.::::-:-:-::::.:....                        .::--==+==--::.                ..:.:.:..                                 
                                  ....:..                 ..::--===--::                       ..::-:-=+=++xxxxXxXxxxx++====:-::..                       .:--===--::..                 ..:.:..                                
                                 ..:.:..                 ..:-=-=--::..                   ..::--++xxX###88@8@@@@@@@@@@@88##XXxx++--::..                   ..::--=-=-:..                 ..:.:..                               
                                .......                 ..:----::..                   ..::==xxX#8#88@8@8888#8#8#8#8#8888@8@88#8#Xxx==::..                   ..::----:..                 .......                              
                               ..:....                .::-----::..                 ..--=+XX##888#8##XXxx++++=+===+=+=++xxXX##88888##XX+=--..                 ..::-----::.                ....:..                             
                              . ... .               ..::-:-::..                 ..:-=+xx#####XX++==--::.:...... ......:.::--==++XX#####xx+=-:..                 ..::-:-::..               . ... .                            
                             .....                 ..::-:-::..                .::==xxXX#XXx+==--::..                       ..:.--==+xXX#XXxx==::.                ..::-:-::..                ......                           
                            . ...                 ..:.:::....               ..:-++xxXxx+=--:. .                                 . .:--=+xxXxx+=--..               ..:.:::.:..                 ... .                          
                             ...                 ..::-::.:.               .::==+xxxx+=--...                                          .:--=+xxxx+==::.               .::::-::..                .....                          
                            . .                 ..:.:::..               ..::==+++==-:..                                                 ..--==+++==::..               ..:::....                 . .                          
                           ...                  ...:::..               ..:-==+=+--::.                                                      ::--+++==-:..               ..:.:...                  . .                         
                            .                   ..:....               ..--===--::..                     . . . ... . . .                     ..::--===-:..               ....:..                   .                          
                                              ...:....               .:--===--:.                   ....:.:::::::::::::.:....                  ...--===--:.               ....:..                                             
                                              ..... .               ..-:---::..                 ....:::::::::::.:::::::::::....                 ..::---::..               . .....                                            
                                             ......                ..::---::.                ..:.:.:::.:....       ....:.:.:::.:..                .::---::..                ......                                           
                                              . .                 ..:::::..                 ....:....                     .........                 ..::-::..                 . .                                            
                                             ...                 ..:::::..                ...:....                           ....:...                ..:::::..                ....                                           
                                              .                  ...:.:..               . .....                                 ..... .               ....:...                  .                                            
                                                                 ..:....               .....                                       ... .               ....:..                                                               
                                                                . ...                   .                                             .                   ... .                                                              
                                                                 ...                                                                                      .....                                                              
                                                                  .                                                                                         .                                                                
`;

export interface AsciiTorusProps {
  className?: string;
  staticArt?: string;
  interactive?: boolean;
  autoRotate?: boolean;
  showControls?: boolean;
}

export const AsciiTorus: React.FC<AsciiTorusProps> = ({
  className,
  staticArt = DEFAULT_ASCII_TORUS,
  interactive = true,
  autoRotate = true,
  showControls = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  const [isLive, setIsLive] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(autoRotate);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Rotation and tilt state for GSAP smooth tweening
  const stateRef = useRef({
    A: 0.9, // X-axis rotation
    B: 0.3, // Z-axis rotation
    speed: 1.0,
    targetSpeed: 1.0,
    tiltX: 0,
    tiltY: 0,
    mouseTargetX: 0,
    mouseTargetY: 0,
  });

  // Calculate 3D Torus ASCII Frame
  const renderFrame = (A: number, B: number, width = 110, height = 23): string => {
    const b = new Array(width * height).fill(" ");
    const z = new Array(width * height).fill(0);
    const cosA = Math.cos(A), sinA = Math.sin(A);
    const cosB = Math.cos(B), sinB = Math.sin(B);

    // Torus geometry
    const r = 0.85; // Tube radius
    const R = 2.45; // Torus center radius
    const K2 = 5.2; // Distance from camera
    const K1 = 44.0; // Field of view projection constant

    for (let theta = 0; theta < 6.28; theta += 0.08) {
      const costheta = Math.cos(theta), sintheta = Math.sin(theta);

      for (let phi = 0; phi < 6.28; phi += 0.03) {
        const cosphi = Math.cos(phi), sinphi = Math.sin(phi);

        // Coordinates on circle before revolution
        const circlex = R + r * costheta;
        const circley = r * sintheta;

        // 3D coordinates after rotations
        const x = circlex * (cosB * cosphi + sinA * sinB * sinphi) - circley * cosA * sinB;
        const y = circlex * (sinB * cosphi - sinA * cosB * sinphi) + circley * cosA * cosB;
        const zDepth = K2 + cosA * circlex * sinphi + circley * sinA;
        const ooz = 1 / zDepth;

        // 2D projection with aspect ratio compensation for monospace typography
        const xp = Math.floor(width / 2 + K1 * ooz * x * 2.05);
        const yp = Math.floor(height / 2 - K1 * ooz * y * 0.98);

        // Surface normal vectors
        const nx = costheta * (cosB * cosphi + sinA * sinB * sinphi) - sintheta * cosA * sinB;
        const ny = costheta * (sinB * cosphi - sinA * cosB * sinphi) + sintheta * cosA * cosB;
        const nz = cosA * costheta * sinphi + sintheta * sinA;

        // Illumination dot product with light source [0.4, 0.7, -0.6]
        const L = nx * 0.35 + ny * 0.65 - nz * 0.55;

        const o = xp + width * yp;
        if (yp >= 0 && yp < height && xp >= 0 && xp < width && ooz > z[o]) {
          z[o] = ooz;
          // OpenClaw palette characters
          const chars = " .:-=+xX#8@";
          const norm = (L + 0.85) / 2.0;
          const charIdx = Math.floor(norm * (chars.length - 1));
          const clamped = Math.max(0, Math.min(chars.length - 1, charIdx));
          b[o] = chars[clamped];
        }
      }
    }

    const lines: string[] = [];
    for (let row = 0; row < height; row++) {
      lines.push(b.slice(row * width, (row + 1) * width).join(""));
    }
    return lines.join("\n");
  };

  // GSAP animation and RAF loop
  useEffect(() => {
    // Check user accessibility preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setIsLive(false);
      setIsPlaying(false);
      return;
    }

    // GSAP Entrance animation
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }

    let animationFrameId: number;
    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const state = stateRef.current;

      // GSAP smooth damping for mouse tilt
      state.tiltX += (state.mouseTargetX - state.tiltX) * 0.08;
      state.tiltY += (state.mouseTargetY - state.tiltY) * 0.08;

      if (isPlaying && isLive) {
        // Smoothly adjust rotation angles
        state.A += (0.28 * state.speed + state.tiltY * 0.15) * delta;
        state.B += (0.45 * state.speed + state.tiltX * 0.25) * delta;

        if (preRef.current) {
          preRef.current.textContent = renderFrame(state.A, state.B, 110, 23);
        }
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, isLive]);

  // Mouse interaction handling via GSAP
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    stateRef.current.mouseTargetX = x * 2;
    stateRef.current.mouseTargetY = y * 2;

    // Subtly tilt the container with GSAP
    gsap.to(containerRef.current, {
      rotateY: x * 8,
      rotateX: -y * 8,
      transformPerspective: 800,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    stateRef.current.mouseTargetX = 0;
    stateRef.current.mouseTargetY = 0;
    setIsHovered(false);

    // Reset GSAP container tilt
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power2.out",
      });
    }

    // Reset speed
    gsap.to(stateRef.current, {
      speed: 1.0,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    // Smoothly increase speed slightly on hover
    gsap.to(stateRef.current, {
      speed: 1.35,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative flex flex-col items-center justify-center select-none pointer-events-auto transition-transform duration-200",
        className
      )}
      aria-hidden="true"
    >
      {/* Monospace ASCII Canvas */}
      <pre
        ref={preRef}
        className="font-mono text-[8px] xs:text-[9px] sm:text-[10px] md:text-[11px] leading-[1.18] tracking-[1px] text-coral opacity-70 flex-shrink-0 m-0 overflow-hidden whitespace-pre cursor-grab active:cursor-grabbing transition-opacity duration-300"
      >
        {isLive ? renderFrame(stateRef.current.A, stateRef.current.B, 110, 23) : staticArt}
      </pre>

      {/* Interactive Controls Overlay */}
      {showControls && (
        <div className="absolute -bottom-2 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border-subtle bg-surface/80 backdrop-blur-sm shadow-sm text-[11px] font-mono text-muted hover:border-border-accent transition-colors">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsLive(!isLive);
            }}
            className="inline-flex items-center gap-1 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring rounded px-1"
            title={isLive ? "Switch to Static ASCII Art" : "Switch to 3D Live Torus"}
          >
            <Sparkles className={cn("h-3 w-3", isLive ? "text-coral animate-pulse" : "text-muted")} />
            <span>{isLive ? "3D Dynamic" : "Static Ring"}</span>
          </button>

          <span className="text-border-subtle">|</span>

          {isLive && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="inline-flex items-center gap-1 hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-focus-ring rounded px-1"
              title={isPlaying ? "Pause rotation" : "Resume rotation"}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-3 w-3 text-secondary" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 text-coral" />
                  <span>Spin</span>
                </>
              )}
            </button>
          )}

          {isLive && isHovered && (
            <span className="hidden sm:inline-block text-[10px] text-coral/80 pl-1 border-l border-border-subtle">
              Tilt active
            </span>
          )}
        </div>
      )}
    </div>
  );
};
