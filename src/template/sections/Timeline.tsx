import type { TimelineData } from "@/platform/event-template-data";
import { formatEventTime } from "@/template/utils/event-formatting";
import { StaggerList } from "@/template/components/motion/StaggerList";
import { Reveal } from "@/template/components/motion/Reveal";
import { Clock, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM TIMELINE (CANVAS A: SATIN ALABASTER & ILLUMINATED MILESTONE RAIL)

export function TimelineSection({ data }: { data: TimelineData }) {
  if (!data.items || data.items.length === 0) return null;

  return (
    <section
      id="timeline_program"
      className="template-section section-surface-alabaster pattern-stardust-dot pattern-subtle relative overflow-x-clip"
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

        {/* Illuminated Continuous Rose Gold Rail */}
        <div className="relative max-w-2xl mx-auto pl-6 sm:pl-8 border-l-2 border-[var(--debut-rose-gold-border,#E8C4C8)] font-sans">
          <StaggerList staggerDelay={0.08} className="space-y-4 sm:space-y-6">
            {data.items.map((item, idx: number) => (
              <div key={item.id || idx} className="relative group">
                {/* Diamond Milestone Node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-2 w-4 h-4 bg-[var(--debut-surface-alabaster,#ffffff)] border-2 border-[var(--debut-bg-coral,#E65C4F)] rotate-45 group-hover:bg-[var(--debut-bg-coral)] group-hover:rotate-90 transition-all duration-300 shadow-xs z-10" />

                <div className="debut-glass-card relative overflow-visible bg-[var(--debut-surface-alabaster,#ffffff)] p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-card hover:border-[var(--debut-bg-coral)]/60 transition-colors">
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
            ))}
          </StaggerList>
        </div>
      </div>
    </section>
  );
}
