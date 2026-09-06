import * as React from "react";
import { cn } from "../ui/cn";

export type TimelineCelestialNodeProps = {
  isActive?: boolean;
};

export function TimelineCelestialNode({ isActive = false }: TimelineCelestialNodeProps) {
  return (
    <div
      className="absolute -left-8 sm:-left-10 -translate-x-1/2 top-3 sm:top-4 w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center z-20 pointer-events-none"
      aria-hidden="true"
    >
      {/* Layer 0: Ambient Radiant Halo (Celestial Sky + Warm Gold Bloom) */}
      <div
        className={cn(
          "absolute -inset-2 rounded-full bg-gradient-to-tr from-[var(--celestial-bg-sky,#0284C7)]/30 to-[var(--celestial-gold,#D97706)]/25 blur-md transition-all duration-700 ease-out",
          isActive
            ? "scale-125 opacity-100"
            : "scale-0 opacity-0 group-hover:scale-125 group-hover:opacity-100"
        )}
      />

      {/* SVG Multi-Layered Kinetic Celestial Star Node */}
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible relative z-10"
      >
        {/* Layer 1: Primary Star Rays (Celestial Sky Blue) */}
        <g
          className={cn(
            "origin-center transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            isActive
              ? "scale-100 rotate-45"
              : "scale-0 rotate-0 group-hover:scale-100 group-hover:rotate-45"
          )}
        >
          {/* North */}
          <path d="M22 3 C19 3 17 11 22 16 C27 11 25 3 22 3Z" fill="#0284C7" opacity="0.9" />
          {/* South */}
          <path d="M22 41 C19 41 17 33 22 28 C27 33 25 41 22 41Z" fill="#0284C7" opacity="0.9" />
          {/* East */}
          <path d="M41 22 C41 19 33 17 28 22 C33 27 41 25 41 22Z" fill="#0284C7" opacity="0.9" />
          {/* West */}
          <path d="M3 22 C3 19 11 17 16 22 C11 27 3 25 3 22Z" fill="#0284C7" opacity="0.9" />
        </g>

        {/* Layer 2: Intermediate Star Rays (Diagonal Warm Gold Filigree) */}
        <g
          className={cn(
            "origin-center transition-all duration-450 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)]",
            isActive
              ? "scale-95 -rotate-30"
              : "scale-0 rotate-0 group-hover:scale-95 group-hover:-rotate-30"
          )}
        >
          <path d="M35 9 C32 7 27 12 30 17 C35 15 37 11 35 9Z" fill="#D97706" opacity="0.9" />
          <path d="M9 35 C7 32 12 27 17 30 C15 35 11 37 9 35Z" fill="#D97706" opacity="0.9" />
          <path d="M35 35 C37 32 32 27 29 30 C30 35 34 37 35 35Z" fill="#D97706" opacity="0.9" />
          <path d="M9 9 C7 11 12 16 17 13 C15 8 11 7 9 9Z" fill="#D97706" opacity="0.9" />
        </g>

        {/* Layer 3: Central Starlight Halo Disc */}
        <circle
          cx="22"
          cy="22"
          r="7"
          className={cn(
            "stroke-[var(--celestial-gold,#D97706)] stroke-[2] transition-all duration-400 shadow-sm",
            isActive
              ? "fill-[var(--celestial-gold,#D97706)]"
              : "fill-[var(--celestial-surface-white,#FFFFFF)] group-hover:fill-[var(--celestial-gold,#D97706)]"
          )}
        />

        {/* Layer 4: Faceted Celestial Cross/Star Diamond Core */}
        <path
          d="M22 17 L23.4 20.6 L27 22 L23.4 23.4 L22 27 L20.6 23.4 L17 22 L20.6 20.6 Z"
          className={cn(
            "transition-all duration-300",
            isActive
              ? "fill-white scale-110"
              : "fill-[var(--celestial-gold,#D97706)] group-hover:fill-white group-hover:scale-110"
          )}
        />
      </svg>
    </div>
  );
}
