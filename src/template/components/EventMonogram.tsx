import type { ComponentPropsWithoutRef } from "react";
import { deriveHostIdentity, getSingleHostFirstName } from "@/template/utils/host-identity";
import { Sparkles } from "lucide-react";

// DYNAMIC HOST IDENTITY — Celestial Sky Christening Design System.
// Polymorphic monogram for Baptism (LIAM / L), Wedding (A & J), Single Celebrant.
// Uses --celestial-* tokens throughout.
// Never hardcode client initials or names.

export type EventMonogramProps = ComponentPropsWithoutRef<"span"> & {
  groomName?: string;
  brideName?: string;
  coupleDisplayName?: string;
  milestone?: string | number;
  variant?: "nav" | "hero" | "footer" | "badge" | "seal";
};

export function EventMonogram({
  groomName,
  brideName,
  coupleDisplayName,
  variant = "nav",
  className = "",
  ...props
}: EventMonogramProps) {
  const identity = deriveHostIdentity(groomName, brideName, coupleDisplayName);
  const isSingleHost = !identity.brideInitial;

  const initial = identity.groomInitial || identity.monogram || "L";
  const firstName = getSingleHostFirstName(identity.displayName).toUpperCase() || initial;

  // ── BADGE ──────────────────────────────────────────────────────────────
  if (variant === "badge") {
    return (
      <span
        className={`inline-flex items-center justify-center px-3 py-1 rounded-full bg-[var(--celestial-bg-sky,#0284C7)] text-white text-xs font-bold shrink-0 select-none shadow-xs font-cinzel tracking-wider ${className}`}
        {...props}
      >
        {isSingleHost ? initial : identity.compactMonogram}
      </span>
    );
  }

  // ── SEAL ───────────────────────────────────────────────────────────────
  if (variant === "seal") {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-4 rounded-full border border-[var(--celestial-gold,#D97706)]/80 ring-4 ring-[var(--celestial-gold,#D97706)]/20 bg-[var(--celestial-surface-white,#FFFFFF)]/95 backdrop-blur-xs shadow-soft select-none ${className}`}
        {...props}
      >
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[var(--celestial-text-navy,#0F172A)] flex items-center">
          <span>{initial}</span>
          {!isSingleHost && (
            <>
              <span className="text-[var(--celestial-gold,#D97706)] font-serif italic font-normal mx-1.5 text-lg sm:text-xl">
                &amp;
              </span>
              <span>{identity.brideInitial}</span>
            </>
          )}
        </span>
      </div>
    );
  }

  // ── HERO ───────────────────────────────────────────────────────────────
  if (variant === "hero") {
    return (
      <span
        className={`inline-flex items-center justify-center gap-2 font-serif text-2xl md:text-3xl font-bold tracking-wider text-white ${className}`}
        {...props}
      >
        {isSingleHost ? (
          <span className="tracking-widest">{firstName || initial}</span>
        ) : (
          <>
            <span>{initial}</span>
            <span className="text-[var(--celestial-gold,#D97706)] font-serif italic font-normal mx-1">
              &amp;
            </span>
            <span>{identity.brideInitial}</span>
          </>
        )}
      </span>
    );
  }

  // ── FOOTER ─────────────────────────────────────────────────────────────
  if (variant === "footer") {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center gap-1.5 ${className}`}
        {...props}
      >
        <span className="inline-flex items-center gap-1.5 font-serif text-xl sm:text-2xl font-bold tracking-widest text-white">
          {isSingleHost ? (
            <span className="uppercase tracking-widest">{identity.displayName || firstName}</span>
          ) : (
            <>
              <span>{initial}</span>
              <span className="text-[var(--celestial-gold,#D97706)] font-serif italic font-normal mx-1 text-xl sm:text-2xl">
                &amp;
              </span>
              <span>{identity.brideInitial}</span>
            </>
          )}
        </span>
        {!isSingleHost && (
          <span className="text-xs tracking-wider uppercase text-white/70 font-cinzel">
            {identity.displayName}
          </span>
        )}
      </div>
    );
  }

  // ── NAV (default) ──────────────────────────────────────────────────────
  return (
    <span
      className={`event-nav-monogram inline-flex items-center whitespace-nowrap shrink-0 text-[var(--celestial-text-navy,#0F172A)] select-none ${className}`}
      {...props}
    >
      {isSingleHost ? (
        <span className="event-monogram-glyphs inline-flex items-center whitespace-nowrap font-cinzel text-sm sm:text-base font-black tracking-[0.18em] uppercase">
          {/* Celebrant Child Name */}
          <span className="text-[var(--celestial-text-navy,#0F172A)] font-black shrink-0">
            {firstName || initial}
          </span>
          <span className="text-[var(--celestial-gold,#D97706)] font-bold mx-1.5 sm:mx-2 text-xs shrink-0">
            &bull;
          </span>
          <span className="font-cinzel text-xs sm:text-sm font-bold tracking-wider text-[var(--celestial-bg-sky,#0284C7)] shrink-0">
            CHRISTENING
          </span>
        </span>
      ) : (
        <span className="event-monogram-glyphs inline-flex items-center whitespace-nowrap font-serif text-lg md:text-xl font-bold tracking-widest">
          <span>{initial}</span>
          <span className="text-[var(--celestial-gold,#D97706)] font-serif italic font-normal mx-1.5 text-base">
            &amp;
          </span>
          <span>{identity.brideInitial}</span>
        </span>
      )}
    </span>
  );
}

/** Backward-compatible alias */
export const WeddingMonogram = EventMonogram;
export type WeddingMonogramProps = EventMonogramProps;
