import type { NamedGroupsData } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Crown, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM DEBUT COURT REGISTER (CANVAS A: SATIN ALABASTER & COTILLION DE HONOR)

export function DebutCourtSection({ data }: { data: NamedGroupsData }) {
  const groups = data?.groups?.filter((g) => g && g.names && g.names.length > 0) || [];
  if (groups.length === 0) return null;

  return (
    <section
      id="debut_court"
      className="template-section section-surface-alabaster bg-pattern-debut-04 relative overflow-x-clip"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-10 sm:mb-14 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>COTILLION COURT // 11</span>
            </span>
            <h2 className="text-role-heading-quiet text-[var(--debut-text-noir,#26131C)] tracking-tight">
              The Cotillion Court of Honor
            </h2>
            <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#704D5B)]">
              The honored ladies and gentlemen of the cotillion court standing with the debutante.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {groups.map((group, gIdx) => (
            <Reveal key={group.id || gIdx} direction="up" distance={20} delay={gIdx * 0.08}>
              <div className="relative overflow-visible h-full">
                <LedgerPanel
                  title={group.title || `Court Group ${gIdx + 1}`}
                  indexTag={`COURT // 0${gIdx + 1}`}
                  className="h-full bg-[var(--debut-surface-alabaster,#ffffff)] hover:border-[var(--debut-rose-gold,#B76E79)] transition-colors shadow-card text-center relative z-10"
                >
                  <ul className="space-y-2.5 pt-1 font-sans">
                    {group.names.map((entry, nIdx) => (
                      <li
                        key={entry.id || nIdx}
                        className="flex items-center justify-between gap-3 text-base font-semibold text-[var(--debut-text-noir,#26131C)] font-serif border-b border-[var(--debut-rose-gold-subtle)] pb-2.5 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <Crown className="w-4 h-4 text-[var(--debut-champagne-gold,#D4AF37)] shrink-0" />
                          <span>{entry.name}</span>
                        </div>
                        <span className="text-xs font-cinzel text-[var(--debut-rose-gold,#B76E79)] font-bold">
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
