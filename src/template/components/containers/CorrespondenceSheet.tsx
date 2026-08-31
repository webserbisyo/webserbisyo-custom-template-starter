import * as React from "react";
import { cn } from "../ui/cn";

export interface CorrespondenceSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  dateStamp?: string;
  senderLabel?: string;
  title?: string;
}

export function CorrespondenceSheet({
  className,
  dateStamp,
  senderLabel,
  title,
  children,
  ...props
}: CorrespondenceSheetProps) {
  return (
    <div
      data-surface="light"
      className={cn(
        "correspondence-sheet debut-glass-card relative mx-auto w-full max-w-3xl rounded-2xl sm:rounded-3xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)]/95 text-[var(--debut-text-noir,#26131C)] p-8 sm:p-12 shadow-card text-left transition-all",
        className
      )}
      {...props}
    >
      {/* Subtle Header Stamp */}
      {dateStamp || senderLabel || title ? (
        <div className="mb-6 flex items-center justify-between border-b border-[var(--debut-rose-gold-subtle)] pb-3.5 text-xs tracking-[0.22em] uppercase text-[var(--debut-rose-gold,#B76E79)] font-cinzel font-bold">
          <span>{senderLabel || title || "COTILLION DISPATCH"}</span>
          <span>{dateStamp || "ARCHIVE RECORD"}</span>
        </div>
      ) : null}

      {/* Sheet Content */}
      <div className="space-y-6 leading-relaxed text-[var(--debut-text-noir,#26131C)] text-base sm:text-lg font-sans">
        {children}
      </div>
    </div>
  );
}
