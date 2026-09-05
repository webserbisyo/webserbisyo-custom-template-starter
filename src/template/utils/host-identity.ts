// DYNAMIC HOST / CELEBRANT / COUPLE IDENTITY.
// Redesign freely, but derive initials/names from EventTemplateData.
// Never hardcode client initials.

import type { HostInfoData } from "@/platform/event-template-data";

export type HostIdentity = {
  groomName: string;
  brideName: string;
  groomInitial: string;
  brideInitial: string;
  monogram: string;
  compactMonogram: string;
  displayName: string;
};

/** @deprecated Use HostIdentity — kept for backward compatibility. */
export type CoupleIdentity = HostIdentity;

const COMMON_TITLES = new Set(["dr", "mr", "mrs", "ms", "prof", "rev", "atty", "engr", "hon"]);

export function cleanName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1 && COMMON_TITLES.has(parts[0].toLowerCase().replace(/\./g, ""))) {
    return parts.slice(1).join(" ");
  }
  return name.trim();
}

export function extractInitial(name: string): string {
  const cleaned = cleanName(name);
  const match = cleaned.match(/[\p{L}]/u);
  return match ? match[0].toUpperCase() : "";
}

/**
 * Extracts the single celebrant's first name from a full display name.
 * Example: "Sophia Marie Reyes" -> "Sophia"
 */
export function getSingleHostFirstName(displayName?: string): string {
  if (!displayName) return "";
  const cleaned = cleanName(displayName);
  const parts = cleaned.split(/\s+(?:&|and|\+|\/)\s+/i);
  const singleName = parts[0] || cleaned;
  const words = singleName.trim().split(/\s+/).filter(Boolean);
  return words[0] || singleName;
}

/**
 * Extracts a milestone number from a milestone or age string.
 * Examples:
 * - "18th Birthday" -> "18"
 * - "Turning 18" -> "18"
 * - "18" -> "18"
 * - "10th" -> "10"
 */
export function extractMilestoneNumber(milestone?: string | null): string | null {
  if (!milestone) return null;
  const match = String(milestone).trim().match(/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Converts an integer milestone into an ordinal string.
 * Examples:
 * - "1" -> "1st", "2" -> "2nd", "3" -> "3rd", "4" -> "4th"
 * - "10" -> "10th", "11" -> "11th", "12" -> "12th", "13" -> "13th"
 * - "18" -> "18th", "21" -> "21st", "22" -> "22nd", "30" -> "30th"
 */
export function getOrdinalSuffix(num?: string | number | null): string {
  if (!num) return "";
  const n = parseInt(String(num).trim(), 10);
  if (isNaN(n)) return String(num);
  const remainder100 = n % 100;
  if (remainder100 >= 11 && remainder100 <= 13) {
    return `${n}th`;
  }
  const remainder10 = n % 10;
  switch (remainder10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function deriveHostIdentity(
  hostInfoOrGroom?: HostInfoData | Record<string, unknown> | object | string | null,
  brideName?: string,
  coupleDisplayName?: string
): HostIdentity {
  let groom = "";
  let bride = "";
  let explicitDisplay = "";

  if (hostInfoOrGroom && typeof hostInfoOrGroom === "object") {
    const info = hostInfoOrGroom as Record<string, unknown>;
    if (info.kind === "debut") {
      groom = String(info.debutantName || info.displayAs || "");
      explicitDisplay = String(info.debutantName || info.displayAs || "");
    } else if (info.kind === "birthday") {
      groom = String(info.celebrantName || info.displayAs || "");
      explicitDisplay = String(info.celebrantName || info.displayAs || "");
    } else if (info.kind === "baptism") {
      groom = String(info.childName || info.displayAs || "");
      explicitDisplay = String(info.childName || info.displayAs || "");
    } else if (info.kind === "wedding") {
      groom = String(info.groomName || "");
      bride = String(info.brideName || "");
      explicitDisplay = String(info.displayAs || "");
    } else {
      groom = String(info.groomName || info.debutantName || info.celebrantName || "");
      bride = String(info.brideName || "");
      explicitDisplay = String(info.displayName || info.displayAs || info.coupleDisplayName || "");
    }
  } else {
    groom = (hostInfoOrGroom || "").trim();
    bride = (brideName || "").trim();
    explicitDisplay = coupleDisplayName?.trim() || "";
  }

  // If brideName is numeric (e.g. "10" for 10th birthday) or matches groomName, treat as single host
  const isBrideNumeric = /^\d+$/.test(bride);
  const isSingleHost = !bride || isBrideNumeric || groom.toLowerCase() === bride.toLowerCase();

  const groomInitial = groom ? extractInitial(groom) : "";
  const brideInitial = !isSingleHost && bride ? extractInitial(bride) : "";

  let monogram = "";
  let compactMonogram = "";

  if (groomInitial && brideInitial) {
    monogram = `${groomInitial} & ${brideInitial}`;
    compactMonogram = `${groomInitial}${brideInitial}`;
  } else if (groomInitial) {
    monogram = groomInitial;
    compactMonogram = groomInitial;
  } else if (brideInitial) {
    monogram = brideInitial;
    compactMonogram = brideInitial;
  } else if (explicitDisplay && explicitDisplay.trim().length > 0) {
    const cleanDisplay = explicitDisplay.trim();
    // Check for explicit couple delimiters: &, and, +, /
    const segments = cleanDisplay.split(/\s+(?:&|and|\+|\/)\s+/i);
    if (segments.length === 2) {
      const first = extractInitial(segments[0]);
      const second = extractInitial(segments[1]);
      if (first && second) {
        monogram = `${first} & ${second}`;
        compactMonogram = `${first}${second}`;
      }
    } else {
      // Single celebrant (e.g. "Sophia Marie Reyes") — DO NOT combine first & last initial with &
      const firstInitial = extractInitial(cleanDisplay);
      monogram = firstInitial;
      compactMonogram = firstInitial;
    }
  }

  const defaultDisplay =
    explicitDisplay?.trim() ||
    (!isSingleHost && groom && bride ? `${groom} & ${bride}` : groom || bride || "The Celebrant");

  return {
    groomName: groom,
    brideName: isSingleHost ? "" : bride,
    groomInitial: groomInitial || monogram,
    brideInitial,
    monogram: monogram || "S",
    compactMonogram: compactMonogram || "S",
    displayName: defaultDisplay,
  };
}

/** @deprecated Use deriveHostIdentity — kept for backward compatibility. */
export const deriveCoupleIdentity = deriveHostIdentity;
