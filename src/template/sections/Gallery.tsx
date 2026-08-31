"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import type { GalleryData } from "@/platform/event-template-data";
import { galleryPhotos, type GalleryPhotoItem } from "@/template/content/gallery";
import { SkewCarousel } from "@/template/components/interactive/SkewCarousel";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/template/components/ui/Dialog";
import { Reveal } from "@/template/components/motion/Reveal";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

// PLATFORM DATA — KEEP DYNAMIC.
// DEBUT ROSE GLAM KINETIC GALLERY (3D SKEW PERSPECTIVE & FROSTED LIGHTBOX)

export function GallerySection({ data }: { data: GalleryData }) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const selectedPhoto: GalleryPhotoItem | null =
    selectedPhotoIndex !== null && galleryPhotos[selectedPhotoIndex]
      ? galleryPhotos[selectedPhotoIndex]
      : null;

  const handleNextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev !== null ? (prev + 1) % galleryPhotos.length : 0));
  }, [selectedPhotoIndex]);

  const handlePrevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev !== null ? (prev - 1 + galleryPhotos.length) % galleryPhotos.length : 0
    );
  }, [selectedPhotoIndex]);

  return (
    <section
      id="gallery"
      className="template-section !pt-20 !pb-14 sm:!pt-24 sm:!pb-16 md:!pt-28 md:!pb-18 section-surface-alabaster pattern-stardust-dot pattern-subtle text-center relative overflow-x-clip"
    >
      <div className="template-container relative z-10">
        <Reveal direction="up" distance={16}>
          <div className="mb-6 sm:mb-8 space-y-2">
            <span className="text-role-subheading text-[var(--debut-rose-gold,#B76E79)] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[var(--debut-champagne-gold,#D4AF37)]" />
              <span>PHOTO FOLIO // 04</span>
            </span>
            <h2 className="text-role-heading-major text-[var(--debut-text-noir,#26131C)] tracking-tight">
              {data.sectionTitle || "Grand Cotillion Gallery"}
            </h2>
            {data.sectionIntro && (
              <p className="text-role-lead max-w-xl mx-auto mt-2 leading-relaxed text-[var(--debut-text-muted,#704D5B)]">
                {data.sectionIntro}
              </p>
            )}
          </div>
        </Reveal>

        {galleryPhotos.length > 0 ? (
          <Reveal direction="up" distance={24} delay={0.1}>
            <div className="w-full">
              <SkewCarousel
                items={galleryPhotos}
                isLightboxOpen={Boolean(selectedPhoto)}
                onItemClick={(_item, idx) => setSelectedPhotoIndex(idx)}
                onActiveIndexChange={() => {}}
              />
            </div>
          </Reveal>
        ) : (
          <div className="bg-[var(--debut-surface-alabaster-alt)] p-10 rounded-3xl border border-dashed border-[var(--debut-rose-gold-border)] max-w-xl mx-auto text-center shadow-xs">
            <p className="text-xs font-cinzel text-[var(--debut-text-muted)] uppercase tracking-wider">
              [ Official debut photoshoot will be mounted here ]
            </p>
          </div>
        )}

        {/* Viewport-Fitting Desktop Lightbox with ZERO Internal Scrollbars */}
        {selectedPhoto && (
          <Dialog
            open={Boolean(selectedPhoto)}
            onOpenChange={(open) => {
              if (!open) setSelectedPhotoIndex(null);
            }}
          >
            <DialogContent className="w-full max-w-5xl h-[88dvh] sm:h-[90dvh] max-h-[calc(100dvh-2rem)] p-4 sm:p-6 flex flex-col overflow-hidden bg-[var(--debut-surface-alabaster,#ffffff)] border-2 border-[var(--debut-rose-gold-border,#E8C4C8)] text-[var(--debut-text-noir,#26131C)] shadow-2xl rounded-3xl">
              {/* Modal Header: shrink-0 */}
              <DialogHeader className="shrink-0 flex flex-row items-center justify-between pr-8 border-b border-[var(--debut-rose-gold-subtle)] pb-3">
                <DialogTitle className="font-serif text-lg sm:text-xl text-[var(--debut-text-noir,#26131C)] font-bold flex items-center gap-3">
                  <span>{selectedPhoto.caption}</span>
                  <span className="text-xs font-cinzel font-bold tracking-widest uppercase text-[var(--debut-rose-gold,#B76E79)]">
                    {selectedPhoto.folioLabel}
                  </span>
                </DialogTitle>
              </DialogHeader>

              {/* Modal Media Stage: flex-1 min-h-0 dynamically fits remaining viewport */}
              <div className="relative flex-1 min-h-0 w-full flex items-center justify-center p-2 sm:p-3 my-2 bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/50 rounded-2xl overflow-hidden">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  width={selectedPhoto.width}
                  height={selectedPhoto.height}
                  className="w-auto h-auto max-w-full max-h-full object-contain rounded-xl shadow-md select-none block"
                  sizes="(max-width: 1024px) 95vw, 1100px"
                  priority
                />

                {/* Lightbox Navigation Chevrons pinned to Media Box */}
                {galleryPhotos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevPhoto();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[var(--debut-surface-alabaster)]/90 hover:bg-[var(--debut-surface-alabaster)] text-[var(--debut-text-noir)] border border-[var(--debut-rose-gold-border)] shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 template-focus-ring z-20 btn-press-physics"
                      aria-label="Previous photo"
                    >
                      <ChevronLeft className="w-5 h-5 text-[var(--debut-rose-gold)]" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextPhoto();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[var(--debut-surface-alabaster)]/90 hover:bg-[var(--debut-surface-alabaster)] text-[var(--debut-text-noir)] border border-[var(--debut-rose-gold-border)] shadow-md flex items-center justify-center cursor-pointer transition-all hover:scale-105 active:scale-95 template-focus-ring z-20 btn-press-physics"
                      aria-label="Next photo"
                    >
                      <ChevronRight className="w-5 h-5 text-[var(--debut-rose-gold)]" />
                    </button>
                  </>
                )}
              </div>

              {/* Modal Footer: shrink-0 */}
              <div className="shrink-0 text-center pt-1">
                <p className="text-xs text-[var(--debut-text-muted,#704D5B)] italic font-serif">
                  {selectedPhoto.alt}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
}
