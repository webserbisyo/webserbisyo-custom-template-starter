"use client";

import { useEffect, useState } from "react";
import type { CountdownData } from "@/platform/event-template-data";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles } from "lucide-react";

export type CountdownSectionProps = {
  data: CountdownData;
  eventDate?: string | null;
  eventTime?: string | null;
};

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function parseTargetTimestamp(eventDate?: string | null, eventTime?: string | null): number | null {
  if (!eventDate || typeof eventDate !== "string") return null;
  const cleanDate = eventDate.trim();
  if (!cleanDate) return null;

  // 1. Full ISO format with time separator
  if (cleanDate.includes("T")) {
    const t = new Date(cleanDate).getTime();
    if (!Number.isNaN(t)) return t;
  }

  // 2. Extract hours, minutes, seconds (handles '18:00' or '6:00 PM')
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  let hasCustomTime = false;

  if (eventTime && typeof eventTime === "string") {
    const timeMatch = eventTime.trim().match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?\s*(am|pm)?$/i);
    if (timeMatch) {
      let h = parseInt(timeMatch[1], 10);
      const m = parseInt(timeMatch[2], 10);
      const s = timeMatch[3] ? parseInt(timeMatch[3], 10) : 0;
      const meridiem = timeMatch[4]?.toLowerCase();
      if (meridiem === "pm" && h < 12) h += 12;
      else if (meridiem === "am" && h === 12) h = 0;
      hours = h;
      minutes = m;
      seconds = s;
      hasCustomTime = true;
    }
  }

  // 3. Match YYYY-MM-DD
  const isoMatch = cleanDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (isoMatch) {
    const y = parseInt(isoMatch[1], 10);
    const m = parseInt(isoMatch[2], 10) - 1;
    const d = parseInt(isoMatch[3], 10);
    const local = new Date(y, m, d, hours, minutes, seconds);
    if (!Number.isNaN(local.getTime())) return local.getTime();
  }

  // 4. Human date strings fallback (e.g. "December 14, 2026")
  const humanDate = new Date(cleanDate);
  if (!Number.isNaN(humanDate.getTime())) {
    if (hasCustomTime) humanDate.setHours(hours, minutes, seconds, 0);
    return humanDate.getTime();
  }

  return null;
}

export function CountdownSection({ data, eventDate, eventTime }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    let target = parseTargetTimestamp(eventDate, eventTime);
    const now = Date.now();

    // Design Mode / Expired Date Fallback: provides an active target (+100 days)
    if (!target || target <= now) {
      target = now + 100 * 86400000 + 12 * 3600000 + 30 * 60000;
    }

    const updateTimer = () => {
      const currentNow = Date.now();
      const difference = target! - currentNow;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [eventDate, eventTime]);

  if (!isClient) return null;

  const timeUnits = [
    { label: "DAYS", value: String(timeLeft.days).padStart(2, "0") },
    { label: "HOURS", value: String(timeLeft.hours).padStart(2, "0") },
    { label: "MINUTES", value: String(timeLeft.minutes).padStart(2, "0") },
    { label: "SECONDS", value: String(timeLeft.seconds).padStart(2, "0") },
  ];

  return (
    <section
      id="countdown"
      className="template-section section-surface-coral bg-pattern-debut-02 relative overflow-x-clip text-white text-center"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="space-y-2 mb-8 sm:mb-12">
            <span className="text-role-subheading text-white drop-shadow-sm inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-soft,#F9F1DC)]" />
              <span>THE COUNTDOWN // 02</span>
            </span>
            <h2 className="text-role-heading text-white tracking-tight">
              {data.title || "Counting Down to Sophia's 18th Birthday"}
            </h2>
            {data.shortNote && (
              <p className="text-role-lead text-white/80 max-w-md mx-auto italic font-serif">
                {data.shortNote}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="up" distance={20}>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md sm:max-w-lg mx-auto">
            {timeUnits.map((unit) => (
              <div
                key={unit.label}
                className="p-3 sm:p-5 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 shadow-md flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <span className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight">
                  {unit.value}
                </span>
                <span className="font-cinzel text-[9px] sm:text-xs font-semibold tracking-wider text-white/80 mt-1 uppercase">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
