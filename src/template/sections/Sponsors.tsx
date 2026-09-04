import type { SponsorsData } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM SPECIAL MENTORS & SPONSORS (CANVAS B: LIVING CORAL WITH SOLID WHITE ENCLOSURE CARD)

function parseSponsorNames(rawNames: string): string[] {
  if (!rawNames || typeof rawNames !== "string") return [];

  const lines = rawNames
    .split(/\r?\n/)
    .map((n) => n.trim())
    .filter(Boolean);

  if (lines.length > 1) {
    return lines;
  }

  if (lines.length === 1 && lines[0].includes(",")) {
    return lines[0]
      .split(",")
      .map((n) => n.trim())
      .filter(Boolean);
  }

  return lines;
}

export function SponsorsSection({ data }: { data: SponsorsData }) {
  const names = parseSponsorNames(data.names || "");
  if (names.length === 0) return null;

  return (
    <section
      id="principal_sponsors"
      className="template-section section-surface-coral bg-pattern-debut-03 text-white relative overflow-x-clip"
    >
      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-white font-cinzel font-bold tracking-[0.25em] drop-shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F9F1DC]" />
              <span>SPECIAL MENTORS &amp; SPONSORS // 12</span>
            </span>
            <h2 className="text-role-heading-major text-white tracking-tight">
              Honored Sponsors &amp; Mentors
            </h2>
            {data.introLine && (
              <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[#FFE7E2] font-serif italic">
                {data.introLine}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="relative overflow-visible">
            <LedgerPanel
              title="Roll of Honored Sponsors"
              indexTag="OFFICIAL ROSTER"
              headerAlign="center"
              className="debut-card-coral-enclosure bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] shadow-2xl relative z-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 pt-2 font-sans">
                {names.map((name, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 py-2.5 border-b border-[var(--debut-rose-gold-subtle)] text-base font-semibold text-[var(--debut-text-noir,#26131C)] font-sans"
                  >
                    <span className="w-2 h-2 rotate-45 bg-[var(--debut-champagne-gold,#D4AF37)] shrink-0" />
                    <span>{name}</span>
                  </div>
                ))}
              </div>
            </LedgerPanel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
