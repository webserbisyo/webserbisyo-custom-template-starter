import * as React from "react";
import { Image as ImageIcon, Sparkles } from "lucide-react";
import { cn } from "../ui/cn";

export type PlaceholderContext = "portrait" | "venue" | "story" | "gallery" | string;

export interface CelestialImagePlaceholderProps {
  context?: PlaceholderContext;
  label?: string;
  recommendation?: string;
  className?: string;
}

const CONTEXT_METADATA: Record<string, { title: string; recommendation: string }> = {
  portrait: {
    title: "CHRISTENING PORTRAIT",
    recommendation: "Recommended: 4:5 Portrait · Upload in Dashboard",
  },
  venue: {
    title: "CHURCH & VENUE GROUNDS",
    recommendation: "Recommended: 16:10 Landscape · Upload in Dashboard",
  },
  story: {
    title: "DEDICATION PHOTO",
    recommendation: "Recommended: 4:3 Landscape · Upload in Dashboard",
  },
  gallery: {
    title: "GALLERY MOMENT",
    recommendation: "Recommended: High-Res Photo · Upload in Dashboard",
  },
};

export function CelestialImagePlaceholder({
  context = "portrait",
  label,
  recommendation,
  className,
}: CelestialImagePlaceholderProps) {
  const meta = CONTEXT_METADATA[context] || {
    title: label || "PHOTO SPECIMEN",
    recommendation: recommendation || "Recommended: High-Res Photo · Upload in Dashboard",
  };

  return (
    <div
      data-surface="placeholder"
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none",
        "bg-[var(--celestial-surface-alt,#F1F5F9)] border-2 border-dashed border-[var(--celestial-border-sky,#BAE6FD)] rounded-xl sm:rounded-2xl transition-colors",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[var(--celestial-border-sky,#BAE6FD)]/60 flex items-center justify-center mb-3 text-[var(--celestial-bg-sky,#0284C7)]">
        <ImageIcon className="w-6 h-6" strokeWidth={1.75} />
      </div>

      <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[var(--celestial-text-navy,#0F172A)] uppercase">
        {label || meta.title}
      </span>

      <span className="font-sans text-[11px] text-[var(--celestial-text-muted,#475569)] mt-1 max-w-[210px] leading-relaxed">
        {recommendation || meta.recommendation}
      </span>
    </div>
  );
}

/** Backward-compatible export alias for any components referencing DebutImagePlaceholder */
export const DebutImagePlaceholder = CelestialImagePlaceholder;
