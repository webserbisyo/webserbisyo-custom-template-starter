import type { ComponentPropsWithoutRef } from "react";
import {
  deriveHostIdentity,
  extractMilestoneNumber,
  getSingleHostFirstName,
  getOrdinalSuffix,
} from "@/template/utils/host-identity";

// DYNAMIC HOST IDENTITY — Debut Rose Glam Design System.
// Polymorphic monogram for Debut (SOPHIA • 18TH BIRTHDAY 🌹), Wedding (A & J), Birthday (MICHAEL • 10TH BIRTHDAY ⚡).
// Uses --debut-* tokens throughout.
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
  milestone,
  variant = "nav",
  className = "",
  ...props
}: EventMonogramProps) {
  const identity = deriveHostIdentity(groomName, brideName, coupleDisplayName);
  const milestoneNum = extractMilestoneNumber(milestone ? String(milestone) : undefined);
  const isSingleHost = !identity.brideInitial;

  const initial = identity.groomInitial || identity.monogram;
  const firstName = getSingleHostFirstName(identity.displayName).toUpperCase();
  const fullMilestone = milestone
    ? String(milestone).toUpperCase()
    : milestoneNum
      ? `${getOrdinalSuffix(milestoneNum).toUpperCase()} BIRTHDAY`
      : "";

  // ── BADGE ──────────────────────────────────────────────────────────────
  if (variant === "badge") {
    const badgeText = isSingleHost
      ? milestoneNum
        ? `${milestoneNum}TH`
        : initial
      : identity.compactMonogram;

    return (
      <span
        className={`inline-flex items-center justify-center px-3 py-1 rounded-full bg-[var(--debut-bg-coral,#E65C4F)] text-white text-xs font-bold shrink-0 select-none shadow-xs font-cinzel tracking-wider ${className}`}
        {...props}
      >
        {badgeText}
      </span>
    );
  }

  // ── SEAL ───────────────────────────────────────────────────────────────
  if (variant === "seal") {
    return (
      <div
        className={`inline-flex flex-col items-center justify-center p-4 rounded-full border border-[var(--debut-champagne-gold,#D4AF37)]/80 ring-4 ring-[var(--debut-champagne-gold)]/20 bg-[var(--debut-surface-alabaster,#FFFFFF)]/95 backdrop-blur-xs shadow-soft select-none ${className}`}
        {...props}
      >
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[var(--debut-text-noir,#26131C)] flex items-center">
          <span>{initial}</span>
          {!isSingleHost ? (
            <>
              <span className="text-[var(--debut-champagne-gold)] font-serif italic font-normal mx-1.5 text-lg sm:text-xl">
                &amp;
              </span>
              <span>{identity.brideInitial}</span>
            </>
          ) : milestoneNum ? (
            <>
              <span className="text-[var(--debut-champagne-gold)] font-serif font-bold mx-1.5 text-lg sm:text-xl">
                &bull;
              </span>
              <span className="font-cinzel text-lg sm:text-xl text-[var(--debut-rose-gold)]">
                {milestoneNum}
              </span>
            </>
          ) : null}
        </span>
      </div>
    );
  }

  // ── HERO ───────────────────────────────────────────────────────────────
  if (variant === "hero") {
    return (
      <span
        className={`inline-flex items-center justify-center gap-2 font-serif text-2xl md:text-3xl font-bold tracking-wider text-[var(--debut-text-on-noir,#FAF5F5)] ${className}`}
        {...props}
      >
        {isSingleHost ? (
          <>
            <span className="tracking-widest">{firstName || initial}</span>
            {fullMilestone && (
              <>
                <span className="text-[var(--debut-champagne-gold)] font-serif font-bold mx-1">
                  &bull;
                </span>
                <span className="font-cinzel text-xl md:text-2xl text-[var(--debut-champagne-gold)]">
                  {fullMilestone}
                </span>
                <span className="text-xl">🌹</span>
              </>
            )}
          </>
        ) : (
          <>
            <span>{initial}</span>
            <span className="text-[var(--debut-champagne-gold)] font-serif italic font-normal mx-1">
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
        <span className="inline-flex items-center gap-1.5 font-serif text-xl sm:text-2xl font-bold tracking-widest text-[var(--debut-text-on-noir,#FAF5F5)]">
          {isSingleHost ? (
            <>
              <span className="uppercase tracking-widest">{identity.displayName}</span>
              {fullMilestone && (
                <>
                  <span className="text-[var(--debut-champagne-gold)] font-serif font-bold mx-1 text-lg sm:text-xl">
                    &bull;
                  </span>
                  <span className="font-cinzel text-base sm:text-lg text-[var(--debut-champagne-gold)]">
                    {fullMilestone}
                  </span>
                  <span className="text-base">🌹</span>
                </>
              )}
            </>
          ) : (
            <>
              <span>{initial}</span>
              <span className="text-[var(--debut-champagne-gold)] font-serif italic font-normal mx-1 text-xl sm:text-2xl">
                &amp;
              </span>
              <span>{identity.brideInitial}</span>
            </>
          )}
        </span>
        {!isSingleHost && (
          <span className="text-xs tracking-wider uppercase text-[var(--debut-text-on-noir-muted)] font-cinzel">
            {identity.displayName}
          </span>
        )}
      </div>
    );
  }

  // ── NAV (default) ──────────────────────────────────────────────────────
  // Debut: SOPHIA • 18TH BIRTHDAY 🌹
  return (
    <span
      className={`event-nav-monogram inline-flex items-center whitespace-nowrap shrink-0 text-[var(--debut-text-noir,#26131C)] select-none ${className}`}
      {...props}
    >
      {isSingleHost ? (
        <span className="event-monogram-glyphs inline-flex items-center whitespace-nowrap font-cinzel text-xs sm:text-sm font-bold tracking-[0.16em] uppercase">
          {/* First Name */}
          <span className="text-[var(--debut-text-noir,#26131C)] font-bold shrink-0">
            {firstName || initial}
          </span>

          {/* Responsive Milestone Lockup */}
          {milestoneNum ? (
            <>
              <span className="text-[var(--debut-champagne-gold,#D4AF37)] font-bold mx-1 sm:mx-1.5 text-xs shrink-0">
                &bull;
              </span>
              <span className="font-cinzel text-[11px] sm:text-xs font-semibold tracking-wider text-[var(--debut-rose-gold,#B76E79)] shrink-0">
                <span>{milestoneNum}TH</span>
                <span className="hidden sm:inline ml-1">BIRTHDAY</span>
              </span>
              <span className="ml-1 text-xs shrink-0">🌹</span>
            </>
          ) : null}
        </span>
      ) : (
        <span className="event-monogram-glyphs inline-flex items-center whitespace-nowrap font-serif text-lg md:text-xl font-bold tracking-widest">
          <span>{initial}</span>
          <span className="text-[var(--debut-champagne-gold)] font-serif italic font-normal mx-1 text-base">
            &amp;
          </span>
          <span>{identity.brideInitial}</span>
        </span>
      )}
    </span>
  );
}

/** @deprecated Use EventMonogram — kept for backward compatibility. */
export const WeddingMonogram = EventMonogram;
/** @deprecated Use EventMonogramProps — kept for backward compatibility. */
export type WeddingMonogramProps = EventMonogramProps;
