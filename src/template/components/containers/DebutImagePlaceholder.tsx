import * as React from "react";
import { Image as ImageIcon } from "lucide-react";
import { cn } from "../ui/cn";

export type PlaceholderContext = "portrait" | "venue" | "story" | "gallery" | string;

export interface DebutImagePlaceholderProps {
  context?: PlaceholderContext;
  label?: string;
  recommendation?: string;
  className?: string;
}

const CONTEXT_METADATA: Record<string, { title: string; recommendation: string }> = {
  portrait: {
    title: "DEBUTANTE PORTRAIT",
    recommendation: "Recommended: 4:5 Portrait · Upload in Dashboard",
  },
  venue: {
    title: "VENUE GROUNDS",
    recommendation: "Recommended: 16:10 Landscape · Upload in Dashboard",
  },
  story: {
    title: "STORY CHRONICLE",
    recommendation: "Recommended: 4:3 Landscape · Upload in Dashboard",
  },
  gallery: {
    title: "GALLERY SPECIMEN",
    recommendation: "Recommended: High-Res Photo · Upload in Dashboard",
  },
};

export function DebutImagePlaceholder({
  context = "portrait",
  label,
  recommendation,
  className,
}: DebutImagePlaceholderProps) {
  const meta = CONTEXT_METADATA[context] || {
    title: label || "PHOTO SPECIMEN",
    recommendation: recommendation || "Recommended: High-Res Photo · Upload in Dashboard",
  };

  return (
    <div
      data-surface="placeholder"
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center p-6 text-center select-none",
        "bg-[#FAF5F5] border-2 border-dashed border-[#E8C4C8] rounded-xl sm:rounded-2xl transition-colors",
        className
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-[#E8C4C8]/60 flex items-center justify-center mb-3 text-[var(--debut-rose-gold,#B76E79)]">
        <ImageIcon className="w-6 h-6" strokeWidth={1.75} />
      </div>

      <span className="font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] text-[var(--debut-text-noir,#26131C)] uppercase">
        {label || meta.title}
      </span>

      <span className="font-sans text-[11px] text-[var(--debut-text-muted,#704D5B)] mt-1 max-w-[210px] leading-relaxed">
        {recommendation || meta.recommendation}
      </span>
    </div>
  );
}
