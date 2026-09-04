"use client";

import { useEffect, useRef, useState } from "react";
import type { TimelineData } from "@/platform/event-template-data";
import { formatEventTime } from "@/template/utils/event-formatting";
import { StaggerList } from "@/template/components/motion/StaggerList";
import { Reveal } from "@/template/components/motion/Reveal";
import { Clock, Sparkles } from "lucide-react";
import { TimelineRoseNode } from "@/template/components/decorations/TimelineRoseNode";
import { cn } from "@/template/components/ui/cn";

export function TimelineSection({ data }: { data: TimelineData }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const itemElementsRef = useRef<Map<string, HTMLElement>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const viewportMid = window.innerHeight / 2;
          visibleEntries.sort((a, b) => {
            const aDist = Math.abs(
              a.boundingClientRect.top + a.boundingClientRect.height / 2 - viewportMid
            );
            const bDist = Math.abs(
              b.boundingClientRect.top + b.boundingClientRect.height / 2 - viewportMid
            );
            return aDist - bDist;
          });

          const focalId = visibleEntries[0].target.getAttribute("data-milestone-id");
          if (focalId) {
            setActiveId(focalId);
          }
        }
      },
      {
        rootMargin: "-25% 0px -35% 0px",
        threshold: [0.1, 0.4, 0.7],
      }
    );

    itemElementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [data.items]);

  if (!data.items || data.items.length === 0) return null;

  return (
    <section
      id="timeline_program"
      className="template-section section-surface-alabaster bg-pattern-debut-02 relative overflow-x-clip"
    >
      <div className="template-container">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-10 sm:mb-14 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>PROGRAM FLOW // 09</span>
            </span>
            <h2 className="text-role-heading text-[var(--debut-text-noir,#26131C)] tracking-tight">
              {data.sectionTitle || "Grand Cotillion Timeline"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#704D5B)]">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        {/* Illuminated Continuous Rose Gold Rail with Anti-Clipping Mobile Indent */}
        <div className="relative max-w-2xl mx-auto ml-4 sm:ml-auto sm:mx-auto pl-8 sm:pl-10 border-l-2 border-[var(--debut-rose-gold-border,#E8C4C8)] font-sans">
          <StaggerList className="space-y-4 sm:space-y-6" staggerDelay={0.08}>
            {data.items.map((item, idx: number) => {
              const itemId = item.id || `milestone-${idx}`;
              const isActive = activeId === itemId;

              return (
                <div
                  key={itemId}
                  data-milestone-id={itemId}
                  ref={(el) => {
                    if (el) itemElementsRef.current.set(itemId, el);
                    else itemElementsRef.current.delete(itemId);
                  }}
                  className="relative group"
                >
                  {/* Multi-Petal Blooming Rose Milestone Node */}
                  <TimelineRoseNode isActive={isActive} />

                  {/* Synchronized Radiant Dual-Tone Event Card */}
                  <div
                    className={cn(
                      "debut-glass-card relative overflow-visible bg-[var(--debut-surface-alabaster,#ffffff)] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border transition-all duration-500 ease-out",
                      isActive
                        ? "border-[var(--debut-bg-coral,#E65C4F)] shadow-[0_10px_30px_-5px_rgba(230,92,79,0.22),0_0_0_1.5px_rgba(212,175,55,0.45)]"
                        : "border-[var(--debut-rose-gold-border,#E8C4C8)]/80 shadow-card group-hover:border-[var(--debut-bg-coral,#E65C4F)] group-hover:shadow-[0_10px_30px_-5px_rgba(230,92,79,0.22),0_0_0_1.5px_rgba(212,175,55,0.45)]"
                    )}
                  >
                    <div className="relative z-10">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 mb-2.5 border-b border-[var(--debut-rose-gold-subtle)]">
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--debut-text-noir,#26131C)]">
                          {item.title}
                        </h3>
                        {item.time && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] text-[var(--debut-text-noir,#26131C)] font-cinzel text-xs font-bold uppercase tracking-wider border border-[var(--debut-rose-gold-subtle)]">
                            <Clock className="w-3.5 h-3.5 text-[var(--debut-bg-coral,#E65C4F)]" />
                            <span>{formatEventTime(item.time)}</span>
                          </div>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-sm sm:text-base text-[var(--debut-text-noir,#26131C)] leading-relaxed font-sans">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </StaggerList>
        </div>
      </div>
    </section>
  );
}
