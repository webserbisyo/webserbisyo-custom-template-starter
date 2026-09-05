// DYNAMIC HOST / CELEBRANT / COUPLE IDENTITY.
// Redesign freely, but derive initials/names from EventTemplateData.
// Never hardcode client initials.

export type HostIdentity = {
  groomName: string;
  brideName: string;
  groomInitial: string;
  brideInitial: string;
  monogram: string;
  compactMonogram: string;
  displayName: string;
  initials?: string[];
  milestoneText?: string;
};

export type CoupleIdentity = HostIdentity;

const COMMON_TITLES = new Set(["dr", "mr", "mrs", "ms", "prof", "rev", "atty", "engr", "hon"]);

function cleanName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length > 1 && COMMON_TITLES.has(parts[0].toLowerCase().replace(/\./g, ""))) {
    return parts.slice(1).join(" ");
  }
  return name.trim();
}

function extractInitial(name: string): string {
  const cleaned = cleanName(name);
  const match = cleaned.match(/[\p{L}]/u);
  return match ? match[0].toUpperCase() : "";
}

/**
 * Extracts the single celebrant's first name from a full display name.
 * Example: "Michael's 10th Birthday" -> "Michael", "Michael Johnson" -> "Michael"
 */
export function getSingleHostFirstName(displayName?: string): string {
  if (!displayName) return "";
  const cleaned = displayName
    .replace(/^(the|a)\s+/i, "")
    .replace(/['’]s\b.*/i, "")
    .trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts[0] || cleaned;
}

/**
 * Extracts a milestone number from a milestone or age string.
 * Examples:
 * - "30th birthday" -> "30"
 * - "Level 10" -> "10"
 * - "Turning 18" -> "18"
 * - "10" -> "10"
 */
export function extractMilestoneNumber(milestone?: string | null): string | null {
  if (!milestone) return null;
  const match = String(milestone).trim().match(/(\d+)/);
  return match ? match[1] : null;
}

/**
 * Converts an integer milestone into an ordinal string.
 * Examples:
 * - "1"  -> "1st",  "2"  -> "2nd",  "3"  -> "3rd",  "4"  -> "4th"
 * - "10" -> "10th", "11" -> "11th", "12" -> "12th", "13" -> "13th"
 * - "21" -> "21st", "22" -> "22nd", "30" -> "30th"
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
  hostInfoOrGroom?: Record<string, unknown> | object | string | null,
  brideName?: string,
  coupleDisplayName?: string
): HostIdentity {
  let groom = "";
  let bride = "";
  let explicitDisplay = "";
  let milestone = "";

  if (hostInfoOrGroom && typeof hostInfoOrGroom === "object") {
    const raw = hostInfoOrGroom as Record<string, unknown>;
    const info = (raw.data as Record<string, unknown> | undefined)?.couple
      ? ((raw.data as Record<string, unknown>).couple as Record<string, unknown>)
      : raw.couple
        ? (raw.couple as Record<string, unknown>)
        : raw;

    groom = String(info.celebrantName || info.groomName || info.debutantName || "");
    bride = String(info.brideName || "");
    explicitDisplay = String(
      info.celebrantName || info.displayName || info.displayAs || info.coupleDisplayName || ""
    );
    milestone = String(info.milestoneAge || info.milestone || "");
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
    // Check for couple delimiters: &, and, +, /
    const segments = cleanDisplay.split(/\s+(?:&|and|\+|\/)\s+/i);
    if (segments.length === 2) {
      const first = extractInitial(segments[0]);
      const second = extractInitial(segments[1]);
      if (first && second) {
        monogram = `${first} & ${second}`;
        compactMonogram = `${first}${second}`;
      }
    }
    if (!monogram) {
      const parts = cleanDisplay.split(/\s+/).filter(Boolean);
      if (parts.length >= 2) {
        const first = extractInitial(parts[0]);
        const last = extractInitial(parts[parts.length - 1]);
        monogram = `${first} & ${last}`;
        compactMonogram = `${first}${last}`;
      } else if (parts.length === 1) {
        monogram = extractInitial(parts[0]);
        compactMonogram = monogram;
      }
    }
  }

  const defaultDisplay =
    explicitDisplay?.trim() ||
    (!isSingleHost && groom && bride ? `${groom} & ${bride}` : groom || bride || "Michael");

  return {
    groomName: groom,
    brideName: isSingleHost ? "" : bride,
    groomInitial: groomInitial || monogram || "M",
    brideInitial,
    monogram: monogram || "M",
    compactMonogram: compactMonogram || "M",
    displayName: defaultDisplay,
    initials:
      groomInitial && brideInitial
        ? [groomInitial, brideInitial]
        : [groomInitial || monogram || "M"],
    milestoneText: milestone || "10th Birthday Special Edition",
  };
}

export const deriveCoupleIdentity = deriveHostIdentity;
