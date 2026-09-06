import type { VenueData } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { SpecimenFrame } from "@/template/components/containers/SpecimenFrame";
import { templateAssets } from "@/template/template-assets";
import { Reveal } from "@/template/components/motion/Reveal";
import { MapPin, Navigation, Info, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// CANONICAL BAPTISM VENUE LOCATION (CANVAS A: SATIN ALABASTER & SANCTUARY RECORD)

export function VenueSection({ data }: { data: VenueData }) {
  const venuePhoto = templateAssets.photos.venue;

  return (
    <section
      id="venue"
      className="template-section section-surface-alabaster bg-pattern-celestial-04 relative overflow-x-clip"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#0284C7)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D97706)]" />
              <span>CEREMONY VENUE // 07</span>
            </span>
            <h2 className="text-role-heading text-[var(--debut-text-noir,#0F172A)] tracking-tight">
              The Ceremony Sanctuary
            </h2>
          </div>
        </Reveal>

        <Reveal direction="up" distance={24} delay={0.1}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
            <div className="lg:col-span-6">
              <SpecimenFrame
                src={venuePhoto}
                alt={data.venueName || "San Agustin Church"}
                caption={
                  data.venueName ? `Ceremony Venue: ${data.venueName}` : "Sanctuary Church Grounds"
                }
                specimenNumber="SANCTUARY // 07"
                aspectRatio="landscape"
                context="venue"
                className="shadow-soft bg-white"
              />
            </div>
            <div className="lg:col-span-6">
              <div className="relative overflow-visible">
                <LedgerPanel
                  title={data.venueName || "San Agustin Church"}
                  indexTag="LOCATION // RECORD"
                  className="bg-[var(--debut-surface-alabaster,#ffffff)] relative z-10 shadow-card"
                >
                  <div className="space-y-4 pt-1 font-sans">
                    {data.address && (
                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)]">
                        <MapPin className="w-5 h-5 text-[var(--debut-bg-coral,#0284C7)] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#0284C7)] block mb-0.5">
                            Official Address
                          </span>
                          <p className="text-base font-medium text-[var(--debut-text-noir,#26131C)] leading-relaxed font-sans">
                            {data.address}
                          </p>
                        </div>
                      </div>
                    )}

                    {data.arrivalNote && (
                      <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)] text-sm text-[var(--debut-text-noir,#26131C)]">
                        <Info className="w-5 h-5 text-[var(--debut-rose-gold,#0284C7)] shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#0284C7)] block mb-0.5">
                            Arrival &amp; Access Protocol
                          </span>
                          <p className="leading-relaxed font-sans text-sm sm:text-base">
                            {data.arrivalNote}
                          </p>
                        </div>
                      </div>
                    )}

                    {data.mapsLink && (
                      <div className="pt-2 font-sans text-center sm:text-left">
                        <a
                          href={data.mapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2.5 py-3.5 px-6 bg-[var(--debut-bg-coral,#0284C7)] hover:bg-[var(--debut-bg-coral-hover,#0369A1)] text-white text-sm font-bold uppercase tracking-wider rounded-2xl transition-all shadow-md active:scale-95 template-focus-ring cursor-pointer min-h-[46px] btn-press-physics"
                        >
                          <Navigation className="w-4 h-4" />
                          <span>Get Driving Directions</span>
                        </a>
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
