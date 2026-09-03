"use client";

import { useState } from "react";
import Image from "next/image";
import type { GiftsData, GiftOption } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/template/components/ui/Dialog";
import { Reveal } from "@/template/components/motion/Reveal";
import { Gift, QrCode, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM WISHING WELL & GIFT REGISTRY (CANVAS B: LIVING CORAL WITH SOLID WHITE ENCLOSURE CARD)

export function GiftsSection({ data }: { data: GiftsData }) {
  const [selectedOption, setSelectedOption] = useState<GiftOption | null>(null);

  const options = data.options || [];

  if (!data.giftNote && !data.sectionIntro && options.length === 0) return null;

  return (
    <section
      id="gift_details"
      className="template-section section-surface-coral pattern-coral text-white relative overflow-x-clip"
    >
      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-12 space-y-2">
            <span className="text-white font-cinzel font-bold tracking-[0.25em] drop-shadow-sm inline-flex items-center gap-1.5 text-xs sm:text-sm uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#F9F1DC]" />
              <span>WISHING WELL &amp; GIFTS // 16</span>
            </span>
            <h2 className="text-role-heading-major text-white tracking-tight">
              Wishing Well &amp; Gift Registry
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
            <LedgerPanel
              title="Debut Gift Registry"
              indexTag="REGISTRY // 01"
              headerAlign="center"
              className="debut-card-coral-enclosure bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] shadow-2xl relative z-10"
            >
              <div className="space-y-6 pt-2 text-center font-sans">
                {data.giftNote && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] border border-[var(--debut-rose-gold-subtle)] flex items-start gap-3.5 text-left">
                    <Gift className="w-5 h-5 text-[var(--debut-bg-coral,#E65C4F)] shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base text-[var(--debut-text-noir,#26131C)] leading-relaxed font-serif">
                      &ldquo;{data.giftNote}&rdquo;
                    </p>
                  </div>
                )}

                {/* Gift Registry Options — Uniform Balanced Anatomy */}
                {options.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
                    {options.map((option, idx) => {
                      const hasQr = Boolean(option.image?.url);

                      return (
                        <div
                          key={option.id || idx}
                          className="p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/70 border border-[var(--debut-rose-gold-border,#E8C4C8)]/80 hover:border-[var(--debut-rose-gold,#B76E79)] flex flex-col justify-between min-h-[190px] shadow-xs transition-all"
                        >
                          {/* Card Header & Method Title */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-cinzel font-bold text-[var(--debut-rose-gold,#B76E79)] uppercase tracking-wider">
                                Option 0{idx + 1}
                              </span>
                              <Gift className="w-4 h-4 text-[var(--debut-text-muted,#704D5B)]" />
                            </div>

                            <p className="font-serif font-bold text-base sm:text-lg text-[var(--debut-text-noir,#26131C)]">
                              {option.title}
                            </p>
                          </div>

                          {/* Footer Action Shelf: QR Modal Trigger OR Wishing Well Fallback */}
                          <div className="pt-4 mt-3 border-t border-[var(--debut-rose-gold-subtle)]">
                            {hasQr ? (
                              <button
                                type="button"
                                onClick={() => setSelectedOption(option)}
                                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] text-[var(--debut-text-noir,#26131C)] border border-[var(--debut-rose-gold-border,#E8C4C8)] text-xs font-bold uppercase tracking-wider font-cinzel shadow-xs transition-all active:scale-95 cursor-pointer btn-press-physics"
                              >
                                <QrCode className="w-4 h-4 text-[var(--debut-bg-coral,#E65C4F)]" />
                                <span>View QR Code</span>
                              </button>
                            ) : (
                              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/70 border border-[var(--debut-rose-gold-subtle)] text-left">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E5C158] to-[#D4AF37] flex items-center justify-center shrink-0 shadow-xs">
                                  <Sparkles className="w-4 h-4 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-[11px] font-cinzel font-bold text-[var(--debut-text-noir,#26131C)] uppercase tracking-wider">
                                    Wishing Well Reception
                                  </p>
                                  <p className="text-[10px] font-sans text-[var(--debut-text-muted,#704D5B)] truncate">
                                    Monetary envelopes received at the grand ballroom foyer
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </LedgerPanel>
          </div>
        </Reveal>

        {/* QR / Image Zoom Modal */}
        {selectedOption && selectedOption.image?.url && (
          <Dialog
            open={Boolean(selectedOption)}
            onOpenChange={(open) => {
              if (!open) setSelectedOption(null);
            }}
          >
            <DialogContent className="max-w-sm text-center p-6 bg-[var(--debut-surface-alabaster,#ffffff)] border-2 border-[var(--debut-rose-gold-border,#E8C4C8)] text-[var(--debut-text-noir,#26131C)] shadow-2xl rounded-3xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl font-bold text-[var(--debut-text-noir,#26131C)]">
                  {selectedOption.title}
                </DialogTitle>
              </DialogHeader>
              <div className="my-4 relative w-64 h-64 mx-auto p-3 rounded-2xl bg-white border border-[var(--debut-rose-gold-border)] shadow-md flex items-center justify-center">
                <Image
                  src={selectedOption.image.url}
                  alt={selectedOption.image.alt || selectedOption.title}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="text-xs text-[var(--debut-text-muted,#704D5B)] font-sans">
                Scan using your banking or digital wallet app
              </p>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
