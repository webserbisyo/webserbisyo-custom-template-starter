import type { ComponentPropsWithoutRef } from "react";
import {
  deriveHostIdentity,
  extractMilestoneNumber,
  getSingleHostFirstName,
  getOrdinalSuffix,
} from "@/template/utils/host-identity";

// DYNAMIC HOST IDENTITY — Sage Estate Design System.
// Polymorphic monogram for Debut (SOPHIA • 18TH BIRTHDAY 🌹), Wedding (A & J), Birthday (MICHAEL • 10TH BIRTHDAY ⚡).
// Uses --wedding-* estate tokens throughout.
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
        ? milestoneNum
        : initial
      : identity.compactMonogram;

    return (
      <span
        className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-[var(--wedding-primary)] text-[var(--wedding-on-primary)] text-xs font-bold shrink-0 select-none shadow-xs font-mono tracking-wider ${className}`}
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
        className={`inline-flex flex-col items-center justify-center p-3.5 rounded-full border border-[var(--wedding-accent)]/80 ring-2 ring-[var(--wedding-accent)]/25 bg-[var(--wedding-surface)]/95 backdrop-blur-xs shadow-soft select-none ${className}`}
        {...props}
      >
        <span className="font-serif text-xl sm:text-2xl font-bold tracking-widest text-[var(--wedding-text)] flex items-center">
          <span>{initial}</span>
          {!isSingleHost ? (
            <>
              <span className="text-[var(--wedding-accent)] font-serif italic font-normal mx-1.5 text-lg sm:text-xl">
                &amp;
              </span>
              <span>{identity.brideInitial}</span>
            </>
          ) : milestoneNum ? (
            <>
              <span className="text-[var(--wedding-accent)] font-serif font-bold mx-1.5 text-lg sm:text-xl">
                &bull;
              </span>
              <span className="font-mono text-lg sm:text-xl">{milestoneNum}</span>
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
        className={`inline-flex items-center justify-center gap-2 font-serif text-2xl md:text-3xl font-bold tracking-wider text-[var(--wedding-on-dark)] ${className}`}
        {...props}
      >
        {isSingleHost ? (
          <>
            <span className="tracking-widest">{firstName || initial}</span>
            {fullMilestone && (
              <>
                <span className="text-[var(--wedding-accent)] font-serif font-bold mx-1">
                  &bull;
                </span>
                <span className="font-mono text-xl md:text-2xl text-[var(--wedding-accent)]">
                  {fullMilestone}
                </span>
                <span className="text-xl">🌹</span>
              </>
            )}
          </>
        ) : (
          <>
            <span>{initial}</span>
            <span className="text-[var(--wedding-accent)] font-serif italic font-normal mx-1">
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
        <span className="inline-flex items-center gap-1.5 font-serif text-xl sm:text-2xl font-bold tracking-widest text-[var(--wedding-on-dark)]">
          {isSingleHost ? (
            <>
              <span className="uppercase tracking-widest">{identity.displayName}</span>
              {fullMilestone && (
                <>
                  <span className="text-[var(--wedding-accent)] font-serif font-bold mx-1 text-lg sm:text-xl">
                    &bull;
                  </span>
                  <span className="font-mono text-base sm:text-lg text-[var(--wedding-accent)]">
                    {fullMilestone}
                  </span>
                  <span className="text-base">🌹</span>
                </>
              )}
            </>
          ) : (
            <>
              <span>{initial}</span>
              <span className="text-[var(--wedding-accent)] font-serif italic font-normal mx-1 text-xl sm:text-2xl">
                &amp;
              </span>
              <span>{identity.brideInitial}</span>
            </>
          )}
        </span>
        {!isSingleHost && (
          <span className="text-xs tracking-wider uppercase text-[var(--wedding-accent-soft)] font-mono">
            {identity.displayName}
          </span>
        )}
      </div>
    );
  }

  // ── NAV (default) ──────────────────────────────────────────────────────
  // Debut: SOPHIA • 18TH BIRTHDAY 🌹
  // Wedding: A & J
  return (
    <span
      className={`event-nav-monogram inline-flex items-center text-[var(--wedding-text)] hover:opacity-80 transition-opacity select-none ${className}`}
      {...props}
    >
      {isSingleHost ? (
        <span className="event-monogram-glyphs flex items-center font-serif text-sm sm:text-base font-bold tracking-widest uppercase">
          <span className="text-[var(--wedding-text)]">{firstName || initial}</span>
          {fullMilestone && (
            <>
              <span className="text-[var(--wedding-accent)] font-serif font-bold mx-1.5 text-sm sm:text-base">
                &bull;
              </span>
              <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-[var(--wedding-text-muted)]">
                {fullMilestone}
              </span>
              <span className="ml-1 text-xs sm:text-sm">🌹</span>
            </>
          )}
        </span>
      ) : (
        <span className="event-monogram-glyphs flex items-center font-serif text-lg md:text-xl font-bold tracking-widest">
          <span>{initial}</span>
          <span className="text-[var(--wedding-accent)] font-serif italic font-normal mx-1 text-base">
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
