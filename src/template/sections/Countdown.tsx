"use client";

import { useEffect, useState } from "react";
import type { CountdownData } from "@/platform/event-template-data";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM COUNTDOWN (CANVAS B: LIVING CORAL BLOOM & FROSTED GLASS CARDS)

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
    if (!eventDate) return;

    let targetDateStr = eventDate;
    if (eventTime) {
      targetDateStr = `${eventDate}T${eventTime}:00`;
    }
    const target = new Date(targetDateStr).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = target - now;

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

  if (!eventDate) return null;

  const timeUnits = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINUTES", value: timeLeft.minutes },
    { label: "SECONDS", value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="template-section section-surface-coral pattern-coral relative overflow-x-clip text-white text-center"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-white font-cinzel font-bold tracking-[0.25em] drop-shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F9F1DC]" />
              <span>THE COUNTDOWN // 02</span>
            </span>
            <h2 className="text-role-heading-major text-white tracking-tight">
              {data.title || "Counting Down to 18"}
            </h2>
            {data.shortNote && (
              <p className="text-role-lead text-[#FFE7E2] max-w-md mx-auto mt-2 font-serif italic leading-relaxed">
                {data.shortNote}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={24} delay={0.1}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {timeUnits.map((unit, idx) => (
              <div
                key={idx}
                className="debut-glass-coral bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-5 sm:p-7 shadow-lg flex flex-col items-center justify-center transition-transform hover:scale-105"
              >
                <span className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
                  {isClient ? String(unit.value).padStart(2, "0") : "--"}
                </span>
                <span className="mt-2 text-xs sm:text-sm font-cinzel font-bold tracking-[0.2em] text-[#FFE7E2] uppercase">
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
