import type { NamedGroupsData } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles, Heart } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// CANONICAL BAPTISM GODPARENTS SECTION (CELESTIAL SKY & CLOUD PEARL ROSTER)

export function GodparentsSection({ data }: { data: NamedGroupsData }) {
  const groups = data?.groups?.filter((g) => g && g.names && g.names.length > 0) || [];
  if (groups.length === 0) return null;

  return (
    <section
      id="godparents"
      className="template-section section-surface-alabaster bg-pattern-debut-04 relative overflow-x-clip"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-10 sm:mb-14 space-y-2">
            <span className="text-role-subheading text-[var(--celestial-bg-sky,#0284C7)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--celestial-gold,#D97706)]" />
              <span>GUIDING LIGHT &amp; SPONSORS // 10</span>
            </span>
            <h2 className="text-role-heading-quiet text-[var(--celestial-text-navy,#0F172A)] tracking-tight">
              Honored Godparents &amp; Mentors
            </h2>
            <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[var(--celestial-text-muted,#475569)] font-serif italic">
              Blessed mentors chosen to guide and inspire our child in faith, wisdom, and love.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {groups.map((group, gIdx) => (
            <Reveal key={group.id || gIdx} direction="up" distance={20} delay={gIdx * 0.08}>
              <div className="relative overflow-visible h-full">
                <LedgerPanel
                  title={group.title || `Godparent Group ${gIdx + 1}`}
                  indexTag={`BLESSING // 0${gIdx + 1}`}
                  className="h-full bg-[var(--celestial-surface-white,#ffffff)] hover:border-[var(--celestial-bg-sky,#0284C7)] transition-colors shadow-card text-center relative z-10"
                >
                  <ul className="space-y-2.5 pt-1 font-sans">
                    {group.names.map((entry, nIdx) => (
                      <li
                        key={entry.id || nIdx}
                        className="flex items-center justify-between gap-3 text-base font-semibold text-[var(--celestial-text-navy,#0F172A)] font-serif border-b border-[var(--celestial-border-sky-subtle,rgba(186,230,253,0.45))] pb-2.5 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <Heart className="w-4 h-4 text-[var(--celestial-bg-sky,#0284C7)] shrink-0 fill-[var(--celestial-bg-sky,#0284C7)]/15" />
                          <span>{entry.name}</span>
                        </div>
                        <span className="text-xs font-cinzel text-[var(--celestial-gold,#D97706)] font-bold">
                          #{String(nIdx + 1).padStart(2, "0")}
                        </span>
                      </li>
                    ))}
                  </ul>
                </LedgerPanel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
