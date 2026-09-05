"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { GiftsData, GiftOption } from "@/platform/wedding-template-data";
import { BotanicalCornerPair } from "@/template/components/decorations/BotanicalCornerPair";
import { SectionFloralDivider } from "@/template/components/decorations/SectionFloralDivider";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/template/components/ui/Dialog";
import { QrCode, Gift } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// SAGE ESTATE GIFT DETAILS & REGISTRY (THE GLASSHOUSE LEDGER)
// Gift Details & Monetary Gift options (Max 2 options).

export function GiftsSection({ data }: { data: GiftsData }) {
  const options = (data.options || []).slice(0, 2);
  const [selectedOption, setSelectedOption] = useState<GiftOption | null>(null);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [selectedOption]);

  if (!data.giftNote && !data.sectionIntro && options.length === 0) return null;

  return (
    <section
      id="gift_details"
      className="template-section section-surface-ivory pattern-archival-dot pattern-subtle relative overflow-x-clip"
    >
      <div className="template-container-narrow">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="text-role-subheading">FOLIO // 12 &bull; GIFT REGISTRY</span>
            <h2 className="text-role-heading-quiet text-[var(--wedding-text)] tracking-tight">
              Gift Details
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-lg mx-auto mt-2 leading-relaxed">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="relative overflow-visible">
            {/* Botanical Corner Pair on Registry Guidance Outer Panel */}
            <BotanicalCornerPair size="md" />

            <LedgerPanel
              title="Registry Guidance"
              indexTag="GIFTS // FOLIO"
              headerAlign="center"
              className="max-w-2xl mx-auto bg-[var(--wedding-surface)] shadow-card space-y-6 relative z-10"
            >
              {data.giftNote && (
                <p className="text-base sm:text-lg text-[var(--wedding-text)] leading-relaxed text-center italic font-serif max-w-md mx-auto">
                  &ldquo;{data.giftNote}&rdquo;
                </p>
              )}

              {options.length > 0 && (
                <div className="border-t border-[var(--wedding-border-subtle)] pt-5 font-sans">
                  <span className="text-role-metadata text-[var(--wedding-accent)] block mb-4 text-center">
                    Available Contribution Channels
                  </span>
                  <div
                    className={`grid grid-cols-1 ${
                      options.length === 2 ? "sm:grid-cols-2" : ""
                    } gap-4 sm:gap-6 max-w-xl mx-auto`}
                  >
                    {options.map((opt, idx) => {
                      const hasQr = Boolean(opt.image?.url);

                      return (
                        <div
                          key={opt.id || idx}
                          className="p-5 rounded-2xl border border-[var(--wedding-border)] bg-[var(--wedding-surface-alt)] shadow-xs flex flex-col justify-between text-left space-y-3"
                        >
                          {/* 1. Title Compartment */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[11px] font-serif font-bold text-[var(--wedding-accent)] uppercase tracking-wider">
                                Option 0{idx + 1}
                              </span>
                              <Gift className="w-4 h-4 text-[var(--wedding-primary)]" />
                            </div>
                            <span className="font-serif font-bold text-[var(--wedding-text)] block text-base sm:text-lg">
                              {opt.title}
                            </span>
                          </div>

                          {/* 2. Inline QR Preview Stage */}
                          <div className="my-3 flex items-center justify-center">
                            {opt.image?.url ? (
                              <div className="relative w-32 h-32 p-2 rounded-xl bg-white border border-[var(--wedding-border)] shadow-xs flex items-center justify-center overflow-hidden">
                                <Image
                                  src={opt.image.url}
                                  alt={opt.image.alt || opt.title}
                                  fill
                                  unoptimized={true}
                                  className="object-contain p-1.5"
                                />
                              </div>
                            ) : (
                              <div className="w-32 h-32 p-3 rounded-xl bg-[var(--wedding-surface)] border-2 border-dashed border-[var(--wedding-border)] flex flex-col items-center justify-center text-center select-none">
                                <QrCode className="w-7 h-7 text-[var(--wedding-primary)] opacity-60 mb-1" />
                                <span className="font-serif text-[10px] font-bold tracking-wider text-[var(--wedding-text)] uppercase">
                                  QR Preview
                                </span>
                                <span className="text-[9px] text-[var(--wedding-text-muted)] leading-tight">
                                  Available Soon
                                </span>
                              </div>
                            )}
                          </div>

                          {/* 3. Action Shelf */}
                          <div className="pt-3 border-t border-[var(--wedding-border-subtle)]">
                            <button
                              type="button"
                              onClick={() => setSelectedOption(opt)}
                              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[var(--wedding-surface)] text-[var(--wedding-text)] border border-[var(--wedding-border)] text-xs font-bold uppercase tracking-wider font-serif shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                              {hasQr ? (
                                <>
                                  <QrCode className="w-4 h-4 text-[var(--wedding-primary)]" />
                                  <span>View Full QR</span>
                                </>
                              ) : (
                                <>
                                  <QrCode className="w-4 h-4 text-[var(--wedding-text-muted)] opacity-70" />
                                  <span>View Details</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </LedgerPanel>
          </div>
        </Reveal>

        {/* QR Zoom Lightbox Dialog */}
        {selectedOption && (
          <Dialog
            open={Boolean(selectedOption)}
            onOpenChange={(open) => {
              if (!open) setSelectedOption(null);
            }}
          >
            <DialogContent className="max-w-sm p-6 bg-[var(--wedding-surface)] border border-[var(--wedding-border)] text-center rounded-2xl shadow-xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl font-bold text-[var(--wedding-text)]">
                  {selectedOption.title}
                </DialogTitle>
              </DialogHeader>

              {selectedOption.image?.url && !imageError ? (
                <>
                  <div className="my-4 relative w-64 h-64 mx-auto p-3 bg-white rounded-2xl border border-[var(--wedding-border)] shadow-md flex items-center justify-center">
                    <Image
                      src={selectedOption.image.url}
                      alt={selectedOption.image.alt || selectedOption.title}
                      fill
                      unoptimized={true}
                      onError={() => setImageError(true)}
                      className="object-contain p-2"
                    />
                  </div>
                  <p className="text-xs text-[var(--wedding-text-muted)] font-mono">
                    Scan using your banking or e-wallet application
                  </p>
                </>
              ) : (
                <>
                  <div className="my-4 w-64 h-64 mx-auto p-6 rounded-2xl bg-[var(--wedding-surface-alt)] border-2 border-dashed border-[var(--wedding-border)] flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-white border border-[var(--wedding-border)] shadow-xs flex items-center justify-center mb-3 text-[var(--wedding-primary)]">
                      <QrCode className="w-6 h-6" />
                    </div>
                    <span className="font-serif text-xs font-bold tracking-wider text-[var(--wedding-text)] uppercase">
                      QR Code Placeholder
                    </span>
                    <span className="font-sans text-[11px] text-[var(--wedding-text-muted)] mt-1.5 leading-relaxed">
                      Official QR code or transfer instructions will appear here once configured in
                      the dashboard.
                    </span>
                  </div>
                  <p className="text-xs text-[var(--wedding-text-muted)] font-mono">
                    Please check with the wedding coordinator at the reception desk
                  </p>
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Boundary Threshold Divider: Gifts -> Guestbook */}
      <SectionFloralDivider />
    </section>
  );
}
