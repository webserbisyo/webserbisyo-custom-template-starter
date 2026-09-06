import type { StoryMessageData } from "@/platform/event-template-data";
import { CorrespondenceSheet } from "@/template/components/containers/CorrespondenceSheet";
import { SpecimenFrame } from "@/template/components/containers/SpecimenFrame";
import { templateAssets } from "@/template/template-assets";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// CANONICAL BAPTISM STORY / DEDICATION (CANVAS A: SATIN ALABASTER & SACRAMENTAL EPISTLE)

export function StoryMessageSection({ data }: { data: StoryMessageData }) {
  if (!data.storyBody && !data.storyTitle) return null;

  const storyPhoto = templateAssets.photos.story?.[0];

  return (
    <section
      id="story_message"
      className="template-section section-surface-alabaster bg-pattern-celestial-01 relative overflow-x-clip"
    >
      <div className="template-container-narrow">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#0284C7)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D97706)]" />
              <span>PARENTS&apos; DEDICATION // 05</span>
            </span>
            <h2 className="text-role-heading-major text-[var(--debut-text-noir,#0F172A)] tracking-tight">
              {data.storyTitle || "Welcoming Liam into Faith"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-lg mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#475569)]">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-8">
            {storyPhoto && (
              <SpecimenFrame
                src={storyPhoto}
                alt="Parents Dedication"
                caption="Sacramental Dedication Memory"
                specimenNumber="DEDICATION // 05"
                aspectRatio="landscape"
                context="story"
                className="shadow-soft bg-white"
              />
            )}

            {/* Story Description Card */}
            {data.storyBody && (
              <div className="relative overflow-visible">
                <CorrespondenceSheet
                  senderLabel="PARENTS' BLESSING"
                  dateStamp="A GIFT OF FAITH"
                  className="bg-[var(--debut-surface-alabaster,#ffffff)] relative z-10 shadow-card"
                >
                  <p className="text-base sm:text-lg text-[var(--debut-text-noir,#0F172A)] leading-relaxed font-serif text-left pt-1">
                    &ldquo;{data.storyBody}&rdquo;
                  </p>
                </CorrespondenceSheet>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Backward-compatible alias for wedding templates */
export const LoveStorySection = StoryMessageSection;
