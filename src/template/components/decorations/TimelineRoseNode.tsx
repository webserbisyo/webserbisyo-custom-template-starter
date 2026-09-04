import * as React from "react";
import { cn } from "../ui/cn";

export type TimelineRoseNodeProps = {
  isActive?: boolean;
};

export function TimelineRoseNode({ isActive = false }: TimelineRoseNodeProps) {
  return (
    <div
      className="absolute -left-8 sm:-left-10 -translate-x-1/2 top-3 sm:top-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center z-20 pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 0: Ambient Radiant Halo (Dual-Tone Living Coral + Gold Bloom) */}
      <div
        className={cn(
          "absolute -inset-2 rounded-full bg-gradient-to-tr from-[var(--debut-bg-coral,#E65C4F)]/30 to-[var(--debut-champagne-gold,#D4AF37)]/25 blur-md transition-all duration-700 ease-out",
          isActive
            ? "scale-125 opacity-100"
            : "scale-0 opacity-0 group-hover:scale-125 group-hover:opacity-100"
        )}
      />

      {/* SVG Multi-Layered Kinetic Cotillion Rose */}
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible relative z-10"
      >
        {/* Layer 1: Grand Outer Corolla (Cardinal Petals, Living Coral) */}
        <g
          className={cn(
            "origin-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            isActive
              ? "scale-100 rotate-45"
              : "scale-0 rotate-0 group-hover:scale-100 group-hover:rotate-45"
          )}
        >
          {/* North */}
          <path d="M22 2 C17 2 14 11 22 16 C30 11 27 2 22 2Z" fill="#E65C4F" opacity="0.9" />
          {/* South */}
          <path d="M22 42 C17 42 14 33 22 28 C30 33 27 42 22 42Z" fill="#E65C4F" opacity="0.9" />
          {/* East */}
          <path d="M42 22 C42 17 33 14 28 22 C33 30 42 27 42 22Z" fill="#E65C4F" opacity="0.9" />
          {/* West */}
          <path d="M2 22 C2 17 11 14 16 22 C11 30 2 27 2 22Z" fill="#E65C4F" opacity="0.9" />
        </g>

        {/* Layer 2: Intermediate Petals (Diagonal Rose Gold Filigree, 80ms Delay) */}
        <g
          className={cn(
            "origin-center transition-all duration-450 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            isActive
              ? "scale-95 -rotate-30"
              : "scale-0 rotate-0 group-hover:scale-95 group-hover:-rotate-30"
          )}
        >
          <path d="M35 9 C31 6 25 12 29 17 C35 16 38 12 35 9Z" fill="#B76E79" opacity="0.92" />
          <path d="M9 35 C6 31 12 25 17 29 C16 35 12 38 9 35Z" fill="#B76E79" opacity="0.92" />
          <path d="M35 35 C38 31 32 25 29 29 C31 35 35 38 35 35Z" fill="#B76E79" opacity="0.92" />
          <path d="M9 9 C6 12 12 18 17 13 C15 9 12 6 9 9Z" fill="#B76E79" opacity="0.92" />
        </g>

        {/* Layer 3: Inner Petal Whorls (Deep Velvet Rose, 150ms Delay) */}
        <g
          className={cn(
            "origin-center transition-all duration-400 delay-150 ease-out",
            isActive
              ? "scale-90 rotate-15 opacity-100"
              : "scale-0 rotate-0 opacity-0 group-hover:scale-90 group-hover:rotate-15 group-hover:opacity-100"
          )}
        >
          <circle cx="22" cy="18" r="3.5" fill="#914651" opacity="0.85" />
          <circle cx="22" cy="26" r="3.5" fill="#914651" opacity="0.85" />
          <circle cx="26" cy="22" r="3.5" fill="#914651" opacity="0.85" />
          <circle cx="18" cy="22" r="3.5" fill="#914651" opacity="0.85" />
        </g>

        {/* Layer 4: Central Champagne Gold Anchor Disc (Always Visible on Rail) */}
        <circle
          cx="22"
          cy="22"
          r="7"
          className={cn(
            "stroke-[var(--debut-champagne-gold,#D4AF37)] stroke-[2.5] transition-all duration-400 shadow-sm",
            isActive
              ? "fill-[var(--debut-champagne-gold,#D4AF37)]"
              : "fill-[var(--debut-surface-alabaster,#FFFFFF)] group-hover:fill-[var(--debut-champagne-gold,#D4AF37)]"
          )}
        />

        {/* Layer 5: Faceted Stardust Diamond Sparkle Core */}
        <path
          d="M22 17 L23.4 20.6 L27 22 L23.4 23.4 L22 27 L20.6 23.4 L17 22 L20.6 20.6 Z"
          className={cn(
            "transition-all duration-300",
            isActive
              ? "fill-white scale-110"
              : "fill-[var(--debut-champagne-gold,#D4AF37)] group-hover:fill-white group-hover:scale-110"
          )}
        />
      </svg>
    </div>
  );
}
