# WebSerbisyo Custom Debut Template Starter — Authoring Guide

Welcome to the WebSerbisyo Custom Debut Template Starter (`starter-debut-rose-glam`). This document explains how designers and AI coding tools can customize debut templates safely while preserving protected platform capabilities.

---

## 1. Protected Boundaries (`src/platform/`)

**DO NOT MODIFY** files inside `src/platform/` during standard template authoring.

The `src/platform/` directory handles:

- Global platform contract knowledge (20 canonical section keys)
- Event data loading and normalization (`load-event.ts`, `normalize-event.ts`)
- Demo vs. Connected mode state management (`demo-debut.ts`, `preview-context.ts`)
- Dynamic section visibility and section ordering (`section-visibility.ts`, `contract.ts`)
- RSVP submission handling and platform API calls (`submit-rsvp.ts`)
- Type definitions (`event-template-data.ts`)

The **Debut Template Registry** (`src/template/section-registry.tsx`) registers exactly **18 Debut-applicable renderers**. Disallowed sections for Debut (`entourage`, `godparents`) are excluded from the debut starter.

---

## 2. Asset & Data Ownership

| Asset / Feature        | Data / Asset Source        | Ownership & Location                             |
| ---------------------- | -------------------------- | ------------------------------------------------ |
| **Hero Photo**         | Local artwork              | `public/template-assets/photos/hero/`            |
| **Gallery Photos**     | Local/manual client photos | `public/template-assets/photos/gallery/`         |
| **Story Photos**       | Local/manual client photos | `public/template-assets/photos/story/`           |
| **Venue Photo**        | Local artwork              | `public/template-assets/photos/venue/`           |
| **Attire Swatches**    | Local design palette       | `src/template/template.config.ts`                |
| **Gift QR Images**     | Platform API               | Public HTTP URL from platform dashboard          |
| **18 Traditions**      | Platform API               | `eighteen_roses_candles.groups` (Roses, Candles) |
| **Debut Court**        | Platform API               | `debut_court.groups` (Ladies of Honor, Escorts)  |
| **Special Sponsors**   | Platform API               | `principal_sponsors.names` (Honorary VIPs)       |
| **Private Access**     | Platform URL parameter     | `?access=<token>`                                |
| **Guestbook Messages** | Platform API               | Approved messages included in `PublicEventDto`   |
| **Gift Options**       | Platform API               | Maximum 2 options                                |

> **Attire Guardrail Note**:
> Attire swatches/illustrations are template-local (`template.config.ts` / CSS). Update them to match the debutante's approved motif before publishing. The connected `colorMotifNote` and `dressCodeNote` remain separate platform data and must remain visible.

---

## 3. Design Freely (`src/template/` & `public/template-assets/`)

You are encouraged to completely reimagine and redesign everything inside:

- `src/template/sections/` — Section UI components (18 Debut sections)
- `src/template/components/` — Headers, footers, navigation, identity marks, quick dock, sitemap drawer
- `src/template/styles/` — Colors, typography, motion, geometry tokens
- `public/template-assets/` — Local artwork, photos, icons, backgrounds

---

## 4. Semantic Designer Contracts (18 Debut Sections)

You may completely redesign any section visually, but preserve its connected semantic responsibilities:

1. **`host_info` (Debutant Info)**: MUST preserve `debutantName`, `milestone`, `displayAs`, `hostLine`, `shortHostMessage`. May customize hero background/layout. Dynamic monogram `S • 18` is derived.
2. **`countdown`**: MUST preserve `title`, `shortNote`. Target time is derived from debut program date/time.
3. **`music_effects`**: MUST remain a real in-page section in normal document flow. MUST preserve `musicTitle`, `shortNote`, `playButtonLabel`, `musicLink`. Controlled via shared `AudioProvider`.
4. **`gallery`**: MUST preserve `sectionTitle`, `sectionIntro`. Photos come from local `templateAssets.photos.gallery`.
5. **`story_message` (Debutant Story)**: MUST preserve `storyTitle`, `sectionIntro`, `storyBody`.
6. **`main_event` (Debut Program)**: MUST preserve `eventLabel`, `eventDate`, `eventTime`, `endTime`, `scheduleNote`, and `rsvpDeadline`.
7. **`venue`**: MUST preserve `venueName`, `address`, `arrivalNote`, `mapsLink`. Local photo in `templateAssets`.
8. **`secondary_event` (Reception)**: MUST preserve `title`, `venueName`, `address`, `startTime`, `endTime`, `mapsLink`, `note`. Date display derived from `main_event`.
9. **`timeline_program`**: MUST preserve `items` (`id`, `time`, `title`, `description`) in source order. Handles 0/1/few/many items.
10. **`eighteen_roses_candles`**: MUST preserve `groups` (`id`, `title`, `kind`, `entries`). Renders 18 Roses, 18 Candles, 18 Treasures with personal dedications.
11. **`debut_court`**: MUST preserve `groups` (`id`, `title`, `names`). Renders Ladies of Honor, Escorts, and Cotillion participants.
12. **`principal_sponsors`**: MUST preserve `introLine`, `names` in canonical order without inventing pairs.
13. **`attire_motif`**: MUST preserve `sectionIntro`, `dressCodeNote`, `colorMotifNote`. Swatches configured in `templateConfig.palette`.
14. **`extra_info`**: MUST preserve `sectionTitle`, `sectionIntro`, and `items` (`id`, `title`, `details`).
15. **`rsvp_form`**: MUST preserve all enabled fields (`companionLimit`, `companionNameEnabled`, food allergies, message). Submits through `submitRsvp()`.
16. **`gift_details`**: MUST preserve `sectionIntro`, `giftNote`, and max 2 options (`id`, `title`, `image.url`). Never exposes internal file paths.
17. **`guestbook`**: MUST display approved DTO messages and `emptyStateMessage`. No direct public posting.
18. **`contact_socials`**: MUST preserve all populated contact fields (`contactPerson`, `contactNumber`, `email`, Facebook, Instagram, TikTok).

---

## 5. Canonical Debut Navigation Model

All navigation surfaces (Top Navbar, Floating Quick Dock, More Drawer) derive from a single navigation model generated by `buildEventNavigation(data)` in `src/template/navigation/event-navigation.ts`.

- **Disabled Section Rule**: Any section turned OFF in dashboard is automatically absent from Top Navbar, Quick Dock, and More Drawer.
- **Completeness Rule**: Every enabled navigable section is discoverable through either Primary TopNav or the More Drawer.
- **Folio Structure**: The More Drawer groups Debut sections into 3 structured Folios:
  - **Folio 01: Celebration** (Home, Countdown, Music, Gallery, Story & Journey)
  - **Folio 02: Debut Program & Traditions** (Debut Program, Venue, Reception, Program Flow, 18 Traditions, Debut Court, Special Sponsors)
  - **Folio 03: Guest Essentials & Actions** (Dress Code, Details & FAQ, RSVP, Gifts, Debut Wishes, Contact)

---

## 6. Dynamic Host Identity & Formatting

### Monogram & Celebrant Identity

```tsx
import { deriveHostIdentity, getSingleHostFirstName } from "@/template/utils/host-identity";

const identity = deriveHostIdentity(
  undefined,
  undefined,
  data.couple?.debutantName || data.coupleDisplayName
);
// identity.monogram -> "S"
// identity.compactMonogram -> "S"
// getSingleHostFirstName(identity.displayName) -> "Sophia"
```

### Date & Time Formatting

```tsx
import {
  formatEventDateLong,
  formatEventDateShort,
  formatEventTime,
  formatTimeRange,
  formatRsvpDeadline,
  formatGuestbookDate,
} from "@/template/utils/event-formatting";

formatEventDateLong("2027-04-19"); // "Monday, April 19, 2027"
formatTimeRange("16:00", "17:30"); // "4:00 PM – 5:30 PM"
formatRsvpDeadline("2027-03-07T23:59"); // "March 7, 2027 at 11:59 PM"
```

---

## 7. Development Workflow & Commands

1. **Local Design**: `npm run dev` (edit `src/template/`, add assets to `public/template-assets/`)
2. **Format Code**: `npm run format`
3. **Contract Check**: `npm run check:template`
4. **Full Prebuild Verification**: `npm run verify`
5. **Production Build**: `npm run build`
6. **Live Connection Verification**: `npm run verify:connection` (read-only verification)

### Commands Summary

- `npm run check:template`: Verifies 18-debut section registry, contract version, demo data, and platform core integrity.
- `npm run verify`: Runs contract check, typecheck, and formatting check.
- `npm run build`: Runs `verify` (prebuild) then `next build`. Offline-safe, no live network required.
- `npm run verify:connection`: Read-only health check for configured live WebSerbisyo API event.
