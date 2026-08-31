import type { SecondaryEventData } from "@/platform/event-template-data";
import { formatTimeRange } from "@/template/utils/event-formatting";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Clock, MapPin, Navigation, Info, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM SECONDARY EVENT (CANVAS B: LIVING CORAL WITH SOLID WHITE ENCLOSURE CARD)

export type SecondaryEventSectionProps = {
  data: SecondaryEventData;
  eventDate?: string | null;
};

export function SecondaryEventSection({ data }: SecondaryEventSectionProps) {
  const timeFormatted = formatTimeRange(data.startTime, data.endTime);
  const title = data.title || "Banquet & Evening Celebration";

  return (
    <section
      id="secondary_event"
      className="template-section section-surface-coral pattern-coral text-white relative overflow-x-clip"
    >
      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-white font-cinzel font-bold tracking-[0.25em] drop-shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F9F1DC]" />
              <span>EVENING GALA // 08</span>
            </span>
            <h2 className="text-role-heading-major text-white tracking-tight">{title}</h2>
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="relative overflow-visible">
            <LedgerPanel
              title={data.venueName || "Banquet & Grand Lounge"}
              indexTag="RECEPTION // 02"
              className="debut-card-coral-enclosure bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] shadow-2xl relative z-10"
            >
              <div className="space-y-4 pt-1 font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {timeFormatted && (
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)]">
                      <Clock className="w-5 h-5 text-[var(--debut-bg-coral,#E65C4F)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#B76E79)] block mb-0.5">
                          Reception Hours
                        </span>
                        <p className="text-base sm:text-lg font-bold text-[var(--debut-text-noir,#26131C)] font-serif">
                          {timeFormatted}
                        </p>
                      </div>
                    </div>
                  )}

                  {data.address && (
                    <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)]">
                      <MapPin className="w-5 h-5 text-[var(--debut-bg-coral,#E65C4F)] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#B76E79)] block mb-0.5">
                          Banquet Location
                        </span>
                        <p className="text-base font-medium text-[var(--debut-text-noir,#26131C)] leading-relaxed font-sans">
                          {data.address}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {data.note && (
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)] text-sm text-[var(--debut-text-noir,#26131C)]">
                    <Info className="w-5 h-5 text-[var(--debut-rose-gold,#B76E79)] shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-sans text-sm sm:text-base">{data.note}</p>
                  </div>
                )}

                {data.mapsLink && (
                  <div className="pt-2 font-sans">
                    <a
                      href={data.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 py-3.5 px-6 bg-[var(--debut-bg-coral,#E65C4F)] hover:bg-[var(--debut-bg-coral-hover,#D85244)] text-white text-sm font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md active:scale-95 template-focus-ring cursor-pointer min-h-[46px] btn-press-physics"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Reception Directions</span>
                    </a>
                  </div>
                )}
              </div>
            </LedgerPanel>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Backward-compatible alias for wedding templates */
export const ReceptionSection = SecondaryEventSection;
export type ReceptionSectionProps = SecondaryEventSectionProps;
