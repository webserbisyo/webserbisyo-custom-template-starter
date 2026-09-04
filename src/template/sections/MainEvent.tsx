import type { MainEventData } from "@/platform/event-template-data";
import {
  formatEventDateLong,
  formatTimeRange,
  formatRsvpDeadline,
} from "@/template/utils/event-formatting";
import { DateCalendar } from "@/template/components/interactive/DateCalendar";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Calendar, Clock, AlertCircle, Bookmark, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM MAIN EVENT (CANVAS B: LIVING CORAL WITH SOLID PURE WHITE ENCLOSURE CARDS)

export function MainEventSection({ data }: { data: MainEventData }) {
  const eventLabel = data.eventLabel || "The Grand Cotillion";
  const dateFormatted = formatEventDateLong(data.eventDate);
  const timeFormatted = formatTimeRange(data.eventTime, data.endTime);
  const deadlineFormatted = formatRsvpDeadline(data.rsvpDeadline);

  return (
    <section
      id="main_event"
      className="template-section section-surface-coral bg-pattern-debut-02 text-white relative overflow-x-clip"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-white font-cinzel font-bold tracking-[0.25em] drop-shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F9F1DC]" />
              <span>BALLROOM RECORD // 06</span>
            </span>
            <h2 className="text-role-heading-major text-white tracking-tight">{eventLabel}</h2>
          </div>
        </Reveal>

        <Reveal direction="up" distance={24} delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Column: Interactive Month Calendar inside Enclosure Card */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="debut-card-coral-enclosure bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] p-4 sm:p-6 rounded-3xl shadow-2xl">
                <DateCalendar
                  date={data.eventDate || undefined}
                  highlightLabel={data.eventLabel || "Grand Cotillion"}
                  className="w-full"
                />
              </div>
            </div>

            {/* Right Column: Formal Cotillion Event Record */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div className="h-full">
                <LedgerPanel
                  title="Official Cotillion Schedule"
                  indexTag="SCHEDULE // 01"
                  className="h-full debut-card-coral-enclosure bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] shadow-2xl flex flex-col justify-between"
                >
                  <div className="space-y-5 pt-2 font-sans">
                    {/* Date & Time Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {dateFormatted && (
                        <div className="p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)] space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#B76E79)]">
                            <Calendar className="w-3.5 h-3.5 text-[var(--debut-bg-coral,#E65C4F)]" />
                            <span>Celebration Date</span>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-[var(--debut-text-noir,#26131C)] font-serif">
                            {dateFormatted}
                          </p>
                        </div>
                      )}

                      {timeFormatted && (
                        <div className="p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)] space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#B76E79)]">
                            <Clock className="w-3.5 h-3.5 text-[var(--debut-bg-coral,#E65C4F)]" />
                            <span>Program Hours</span>
                          </div>
                          <p className="text-base sm:text-lg font-bold text-[var(--debut-text-noir,#26131C)] font-serif">
                            {timeFormatted}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* RSVP Deadline */}
                    {deadlineFormatted && (
                      <div className="flex items-start gap-3 p-4 sm:p-5 rounded-2xl bg-[var(--debut-bg-coral-subtle,#FFF0EE)] border border-[var(--debut-bg-coral,#E65C4F)]/30 text-sm">
                        <Bookmark className="w-5 h-5 text-[var(--debut-bg-coral,#E65C4F)] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[var(--debut-text-noir,#26131C)] font-cinzel uppercase tracking-wider text-xs block mb-0.5">
                            Response Requested
                          </span>
                          <span className="text-[var(--debut-text-noir,#26131C)] font-medium text-sm sm:text-base">
                            Kindly respond on or before{" "}
                            <strong className="font-bold text-[var(--debut-bg-coral)]">
                              {deadlineFormatted}
                            </strong>
                          </span>
                        </div>
                      </div>
                    )}

                    {data.scheduleNote && (
                      <div className="flex items-start gap-3 p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)] text-sm text-[var(--debut-text-noir,#26131C)]">
                        <AlertCircle className="w-4 h-4 text-[var(--debut-rose-gold,#B76E79)] shrink-0 mt-0.5" />
                        <p className="leading-relaxed font-sans">{data.scheduleNote}</p>
                      </div>
                    )}
                  </div>
                </LedgerPanel>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Backward-compatible alias for wedding templates */
export const CeremonySection = MainEventSection;
