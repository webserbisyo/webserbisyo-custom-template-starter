import type { AttireData } from "@/platform/event-template-data";
import { templateConfig } from "@/template/template.config";
import { Reveal } from "@/template/components/motion/Reveal";
import { Shirt, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM ATTIRE & PALETTE GUIDE (CANVAS A: SATIN ALABASTER & ROSE TRELLIS)

export function AttireSection({ data }: { data: AttireData }) {
  const palette = templateConfig.palette || [];

  return (
    <section
      id="attire_motif"
      className="template-section section-surface-alabaster pattern-rose-trellis pattern-subtle relative overflow-x-clip"
    >
      <div className="template-container-narrow">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-10 sm:mb-12 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>DRESS CODE &amp; MOTIF // 13</span>
            </span>
            <h2 className="text-role-heading text-[var(--debut-text-noir,#26131C)] tracking-tight">
              Dress Code &amp; Palette
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-md mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#704D5B)]">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="relative overflow-visible">
            <div className="debut-glass-card bg-[var(--debut-surface-alabaster,#ffffff)] rounded-3xl border border-[var(--debut-rose-gold-border,#E8C4C8)] p-6 sm:p-8 shadow-card space-y-6 font-sans relative z-10">
              {data.dressCodeNote && (
                <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)]">
                  <Shirt className="w-5 h-5 text-[var(--debut-bg-coral,#E65C4F)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#B76E79)] block mb-1">
                      Dress Code Guidelines
                    </span>
                    <p className="text-base text-[var(--debut-text-noir,#26131C)] leading-relaxed font-sans">
                      {data.dressCodeNote}
                    </p>
                  </div>
                </div>
              )}

              {data.colorMotifNote && (
                <div className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)]">
                  <Sparkles className="w-5 h-5 text-[var(--debut-champagne-gold,#D4AF37)] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-cinzel font-bold tracking-wider uppercase text-[var(--debut-rose-gold,#B76E79)] block mb-1">
                      Motif &amp; Atmosphere
                    </span>
                    <p className="text-base text-[var(--debut-text-noir,#26131C)] leading-relaxed font-sans">
                      {data.colorMotifNote}
                    </p>
                  </div>
                </div>
              )}

              {palette.length > 0 && (
                <div className="pt-2 text-center">
                  <span className="text-xs font-cinzel font-bold tracking-[0.2em] uppercase text-[var(--debut-rose-gold,#B76E79)] block mb-4">
                    Cotillion Color Inspiration
                  </span>
                  <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                    {palette.map((color, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-2 group">
                        <div
                          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-md group-hover:scale-110 transition-transform ring-2 ring-[var(--debut-rose-gold-border,#E8C4C8)]"
                          style={{ backgroundColor: color.hex }}
                        />
                        <span className="text-xs font-cinzel font-bold text-[var(--debut-text-noir,#26131C)]">
                          {color.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
