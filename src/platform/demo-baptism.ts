// PLATFORM DATA — KEEP DYNAMIC.
// Complete, generic, fictional demo baptism fixture for local design/demo mode.
// Canonical WebSerbisyo Event Website Data Model (Contract V1).

import type { EventTemplateData } from "./event-template-data";
import { EVENT_WEBSITE_SECTION_CONTRACT_VERSION } from "./contract";

export const DEMO_BAPTISM_DATA: EventTemplateData = {
  contractVersion: EVENT_WEBSITE_SECTION_CONTRACT_VERSION,
  source: "demo",
  eventSlug: "liam-baptism-celestial-sky",
  eventType: "baptism",
  title: "Liam's Christening — Celestial Sky",
  coupleDisplayName: "Liam Santos",
  eventDate: "2026-11-15T10:00:00Z",
  eventDateLabel: "November 15, 2026",
  eventTimeLabel: "10:00 AM",
  eventDateTimeLabel: "November 15, 2026 at 10:00 AM",
  rsvpDeadlineLabel: "October 15, 2026",
  timezone: "Asia/Manila",
  publicUrl: "https://webserbisyo.com/r/liam-baptism-celestial-sky",

  couple: {
    kind: "baptism",
    childName: "Liam",
    parentNames: "Juan & Maria Santos",
    displayAs: "Liam Santos",
    hostLine: "Together with their families, Juan & Maria Santos",
    shortHostMessage:
      "Invite you to witness and celebrate the Holy Baptism of their beloved son, Liam.",
  },

  countdown: {
    title: "Counting Down to Liam's Christening",
    shortNote: "Until we welcome our precious child into faith",
  },

  music: {
    musicLink: "https://www.youtube.com/watch?v=170624_demo",
    musicTitle: "The Blessing — Kari Jobe & Cody Carnes",
    playButtonLabel: "Play Music",
    shortNote: "A prayer and blessing for Liam's sacred celebration",
  },

  gallery: {
    sectionTitle: "Moments of Grace",
    sectionIntro: "Cherished early memories and milestones of Liam's joyful journey.",
  },

  story: {
    storyTitle: "Welcoming Liam into Faith",
    sectionIntro: "A message of love and gratitude from Liam's parents",
    storyBody:
      "From the first moment we held Liam in our arms, our hearts overflowed with profound gratitude. He is a divine gift, bringing joy, laughter, and light to our home. Today, we bring him before God and our dearest family and friends to receive the sacrament of Holy Baptism, praying that his life will always be guided by grace, kindness, and love.",
  },

  ceremony: {
    eventLabel: "The Holy Baptism",
    eventDate: "2026-11-15",
    eventTime: "10:00",
    endTime: "11:30",
    rsvpDeadline: "October 15, 2026",
    scheduleNote: "Kindly be seated at the church 15 minutes before the liturgy begins.",
  },

  venue: {
    venueName: "San Agustin Church, Intramuros",
    address: "General Luna Street, Intramuros, Manila, 1002 Metro Manila",
    mapsLink: "https://maps.google.com/?q=San+Agustin+Church+Intramuros",
    arrivalNote: "Parking is available around the church plaza and at the Plaza San Luis Complex.",
  },

  reception: {
    title: "Thanksgiving Reception & Lunch",
    venueName: "La Cocina de San Agustin",
    address: "Plaza San Luis Complex, General Luna St, Intramuros, Manila",
    startTime: "12:00 PM",
    endTime: "3:30 PM",
    mapsLink: "https://maps.google.com/?q=Plaza+San+Luis+Complex+Intramuros",
    note: "Immediately following the ceremony, please join us across the cobblestone street for lunch and fellowship.",
  },

  timeline: {
    sectionTitle: "Celebration Timeline",
    sectionIntro: "Schedule of events for this sacred day",
    items: [
      {
        id: "t1",
        time: "10:00 AM",
        title: "Guest Assembly & Church Prelude",
        description: "Guests and godparents gather in the church nave.",
      },
      {
        id: "t2",
        time: "10:30 AM",
        title: "The Sacrament of Holy Baptism",
        description: "The rite of baptism and sacramental blessings at the font.",
      },
      {
        id: "t3",
        time: "11:30 AM",
        title: "Family & Godparent Portraits",
        description: "Commemorative group photos at the altar of San Agustin.",
      },
      {
        id: "t4",
        time: "12:00 PM",
        title: "Thanksgiving Lunch & Fellowship",
        description: "Welcome toasts and buffet luncheon at La Cocina.",
      },
      {
        id: "t5",
        time: "1:30 PM",
        title: "Dedication Speeches & Blessings",
        description: "Words of wisdom and love from godparents and grandparents.",
      },
      {
        id: "t6",
        time: "2:30 PM",
        title: "Cake Cutting & Sweet Table",
        description: "Dessert service and distribution of baptismal keepsakes.",
      },
    ],
  },

  godparents: {
    groups: [
      {
        id: "ninongs",
        title: "Ninongs (Godfathers)",
        names: [
          { id: "g1", name: "Gabriel Mendoza" },
          { id: "g2", name: "Antonio Ramos" },
          { id: "g3", name: "Mateo Cruz" },
          { id: "g4", name: "Lucas Tan" },
        ],
      },
      {
        id: "ninangs",
        title: "Ninangs (Godmothers)",
        names: [
          { id: "g5", name: "Sophia Bautista" },
          { id: "g6", name: "Chloe Villanueva" },
          { id: "g7", name: "Camila Garcia" },
          { id: "g8", name: "Emma Santos" },
        ],
      },
    ],
  },

  attire: {
    sectionIntro: "We invite our guests to join us in our baptismal color motif.",
    dressCodeNote:
      "Semi-Formal / Sunday Best — Gentle sky tones, light cream, and white. Barong Tagalog, smart collared shirts, or day dresses.",
    colorMotifNote:
      "Our palette is Celestial Sky (#0284C7), Cloud Pearl (#F8FAFC), Frosted Sky (#E0F2FE), and Warm Candlelight Gold (#D97706).",
  },

  extraInfo: {
    sectionTitle: "Guest Information",
    sectionIntro: "Helpful guidance for the christening celebration",
    items: [
      {
        id: "info-1",
        title: "Church Decorum & Reverence",
        details:
          "San Agustin Church is a sacred historical landmark. We kindly request guests to keep phones on silent during the sacramental rite.",
      },
      {
        id: "info-2",
        title: "Parking & Intramuros Access",
        details:
          "Designated guest parking is available at the Plaza San Luis Complex directly across the church. Present your digital invitation to the marshal.",
      },
      {
        id: "info-3",
        title: "Photography & Keepsakes",
        details:
          "An official photographer will capture the ceremony and reception. Photos will be shared with all guests via this website following the event.",
      },
    ],
  },

  rsvp: {
    plusOneEnabled: false,
    companionLimit: 1,
    companionNameEnabled: true,
    companionAgeEnabled: false,
    emailEnabled: true,
    emailRequired: true,
    phoneEnabled: true,
    phoneRequired: false,
    foodAllergiesEnabled: true,
    messageToHostEnabled: true,
    customQuestions: [],
  },

  gifts: {
    sectionIntro: "Your presence and prayers for Liam are the greatest blessings.",
    giftNote:
      "Should you wish to offer a gift, a contribution towards Liam's educational savings fund would be deeply appreciated.",
    options: [
      {
        id: "opt-1",
        title: "GCash Savings",
        image: {
          path: "payment-qr-images/demo.png",
          url: "/template-assets/decorations/qr-demo.svg",
          alt: "GCash QR Code",
        },
      },
      {
        id: "opt-2",
        title: "Bank Deposit (BPI)",
        image: null,
      },
    ],
  },

  guestbook: {
    sectionTitle: "Prayers & Blessings",
    sectionIntro: "Leave a prayer or blessing for Liam as he begins his spiritual journey.",
    emptyStateMessage: "Approved prayers and blessings will appear here soon.",
    messages: [
      {
        id: "1",
        guestName: "Ninong Gabriel & Ninang Sophia",
        message:
          "Dearest Liam, may the Lord shine His face upon you and bless you with wisdom, good health, and peace. We are honored to guide you.",
        submittedAt: "2026-10-20T10:00:00Z",
        approvedAt: "2026-10-20T11:00:00Z",
      },
      {
        id: "2",
        guestName: "Lolo Roberto & Lola Carmen",
        message:
          "Our precious grandson Liam, you bring so much warmth into our hearts. May you always walk in faith and love.",
        submittedAt: "2026-10-22T14:30:00Z",
        approvedAt: "2026-10-22T15:00:00Z",
      },
    ],
  },

  contact: {
    contactPerson: "Juan & Maria Santos",
    contactNumber: "+63 917 555 1234",
    email: "santos.family2026@gmail.com",
    facebookUrl: "",
    instagramUrl: "",
    tikTokUrl: "",
  },

  // Backward-compatible empty stubs for pruned sections
  entourage: { introLine: "", groups: [] },
  sponsors: { introLine: "", names: "" },
  eighteenRosesCandles: { groups: [] },
  debutCourt: { groups: [] },

  sections: [
    { key: "host_info", title: "Child & Parents", enabled: true, content: {} },
    { key: "countdown", title: "Countdown", enabled: true, content: {} },
    { key: "music_effects", title: "Music", enabled: true, content: {} },
    { key: "gallery", title: "Gallery", enabled: true, content: {} },
    { key: "story_message", title: "Parents' Dedication", enabled: true, content: {} },
    { key: "main_event", title: "Ceremony", enabled: true, content: {} },
    { key: "venue", title: "Venue", enabled: true, content: {} },
    { key: "secondary_event", title: "Reception", enabled: true, content: {} },
    { key: "timeline_program", title: "Timeline", enabled: true, content: {} },
    { key: "godparents", title: "Godparents", enabled: true, content: {} },
    { key: "attire_motif", title: "Attire", enabled: true, content: {} },
    { key: "extra_info", title: "Details", enabled: true, content: {} },
    { key: "rsvp_form", title: "RSVP", enabled: true, content: {} },
    { key: "gift_details", title: "Gifts", enabled: true, content: {} },
    { key: "guestbook", title: "Prayers & Blessings", enabled: true, content: {} },
    { key: "contact_socials", title: "Contact", enabled: true, content: {} },
  ],

  orderedSectionKeys: [
    "host_info",
    "countdown",
    "music_effects",
    "gallery",
    "story_message",
    "main_event",
    "venue",
    "secondary_event",
    "timeline_program",
    "godparents",
    "attire_motif",
    "extra_info",
    "rsvp_form",
    "gift_details",
    "guestbook",
    "contact_socials",
  ],

  enabledSectionKeys: [
    "host_info",
    "countdown",
    "music_effects",
    "gallery",
    "story_message",
    "main_event",
    "venue",
    "secondary_event",
    "timeline_program",
    "godparents",
    "attire_motif",
    "extra_info",
    "rsvp_form",
    "gift_details",
    "guestbook",
    "contact_socials",
  ],

  assets: {},
};

export const DEMO_BAPTISM_ENABLED_KEYS = DEMO_BAPTISM_DATA.enabledSectionKeys;
export const demoBaptismData = DEMO_BAPTISM_DATA;

/** Backward-compatible alias for any components/scripts */
export const DEMO_DEBUT_DATA = DEMO_BAPTISM_DATA;
export const demoDebutData = DEMO_BAPTISM_DATA;
