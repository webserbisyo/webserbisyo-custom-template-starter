import type { StoryMessageData } from "@/platform/event-template-data";
import { templateAssets } from "@/template/template-assets";
import { SpecimenFrame } from "@/template/components/containers/SpecimenFrame";
import { CorrespondenceSheet } from "@/template/components/containers/CorrespondenceSheet";
import { Reveal } from "@/template/components/motion/Reveal";

// PLATFORM DATA — KEEP DYNAMIC.
// SAGE ESTATE STORY / MESSAGE JOURNAL (THE GLASSHOUSE LEDGER)

export function StoryMessageSection({ data }: { data: StoryMessageData }) {
  if (!data.storyBody && !data.storyTitle) return null;
  const storyPhotos = templateAssets.photos.story || [];

  return (
    <section
      id="story_message"
      className="template-section section-surface-paper pattern-ledger-rule pattern-subtle relative overflow-x-clip"
    >
      <div className="template-container-narrow">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-role-subheading">FOLIO // 14 &bull; STORY &amp; MESSAGE</span>
            <h2 className="text-role-heading-major text-[var(--wedding-text)] tracking-tight">
              {data.storyTitle || "Our Story"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-lg mx-auto mt-2 leading-relaxed">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="max-w-2xl mx-auto space-y-8 sm:space-y-10 md:space-y-12">
            {/* Story Photo Specimen Frame (Undecorated) */}
            {storyPhotos.length > 0 && (
              <SpecimenFrame
                src={storyPhotos[0]}
                alt="Story Photo"
                caption="Archival Journal Memory"
                specimenNumber="MEMORY // 14"
                aspectRatio="landscape"
                className="shadow-soft bg-[var(--wedding-surface)]"
              />
            )}

            {/* Story Description Card */}
            {data.storyBody && (
              <div className="relative overflow-visible">
                <CorrespondenceSheet
                  senderLabel="ESTATE DISPATCH"
                  dateStamp="OUR CHRONICLE"
                  className="bg-[var(--wedding-surface)] relative z-10"
                >
                  <p className="text-base sm:text-lg text-[var(--wedding-text)] leading-relaxed font-sans text-left pt-1">
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
