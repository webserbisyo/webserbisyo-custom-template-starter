// PLATFORM DATA — KEEP DYNAMIC.
// Normalizes raw WebSerbisyo API response or local snapshot into canonical WeddingTemplateData (Contract V1).

import {
  EVENT_WEBSITE_SECTION_CONTRACT_VERSION,
  eventWebsiteSectionKeySet,
  requiredWeddingSections,
} from "./contract";
import type {
  WeddingTemplateData,
  NormalizedSection,
  PublicMediaAsset,
  GuestbookMessage,
  TimelineItem,
  EntourageGroup,
  ExtraInfoItem,
  GiftOption,
  RsvpData,
  HostInfoData,
  EighteenRosesCandlesData,
  EighteenTraditionGroup,
  EighteenTraditionEntry,
  TraditionKind,
  NamedGroupsData,
  NamedGroup,
  NamedEntry,
} from "./wedding-template-data";
import { isSectionEnabled } from "./section-visibility";

function record(val: unknown): Record<string, unknown> {
  return val && typeof val === "object" && !Array.isArray(val)
    ? (val as Record<string, unknown>)
    : {};
}

function arrayOfRecords(val: unknown): Record<string, unknown>[] {
  if (!Array.isArray(val)) return [];
  return val.filter((item) => item && typeof item === "object") as Record<string, unknown>[];
}

function stringValue(val: unknown): string | undefined {
  if (typeof val === "string") return val.trim() || undefined;
  if (typeof val === "number") return String(val);
  return undefined;
}

function boolValue(val: unknown): boolean | undefined {
  if (typeof val === "boolean") return val;
  if (val === "true" || val === "1") return true;
  if (val === "false" || val === "0") return false;
  return undefined;
}

function numberValue(val: unknown, fallback: number = 0): number {
  if (typeof val === "number" && !isNaN(val)) return val;
  if (typeof val === "string") {
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed)) return parsed;
  }
  return fallback;
}

export type NormalizeEventOptions = {
  source?: "demo" | "snapshot" | "live";
  previewMode?: "dashboard";
  eventSlug?: string;
};

