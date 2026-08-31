import type { NamedGroupsData } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Crown } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// SAGE ESTATE DEBUT COURT REGISTER (COTILLION DE HONOR)

export function DebutCourtSection({ data }: { data: NamedGroupsData }) {
  const groups = data?.groups?.filter((g) => g && g.names && g.names.length > 0) || [];
  if (groups.length === 0) return null;

  return (
    <section
      id="debut_court"
      className="template-section section-surface-paper relative overflow-x-clip"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-10 sm:mb-14 space-y-2">
            <span className="text-role-subheading">FOLIO // 11 &bull; DEBUT COURT</span>
            <h2 className="text-role-heading-quiet text-[var(--wedding-text)] tracking-tight">
              The Debut Court
            </h2>
            <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed">
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
                  className="h-full bg-[var(--wedding-surface)] hover:border-[var(--wedding-accent)]/50 transition-colors shadow-xs text-center relative z-10"
                >
                  <ul className="space-y-2.5 pt-1 font-sans">
                    {group.names.map((entry, nIdx) => (
                      <li
                        key={entry.id || nIdx}
                        className="flex items-center justify-between gap-3 text-base font-semibold text-[var(--wedding-text)] font-serif border-b border-[var(--wedding-border-subtle)] pb-2 last:border-0 last:pb-0"
                      >
                        <div className="flex items-center gap-2.5">
                          <Crown className="w-3.5 h-3.5 text-[var(--wedding-accent)] opacity-70 shrink-0" />
                          <span>{entry.name}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--wedding-text-muted)] font-normal">
                          0{nIdx + 1}
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
