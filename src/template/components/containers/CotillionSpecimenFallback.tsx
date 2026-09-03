import * as React from "react";
import { Sparkles } from "lucide-react";
import { cn } from "../ui/cn";

export interface CotillionSpecimenFallbackProps {
  label?: string;
  category?: "portrait" | "ballroom" | "chronicle" | "gallery" | string;
  className?: string;
}

export function CotillionSpecimenFallback({
  label = "COTILLION ARCHIVE",
  category = "portrait",
  className,
}: CotillionSpecimenFallbackProps) {
  const categoryTag = (category || "portrait").toUpperCase();

  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-hidden",
        "bg-gradient-to-b from-[#FFFDFC] via-[#FAF5F5] to-[#F4EBEB]",
        className
      )}
    >
      {/* Background Stardust Filigree */}
      <div className="absolute inset-0 pattern-stardust-dot opacity-40 pointer-events-none" />

      {/* Top Folio Header */}
      <div className="relative z-10 flex items-center justify-between w-full text-[10px] font-cinzel font-bold tracking-[0.2em] text-[var(--debut-rose-gold,#B76E79)] uppercase shrink-0">
        <span className="inline-flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[var(--debut-champagne-gold,#D4AF37)]" />
          <span>SPECIMEN // {categoryTag}</span>
        </span>
        <span className="opacity-60">N° 18</span>
      </div>

      {/* Central Cotillion Arch & Ballgown Vector Wireframe */}
      <div className="relative z-10 w-full max-w-[220px] sm:max-w-[260px] aspect-[4/5] my-auto flex items-center justify-center">
        <svg
          viewBox="0 0 200 250"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-[var(--debut-rose-gold,#B76E79)]"
        >
          {/* Outer Royal Arch */}
          <path
            d="M20 230 V90 C20 40 55 15 100 15 C145 15 180 40 180 90 V230"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 2"
            opacity="0.5"
          />
          {/* Inner Royal Arch */}
          <path
            d="M30 230 V92 C30 50 60 25 100 25 C140 25 170 50 170 92 V230"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.8"
          />
          {/* Arch Keystones & Stardust Accents */}
          <circle cx="100" cy="25" r="4" fill="#D4AF37" />
          <circle cx="60" cy="45" r="2.5" fill="#D4AF37" opacity="0.7" />
          <circle cx="140" cy="45" r="2.5" fill="#D4AF37" opacity="0.7" />

          {/* Grand Ballroom Chandelier Motif */}
          <path d="M100 25 V50" stroke="#D4AF37" strokeWidth="1" />
          <path d="M85 50 H115" stroke="#D4AF37" strokeWidth="1" />
          <path d="M90 50 L100 65 L110 50" stroke="#D4AF37" strokeWidth="1" opacity="0.6" />

          {/* Couture Ballgown Silhouette Wireframe */}
          {/* Bodice */}
          <path
            d="M93 78 C93 74 97 72 100 75 C103 72 107 74 107 78 L105 102 C103 105 97 105 95 102 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="rgba(183, 110, 121, 0.08)"
          />
          {/* Waist Ribbon */}
          <line x1="94" y1="102" x2="106" y2="102" stroke="#D4AF37" strokeWidth="1.5" />
          {/* Cascading Tiers of Grand Ballgown Skirt */}
          <path
            d="M95 104 C88 120 72 145 55 175 C80 182 120 182 145 175 C128 145 112 120 105 104 Z"
            stroke="currentColor"
            strokeWidth="1.2"
            fill="rgba(230, 92, 79, 0.04)"
          />
          <path
            d="M55 175 C45 200 35 220 32 230 C75 235 125 235 168 230 C165 220 155 200 145 175"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="3 2"
            fill="rgba(183, 110, 121, 0.06)"
          />
          {/* Internal Skirt Flounces */}
          <path
            d="M70 140 C85 145 115 145 130 140"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
          />
          <path
            d="M50 195 C80 203 120 203 150 195"
            stroke="currentColor"
            strokeWidth="0.8"
            opacity="0.5"
          />

          {/* Golden Hem Stars */}
          <circle cx="65" cy="228" r="1.5" fill="#D4AF37" />
          <circle cx="100" cy="231" r="2" fill="#D4AF37" />
          <circle cx="135" cy="228" r="1.5" fill="#D4AF37" />
        </svg>
      </div>

      {/* Bottom Archival Seal */}
      <div className="relative z-10 flex flex-col items-center gap-1 text-center shrink-0">
        <span className="font-cinzel text-xs font-bold text-[var(--debut-text-noir,#26131C)] tracking-[0.25em]">
          {label}
        </span>
        <span className="font-serif italic text-[11px] text-[var(--debut-text-muted,#704D5B)]">
          Debutante Portrait Specimen
        </span>
      </div>
    </div>
  );
}
