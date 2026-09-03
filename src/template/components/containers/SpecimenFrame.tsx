import * as React from "react";
import Image from "next/image";
import { cn } from "../ui/cn";

import { CotillionSpecimenFallback } from "./CotillionSpecimenFallback";

export interface SpecimenFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  caption?: string;
  specimenNumber?: string;
  aspectRatio?: "square" | "portrait" | "portrait-tall" | "landscape" | "landscape-wide" | "video";
  priority?: boolean;
  isArch?: boolean;
}

export function SpecimenFrame({
  className,
  src,
  alt = "Specimen frame",
  caption,
  specimenNumber,
  aspectRatio = "portrait",
  priority = false,
  isArch = false,
  children,
  ...props
}: SpecimenFrameProps) {
  const aspectClasses = {
    square: "aspect-square",
    portrait: "aspect-[4/5]",
    "portrait-tall": "aspect-3/4",
    landscape: "aspect-4/3",
    "landscape-wide": "aspect-[16/10]",
    video: "aspect-16/9",
  };

  return (
    <div
      data-surface="light"
      className={cn(
        "specimen-frame group relative border-2 border-[var(--debut-rose-gold-border,#E8C4C8)] bg-[var(--debut-surface-alabaster,#ffffff)] text-[var(--debut-text-noir,#26131C)] p-3 shadow-card transition-all hover:shadow-floating",
        isArch ? "debut-arch-frame" : "rounded-2xl sm:rounded-3xl",
        className
      )}
      {...props}
    >
      {/* Visual Inner Frame */}
      <div
        className={cn(
          "relative w-full overflow-hidden bg-[var(--debut-surface-alabaster-alt,#F4EBEB)]",
          isArch ? "rounded-t-[130px] rounded-b-2xl" : "rounded-xl sm:rounded-2xl",
          aspectClasses[aspectRatio]
        )}
      >
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          children || (
            <CotillionSpecimenFallback
              label={specimenNumber || caption || alt}
              category={isArch ? "portrait" : aspectRatio}
            />
          )
        )}
      </div>

      {/* Archival Tag Strip */}
      {caption || specimenNumber ? (
        <div className="mt-3 flex items-center justify-between px-1 text-xs">
          {caption ? (
            <span className="font-semibold text-[var(--debut-text-noir,#26131C)] font-sans truncate max-w-[75%]">
              {caption}
            </span>
          ) : null}
          {specimenNumber ? (
            <span className="font-cinzel text-[10px] font-bold text-[var(--debut-rose-gold,#B76E79)] tracking-[0.2em]">
              {specimenNumber}
            </span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
