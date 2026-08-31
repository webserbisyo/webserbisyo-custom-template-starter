import type { NamedGroupsData } from "@/platform/wedding-template-data";
import { sageDecorations } from "@/template/template-assets";
import { BotanicalCornerPair } from "@/template/components/decorations/BotanicalCornerPair";
import { SectionFloralDivider } from "@/template/components/decorations/SectionFloralDivider";
import { DecorativePattern } from "@/template/components/decorations/DecorativePattern";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";

// PLATFORM DATA — KEEP DYNAMIC.
// SAGE ESTATE GODPARENTS & MENTORS REGISTER (QUIET SECTION)

export function GodparentsSection({ data }: { data: NamedGroupsData }) {
  const groups = data?.groups?.filter((g) => g && g.names && g.names.length > 0) || [];
  if (groups.length === 0) return null;

  return (
    <section
      id="godparents"
      className="template-section section-surface-paper relative overflow-x-clip"
    >
      {/* Decorative Glasshouse Grid Pattern Background */}
      <DecorativePattern
        src={sageDecorations.glasshouseGridPattern}
        opacity={0.28}
        objectPosition="center top"
        blendMode="multiply"
      />

      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-role-subheading">FOLIO // 12 &bull; GODPARENTS & MENTORS</span>
            <h2 className="text-role-heading-quiet text-[var(--wedding-text)] tracking-tight">
              Godparents &amp; Mentors
            </h2>
            <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed">
              Guiding with love, wisdom, and steadfast prayers.
            </p>
          </div>
        </Reveal>

        <div className="space-y-6">
          {groups.map((group, gIdx) => (
            <Reveal key={group.id || gIdx} direction="up" distance={20} delay={gIdx * 0.1}>
              <div className="relative overflow-visible">
                <BotanicalCornerPair size="md" />

                <LedgerPanel
                  title={group.title || "Roll of Godparents"}
                  indexTag={`MENTORS // 0${gIdx + 1}`}
                  headerAlign="center"
                  className="bg-[var(--wedding-surface)] shadow-xs relative z-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 pt-2 font-sans">
                    {group.names.map((entry, idx) => (
                      <div
                        key={entry.id || idx}
                        className="flex items-center gap-3 py-2.5 border-b border-[var(--wedding-border-subtle)] text-base font-medium text-[var(--wedding-text)] font-sans"
                      >
                        <span className="w-2 h-2 rotate-45 bg-[var(--wedding-accent)] shrink-0" />
                        <span>{entry.name}</span>
                      </div>
                    ))}
                  </div>
                </LedgerPanel>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <SectionFloralDivider />
    </section>
  );
}