export function normalizeEventData(
  rawInput: unknown,
  options: NormalizeEventOptions = {}
): WeddingTemplateData {
  const raw = record(rawInput);
  const source = options.source ?? (raw.source as "demo" | "snapshot" | "live") ?? "snapshot";
  const previewMode = options.previewMode ?? (raw.previewMode as "dashboard") ?? undefined;
  const eventSlug = stringValue(raw.eventSlug ?? raw.slug) || options.eventSlug || "event";

  const content = record(raw.content);
  const layout = record(content.layout);
  const sectionsByKey = record(raw.sectionsByKey);
  const contentSections = record(content.sections);
  const enabledSectionsMap = record(layout.enabledSections ?? raw.enabledSections);

  // Detect event type from available sources
  const eventType =
    stringValue(raw.eventType) ??
    stringValue(content.eventType) ??
    stringValue(record(contentSections.host_info ?? sectionsByKey.host_info).kind) ??
    "wedding";

  const sectionContentMap = new Map<string, Record<string, unknown>>();
  const sectionMap = new Map<string, NormalizedSection>();

  // Parse sections list: handle array of string keys (PublicEventDto) or array of section objects (Demo)
  if (Array.isArray(raw.sections) && raw.sections.every((item) => typeof item === "string")) {
    const keys = raw.sections as string[];
    for (const key of keys) {
      if (eventWebsiteSectionKeySet.has(key)) {
        const secObj = record(sectionsByKey[key]);
        const secContent = record(
          secObj.content ?? contentSections[key] ?? content[key] ?? raw[key]
        );
        sectionContentMap.set(key, secContent);
        sectionMap.set(key, {
          key,
          title: stringValue(secObj.title ?? secObj.label),
          enabled: boolValue(enabledSectionsMap[key]) ?? boolValue(secObj.enabled) ?? true,
          content: secContent,
        });
      }
    }
  } else if (Array.isArray(raw.sections)) {
    const rawSecObjs = arrayOfRecords(raw.sections);
    for (const s of rawSecObjs) {
      const key = stringValue(s.key);
      if (key && eventWebsiteSectionKeySet.has(key)) {
        const secContent = record(s.content ?? contentSections[key]);
        sectionContentMap.set(key, secContent);
        sectionMap.set(key, {
          key,
          title: stringValue(s.title),
          enabled: boolValue(enabledSectionsMap[key]) ?? s.enabled !== false,
          content: secContent,
        });
      }
    }
  }

  // Also check sectionsByKey for any missing keys
  for (const [key, val] of Object.entries(sectionsByKey)) {
    if (
      !sectionMap.has(key) &&
      eventWebsiteSectionKeySet.has(key) &&
      val &&
      typeof val === "object"
    ) {
      const secObj = record(val);
      const secContent = record(secObj.content ?? contentSections[key]);
      sectionContentMap.set(key, secContent);
      sectionMap.set(key, {
        key,
        title: stringValue(secObj.title),
        enabled: boolValue(enabledSectionsMap[key]) ?? secObj.enabled !== false,
        content: secContent,
      });
    }
  }

  // Also check top-level content/contentSections map
  for (const [key, val] of Object.entries({ ...content, ...contentSections })) {
    if (!sectionContentMap.has(key) && val && typeof val === "object") {
      const rec = record(val);
      sectionContentMap.set(key, rec);
      if (!sectionMap.has(key) && eventWebsiteSectionKeySet.has(key)) {
        sectionMap.set(key, {
          key,
          title: stringValue(rec.title),
          enabled: boolValue(enabledSectionsMap[key]) ?? true,
          content: rec,
        });
      }
    }
  }

  function getSectionContent(key: string): Record<string, unknown> {
    return (
      sectionContentMap.get(key) ||
      record(record(sectionsByKey[key]).content) ||
      record(contentSections[key]) ||
      record(content[key]) ||
      record(raw[key])
    );
  }

  // Parse sections ordering and enabled lists
  const normalizedSectionsList: NormalizedSection[] = Array.from(sectionMap.values());
  const rawOrder = Array.isArray(
    raw.orderedSectionKeys ?? raw.sectionOrder ?? layout.sectionOrder ?? raw.sections
  )
    ? (raw.orderedSectionKeys ?? raw.sectionOrder ?? layout.sectionOrder ?? raw.sections)
    : [];
  const rawEnabled = Array.isArray(raw.enabledSectionKeys ?? raw.enabledSections)
    ? (raw.enabledSectionKeys ?? raw.enabledSections)
    : [];

  const stringOrder = (rawOrder as unknown[])
    .map((k) => (typeof k === "string" ? k : ""))
    .filter((k) => eventWebsiteSectionKeySet.has(k));
  const stringEnabled = (rawEnabled as unknown[])
    .map((k) => (typeof k === "string" ? k : ""))
    .filter((k) => eventWebsiteSectionKeySet.has(k));

  // Determine enabled keys
  const enabledSectionKeys: string[] = [];
  const orderedSectionKeys: string[] = [];

  // Default ordering base
  const candidateKeys =
    stringOrder.length > 0 ? stringOrder : normalizedSectionsList.map((s) => s.key);

  const seen = new Set<string>();
  for (const key of candidateKeys) {
    if (!seen.has(key) && eventWebsiteSectionKeySet.has(key)) {
      seen.add(key);
      const isEnabled = isSectionEnabled(
        key,
        normalizedSectionsList,
        stringEnabled.length > 0
          ? stringEnabled
          : Object.keys(enabledSectionsMap).filter((k) => enabledSectionsMap[k] === true)
      );
      if (isEnabled) {
        enabledSectionKeys.push(key);
        orderedSectionKeys.push(key);
      }
    }
  }

  // Ensure all required sections are present
  for (const req of requiredWeddingSections) {
    if (!enabledSectionKeys.includes(req)) {
      enabledSectionKeys.push(req);
    }
    if (!orderedSectionKeys.includes(req)) {
      orderedSectionKeys.push(req);
    }
  }

  // 1. host_info (Polymorphic: wedding | debut | birthday | baptism)
  const hostContent = getSectionContent("host_info");
  const hostKind = stringValue(hostContent.kind) || eventType;
  const displayAs = stringValue(hostContent.displayAs) || "";
  const hostLine = stringValue(hostContent.hostLine) || "Together with their families";
  const shortHostMessage = stringValue(hostContent.shortHostMessage) || "";

  let coupleData: HostInfoData;
  let groomName = "";
  let brideName = "";

  if (hostKind === "debut") {
    const debutantName = stringValue(hostContent.debutantName) || "Debutante";
    coupleData = {
      kind: "debut" as const,
      debutantName,
      milestone: stringValue(hostContent.milestone) || "18th Birthday",
      displayAs: displayAs || debutantName,
      hostLine,
      shortHostMessage,
    };
  } else if (hostKind === "birthday") {
    const celebrantName = stringValue(hostContent.celebrantName) || "Celebrant";
    coupleData = {
      kind: "birthday" as const,
      celebrantName,
      milestone: stringValue(hostContent.milestone) || "",
      displayAs: displayAs || celebrantName,
      hostLine,
      shortHostMessage,
    };
  } else if (hostKind === "baptism") {
    const childName = stringValue(hostContent.childName) || "Child";
    coupleData = {
      kind: "baptism" as const,
      childName,
      parentNames: stringValue(hostContent.parentNames) || "",
      displayAs: displayAs || childName,
      hostLine,
      shortHostMessage,
    };
  } else {
    groomName = stringValue(hostContent.groomName) || "Groom";
    brideName = stringValue(hostContent.brideName) || "Bride";
    coupleData = {
      kind: "wedding" as const,
      groomName,
      brideName,
      displayAs,
      hostLine,
      shortHostMessage,
    };
  }

  // 2. countdown
  const countdownContent = getSectionContent("countdown");
  const countdownData = {
    title: stringValue(countdownContent.title),
    shortNote: stringValue(countdownContent.shortNote),
  };

  // 3. music_effects
  const musicContent = getSectionContent("music_effects");
  const musicData = {
    musicLink: stringValue(musicContent.musicLink),
    musicTitle: stringValue(musicContent.musicTitle),
    playButtonLabel: stringValue(musicContent.playButtonLabel) || "Play Music",
    shortNote: stringValue(musicContent.shortNote),
  };

  // 4. gallery
  const galleryContent = getSectionContent("gallery");
  const galleryData = {
    sectionTitle: stringValue(galleryContent.sectionTitle) || "Our Moments",
    sectionIntro: stringValue(galleryContent.sectionIntro),
  };

  // 5. main_event (Ceremony)
  const ceremonyContent = getSectionContent("main_event");
  const ceremonyData = {
    eventLabel: stringValue(ceremonyContent.eventLabel) || "The Holy Ceremony",
    eventDate: stringValue(ceremonyContent.eventDate ?? raw.eventDate),
    eventTime: stringValue(ceremonyContent.eventTime ?? raw.eventTime),
    endTime: stringValue(ceremonyContent.endTime),
    rsvpDeadline: stringValue(ceremonyContent.rsvpDeadline),
    scheduleNote: stringValue(ceremonyContent.scheduleNote),
  };

  // 6. venue (Location)
  const venueContent = getSectionContent("venue");
  const venueData = {
    venueName: stringValue(venueContent.venueName ?? raw.venueName) || "Wedding Venue",
    address: stringValue(venueContent.address ?? raw.venueAddress) || "Venue Address",
    mapsLink: stringValue(venueContent.mapsLink),
    arrivalNote: stringValue(venueContent.arrivalNote),
  };

  // 7. secondary_event (Reception)
  const receptionContent = getSectionContent("secondary_event");
  const receptionData = {
    title: stringValue(receptionContent.title) || "Dinner & Celebration",
    venueName: stringValue(receptionContent.venueName),
    address: stringValue(receptionContent.address),
    startTime: stringValue(receptionContent.startTime),
    endTime: stringValue(receptionContent.endTime),
    mapsLink: stringValue(receptionContent.mapsLink),
    note: stringValue(receptionContent.note),
  };

  // 8. timeline_program
  const timelineContent = getSectionContent("timeline_program");
  const rawTimelineItems = arrayOfRecords(timelineContent.items);
  const timelineItems: TimelineItem[] = rawTimelineItems.map((item, idx) => ({
    id: stringValue(item.id) || `timeline-${idx + 1}`,
    time: stringValue(item.time) || "",
    title: stringValue(item.title) || "Program Item",
    description: stringValue(item.description),
  }));
  const timelineData = {
    sectionTitle: stringValue(timelineContent.sectionTitle) || "Program & Timeline",
    sectionIntro: stringValue(timelineContent.sectionIntro),
    items: timelineItems,
  };

  // 9. entourage
  const entourageContent = getSectionContent("entourage");
  const rawEntourageGroups = arrayOfRecords(entourageContent.groups);
  const entourageGroups: EntourageGroup[] = rawEntourageGroups.map((grp, idx) => {
    let namesStr = "";
    if (typeof grp.names === "string") {
      namesStr = grp.names;
    } else if (Array.isArray(grp.names)) {
      namesStr = grp.names
        .map((n) => (typeof n === "string" ? n : stringValue(n) || ""))
        .join("\n");
    }
    return {
      id: stringValue(grp.id) || `entourage-${idx + 1}`,
      groupTitle: stringValue(grp.groupTitle) || "Entourage Group",
      names: namesStr,
    };
  });
  const entourageData = {
    introLine: stringValue(entourageContent.introLine),
    groups: entourageGroups,
  };

  // 10. principal_sponsors
  const sponsorContent = getSectionContent("principal_sponsors");
  let sponsorsNamesStr = "";
  if (typeof sponsorContent.names === "string") {
    sponsorsNamesStr = sponsorContent.names;
  } else if (Array.isArray(sponsorContent.names)) {
    sponsorsNamesStr = sponsorContent.names
      .map((n) => (typeof n === "string" ? n : stringValue(n) || ""))
      .join("\n");
  }
  const sponsorsData = {
    introLine: stringValue(sponsorContent.introLine),
    names: sponsorsNamesStr,
  };

  // 11. attire_motif
  const attireContent = getSectionContent("attire_motif");
  const attireData = {
    sectionIntro: stringValue(attireContent.sectionIntro),
    dressCodeNote: stringValue(attireContent.dressCodeNote),
    colorMotifNote: stringValue(attireContent.colorMotifNote),
  };

  // 12. extra_info
  const extraContent = getSectionContent("extra_info");
  const rawExtraItems = arrayOfRecords(extraContent.items);
  const extraItems: ExtraInfoItem[] = rawExtraItems.map((i, idx) => ({
    id: stringValue(i.id) || `extra-${idx + 1}`,
    title: stringValue(i.title) || "Note",
    details: stringValue(i.details) || "",
  }));
  const extraInfoData = {
    sectionTitle: stringValue(extraContent.sectionTitle) || "Good to Know",
    sectionIntro: stringValue(extraContent.sectionIntro),
    items: extraItems,
  };

  // 13. rsvp_form
  const rsvpContent = getSectionContent("rsvp_form");
  const rsvpData: RsvpData = {
    plusOneEnabled: boolValue(rsvpContent.plusOneEnabled) ?? false,
    companionLimit: numberValue(rsvpContent.companionLimit, 1),
    companionNameEnabled: boolValue(rsvpContent.companionNameEnabled) ?? true,
    companionAgeEnabled: boolValue(rsvpContent.companionAgeEnabled) ?? false,
    emailEnabled: boolValue(rsvpContent.emailEnabled) ?? true,
    emailRequired: boolValue(rsvpContent.emailRequired) ?? true,
    phoneEnabled: boolValue(rsvpContent.phoneEnabled) ?? false,
    phoneRequired: boolValue(rsvpContent.phoneRequired) ?? false,
    foodAllergiesEnabled: boolValue(rsvpContent.foodAllergiesEnabled) ?? false,
    messageToHostEnabled: boolValue(rsvpContent.messageToHostEnabled) ?? true,
    customQuestions: Array.isArray(rsvpContent.customQuestions) ? rsvpContent.customQuestions : [],
  };

  // 14. gift_details (Max 2 options)
  const giftContent = getSectionContent("gift_details");
  const rawOptions = arrayOfRecords(giftContent.options);
  const giftOptions: GiftOption[] = rawOptions.slice(0, 2).map((opt, idx) => {
    const rawImage = record(opt.image);
    const imageUrl = stringValue(rawImage.url);
    const imagePath = stringValue(rawImage.path) || "";
    return {
      id: stringValue(opt.id) || `opt-${idx + 1}`,
      title: stringValue(opt.title) || "Gift Option",
      image:
        imageUrl || imagePath
          ? { path: imagePath, url: imageUrl, alt: stringValue(rawImage.alt) }
          : null,
    };
  });
  const giftsData = {
    sectionIntro: stringValue(giftContent.sectionIntro),
    giftNote: stringValue(giftContent.giftNote),
    options: giftOptions,
  };

  // 15. guestbook
  const guestbookContent = getSectionContent("guestbook");
  const rawMessages = arrayOfRecords(
    raw.publicGuestbookMessages ??
      raw.guestbookMessages ??
      content.publicGuestbookMessages ??
      content.guestbookMessages ??
      guestbookContent.messages
  );
  const guestbookMessages: GuestbookMessage[] = rawMessages.map((m, idx) => ({
    id: (m.id as string | number) ?? `msg-${idx + 1}`,
    guestName: stringValue(m.guestName ?? m.name) || "Guest",
    message: stringValue(m.message) || "",
    submittedAt: stringValue(m.submittedAt ?? m.createdAt),
    approvedAt: stringValue(m.approvedAt),
  }));
  const guestbookData = {
    sectionTitle: stringValue(guestbookContent.sectionTitle) || "Wishes & Blessings",
    sectionIntro: stringValue(guestbookContent.sectionIntro),
    emptyStateMessage:
      stringValue(guestbookContent.emptyStateMessage) ||
      "Approved guest messages will appear here soon.",
    messages: guestbookMessages,
  };

  // 16. story_message (Scalar narrative)
  const storyContent = getSectionContent("story_message");
  const storyData = {
    storyTitle: stringValue(storyContent.storyTitle) || "Our Journey",
    sectionIntro: stringValue(storyContent.sectionIntro),
    storyBody: stringValue(storyContent.storyBody),
  };

  // 17. contact_socials
  const contactContent = getSectionContent("contact_socials");
  const contactData = {
    contactPerson:
      stringValue(contactContent.contactPerson) ||
      (groomName && brideName ? `${groomName} & ${brideName}` : ""),
    contactNumber: stringValue(contactContent.contactNumber),
    email: stringValue(contactContent.email),
    facebookUrl: stringValue(contactContent.facebookUrl),
    instagramUrl: stringValue(contactContent.instagramUrl),
    tikTokUrl: stringValue(contactContent.tikTokUrl),
  };

  // 18. eighteen_roses_candles (Debut traditions)
  const rosesContent = getSectionContent("eighteen_roses_candles");
  const rawRosesGroups = arrayOfRecords(rosesContent.groups);
  const traditionsGroups: EighteenTraditionGroup[] = rawRosesGroups.map((grp, gIdx) => {
    const rawEntries = arrayOfRecords(grp.entries);
    const entries: EighteenTraditionEntry[] = rawEntries.map((entry, eIdx) => ({
      id: stringValue(entry.id) || `tradition-${gIdx}-${eIdx}`,
      name: stringValue(entry.name) || "",
      message: stringValue(entry.message) || "",
    }));
    const rawKind = stringValue(grp.kind);
    const kind: TraditionKind =
      rawKind === "roses" ||
      rawKind === "candles" ||
      rawKind === "treasures" ||
      rawKind === "custom"
        ? rawKind
        : "custom";
    return {
      id: stringValue(grp.id) || `tradition-group-${gIdx}`,
      title: stringValue(grp.title) || "Tradition",
      kind,
      entries,
    };
  });
  const eighteenRosesCandlesData: EighteenRosesCandlesData = {
    groups: traditionsGroups,
  };

  // 19. debut_court (Named groups)
  const courtContent = getSectionContent("debut_court");
  const debutCourtData: NamedGroupsData = {
    groups: normalizeNamedGroups(courtContent, "court"),
  };

  // 20. godparents (Named groups)
  const godparentsContent = getSectionContent("godparents");
  const godparentsData: NamedGroupsData = {
    groups: normalizeNamedGroups(godparentsContent, "godparent"),
  };

  // Assets Map
  const assetsRecord: Record<string, PublicMediaAsset> = {};
  const rawAssets = raw.assets;
  if (Array.isArray(rawAssets)) {
    for (const item of rawAssets) {
      if (item && typeof item === "object") {
        const itemRec = record(item);
        const slot = stringValue(itemRec.slot);
        if (slot) {
          assetsRecord[slot] = {
            slot,
            url: stringValue(itemRec.url ?? itemRec.src),
            alt: stringValue(itemRec.alt),
          };
        }
      }
    }
  } else if (rawAssets && typeof rawAssets === "object") {
    for (const [key, val] of Object.entries(rawAssets)) {
      if (typeof val === "string") {
        assetsRecord[key] = { slot: key, url: val };
      } else if (val && typeof val === "object") {
        const valRec = record(val);
        assetsRecord[key] = {
          slot: key,
          url: stringValue(valRec.url ?? valRec.src),
          alt: stringValue(valRec.alt),
        };
      }
    }
  }

  // Derive title and display name based on event type
  let defaultTitle: string;
  let defaultDisplayName: string;

  if (coupleData.kind === "debut") {
    const dName = coupleData.debutantName;
    defaultTitle = `${dName}'s ${coupleData.milestone || "Debut"}`;
    defaultDisplayName = displayAs || dName;
  } else if (coupleData.kind === "birthday") {
    const cName = coupleData.celebrantName;
    defaultTitle = coupleData.milestone
      ? `${cName}'s ${coupleData.milestone}`
      : `${cName}'s Birthday`;
    defaultDisplayName = displayAs || cName;
  } else if (coupleData.kind === "baptism") {
    const chName = coupleData.childName;
    defaultTitle = `${chName}'s Christening`;
    defaultDisplayName = displayAs || chName;
  } else {
    defaultTitle = `${groomName} & ${brideName} Wedding`;
    defaultDisplayName =
      displayAs ||
      (groomName && brideName
        ? `${groomName} & ${brideName}`
        : groomName || brideName || "The Couple");
  }

  const title = stringValue(raw.title ?? raw.eventTitle) || defaultTitle;
  const coupleDisplayName = defaultDisplayName;

  return {
    contractVersion: (raw.contractVersion as number) || EVENT_WEBSITE_SECTION_CONTRACT_VERSION,
    source,
    previewMode,
    eventSlug,
    eventType,
    title,
    coupleDisplayName,
    eventDate: stringValue(raw.eventDate ?? ceremonyData.eventDate),
    eventDateLabel: stringValue(raw.eventDateLabel ?? raw.eventDate ?? ceremonyData.eventDate),
    eventTimeLabel: stringValue(raw.eventTimeLabel ?? ceremonyData.eventTime),
    eventDateTimeLabel:
      stringValue(raw.eventDateTimeLabel) ||
      (ceremonyData.eventDate && ceremonyData.eventTime
        ? `${ceremonyData.eventDate} at ${ceremonyData.eventTime}`
        : stringValue(ceremonyData.eventDate)),
    rsvpDeadlineLabel: stringValue(raw.rsvpDeadlineLabel ?? ceremonyData.rsvpDeadline),
    timezone: stringValue(raw.timezone),
    publicUrl: stringValue(raw.publicUrl),

    couple: coupleData,
    countdown: countdownData,
    music: musicData,
    ceremony: ceremonyData,
    venue: venueData,
    reception: receptionData,
    timeline: timelineData,
    entourage: entourageData,
    sponsors: sponsorsData,
    attire: attireData,
    extraInfo: extraInfoData,
    rsvp: rsvpData,
    gifts: giftsData,
    guestbook: guestbookData,
    story: storyData,
    contact: contactData,
    gallery: galleryData,
    eighteenRosesCandles: eighteenRosesCandlesData,
    debutCourt: debutCourtData,
    godparents: godparentsData,

    sections: normalizedSectionsList,
    orderedSectionKeys,
    enabledSectionKeys,

    assets: assetsRecord,
    raw,
  };
}

