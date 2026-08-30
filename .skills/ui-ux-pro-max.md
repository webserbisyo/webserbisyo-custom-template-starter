# UI/UX PRO MAX — DESIGN INTELLIGENCE & AESTHETIC RIGOR

This document defines visual engineering, typography scales, contrast guarantees, and interaction physics for WebSerbisyo Custom Event Template Starters.

---

## 1. CORE PHILOSOPHY & PALETTE ARCHITECTURE (60 / 30 / 10 RULE)

1. **60% Dominant Base Surface:**
   - Large canvas backgrounds and paper stationeries (`--event-bg`, `--wedding-bg`, `--event-surface`).
   - Sets atmospheric tone without overwhelming readability.
2. **30% Secondary Brand Structure:**
   - Structural bands, card enclosures, side rails, navigation bars, and section dividers (`--event-surface-alt`, `--wedding-surface-alt`, `--event-border`).
3. **10% High-Energy Accent & Action:**
   - Primary interactive triggers, countdown digits, archival stamp folios, and keyframe glows (`--event-primary`, `--event-accent`, `--event-accent-strong`).

---

## 2. FLUID TYPOGRAPHY & LETTER-TRACKING RULES

### Fluid Clamp Scales

All typography roles must use fluid viewport clamps:

- **Hero Display:** `clamp(2.25rem, 5.5vw, 4.25rem)` (Line-height: `0.95` - `1.08`).
- **Major Section Headings:** `clamp(1.875rem, 4.5vw, 3.25rem)` (Line-height: `1.0` - `1.15`).
- **Standard Headings:** `clamp(1.5rem, 3vw, 2.25rem)` (Line-height: `1.1` - `1.2`).
- **Quiet Headings:** `clamp(1.35rem, 2.5vw, 1.875rem)` (Line-height: `1.2` - `1.25`).
- **Lead Prose:** `clamp(1rem, 1.8vw, 1.125rem)` (Line-height: `1.6` - `1.65`).
- **Body Baseline:** `1rem` (16px absolute mobile floor for zero iOS auto-zoom on inputs).

### Letter-Tracking Mandates

- **Condensed Display Fonts (`Bebas Neue`):**
  - Headings tracking: `letter-spacing: 0.04em;` to `0.08em;`.
  - Badges / stamps tracking: `0.12em;` to `0.16em;` with `text-transform: uppercase;`.
- **Editorial Serif Display Fonts (`Playfair Display`):**
  - Tight tracking: `letter-spacing: -0.02em;` to `-0.01em;` for crisp elegance.
- **Monospace Metadata & Ledger Tags (`ui-monospace`):**
  - Expanded tracking: `letter-spacing: 0.16em;` to `0.18em;` with `font-weight: 700;`.

---

## 3. WCAG AA / AAA CONTRAST & ANTI-HALATION POLICIES

1. **Light Text on Dark Surfaces:**
   - Text on dark canvases must achieve at least **7.0:1 (AAA)** for body text and **4.5:1 (AA)** for headings.
   - Example: `#f8fafc` on `#0f172a` (15.8:1) or `#fffdf7` on `#304438` (11.2:1).
2. **Gold / Accent Text Legibility:**
   - Standard gold (`#c9a86a` / `#f59e0b`) must NEVER be placed raw on white/cream paper.
   - Use high-contrast variants (`--wedding-accent-strong: #8f6a2c` -> 5.8:1 on `#f7f4ea`) or enclose inside dark badges.
3. **Solid Enclosures:**
   - Text must sit on a verified solid canvas or backdrop-filtered card (`.comic-card`, `.glass-stationery`).

---

## 4. COMPONENT PHYSICS & INTERACTION POLICIES

- **Floating QuickDock & Audio Controls:**
  - Floats at `calc(env(safe-area-inset-bottom) + 1.25rem)`.
  - Spring transitions: `cubic-bezier(0.16, 1, 0.3, 1)` or duration `200ms` ease-out.
- **Elevation Physics:**
  - **Comic Paper:** Zero-blur hard ink shadows (`6px 6px 0px #0f172a`). Hover translates `-2px, -2px` with expanded shadow (`8px 8px 0px #0f172a`).
  - **Estate Stationery:** Soft diffused elevation (`0 4px 12px -2px rgba(36, 52, 44, 0.06)`). Hover translates `-2px` with smooth shadow spread.
- **Micro-Animations:**
  - Subtle scale on active buttons (`active:scale-95`).
  - Enforce `prefers-reduced-motion` compliance for ambient particle emitters (petals, electric dividers).
