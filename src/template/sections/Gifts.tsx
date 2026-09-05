"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { GiftsData, GiftOption } from "@/platform/event-template-data";
import { LedgerPanel } from "@/template/components/containers/LedgerPanel";
import { Reveal } from "@/template/components/motion/Reveal";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/template/components/ui/Dialog";
import { QrCode, Gift } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
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
      className="template-section bg-pattern-heroic-02 min-h-[500px] h-auto relative overflow-x-clip bg-[var(--event-bg)] text-[var(--event-on-dark,#f8fafc)]"
    >
      <div className="template-container-narrow relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <span className="comic-badge comic-badge-gold">SUPPLY DROP // GIFT DETAILS</span>
            <h2 className="text-role-heading-quiet text-[var(--event-on-dark,#f8fafc)] tracking-tight">
              {data.sectionTitle || "Gift Details"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-lg mx-auto mt-2 leading-relaxed text-slate-300">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        <Reveal direction="up" distance={20} delay={0.1}>
          <div className="relative overflow-visible">
            <LedgerPanel
              title="Registry Guidance"
              indexTag="SUPPLY DROP // 12"
              headerAlign="center"
              className="max-w-2xl mx-auto bg-[var(--event-surface)] text-[var(--event-text-main)] shadow-[var(--event-shadow-paper-md)] space-y-6 relative z-10"
            >
              {data.giftNote && (
                <p className="text-base sm:text-lg text-[var(--event-text-main)] leading-relaxed text-center italic font-sans max-w-md mx-auto">
                  &ldquo;{data.giftNote}&rdquo;
                </p>
              )}

              {options.length > 0 && (
                <div className="border-t border-[var(--event-border-subtle)] pt-5 font-sans">
                  <span className="text-role-metadata text-[var(--event-primary)] block mb-4 text-center font-bold">
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
                          className="p-5 rounded-2xl border-2 border-[var(--event-border)] bg-[var(--event-surface-alt)] shadow-[var(--event-shadow-paper-sm)] flex flex-col justify-between text-left space-y-3"
                        >
                          {/* 1. Title Compartment */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="comic-badge comic-badge-gold text-[10px]">
                                Option 0{idx + 1}
                              </span>
                              <Gift className="w-4 h-4 text-[var(--event-primary)]" />
                            </div>
                            <span className="font-serif font-bold text-[var(--event-text-main)] block text-base sm:text-lg">
                              {opt.title}
                            </span>
                          </div>

                          {/* 2. Inline QR Preview Stage */}
                          <div className="my-3 flex items-center justify-center">
                            {opt.image?.url ? (
                              <div className="relative w-32 h-32 p-2 rounded-xl bg-white border-2 border-[var(--event-border)] shadow-xs flex items-center justify-center overflow-hidden">
                                <Image
                                  src={opt.image.url}
                                  alt={opt.image.alt || opt.title}
                                  fill
                                  unoptimized={true}
                                  className="object-contain p-1.5"
                                />
                              </div>
                            ) : (
                              <div className="w-32 h-32 p-3 rounded-xl bg-[var(--event-surface)] border-2 border-dashed border-slate-400 flex flex-col items-center justify-center text-center select-none">
                                <QrCode className="w-7 h-7 text-[var(--event-primary)] opacity-60 mb-1" />
                                <span className="font-sans text-[10px] font-bold tracking-wider text-[var(--event-text-main)] uppercase">
                                  QR Preview
                                </span>
                                <span className="text-[9px] text-[var(--event-text-muted)] leading-tight">
                                  Available soon
                                </span>
                              </div>
                            )}
                          </div>

                          {/* 3. Action Shelf */}
                          <div className="pt-3 border-t border-[var(--event-border-subtle)]">
                            <button
                              type="button"
                              onClick={() => setSelectedOption(opt)}
                              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-[var(--event-surface-alt)] text-[var(--event-text-main)] border-2 border-[var(--event-border)] text-xs font-bold uppercase tracking-wider font-sans shadow-xs transition-all active:scale-95 cursor-pointer"
                            >
                              {hasQr ? (
                                <>
                                  <QrCode className="w-4 h-4 text-[var(--event-primary)]" />
                                  <span>View Full QR</span>
                                </>
                              ) : (
                                <>
                                  <QrCode className="w-4 h-4 text-[var(--event-text-muted)] opacity-70" />
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

        {/* QR Zoom Lightbox Dialog with Fallback */}
        {selectedOption && (
          <Dialog
            open={Boolean(selectedOption)}
            onOpenChange={(open) => {
              if (!open) setSelectedOption(null);
            }}
          >
            <DialogContent className="max-w-sm p-6 bg-[var(--event-surface)] border-2 border-[var(--event-border)] text-center rounded-2xl shadow-xl">
              <DialogHeader>
                <DialogTitle className="font-serif text-xl font-bold text-[var(--event-text-main)]">
                  {selectedOption.title}
                </DialogTitle>
              </DialogHeader>

              {selectedOption.image?.url && !imageError ? (
                <>
                  <div className="my-4 relative w-64 h-64 mx-auto p-3 bg-white rounded-2xl border-2 border-[var(--event-border)] shadow-md flex items-center justify-center">
                    <Image
                      src={selectedOption.image.url}
                      alt={selectedOption.image.alt || selectedOption.title}
                      fill
                      unoptimized={true}
                      onError={() => setImageError(true)}
                      className="object-contain p-2"
                    />
                  </div>
                  <p className="text-xs text-[var(--event-text-muted)] font-mono">
                    Scan using your banking or e-wallet application
                  </p>
                </>
              ) : (
                <>
                  <div className="my-4 w-64 h-64 mx-auto p-6 rounded-2xl bg-white border-2 border-dashed border-slate-400 flex flex-col items-center justify-center text-center">
                    <div className="w-12 h-12 rounded-xl bg-amber-300 border-2 border-slate-900 flex items-center justify-center mb-3 text-slate-950 shadow-[2px_2px_0px_#0f172a]">
                      <QrCode className="w-6 h-6 stroke-[2.5]" />
                    </div>
                    <span className="font-sans text-xs font-bold tracking-wider text-[var(--event-text-main)] uppercase">
                      QR Code Placeholder
                    </span>
                    <span className="font-sans text-[11px] text-[var(--event-text-muted)] mt-1.5 leading-relaxed">
                      Official QR code or transfer instructions will appear here once configured in
                      the dashboard.
                    </span>
                  </div>
                  <p className="text-xs text-[var(--event-text-muted)] font-mono">
                    Please check with the host or welcome desk during the reception
                  </p>
                </>
              )}
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
