// PLATFORM DATA — KEEP DYNAMIC.
// Complete, generic, fictional demo debut fixture for local design/demo mode.

import type { EventTemplateData } from "./event-template-data";
import { EVENT_WEBSITE_SECTION_CONTRACT_VERSION } from "./contract";

export const DEMO_DEBUT_DATA: EventTemplateData = {
  contractVersion: EVENT_WEBSITE_SECTION_CONTRACT_VERSION,
  source: "demo",
  eventSlug: "sophia-debut-rose-glam",
  eventType: "debut",
  title: "Sophia Marie Reyes — 18th Birthday Grand Cotillion",
  coupleDisplayName: "Sophia Marie Reyes",
  eventDate: "2026-12-14T18:00:00Z",
  eventDateLabel: "December 14, 2026",
  eventTimeLabel: "6:00 PM",
  eventDateTimeLabel: "December 14, 2026 at 6:00 PM",
  rsvpDeadlineLabel: "November 14, 2026",
  timezone: "Asia/Manila",
  publicUrl: "https://webserbisyo.com/r/sophia-debut-rose-glam",

  couple: {
    kind: "debut",
    debutantName: "Sophia Marie Reyes",
    milestone: "18th Birthday",
    displayAs: "Sophia Marie",
    hostLine: "Together with her parents, Mr. & Mrs. Ricardo Reyes",
    shortHostMessage: "Cordially invites you to celebrate her 18th Birthday Grand Cotillion Ball.",
  },

  countdown: {
    title: "Counting Down to Sophia's 18th Birthday",
    shortNote: "Until the grand celebration begins",
  },

  music: {
    musicLink: "https://www.youtube.com/watch?v=cNGjD0VG4R8",
    musicTitle: "A Thousand Years — Christina Perri",
    playButtonLabel: "Play Music",
    shortNote: "A waltz melody for the debutante's grand entrance",
  },

  gallery: {
    sectionTitle: "Growing Up in Grace",
    sectionIntro:
      "A glimpse through Sophia's journey — from childhood memories to this beautiful milestone.",
  },

  ceremony: {
    eventLabel: "Debut Program",
    eventDate: "2026-12-14",
    eventTime: "18:00",
    endTime: "23:00",
    rsvpDeadline: "November 14, 2026",
    scheduleNote: "Please arrive at least 30 minutes before the program begins.",
  },

  venue: {
    venueName: "The Grand Ballroom, Shangri-La at the Fort",
    address: "30th Street corner 5th Avenue, BGC, Taguig City",
    mapsLink: "https://maps.google.com/?q=Shangri-La+at+the+Fort+BGC",
    arrivalNote:
      "Complimentary valet parking is available. Please present your invitation upon arrival.",
  },

  reception: {
    title: "Dinner & After-Party",
    venueName: "The Grand Ballroom, Shangri-La at the Fort",
    address: "30th Street corner 5th Avenue, BGC, Taguig City",
    startTime: "8:30 PM",
    endTime: "11:00 PM",
    mapsLink: "https://maps.google.com/?q=Shangri-La+at+the+Fort+BGC",
    note: "Dinner, speeches, and open dance floor follow the cotillion program.",
  },

  timeline: {
    sectionTitle: "Program Flow",
    sectionIntro: "The evening's program of events",
    items: [
      {
        id: "t1",
        time: "5:30 PM",
        title: "Guest Arrival & Cocktails",
        description: "Welcome drinks and canapés as guests arrive at the grand ballroom foyer.",
      },
      {
        id: "t2",
        time: "6:00 PM",
        title: "Grand Entrance",
        description: "Sophia's grand debut entrance with her parents and escort of honor.",
      },
      {
        id: "t3",
        time: "6:30 PM",
        title: "Cotillion de Honor",
        description: "The debutante's court performs the traditional cotillion waltz.",
      },
      {
        id: "t4",
        time: "7:00 PM",
        title: "18 Roses Waltz",
        description: "Eighteen gentlemen present a rose and share a waltz with the debutante.",
      },
      {
        id: "t5",
        time: "7:45 PM",
        title: "18 Candles & 18 Treasures",
        description:
          "Candle-lighting ceremony with wishes, followed by the presentation of 18 treasures.",
      },
      {
        id: "t6",
        time: "8:30 PM",
        title: "Dinner & Toasts",
        description: "Buffet dinner service with speeches from family and special guests.",
      },
      {
        id: "t7",
        time: "9:30 PM",
        title: "Open Dance Floor & Celebration",
        description: "Music, dancing, photo booth, and celebration until the end of the night.",
      },
    ],
  },

  entourage: {
    introLine: "",
    groups: [],
  },

  sponsors: {
    introLine: "We are grateful for the love and guidance of our honored sponsors.",
    names:
      "Atty. Fernando Reyes & Dr. Isabel Reyes\nMr. Antonio Santos & Mrs. Carmen Santos\nMr. Roberto Cruz & Mrs. Elena Cruz",
  },

  attire: {
    sectionIntro: "We invite you to dress in our debut motif.",
    dressCodeNote:
      "Black Tie / Rose Gold Glamour — Long gowns for ladies, barong or dark suit for gentlemen.",
    colorMotifNote:
      "Our motif colors are Rose Gold (#B76E79), Blush Pink (#F4E0E0), Champagne Gold (#D4AF37), and Deep Plum (#181216). Guests are welcome to complement these tones.",
  },

  extraInfo: {
    sectionTitle: "Good to Know",
    sectionIntro: "Important details for our guests",
    items: [
      {
        id: "info-1",
        title: "Photography & Videography",
        details:
          "An official photo and video team will cover the event. A photo booth will also be available during the reception.",
      },
      {
        id: "info-2",
        title: "Parking",
        details:
          "Complimentary valet parking is available for all guests. Self-parking is accessible at Basement 2.",
      },
      {
        id: "info-3",
        title: "Health & Safety",
        details:
          "Hand sanitation stations will be available. Please inform us of any dietary restrictions in advance.",
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
    sectionIntro: "Your presence at Sophia's debut is the greatest gift of all.",
    giftNote:
      "Should you wish to honor the debutante with a gift, a monetary contribution towards her future goals would be deeply appreciated.",
    options: [
      {
        id: "opt-1",
        title: "GCash",
        image: {
          path: "payment-qr-images/demo.png",
          url: "/template-assets/decorations/qr-demo.svg",
          alt: "GCash QR Code",
        },
      },
      {
        id: "opt-2",
        title: "BDO Bank Transfer",
        image: null,
      },
    ],
  },

  guestbook: {
    sectionTitle: "Debut Wishes",
    sectionIntro: "Leave a warm message for our debutante.",
    emptyStateMessage: "Approved guest wishes will appear here soon.",
    messages: [
      {
        id: "1",
        guestName: "Tita Isabel & Tito Fernando",
        message:
          "Sophia, you are a blessing to our family. Wishing you a life filled with grace, joy, and endless possibilities. Happy 18th!",
        submittedAt: "2026-10-15T10:00:00Z",
        approvedAt: "2026-10-15T12:00:00Z",
      },
      {
        id: "2",
        guestName: "Angela & Marco",
        message:
          "Happy 18th, Soph! Can't wait to dance the night away at your grand ball. You deserve the world!",
        submittedAt: "2026-10-20T14:30:00Z",
        approvedAt: "2026-10-20T15:00:00Z",
      },
    ],
  },

  story: {
    storyTitle: "A Journey to 18",
    sectionIntro: "A reflection on Sophia's journey to this beautiful milestone",
    storyBody:
      "From her first steps in the family garden to gracefully navigating high school, Sophia has grown into a young woman of quiet strength and radiant kindness. Her parents, Ricardo and Carmela, are overjoyed to celebrate this milestone — a tribute to faith, family, and the beautiful journey ahead.",
  },

  contact: {
    contactPerson: "Ricardo & Carmela Reyes",
    contactNumber: "+63 917 890 1234",
    email: "sophiadebut2026@gmail.com",
    facebookUrl: "https://facebook.com/sophia.debut2026",
    instagramUrl: "https://instagram.com/sophia.debut2026",
    tikTokUrl: "",
  },

  // ---------------------------------------------------------------------------
  // Debut-Specific Sections
  // ---------------------------------------------------------------------------

  eighteenRosesCandles: {
    groups: [
      {
        id: "roses",
        title: "18 Roses",
        kind: "roses",
        entries: [
          { id: "r1", name: "Papa Ricardo Reyes", message: "For being my first love and hero" },
          { id: "r2", name: "Lolo Antonio Reyes", message: "For your wisdom and prayers" },
          { id: "r3", name: "Tito Fernando Santos", message: "For always believing in me" },
          { id: "r4", name: "Tito Roberto Cruz", message: "For the life lessons and laughter" },
          { id: "r5", name: "Kuya Miguel Reyes", message: "For being the best big brother" },
          { id: "r6", name: "Marco Dela Cruz", message: "For your friendship and kindness" },
          { id: "r7", name: "Daniel Lim", message: "For cheering me on in every endeavor" },
          { id: "r8", name: "Gabriel Santos", message: "For the adventures and memories" },
          { id: "r9", name: "Ramon Mendoza", message: "For your encouragement and support" },
          { id: "r10", name: "Joshua Tan", message: "For the laughter and late-night talks" },
          { id: "r11", name: "Nathan Reyes", message: "For being my confidant and cousin" },
          { id: "r12", name: "Carlos Garcia", message: "For the study sessions and dreams" },
          { id: "r13", name: "Paolo Villanueva", message: "For the music and friendship" },
          { id: "r14", name: "Luis Bautista", message: "For always having my back" },
          { id: "r15", name: "Kevin Morales", message: "For making every moment fun" },
          { id: "r16", name: "Adrian Torres", message: "For the shared passions and creativity" },
          { id: "r17", name: "John Patrick Uy", message: "For your genuine heart and support" },
          { id: "r18", name: "Andrei Rivera", message: "For walking beside me on this journey" },
        ],
      },
      {
        id: "candles",
        title: "18 Candles",
        kind: "candles",
        entries: [
          { id: "c1", name: "Mama Carmela Reyes", message: "For being my light and guide" },
          { id: "c2", name: "Lola Maria Santos", message: "For your unconditional love" },
          { id: "c3", name: "Tita Isabel Reyes", message: "For being my second mother" },
          { id: "c4", name: "Tita Carmen Santos", message: "For your warmth and generosity" },
          { id: "c5", name: "Tita Elena Cruz", message: "For the prayers and blessings" },
          { id: "c6", name: "Ate Patricia Reyes", message: "For being my role model" },
          { id: "c7", name: "Angela Dela Cruz", message: "For the sisterhood and trust" },
          { id: "c8", name: "Isabelle Lim", message: "For the shared dreams and goals" },
          { id: "c9", name: "Beatrice Santos", message: "For always making me smile" },
          { id: "c10", name: "Christine Tan", message: "For the late-night heart-to-hearts" },
          { id: "c11", name: "Diana Mendoza", message: "For your loyalty and friendship" },
          { id: "c12", name: "Elaine Garcia", message: "For the adventures together" },
          { id: "c13", name: "Francesca Villanueva", message: "For the music and dance" },
          { id: "c14", name: "Grace Bautista", message: "For your positivity and energy" },
          { id: "c15", name: "Hannah Morales", message: "For always being there" },
          { id: "c16", name: "Julia Torres", message: "For the creative collaborations" },
          { id: "c17", name: "Katherine Uy", message: "For your encouragement and faith" },
          { id: "c18", name: "Ms. Rosario Navarro", message: "For inspiring me to dream bigger" },
        ],
      },
      {
        id: "treasures",
        title: "18 Treasures",
        kind: "treasures",
        entries: [
          { id: "tr1", name: "Papa Ricardo Reyes", message: "A journal — to write your own story" },
          { id: "tr2", name: "Mama Carmela Reyes", message: "A rosary — for faith and strength" },
          { id: "tr3", name: "Lolo Antonio Reyes", message: "A watch — treasure every moment" },
          { id: "tr4", name: "Lola Maria Santos", message: "A necklace — a symbol of elegance" },
          { id: "tr5", name: "Tita Isabel Reyes", message: "A book — knowledge is your wealth" },
          {
            id: "tr6",
            name: "Tito Fernando Santos",
            message: "A pen — sign your future with confidence",
          },
          { id: "tr7", name: "Ate Patricia Reyes", message: "A photo album — hold on to memories" },
          { id: "tr8", name: "Kuya Miguel Reyes", message: "A travel voucher — explore the world" },
          {
            id: "tr9",
            name: "Angela Dela Cruz",
            message: "A charm bracelet — for every milestone",
          },
          { id: "tr10", name: "Isabelle Lim", message: "A perfume — grace in every room" },
          { id: "tr11", name: "Marco Dela Cruz", message: "A music box — let your melody play on" },
          { id: "tr12", name: "Daniel Lim", message: "A globe — the world is yours" },
          { id: "tr13", name: "Gabriel Santos", message: "A sketch pad — create your masterpiece" },
          { id: "tr14", name: "Tita Carmen Santos", message: "A ring — a circle of love" },
          { id: "tr15", name: "Tita Elena Cruz", message: "A scarf — warmth in every season" },
          { id: "tr16", name: "Ms. Rosario Navarro", message: "A planner — design your destiny" },
          {
            id: "tr17",
            name: "Tito Roberto Cruz",
            message: "A savings bond — invest in your dreams",
          },
          { id: "tr18", name: "Family Reyes", message: "An heirloom — the legacy continues" },
        ],
      },
    ],
  },

  debutCourt: {
    groups: [
      {
        id: "court-ladies",
        title: "Ladies of the Court",
        names: [
          { id: "cl1", name: "Angela Dela Cruz" },
          { id: "cl2", name: "Isabelle Lim" },
          { id: "cl3", name: "Beatrice Santos" },
          { id: "cl4", name: "Christine Tan" },
          { id: "cl5", name: "Diana Mendoza" },
          { id: "cl6", name: "Elaine Garcia" },
          { id: "cl7", name: "Francesca Villanueva" },
          { id: "cl8", name: "Grace Bautista" },
          { id: "cl9", name: "Hannah Morales" },
        ],
      },
      {
        id: "court-escorts",
        title: "Escorts",
        names: [
          { id: "ce1", name: "Marco Dela Cruz" },
          { id: "ce2", name: "Daniel Lim" },
          { id: "ce3", name: "Gabriel Santos" },
          { id: "ce4", name: "Ramon Mendoza" },
          { id: "ce5", name: "Joshua Tan" },
          { id: "ce6", name: "Nathan Reyes" },
          { id: "ce7", name: "Carlos Garcia" },
          { id: "ce8", name: "Paolo Villanueva" },
          { id: "ce9", name: "Luis Bautista" },
        ],
      },
    ],
  },

  godparents: {
    groups: [],
  },

  // ---------------------------------------------------------------------------
  // Sections, Ordering & Enablement
  // ---------------------------------------------------------------------------

  sections: [
    { key: "host_info", title: "Debutant", enabled: true, content: {} },
    { key: "countdown", title: "Countdown", enabled: true, content: {} },
    { key: "music_effects", title: "Music", enabled: true, content: {} },
    { key: "gallery", title: "Gallery", enabled: true, content: {} },
    { key: "story_message", title: "Debutant Story", enabled: true, content: {} },
    { key: "main_event", title: "Debut Program", enabled: true, content: {} },
    { key: "venue", title: "Venue", enabled: true, content: {} },
    { key: "secondary_event", title: "After-Party", enabled: true, content: {} },
    { key: "timeline_program", title: "Program Flow", enabled: true, content: {} },
    { key: "eighteen_roses_candles", title: "18 Traditions", enabled: true, content: {} },
    { key: "debut_court", title: "Debut Court", enabled: true, content: {} },
    { key: "principal_sponsors", title: "Special Sponsors", enabled: true, content: {} },
    { key: "attire_motif", title: "Dress Code", enabled: true, content: {} },
    { key: "extra_info", title: "Details", enabled: true, content: {} },
    { key: "rsvp_form", title: "RSVP", enabled: true, content: {} },
    { key: "gift_details", title: "Gifts", enabled: true, content: {} },
    { key: "guestbook", title: "Debut Wishes", enabled: true, content: {} },
    { key: "contact_socials", title: "Contact", enabled: true, content: {} },
    { key: "entourage", title: "Entourage", enabled: false, content: {} },
    { key: "godparents", title: "Godparents", enabled: false, content: {} },
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
    "eighteen_roses_candles",
    "debut_court",
    "principal_sponsors",
    "attire_motif",
    "extra_info",
    "rsvp_form",
    "gift_details",
    "guestbook",
    "contact_socials",
    "entourage",
    "godparents",
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
    "eighteen_roses_candles",
    "debut_court",
    "principal_sponsors",
    "attire_motif",
    "extra_info",
    "rsvp_form",
    "gift_details",
    "guestbook",
    "contact_socials",
  ],

  assets: {},
};

export const DEMO_DEBUT_ENABLED_KEYS = DEMO_DEBUT_DATA.enabledSectionKeys;
export const demoDebutData = DEMO_DEBUT_DATA;
