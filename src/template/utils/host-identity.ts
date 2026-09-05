// DYNAMIC HOST / COUPLE IDENTITY.
// Redesign freely, but derive initials/names from WeddingTemplateData.
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

    const partner1 = String(info.partner1Name || info.groomName || "");
    const partner2 = String(info.partner2Name || info.brideName || "");
    groom = partner1;
    bride = partner2;

    if (partner1 && partner2) {
      explicitDisplay = `${partner1} & ${partner2}`;
    } else if (info.name) {
      explicitDisplay = String(info.name);
    } else if (info.displayName || info.coupleDisplayName || info.displayAs) {
      explicitDisplay = String(info.displayName || info.coupleDisplayName || info.displayAs);
    }

    milestone = String(
      info.milestone || info.milestoneText || info.displayAs || "Wedding Celebration"
    );
  } else {
    groom = (hostInfoOrGroom || "").trim();
    bride = (brideName || "").trim();
    explicitDisplay = coupleDisplayName?.trim() || "";
  }

  const groomInitial = groom ? extractInitial(groom) : "";
  const brideInitial = bride ? extractInitial(bride) : "";

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
    (groom && bride ? `${groom} & ${bride}` : groom || bride || "Alex & Jamie");

  const initialsList =
    groomInitial && brideInitial
      ? [groomInitial, brideInitial]
      : [groomInitial || monogram.charAt(0) || "A"];

  return {
    groomName: groom,
    brideName: bride,
    groomInitial: groomInitial || "A",
    brideInitial: brideInitial || "J",
    monogram: monogram || "A & J",
    compactMonogram: compactMonogram || "AJ",
    displayName: defaultDisplay,
    initials: initialsList,
    milestoneText: milestone || "Wedding Celebration",
  };
}

export const deriveCoupleIdentity = deriveHostIdentity;
