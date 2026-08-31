// PLATFORM DATA — KEEP DYNAMIC.
// Canonical WebSerbisyo Event Website Data Model (Contract V1).

export type GuestbookMessage = {
  id?: string | number | null;
  guestName: string;
  message: string;
  submittedAt?: string | null;
  approvedAt?: string | null;
};

export type PublicMediaAsset = {
  slot?: string | null;
  url?: string | null;
  src?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
};

export type NormalizedSection = {
  key: string;
  title?: string;
  enabled: boolean;
  content: Record<string, unknown>;
};

// ---------------------------------------------------------------------------
// host_info — Discriminated union for all event types
// ---------------------------------------------------------------------------

export type WeddingHostInfo = {
  kind: "wedding";
  groomName: string;
  brideName: string;
  displayAs: string;
  hostLine: string;
  shortHostMessage: string;
};

export type DebutHostInfo = {
  kind: "debut";
  debutantName: string;
  milestone: string;
  displayAs: string;
  hostLine: string;
  shortHostMessage: string;
  brideName?: undefined;
  groomName?: undefined;
};

export type BirthdayHostInfo = {
  kind: "birthday";
  celebrantName: string;
  milestone: string;
  displayAs: string;
  hostLine: string;
  shortHostMessage: string;
  brideName?: undefined;
  groomName?: undefined;
};

export type BaptismHostInfo = {
  kind: "baptism";
  childName: string;
  parentNames: string;
  displayAs: string;
  hostLine: string;
  shortHostMessage: string;
  brideName?: undefined;
  groomName?: undefined;
};

export type HostInfoData = WeddingHostInfo | DebutHostInfo | BirthdayHostInfo | BaptismHostInfo;

/** @deprecated Use `HostInfoData` — kept for backward compatibility with existing templates. */
export type CoupleData = HostInfoData;

// ---------------------------------------------------------------------------
// eighteen_roses_candles — 18 Traditions (Debut)
// ---------------------------------------------------------------------------

export type TraditionKind = "roses" | "candles" | "treasures" | "custom";

export type EighteenTraditionEntry = {
  id: string;
  name: string;
  message: string;
};

export type EighteenTraditionGroup = {
  id: string;
  title: string;
  kind: TraditionKind;
  entries: EighteenTraditionEntry[];
};

export type EighteenRosesCandlesData = {
  groups: EighteenTraditionGroup[];
};

// ---------------------------------------------------------------------------
// debut_court & godparents — Named Groups (shared shape)
// ---------------------------------------------------------------------------

export type NamedEntry = {
  id: string;
  name: string;
};

export type NamedGroup = {
  id: string;
  title: string;
  names: NamedEntry[];
};

export type NamedGroupsData = {
  groups: NamedGroup[];
};

// ---------------------------------------------------------------------------
// countdown
// ---------------------------------------------------------------------------

export type CountdownData = {
  title?: string;
  shortNote?: string;
};

// ---------------------------------------------------------------------------
// music_effects
// ---------------------------------------------------------------------------

export type MusicData = {
  musicLink?: string;
  musicTitle?: string;
  playButtonLabel?: string;
  shortNote?: string;
};

// ---------------------------------------------------------------------------
// main_event (Ceremony / Program)
// ---------------------------------------------------------------------------

export type CeremonyData = {
  eventLabel?: string;
  eventDate?: string;
  eventTime?: string;
  endTime?: string;
  rsvpDeadline?: string;
  scheduleNote?: string;
};

// ---------------------------------------------------------------------------
// venue (Location)
// ---------------------------------------------------------------------------

export type VenueData = {
  venueName: string;
  address: string;
  mapsLink?: string;
  arrivalNote?: string;
};

// ---------------------------------------------------------------------------
// secondary_event (Reception / After-Party)
// ---------------------------------------------------------------------------

export type ReceptionData = {
  title?: string;
  venueName?: string;
  address?: string;
  startTime?: string;
  endTime?: string;
  mapsLink?: string;
  note?: string;
};

// ---------------------------------------------------------------------------
// timeline_program
// ---------------------------------------------------------------------------

export type TimelineItem = {
  id: string;
  time: string;
  title: string;
  description?: string;
};

export type TimelineData = {
  sectionTitle?: string;
  sectionIntro?: string;
  items: TimelineItem[];
};

// ---------------------------------------------------------------------------
// entourage
// ---------------------------------------------------------------------------

export type EntourageGroup = {
  id: string;
  groupTitle: string;
  names: string;
};

