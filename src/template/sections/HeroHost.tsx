import type { HostInfoData } from "@/platform/event-template-data";
import { deriveHostIdentity } from "@/template/utils/host-identity";
import { templateAssets } from "@/template/template-assets";
import { SpecimenFrame } from "@/template/components/containers/SpecimenFrame";
import { Reveal } from "@/template/components/motion/Reveal";
import { Magnetic } from "@/template/components/motion/Magnetic";
import { Heart, Sparkles, BookOpen } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM EDITORIAL HERO (2-CANVAS SATIN ALABASTER & COTILLION ARCH)
// DYNAMIC HOST IDENTITY: Never hardcode client initials or names.

export type HeroHostSectionProps = {
  data: HostInfoData;
  eventDate?: string | null;
  storyEnabled?: boolean;
};

export function HeroHostSection({ data, storyEnabled = true }: HeroHostSectionProps) {
  let displayName = "";

  if (data.kind === "debut") {
    displayName = data.displayAs || data.debutantName || "The Debutante";
  } else if (data.kind === "birthday") {
    displayName = data.displayAs || data.celebrantName || "The Celebrant";
  } else if (data.kind === "baptism") {
    displayName = data.displayAs || data.childName || "The Child";
  } else {
    const identity = deriveHostIdentity(data.groomName, data.brideName);
    displayName =
      data.displayAs === "bride_first"
        ? `${data.brideName || identity.brideName} & ${data.groomName || identity.groomName}`
        : `${data.groomName || identity.groomName} & ${data.brideName || identity.brideName}`;
  }

  const heroPhoto = templateAssets.photos.hero;

  return (
    <section
      id="host_info"
      className="template-section section-surface-alabaster bg-pattern-debut-01 relative isolate overflow-hidden min-h-0 pt-10 pb-14 sm:pt-14 sm:pb-16 lg:pt-16 lg:pb-20 text-[var(--debut-text-noir,#26131C)]"
    >
      <div className="template-container relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center lg:items-start">
          {/* Left Column: Editorial Typography & Actions */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6 text-center lg:text-left lg:pt-2">
            {/* 1. Folio Stamp */}
            <Reveal direction="down" distance={16}>
              <div className="flex items-center justify-center lg:justify-start">
                <span className="text-xs font-cinzel font-bold uppercase tracking-[0.22em] text-[var(--debut-rose-gold,#B76E79)] debut-glass-card px-4 py-1.5 rounded-full border shadow-xs inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
                  <span>DEBUT ROYALE // 01</span>
                </span>
              </div>
            </Reveal>

            {/* 2. Host Names — High-Impact Playfair Display */}
            <Reveal direction="up" distance={20} delay={0.1}>
              <h1 className="text-role-display tracking-tight text-[var(--debut-text-noir,#26131C)] text-center lg:text-left">
                {displayName}
              </h1>
            </Reveal>

            {/* 3. Single Connected Debut Date in Glass Pill */}
            {data.hostLine && (
              <Reveal direction="up" distance={16} delay={0.15}>
                <div className="flex justify-center lg:justify-start">
                  <div className="inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3 rounded-full debut-glass-card border shadow-xs">
                    <span className="font-cinzel font-bold text-base sm:text-lg md:text-xl tracking-[0.2em] text-[var(--debut-rose-gold,#B76E79)] uppercase">
                      {data.hostLine}
                    </span>
                  </div>
                </div>
              </Reveal>
            )}

            {/* 4. Editorial Invitation Greeting */}
            {data.shortHostMessage && (
              <Reveal direction="up" distance={16} delay={0.25}>
                <p className="font-serif italic text-2xl sm:text-3xl text-[var(--debut-text-noir,#26131C)] font-bold max-w-xl mx-auto lg:mx-0 text-center lg:text-left leading-relaxed">
                  &ldquo;{data.shortHostMessage}&rdquo;
                </p>
              </Reveal>
            )}

            {/* 5. Action CTA Buttons with Rose Glam Physics */}
            <Reveal direction="up" distance={16} delay={0.3}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2 font-sans">
                <Magnetic intensity={0.25}>
                  <a
                    href="/rsvp"
                    className="inline-flex items-center gap-2.5 py-3.5 px-7 bg-[var(--debut-bg-coral,#E65C4F)] hover:bg-[var(--debut-bg-coral-hover,#D85244)] text-white text-sm font-bold uppercase tracking-wider rounded-2xl shadow-floating hover:shadow-xl transition-all active:scale-95 template-focus-ring cursor-pointer min-h-[48px] btn-press-physics"
                  >
                    <Heart className="w-4 h-4 fill-white/20" />
                    <span>Reserve Your Seat</span>
                  </a>
                </Magnetic>

                {storyEnabled && (
                  <a
                    href="#story_message"
                    className="inline-flex items-center gap-2 py-3.5 px-6 debut-glass-card hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] text-[var(--debut-text-noir,#26131C)] text-sm font-semibold rounded-2xl border transition-all active:scale-95 template-focus-ring cursor-pointer shadow-xs min-h-[48px] btn-press-physics"
                  >
                    <BookOpen className="w-4 h-4 text-[var(--debut-rose-gold,#B76E79)]" />
                    <span>Debut Story</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* Right Column: Mounted Portrait in Grand Arch SpecimenFrame */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center lg:justify-start lg:self-start">
            <Reveal
              direction="up"
              distance={24}
              delay={0.2}
              className="w-full flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-[320px] sm:max-w-sm lg:max-w-[min(360px,calc((100dvh-11.5rem)*0.75))] xl:max-w-[min(385px,calc((100dvh-11.5rem)*0.75))]">
                <SpecimenFrame
                  src={heroPhoto}
                  alt={displayName}
                  specimenNumber="PORTRAIT FOLIO // 01"
                  aspectRatio="portrait"
                  priority={true}
                  isArch={true}
                  className="shadow-floating bg-[var(--debut-surface-alabaster,#ffffff)]"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Backward-compatible alias for wedding templates */
export const CoupleSection = HeroHostSection;
export type CoupleSectionProps = HeroHostSectionProps;
