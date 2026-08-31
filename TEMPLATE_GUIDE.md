# WebSerbisyo Custom Birthday Template Starter — Authoring Guide

Welcome to the WebSerbisyo Custom Birthday Template Starter (`starter-birthday-avengers-10th`). This document explains how designers and AI coding tools can customize birthday templates safely while preserving protected platform capabilities.

---

## 1. Protected Boundaries (`src/platform/`)

**DO NOT MODIFY** files inside `src/platform/` during standard template authoring.

The `src/platform/` directory handles:

- Global platform contract knowledge (20 canonical section keys)
- Event data loading and normalization (`load-event.ts`, `normalize-event.ts`)
- Demo vs. Connected mode state management (`demo-event.ts`, `preview-context.ts`)
- Dynamic section visibility and section ordering (`section-visibility.ts`, `contract.ts`)
- RSVP submission handling and platform API calls (`submit-rsvp.ts`)
- Type definitions (`event-template-data.ts`)

The **Birthday Template Registry** (`src/template/section-registry.tsx`) registers exactly **16 Birthday-applicable renderers**. Disallowed sections for Birthday (`entourage`, `eighteen_roses_candles`, `debut_court`, `godparents`) are excluded from the birthday starter.

---

## 2. Asset & Data Ownership

| Asset / Feature        | Data / Asset Source        | Ownership & Location                           |
| ---------------------- | -------------------------- | ---------------------------------------------- |
| **Hero Photo**         | Local artwork              | `public/template-assets/photos/hero/`          |
| **Gallery Photos**     | Local/manual client photos | `public/template-assets/photos/gallery/`       |
| **Story Photos**       | Local/manual client photos | `public/template-assets/photos/story/`         |
| **Venue Photo**        | Local artwork              | `public/template-assets/photos/venue/`         |
| **Attire Swatches**    | Local design palette       | `src/template/template.config.ts`              |
| **Gift QR Images**     | Platform API               | Public HTTP URL from platform dashboard        |
| **Special Sponsors**   | Platform API               | `principal_sponsors.names` (Honorary VIPs)     |
| **Private Access**     | Platform URL parameter     | `?access=<token>`                              |
| **Guestbook Messages** | Platform API               | Approved messages included in `PublicEventDto` |
| **Gift Options**       | Platform API               | Maximum 2 options                              |

> **Attire Guardrail Note**:
> Attire swatches/illustrations are template-local (`template.config.ts` / CSS). Update them to match the celebrant's approved motif before publishing. The connected `colorMotifNote` and `dressCodeNote` remain separate platform data and must remain visible.

---

## 3. Design Freely (`src/template/` & `public/template-assets/`)

You are encouraged to completely reimagine and redesign everything inside:

- `src/template/sections/` — Section UI components (16 Birthday sections)
- `src/template/components/` — Headers, footers, navigation, identity marks, quick dock, sitemap drawer
- `src/template/styles/` — Colors, typography, motion, geometry tokens
- `public/template-assets/` — Local artwork, photos, icons, backgrounds

---

## 4. Semantic Designer Contracts (16 Birthday Sections)

You may completely redesign any section visually, but preserve its connected semantic responsibilities:

1. **`host_info` (Celebrant)**: MUST preserve `celebrantName` / `groomName`, `displayAs`, `hostLine`, `shortHostMessage`. Single-host identity mark `M • 10` is derived dynamically.
2. **`countdown`**: MUST preserve `title`, `shortNote`. Target time is derived from main event date/time.
3. **`music_effects`**: MUST remain a real in-page section in normal document flow. MUST preserve `musicTitle`, `shortNote`, `playButtonLabel`, `musicLink`. Controlled via shared `AudioProvider`.
4. **`gallery`**: MUST preserve `sectionTitle`, `sectionIntro`. Photos come from local `templateAssets.photos.gallery`.
5. **`story_message`**: MUST preserve `storyTitle`, `sectionIntro`, `storyBody`.
6. **`main_event` (Party Program)**: MUST preserve `eventLabel`, `eventDate`, `eventTime`, `endTime`, `scheduleNote`, and `rsvpDeadline`.
7. **`venue`**: MUST preserve `venueName`, `address`, `arrivalNote`, `mapsLink`. Local photo in `templateAssets`.
8. **`secondary_event` (After-Party / Dinner)**: MUST preserve `title`, `venueName`, `address`, `startTime`, `endTime`, `mapsLink`, `note`. Date display derived from `main_event`.
9. **`timeline_program`**: MUST preserve `items` (`id`, `time`, `title`, `description`) in source order. Handles 0/1/few/many items.
10. **`principal_sponsors`**: MUST preserve `introLine`, `names` in canonical order.
11. **`attire_motif`**: MUST preserve `sectionIntro`, `dressCodeNote`, `colorMotifNote`. Swatches configured in `templateConfig.palette`.
12. **`extra_info`**: MUST preserve `sectionTitle`, `sectionIntro`, and `items` (`id`, `title`, `details`).
13. **`rsvp_form`**: MUST preserve all enabled fields (`companionLimit`, `companionNameEnabled`, food allergies, message). Submits through `submitRsvp()`.
14. **`gift_details`**: MUST preserve `sectionIntro`, `giftNote`, and max 2 options (`id`, `title`, `image.url`). Never exposes internal file paths.
15. **`guestbook`**: MUST display approved DTO messages and `emptyStateMessage`. No direct public posting.
16. **`contact_socials`**: MUST preserve all populated contact fields (`contactPerson`, `contactNumber`, `email`, Facebook, Instagram, TikTok). Rendered in Footer and filtered from in-flow `<main>`.

---

## 5. Canonical Event Navigation Model

All navigation surfaces (Top Navbar, Floating Quick Dock, More Drawer) derive from a single navigation model generated by `buildEventNavigation(data)` in `src/template/navigation/event-navigation.ts`.

- **Disabled Section Rule**: Any section turned OFF in dashboard is automatically absent from Top Navbar, Quick Dock, and More Drawer.
- **Completeness Rule**: Every enabled navigable section is discoverable through either Primary TopNav or the More Drawer.

---

## 6. Dynamic Host Identity & Formatting

### Monogram & Names

```tsx
import { deriveHostIdentity } from "@/template/utils/host-identity";

const identity = deriveHostIdentity(
  data.couple?.groomName,
  data.couple?.brideName,
  data.coupleDisplayName
);
// identity.monogram -> "M"
// identity.compactMonogram -> "M"
// identity.displayName -> "Michael"
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

formatEventDateLong("2026-09-20"); // "Sunday, September 20, 2026"
formatTimeRange("14:00", "15:30"); // "2:00 PM – 3:30 PM"
formatRsvpDeadline("2026-09-10T23:59"); // "September 10, 2026 at 11:59 PM"
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

- `npm run check:template`: Verifies 16-birthday section registry, contract version, demo data, and platform core integrity.
- `npm run verify`: Runs contract check, typecheck, and formatting check.
- `npm run build`: Runs `verify` (prebuild) then `next build`. Offline-safe, no live network required.
- `npm run verify:connection`: Read-only health check for configured live WebSerbisyo API event.
