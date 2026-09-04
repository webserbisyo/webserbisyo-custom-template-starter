import type { ExtraInfoData } from "@/platform/event-template-data";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/template/components/ui/Accordion";
import { Reveal } from "@/template/components/motion/Reveal";
import { Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM GUEST GUIDANCE & FAQ (CANVAS B: LIVING CORAL WITH SOLID WHITE ENCLOSURE CARD)

export function ExtraInfoSection({ data }: { data: ExtraInfoData }) {
  if (!data.items || data.items.length === 0) return null;

  return (
    <section
      id="extra_info"
      className="template-section section-surface-coral bg-pattern-debut-04 text-white relative overflow-x-clip"
    >
      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-10 sm:mb-12 space-y-2">
            <span className="text-white font-cinzel font-bold tracking-[0.25em] drop-shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F9F1DC]" />
              <span>GUEST GUIDANCE &amp; FAQ // 14</span>
            </span>
            <h2 className="text-role-heading-major text-white tracking-tight">
              {data.sectionTitle || "Frequently Asked Questions"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[#FFE7E2] font-serif italic">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="relative overflow-visible">
            <div className="debut-card-coral-enclosure bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] rounded-3xl border border-white/95 p-6 sm:p-8 shadow-2xl relative z-10">
              <Accordion type="single" collapsible className="w-full space-y-2">
                {data.items.map((item, idx) => (
                  <AccordionItem
                    key={item.id || idx}
                    value={`item-${idx + 1}`}
                    className="border-b border-[var(--debut-rose-gold-subtle)] last:border-0"
                  >
                    <AccordionTrigger className="font-serif text-base sm:text-lg font-bold text-[var(--debut-text-noir,#26131C)] hover:text-[var(--debut-bg-coral,#E65C4F)] py-4 text-left">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm sm:text-base text-[var(--debut-text-muted,#704D5B)] font-sans leading-relaxed pt-1 pb-4">
                      {item.details}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