export function normalizeEvent(
  input: unknown,
  options?: NormalizeEventOptions
): WeddingTemplateData {
  if (input && typeof input === "object" && "raw" in input) {
    const wrapper = input as {
      raw: unknown;
      source?: "demo" | "snapshot" | "live";
      previewMode?: "dashboard";
      eventSlug?: string;
    };
    return normalizeEventData(wrapper.raw, {
      source: wrapper.source,
      previewMode: wrapper.previewMode,
      eventSlug: wrapper.eventSlug,
      ...options,
    });
  }
  return normalizeEventData(input, options);
}

// ---------------------------------------------------------------------------
// Named Groups normalizer (for debut_court & godparents)
// ---------------------------------------------------------------------------

function normalizeNamedGroups(
  sectionContent: Record<string, unknown>,
  prefix: string
): NamedGroup[] {
  const rawGroups = arrayOfRecords(sectionContent.groups);
  return rawGroups.map((grp, gIdx) => {
    const rawNames = Array.isArray(grp.names) ? grp.names : [];
    const names: NamedEntry[] = rawNames
      .map((n, nIdx) => {
        if (typeof n === "string") {
          return {
            id: `${prefix}-${gIdx}-${nIdx}`,
            name: n.trim(),
          };
        }
        if (n && typeof n === "object") {
          const rec = n as Record<string, unknown>;
          return {
            id: stringValue(rec.id) || `${prefix}-${gIdx}-${nIdx}`,
            name: stringValue(rec.name) || "",
          };
        }
        return null;
      })
      .filter((entry): entry is NamedEntry => entry !== null && entry.name.length > 0);

    return {
      id: stringValue(grp.id) || `${prefix}-group-${gIdx}`,
      title: stringValue(grp.title) || "",
      names,
    };
  });
}
