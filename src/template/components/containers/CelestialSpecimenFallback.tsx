import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../ui/cn";

export interface CelestialSpecimenFallbackProps {
  label?: string;
  category?: "portrait" | "venue" | "chronicle" | "gallery" | string;
  className?: string;
}

export function CelestialSpecimenFallback({
  label = "SACRED ARCHIVE",
  category = "portrait",
  className,
}: CelestialSpecimenFallbackProps) {
  const categoryTag = (category || "portrait").toUpperCase();

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-hidden",
        "bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]",
        className
      )}
    >
      {/* Background Stardust Filigree */}
      <div className="absolute inset-0 pattern-stardust-dot opacity-40 pointer-events-none" />

      {/* Top Folio Header */}
      <div className="relative z-10 flex items-center justify-between w-full text-[10px] font-cinzel font-bold tracking-[0.2em] text-[var(--celestial-bg-sky,#0284C7)] uppercase shrink-0">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[var(--celestial-gold,#D97706)]" />
          <span>SPECIMEN // {categoryTag}</span>
        </span>
        <span className="opacity-60 text-[var(--celestial-gold,#D97706)]">SACRAMENT</span>
      </div>

      {/* Central Celestial Arch & Starlight Cross Vector Wireframe */}
      <div className="relative z-10 w-full max-w-[220px] sm:max-w-[260px] aspect-[4/5] my-auto flex items-center justify-center">
        <svg
          viewBox="0 0 200 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[var(--celestial-bg-sky,#0284C7)]"
        >
          {/* Outer Roman Arch */}
          <path
            d="M20 230 V90 C20 40 55 15 100 15 C145 15 180 40 180 90 V230"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.5"
          />
          {/* Inner Roman Arch */}
          <path
            d="M30 230 V92 C30 50 60 25 100 25 C140 25 170 50 170 92 V230"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.8"
          />

          {/* Radiant Starlight Halo */}
          <circle
            cx="100"
            cy="110"
            r="38"
            stroke="var(--celestial-gold,#D97706)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.75"
          />

          {/* Central Sacred Cross / Dove Geometry */}
          <path
            d="M100 65 V155 M75 95 H125"
            stroke="var(--celestial-gold,#D97706)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Little Stars */}
          <path
            d="M100 50 L102 55 L107 55 L103 58 L105 63 L100 60 L95 63 L97 58 L93 55 L98 55 Z"
            fill="var(--celestial-gold,#D97706)"
            opacity="0.9"
          />
        </svg>
      </div>

      {/* Bottom Inscription Tag */}
      <div className="relative z-10 w-full text-center shrink-0">
        <span className="font-cinzel text-[9px] font-bold tracking-[0.25em] text-[var(--celestial-text-navy,#0F172A)]/60 uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}

/** Backward-compatible alias */
export const CotillionSpecimenFallback = CelestialSpecimenFallback;
