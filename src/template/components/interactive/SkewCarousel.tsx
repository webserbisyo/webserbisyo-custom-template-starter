"use client";

import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, Keyboard, A11y } from "swiper/modules";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { Button } from "@/template/components/ui/Button";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { DebutImagePlaceholder } from "../containers/DebutImagePlaceholder";
import { cn } from "../ui/cn";
import type { GalleryOrientation } from "@/template/content/gallery";

export interface SkewCarouselItem {
  id: string | number;
  src?: string;
  alt?: string;
  title?: string;
  caption?: string;
  folioLabel?: string;
  width?: number;
  height?: number;
  orientation?: GalleryOrientation;
}

export interface SkewCarouselProps {
  items: SkewCarouselItem[];
  isLightboxOpen?: boolean;
  onActiveIndexChange?: (index: number) => void;
  onItemClick?: (item: SkewCarouselItem, index: number) => void;
  className?: string;
}

export function SkewCarousel({
  items,
  isLightboxOpen = false,
  onActiveIndexChange,
  onItemClick,
  className,
}: SkewCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!swiperRef.current || !swiperRef.current.autoplay) return;
    if (isLightboxOpen || shouldReduceMotion) {
      swiperRef.current.autoplay.stop();
    } else {
      swiperRef.current.autoplay.start();
    }
  }, [isLightboxOpen, shouldReduceMotion]);

  if (!items || items.length === 0) {
    return null;
  }

  // Single-item graceful static degradation
  if (items.length === 1) {
    const item = items[0];

    return (
      <div className={cn("mx-auto p-4 font-sans flex justify-center", className)}>
        <div
          onClick={() => onItemClick?.(item, 0)}
          className="relative inline-flex flex-col items-center justify-center p-3 rounded-3xl border-2 border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] shadow-card cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/50">
            {item.src ? (
              <Image
                src={item.src}
                alt={item.alt || "Gallery preview"}
                width={item.width || 2752}
                height={item.height || 1536}
                className="block w-auto h-auto max-w-[min(84vw,330px)] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[560px] max-h-[300px] sm:max-h-[360px] md:max-h-[410px] lg:max-h-[440px] object-contain rounded-xl select-none pointer-events-none"
                sizes="(max-width: 640px) 84vw, 560px"
              />
            ) : (
              <div className="w-[300px] h-[220px] sm:w-[380px] sm:h-[260px]">
                <DebutImagePlaceholder
                  context="gallery"
                  label={item.folioLabel || "GALLERY SPECIMEN"}
                />
              </div>
            )}
          </div>
          {item.caption ? (
            <div className="w-full mt-3 px-1 flex items-center justify-between gap-4 text-left">
              <p className="text-xs font-semibold text-[var(--debut-text-noir,#26131C)] font-sans truncate">
                {item.caption}
              </p>
              {item.folioLabel || item.title ? (
                <span className="text-[10px] font-bold font-cinzel tracking-[0.2em] uppercase text-[#6B3742] bg-[#F4EBEB] px-2 py-0.5 rounded border border-[#E8C4C8]/60 shrink-0">
                  {item.folioLabel || item.title}
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  const digits = Math.max(2, String(items.length).length);
  const currentFormatted = String(activeIndex + 1).padStart(digits, "0");
  const totalFormatted = String(items.length).padStart(digits, "0");

  const totalItems = items.length;
  const segmentCount = Math.min(5, totalItems);
  const activeSegment =
    totalItems > 1
      ? Math.min(
          segmentCount - 1,
          Math.max(0, Math.round((activeIndex / (totalItems - 1)) * (segmentCount - 1)))
        )
      : 0;

  const handleSegmentClick = (segIdx: number) => {
    if (totalItems <= 1 || !swiperRef.current) return;
    const targetIndex = Math.min(
      totalItems - 1,
      Math.max(0, Math.round((segIdx / (segmentCount - 1)) * (totalItems - 1)))
    );
    swiperRef.current.slideTo(targetIndex);
  };

  return (
    <div className={cn("w-full py-1 select-none font-sans flex flex-col items-center", className)}>
      {/* 3D Scene Viewport with Shared 1000px Perspective */}
      <div
        className="w-full max-w-6xl mx-auto flex justify-center items-center overflow-visible"
        style={{ perspective: "1000px" }}
      >
        <Swiper
          modules={[Autoplay, Keyboard, A11y]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          initialSlide={Math.min(1, items.length - 1)}
          keyboard={{ enabled: true }}
          watchSlidesProgress={true}
          rewind={true}
          autoplay={
            shouldReduceMotion
              ? false
              : {
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                  waitForTransition: true,
                }
          }
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.activeIndex);
            onActiveIndexChange?.(swiper.activeIndex);
          }}
          className="!overflow-visible w-full h-[420px] sm:h-[480px] md:h-[530px] py-1"
          style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
        >
          {items.map((item, idx) => {
            const diff = idx - activeIndex;
            const isCurrentlyActive = diff === 0;

            let rotateYDeg = 0;
            let scaleVal = 1;
            let translateZPx = 0;
            let zIndexVal = 30;
            let isVisibleInScene = true;

            if (!shouldReduceMotion) {
              if (diff === 0) {
                rotateYDeg = 0;
                scaleVal = 1;
                translateZPx = 0;
                zIndexVal = 30;
              } else if (diff === -1) {
                rotateYDeg = 32;
                scaleVal = 0.9;
                translateZPx = -150;
                zIndexVal = 20;
              } else if (diff === 1) {
                rotateYDeg = -32;
                scaleVal = 0.9;
                translateZPx = -150;
                zIndexVal = 20;
              } else if (diff === -2) {
                rotateYDeg = 52;
                scaleVal = 0.82;
                translateZPx = -270;
                zIndexVal = 10;
              } else if (diff === 2) {
                rotateYDeg = -52;
                scaleVal = 0.82;
                translateZPx = -270;
                zIndexVal = 10;
              } else {
                rotateYDeg = diff < 0 ? 60 : -60;
                scaleVal = 0.72;
                translateZPx = -360;
                zIndexVal = 5;
                isVisibleInScene = false;
              }
            }

            return (
              <SwiperSlide
                key={item.id}
                className={cn(
                  "!w-auto h-full flex items-center justify-center px-1.5 sm:px-3 md:px-4 transition-all duration-300",
                  !isVisibleInScene && "pointer-events-none opacity-0 md:opacity-100"
                )}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: zIndexVal,
                }}
              >
                {/* 3D Transform Layer with Inward Angle & Zero Opacity Fading */}
                <div
                  style={{
                    transform: `perspective(1000px) rotateY(${rotateYDeg}deg) scale(${scaleVal}) translateZ(${translateZPx}px)`,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transition:
                      "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease",
                  }}
                  className={cn(
                    "relative inline-flex flex-col items-center justify-center p-2.5 sm:p-3 rounded-3xl bg-[var(--debut-surface-alabaster,#ffffff)] border-2 transition-all duration-300 select-none shadow-card",
                    isCurrentlyActive
                      ? "border-[var(--debut-rose-gold,#B76E79)] ring-4 ring-[var(--debut-champagne-gold,#D4AF37)]/40 shadow-2xl cursor-pointer"
                      : "border-[var(--debut-rose-gold-border,#E8C4C8)] hover:border-[var(--debut-rose-gold)]/60 cursor-pointer"
                  )}
                  onClick={() => {
                    if (isCurrentlyActive) {
                      onItemClick?.(item, idx);
                    } else {
                      swiperRef.current?.slideTo(idx);
                    }
                  }}
                  title={
                    isCurrentlyActive ? "Click to open expanded view" : "Click to focus photograph"
                  }
                >
                  {/* Photo Frame Auto-Fitting the Rendered Photography */}
                  <div className="relative flex items-center justify-center overflow-hidden rounded-2xl bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]/40">
                    {item.src ? (
                      <Image
                        src={item.src}
                        alt={item.alt || `Photo ${idx + 1}`}
                        width={item.width || 2752}
                        height={item.height || 1536}
                        sizes="(max-width: 640px) 84vw, (max-width: 1024px) 60vw, 560px"
                        className="block w-auto h-auto max-w-[min(84vw,330px)] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[560px] max-h-[300px] sm:max-h-[360px] md:max-h-[410px] lg:max-h-[440px] object-contain rounded-xl select-none pointer-events-none"
                      />
                    ) : (
                      <div className="w-[280px] h-[200px] sm:w-[340px] sm:h-[240px]">
                        <DebutImagePlaceholder
                          context="gallery"
                          label={
                            item.folioLabel || `SPECIMEN // ${String(idx + 1).padStart(2, "0")}`
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Cotillion Caption Strip */}
                  <div className="w-full mt-2.5 sm:mt-3 px-1 flex items-center justify-between gap-3 text-left shrink-0 h-6">
                    {item.caption ? (
                      <p className="text-xs font-semibold text-[var(--debut-text-noir,#26131C)] font-sans truncate max-w-[68%]">
                        {item.caption}
                      </p>
                    ) : (
                      <span />
                    )}
                    {item.folioLabel || item.title ? (
                      <span className="text-[10px] font-bold font-cinzel tracking-[0.2em] uppercase text-[#6B3742] bg-[#F4EBEB] px-2 py-0.5 rounded border border-[#E8C4C8]/60 shrink-0">
                        {item.folioLabel || item.title}
                      </span>
                    ) : null}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Progress Rail & Floating High-Contrast Navigation Shelf */}
      <div className="flex justify-center mt-5 sm:mt-6 select-none">
        <div className="inline-flex items-center gap-3 sm:gap-4 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/95 text-[var(--debut-text-noir,#26131C)] shadow-floating backdrop-blur-md border border-white/70">
          {/* Previous Chevron Button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 rounded-full bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] hover:bg-white text-[var(--debut-text-noir,#26131C)] border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-xs flex items-center justify-center hover:scale-105 active:scale-95 transition-all template-focus-ring cursor-pointer"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-4 h-4 text-[var(--debut-text-noir,#26131C)]" />
          </button>

          {/* High-Contrast Numeric Counter */}
          <div className="font-cinzel text-xs font-bold tracking-widest text-[var(--debut-text-noir,#26131C)] px-1 flex items-center">
            <span className="text-[var(--debut-bg-coral,#E65C4F)] text-sm">{currentFormatted}</span>
            <span className="mx-1.5 opacity-30 text-xs">/</span>
            <span className="text-[var(--debut-text-muted,#704D5B)]">{totalFormatted}</span>
          </div>

          {/* Capped 5-Segment Progress Rail */}
          <div
            className="flex items-center gap-1.5 px-1"
            role="tablist"
            aria-label="Gallery slide segments"
          >
            {Array.from({ length: segmentCount }).map((_, i) => {
              const isSegActive = i === activeSegment;

              return (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={isSegActive}
                  aria-label={`Jump to slide segment ${i + 1}`}
                  onClick={() => handleSegmentClick(i)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300 cursor-pointer template-focus-ring",
                    isSegActive
                      ? "w-7 sm:w-8 bg-[var(--debut-bg-coral,#E65C4F)] shadow-xs"
                      : "w-2.5 sm:w-3 bg-[var(--debut-rose-gold-border,#E8C4C8)] hover:bg-[var(--debut-rose-gold)]/60"
                  )}
                />
              );
            })}
          </div>

          {/* Next Chevron Button */}
          <button
            type="button"
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 rounded-full bg-[var(--debut-surface-alabaster-alt,#F4EBEB)] hover:bg-white text-[var(--debut-text-noir,#26131C)] border border-[var(--debut-rose-gold-border,#E8C4C8)] shadow-xs flex items-center justify-center hover:scale-105 active:scale-95 transition-all template-focus-ring cursor-pointer"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-4 h-4 text-[var(--debut-text-noir,#26131C)]" />
          </button>
        </div>
      </div>
    </div>
  );
}
