import * as React from "react";

export function TimelineRoseNode() {
  return (
    <div
      className="absolute -left-6 sm:-left-8 -translate-x-1/2 top-4 w-7 h-7 flex items-center justify-center z-20 pointer-events-none"
      aria-hidden="true"
    >
      {/* Ambient Blossom Aura */}
      <div className="absolute inset-0 rounded-full bg-[var(--debut-bg-coral,#E65C4F)]/20 scale-0 group-hover:scale-150 transition-transform duration-500 ease-out blur-xs" />

      {/* SVG Multi-Petal Blooming Rose Vector */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* Layer 1: Outer Petals (Spring Blossom Physics) */}
        <g className="origin-center transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-0 group-hover:scale-100 group-hover:rotate-45">
          {/* North Petal */}
          <path d="M16 2 C13 2 11 8 16 11 C21 8 19 2 16 2Z" fill="#E65C4F" opacity="0.85" />
          {/* South Petal */}
          <path d="M16 30 C13 30 11 24 16 21 C21 24 19 30 16 30Z" fill="#E65C4F" opacity="0.85" />
          {/* East Petal */}
          <path d="M30 16 C30 13 24 11 21 16 C24 21 30 19 30 16Z" fill="#E65C4F" opacity="0.85" />
          {/* West Petal */}
          <path d="M2 16 C2 13 8 11 11 16 C8 21 2 19 2 16Z" fill="#E65C4F" opacity="0.85" />
        </g>

        {/* Layer 2: Intermediate Diagonal Petals (Staggered Delay: 75ms) */}
        <g className="origin-center transition-all duration-350 delay-75 ease-[cubic-bezier(0.34,1.56,0.64,1)] scale-0 group-hover:scale-90 group-hover:-rotate-30">
          <path d="M26 6 C23 4 19 8 22 12 C26 11 28 8 26 6Z" fill="#B76E79" opacity="0.9" />
          <path d="M6 26 C4 23 8 19 12 22 C11 26 8 28 6 26Z" fill="#B76E79" opacity="0.9" />
          <path d="M26 26 C28 23 24 19 22 22 C23 26 26 28 26 26Z" fill="#B76E79" opacity="0.9" />
          <path d="M6 6 C4 8 8 12 12 9 C11 6 8 4 6 6Z" fill="#B76E79" opacity="0.9" />
        </g>

        {/* Layer 3: Central Golden Seed Bud (Always Visible Milestone Anchor) */}
        <circle
          cx="16"
          cy="16"
          r="5"
          className="fill-[var(--debut-surface-alabaster,#FFFFFF)] stroke-[var(--debut-champagne-gold,#D4AF37)] stroke-[2] group-hover:fill-[var(--debut-champagne-gold,#D4AF37)] transition-colors duration-300 shadow-sm"
        />
        {/* Core Pistil Sparkle */}
        <circle
          cx="16"
          cy="16"
          r="2"
          className="fill-[var(--debut-champagne-gold,#D4AF37)] group-hover:fill-white transition-colors duration-300"
        />
      </svg>
    </div>
  );
}
