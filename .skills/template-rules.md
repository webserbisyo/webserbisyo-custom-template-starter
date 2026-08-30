# WEBSERBISYO CUSTOM TEMPLATE CONTRACT STANDARDS

Authoritative specification for WebSerbisyo Event Website Section Contracts (V1).

---

## 1. CONTRACT ARCHITECTURE (VERSION 1)

- **Total Global Registered Sections:** 20 sections defined in `src/platform/contract.ts`.
- **Applicable Template Sections:** Exactly 17 sections rendered by each template starter:
  1. `host_info` (Couple / Host identity and hero message)
  2. `countdown` (Target date/time countdown clock)
  3. `music_effects` (Ambient background audio / YouTube bridge)
  4. `gallery` (Curated photo grid & modal preview)
  5. `main_event` (Ceremony / Birthday main program date, time, venue)
  6. `venue` (Venue details, address, Google Maps link, arrival notes)
  7. `secondary_event` (Reception / After-party details)
  8. `timeline_program` (Chronological itinerary items)
  9. `entourage` (Entourage / Squad groupings)
  10. `principal_sponsors` (Godparents / Principal sponsors)
  11. `attire_motif` (Dress code, style guidelines, color palette swatches)
  12. `extra_info` (FAQ, accommodations, reminders)
  13. `rsvp_form` (Interactive RSVP submission with companion limits)
  14. `gift_details` (Gift registry / QR code options, max 2 options)
  15. `guestbook` (Public well-wishes and messages)
  16. `story_message` (Couple love story / Birthday message)
  17. `contact_socials` (Contact info & social links)

---

## 2. STRICT PLATFORM ISOLATION RULES

1. **Zero Database / Supabase Clients in Template Components:**
   - Template components in `src/template/` must NEVER import `@supabase/supabase-js` or invoke `createClient()`.
   - Data is loaded in `src/platform/load-event.ts` and normalized via `src/platform/normalize-event.ts`.
2. **RSVP & Form Submissions:**
   - Submissions must use `src/platform/submit-rsvp.ts`.
   - Direct database insertions or custom raw API fetch calls inside section renderers are strictly prohibited.
3. **Single Footer Placement for `contact_socials`:**
   - `contact_socials` is rendered exclusively within the global footer shell.
   - `TemplateRenderer.tsx` must filter out `contact_socials` from the in-flow `<main>` loop to prevent duplicate cards.

---

## 3. CANONICAL NAVIGATION RESOLUTION

- Navigation models must be constructed via `buildWeddingNavigation()` / `buildEventNavigation()`.
- Route-aware href resolution:
  - Root route (`/`): Anchor links resolve directly (e.g., `#timeline_program`).
  - Sub-route (e.g., `/rsvp`): Anchor links resolve with leading slash (e.g., `/#timeline_program`).
- Navigation links for empty or disabled sections must be completely suppressed (zero dead links).