export type EntourageData = {
  introLine?: string;
  groups: EntourageGroup[];
};

// ---------------------------------------------------------------------------
// principal_sponsors
// ---------------------------------------------------------------------------

export type SponsorsData = {
  introLine?: string;
  names: string;
};

// ---------------------------------------------------------------------------
// attire_motif
// ---------------------------------------------------------------------------

export type AttireData = {
  sectionIntro?: string;
  dressCodeNote?: string;
  colorMotifNote?: string;
};

// ---------------------------------------------------------------------------
// extra_info
// ---------------------------------------------------------------------------

export type ExtraInfoItem = {
  id: string;
  title: string;
  details: string;
};

export type ExtraInfoData = {
  sectionTitle?: string;
  sectionIntro?: string;
  items: ExtraInfoItem[];
};

// ---------------------------------------------------------------------------
// rsvp_form
// ---------------------------------------------------------------------------

export type RsvpData = {
  plusOneEnabled: boolean;
  companionLimit: number;
  companionNameEnabled: boolean;
  companionAgeEnabled: boolean;
  emailEnabled: boolean;
  emailRequired: boolean;
  phoneEnabled: boolean;
  phoneRequired: boolean;
  foodAllergiesEnabled: boolean;
  messageToHostEnabled: boolean;
  customQuestions?: Array<unknown>;
};

// ---------------------------------------------------------------------------
// gift_details (Max 2 options)
// ---------------------------------------------------------------------------

export type EventWebsiteImageAsset = {
  alt?: string;
  path: string;
  url?: string;
};

export type GiftOption = {
  id: string;
  title: string;
  image: EventWebsiteImageAsset | null;
};

export type GiftsData = {
  sectionIntro?: string;
  giftNote?: string;
  options: GiftOption[];
};

// ---------------------------------------------------------------------------
// guestbook
// ---------------------------------------------------------------------------

export type GuestbookData = {
  sectionTitle?: string;
  sectionIntro?: string;
  emptyStateMessage?: string;
  messages: GuestbookMessage[];
};

// ---------------------------------------------------------------------------
// story_message (Scalar narrative)
// ---------------------------------------------------------------------------

export type LoveStoryData = {
  storyTitle?: string;
  sectionIntro?: string;
  storyBody?: string;
};

// ---------------------------------------------------------------------------
// contact_socials
// ---------------------------------------------------------------------------

export type ContactData = {
  contactPerson?: string;
  contactNumber?: string;
  email?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tikTokUrl?: string;
};

// ---------------------------------------------------------------------------
// gallery (Metadata only; photos are local template assets)
// ---------------------------------------------------------------------------

export type GalleryData = {
  sectionTitle?: string;
  sectionIntro?: string;
};

// ---------------------------------------------------------------------------
// TOP-LEVEL TEMPLATE DATA
// ---------------------------------------------------------------------------

export type WeddingTemplateData = {
  contractVersion: number;
  source: "demo" | "snapshot" | "live";
  previewMode?: "dashboard";
  eventSlug: string;
  eventType?: string;
  title: string;
  coupleDisplayName: string; // Derived display representation via deriveCoupleIdentity()
  eventDate?: string | null;
  eventDateLabel?: string | null;
  eventTimeLabel?: string | null;
  eventDateTimeLabel?: string | null;
  rsvpDeadlineLabel?: string | null;
  timezone?: string | null;
  publicUrl?: string | null;

  couple: HostInfoData;
  countdown: CountdownData;
  music: MusicData;
  ceremony: CeremonyData;
  venue: VenueData;
  reception: ReceptionData;
  timeline: TimelineData;
  entourage: EntourageData;
  sponsors: SponsorsData;
  attire: AttireData;
  extraInfo: ExtraInfoData;
  rsvp: RsvpData;
  gifts: GiftsData;
  guestbook: GuestbookData;
  story: LoveStoryData;
  contact: ContactData;
  gallery: GalleryData;
  eighteenRosesCandles: EighteenRosesCandlesData;
  debutCourt: NamedGroupsData;
  godparents: NamedGroupsData;

  sections: NormalizedSection[];
  orderedSectionKeys: string[];
  enabledSectionKeys: string[];

  assets?: Record<string, PublicMediaAsset>;
  raw?: Record<string, unknown>;
};

/** Alias for cross-event-type usage — same shape as WeddingTemplateData. */
export type EventTemplateData = WeddingTemplateData;
