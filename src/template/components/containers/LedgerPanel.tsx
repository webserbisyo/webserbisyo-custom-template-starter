import * as React from "react";
import { cn } from "../ui/cn";

export interface LedgerPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  indexTag?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  headerAlign?: "left" | "center";
}

export function LedgerPanel({
  className,
  indexTag,
  title,
  subtitle,
  children,
  footer,
  headerAlign = "left",
  ...props
}: LedgerPanelProps) {
  const isCentered = headerAlign === "center";

  return (
    <div
      data-surface="light"
      className={cn(
        "ledger-panel debut-glass-card relative rounded-2xl sm:rounded-3xl border border-[var(--debut-glass-border,#E8C4C8)] bg-[var(--debut-glass-bg,#ffffff)]/92 text-[var(--debut-text-noir,#26131C)] p-6 sm:p-8 shadow-card text-left transition-all",
        className
      )}
      {...props}
    >
      {/* Optional Top Ledger Index Bar */}
      {indexTag || title ? (
        <div
          className={cn(
            "mb-6 border-b border-[var(--debut-rose-gold-subtle)] pb-4",
            isCentered ? "text-center" : "text-left"
          )}
        >
          {indexTag ? (
            <div
              className={cn(
                "flex gap-4",
                isCentered ? "items-center justify-center" : "items-center justify-between"
              )}
            >
              <span className="text-[10px] font-cinzel font-bold tracking-[0.22em] text-[var(--debut-rose-gold,#B76E79)] uppercase">
                {indexTag}
              </span>
            </div>
          ) : null}
          {title ? (
            <h3 className="mt-1 font-serif text-xl sm:text-2xl font-bold tracking-tight text-[var(--debut-text-noir,#26131C)]">
              {title}
            </h3>
          ) : null}
          {subtitle ? (
            <p className="mt-1 text-sm text-[var(--debut-text-muted,#704D5B)] font-sans">
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Main Content Area */}
      <div className="space-y-4">{children}</div>

      {/* Optional Footer Strip */}
      {footer ? (
        <div className="mt-6 border-t border-[var(--debut-rose-gold-subtle)] pt-4 text-xs text-[var(--debut-text-muted,#704D5B)]">
          {footer}
        </div>
      ) : null}
    </div>
  );
}
