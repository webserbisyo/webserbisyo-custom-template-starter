"use client";

import React from "react";
import { cn } from "../ui/cn";

export interface DateCalendarProps {
  date?: string | Date | null;
  locale?: string;
  highlightLabel?: string;
  className?: string;
}

export function DateCalendar({
  date,
  locale = "en-US",
  highlightLabel = "Grand Cotillion",
  className,
}: DateCalendarProps) {
  // Safe local date parsing to avoid UTC rollback
  const targetDate = React.useMemo(() => {
    if (!date) return null;
    if (date instanceof Date) return isNaN(date.getTime()) ? null : date;
    const match = String(date)
      .trim()
      .match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const y = parseInt(match[1], 10);
      const m = parseInt(match[2], 10) - 1;
      const d = parseInt(match[3], 10);
      const parsed = new Date(y, m, d);
      return isNaN(parsed.getTime()) ? null : parsed;
    }
    const fallback = new Date(date);
    return isNaN(fallback.getTime()) ? null : fallback;
  }, [date]);

  const activeDate = targetDate || new Date();
  const year = activeDate.getFullYear();
  const month = activeDate.getMonth();
  const highlightedDay = targetDate ? targetDate.getDate() : null;

  const monthName = new Intl.DateTimeFormat(locale, { month: "long" }).format(activeDate);
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const firstDayIndex = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();

  const days: { day: number; isCurrentMonth: boolean; isTarget: boolean }[] = [];

  for (let i = firstDayIndex - 1; i >= 0; i--) {
    days.push({
      day: prevMonthTotalDays - i,
      isCurrentMonth: false,
      isTarget: false,
    });
  }

  for (let d = 1; d <= totalDays; d++) {
    days.push({
      day: d,
      isCurrentMonth: true,
      isTarget: d === highlightedDay,
    });
  }

  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let n = 1; n <= remainingCells; n++) {
    days.push({
      day: n,
      isCurrentMonth: false,
      isTarget: false,
    });
  }

  return (
    <div
      className={cn(
        "debut-glass-card rounded-3xl border border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] p-6 sm:p-7 shadow-card max-w-sm mx-auto text-center select-none text-[var(--debut-text-noir,#26131C)]",
        className
      )}
    >
      {/* Month & Year Header */}
      <div className="mb-4 flex items-center justify-between border-b border-[var(--debut-rose-gold-subtle)] pb-3">
        <span className="font-serif text-xl sm:text-2xl font-bold text-[var(--debut-text-noir,#26131C)] tracking-tight">
          {monthName}
        </span>
        <span className="font-cinzel text-xs font-bold text-[var(--debut-rose-gold,#B76E79)]">
          {year}
        </span>
      </div>

      {/* Weekday Row */}
      <div className="grid grid-cols-7 gap-1 text-[11px] font-bold text-[var(--debut-text-muted,#704D5B)] uppercase tracking-wider mb-2 font-cinzel">
        {weekdays.map((w) => (
          <div key={w} className="h-6 flex items-center justify-center">
            {w}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 text-xs font-sans">
        {days.map((cell, idx) => (
          <div
            key={idx}
            className={cn(
              "h-8 w-8 mx-auto flex items-center justify-center rounded-full font-medium transition-all",
              !cell.isCurrentMonth && "text-[var(--debut-rose-gold-border)]/60 opacity-40",
              cell.isCurrentMonth &&
                !cell.isTarget &&
                "text-[var(--debut-text-noir,#26131C)] hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] font-semibold",
              cell.isTarget &&
                "bg-[var(--debut-bg-coral,#E65C4F)] text-white font-bold shadow-md scale-105"
            )}
          >
            {cell.day}
          </div>
        ))}
      </div>

      {/* Highlight Tag */}
      {highlightLabel && targetDate ? (
        <div className="mt-4 pt-3 border-t border-[var(--debut-rose-gold-subtle)] text-xs font-semibold text-[var(--debut-text-noir,#26131C)] flex items-center justify-center gap-1.5 font-sans">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--debut-bg-coral,#E65C4F)]" />
          <span>{highlightLabel}</span>
        </div>
      ) : null}
    </div>
  );
}
