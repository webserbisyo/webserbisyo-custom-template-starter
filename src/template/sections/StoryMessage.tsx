import type { StoryMessageData } from "@/platform/event-template-data";
import { templateAssets } from "@/template/template-assets";
import { SpecimenFrame } from "@/template/components/containers/SpecimenFrame";
import { CorrespondenceSheet } from "@/template/components/containers/CorrespondenceSheet";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM STORY / JOURNEY CHRONICLE (CANVAS A: SATIN ALABASTER & COTILLION DISPATCH)

export function StoryMessageSection({ data }: { data: StoryMessageData }) {
  if (!data.storyBody && !data.storyTitle) return null;
  const storyPhotos = templateAssets.photos.story || [];

  return (
    <section
      id="story_message"
      className="template-section section-surface-alabaster pattern-stardust-dot pattern-subtle relative overflow-x-clip"
    >
      <div className="template-container-narrow">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>DEBUTANTE CHRONICLE // 05</span>
            </span>
            <h2 className="text-role-heading-major text-[var(--debut-text-noir,#26131C)] tracking-tight">
              {data.storyTitle || "Debut Story"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-lg mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#704D5B)]">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            {/* Story Photo Specimen Frame */}
            <SpecimenFrame
              src={storyPhotos[0]}
              alt="Story Photo"
              caption="Debutante Chronicle Memory"
              specimenNumber="JOURNEY // 05"
              aspectRatio="landscape"
              className="shadow-soft bg-[var(--debut-surface-alabaster,#ffffff)]"
            />

            {/* Story Description Card */}
            {data.storyBody && (
              <div className="relative overflow-visible">
                <CorrespondenceSheet
                  senderLabel="COTILLION DISPATCH"
                  dateStamp="JOURNEY TO 18"
                  className="bg-[var(--debut-surface-alabaster,#ffffff)] relative z-10"
                >
                  <p className="text-base sm:text-lg text-[var(--debut-text-noir,#26131C)] leading-relaxed font-serif text-left pt-1">
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
