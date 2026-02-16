# 99Ravens Design System — Web Implementation Reference

**Last updated: Feb 2026**
**Canonical source for brand fundamentals:** `REBUILD-DOCS/99Ravens_Design_System (2).md`

This document maps the brand design system to the actual CSS implementation on the live site. Use this alongside the Theme Guide (`THEME-GUIDE.md`) when designing new pages.

---

## Color Palette

All values pixel-sampled from the Underline Studio brand book.

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-paper` | `#EBEBE2` | Primary background — warm off-white |
| `--color-sage` | `#D2D0BD` | Secondary surface — sidebar backgrounds |
| `--color-orange` | `#F66302` | Primary accent — CTAs, links, active states |
| `--color-blue` | `#058FF7` | Accent — "For Brands" section color |
| `--color-lavender` | `#BAADD4` | Accent — "For Builders" section color |
| `--color-gold` | `#FFAF11` | Accent highlight — "For Experts" section, notification badge |
| `--color-menu-gold` | `#C8A84E` | Menu overlay background |
| `--color-black` | `#000000` | Borders, dark surfaces, notification strip |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#1A1A1A` | Headings, primary body text |
| `--text-dim` | `#4A4A4A` | Descriptions, secondary text |
| `--text-muted` | `#7A7A7A` | Labels, metadata, placeholders |
| `--text-inverse` | `#FFFFFF` | Text on dark/black surfaces |

### Surface-to-Text Rule

The surface determines text color, not the component type.

| Surface | Text color |
|---------|-----------|
| Paper, Sage | `--text-primary` / `--text-dim` / `--text-muted` |
| Orange, Blue, Gold, Lavender | `--text-primary` (`#1A1A1A`) |
| Black | `--text-inverse` (`#FFFFFF`) |

### Color as Mood

Colors are atmospheric, not decorative. When a color appears, it commits to the full surface.

| Color | Register | Tendency |
|-------|----------|----------|
| Paper | Intellectual, restrained | Default. Thinking, reading. |
| Sage | Grounded, archival | Supporting surfaces, sidebars. |
| Orange | Bold, conclusive | CTAs, closings, final statements. |
| Blue | Authoritative, evidentiary | Proof, data, sourced quotes. |
| Lavender | Human, approachable | People, methodology. |
| Gold | Alerting, highlighting | Notifications, new markers. |
| Black | Definitive, anchoring | Inverse blocks, dark sections, footers. |

---

## Typography

### Three-Layer Type System

| Layer | Font Family | CSS Token | Role |
|-------|-------------|-----------|------|
| 1 — Display | ES Klarheit Kurrent | `--font-display` | Prestige headlines, hero statements |
| 2 — Workhorse | Space Mono | `--font-mono` | Brand voice — labels, UI, nav, descriptions, CTAs |
| 3 — Reading | ES Klarheit Grotesk | `--font-sans` | Body text, articles, nav titles, section titles |

### Layer 1 — Display (ES Klarheit Kurrent)
- **Weights:** 200 italic, 400 regular, 700 bold
- **Use for:** Hero headlines, section subtitles, panel hero text
- **Sizing:** `clamp(3.5rem, 7.5vw, 7rem)` hero; `clamp(2.4rem, 4.5vw, 4.2rem)` section subtitles
- **Letter spacing:** `-0.02em` to `-0.035em`
- **Line height:** `0.98` – `1.15`

### Layer 2 — Workhorse (Space Mono)
- **Weights:** 400, 700, 400 italic
- **Use for:** All labels, nav items, CTAs, descriptions, metadata, numbers, prefixes
- **Sizing:** `0.55rem` – `0.85rem`
- **Letter spacing:** `0.1em` – `0.15em` (uppercase labels); `0.02em` – `0.03em` (body)
- **Line height:** `1.5` – `1.8`
- **Rule:** Always uppercase for labels and CTAs (`text-transform: uppercase`)

### Layer 3 — Reading (ES Klarheit Grotesk)
- **Weights:** 400 regular, 500 italic
- **Use for:** Longer body text, blog content, nav overlay links, section sidebar titles
- **Sizing:** `0.95rem` – `1.1rem` body; `clamp(2rem, 4vw, 3.2rem)` nav overlay
- **Line height:** `1.3` titles, `1.6` – `1.8` body

### Font Loading
- ES Klarheit Kurrent and Grotesk: self-hosted WOFF2 files in `/public/font/`, `font-display: swap`
- Space Mono: Google Fonts CDN (400, 700, 400 italic)

### Reserved Face
ES Klarheit Kurrent Mono 700 italic is loaded but has no assigned role yet.

---

## Layout Principles

### The Editorial Split
The brand's most characteristic layout: two unequal zones separated by a vertical rule. Typographic statement on one side, supporting content on the other. Asymmetric — roughly 35/65 or 40/60.

### Grids in Use

**Homepage:**
```css
.layout-grid {
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 1fr minmax(150px, auto);
}
/* Row 1: Hero headline spanning full width */
/* Row 2 left: 3-column nav dock (Experts | Brands | Builders) */
/* Row 2 right: Secondary nav (About, Resources, Contact, social) */
```

**Section pages (Experts / Brands / Builders):**
```css
.section-content {
  grid-template-columns: 1fr 320px;
}
/* Left: Statement area (number, title, subtitle, description, CTA) */
/* Right: Sage-colored sidebar (numbered index of services) */
```

**Detail panels (About / Contact):**
```css
/* Flexbox 50/50 split */
/* Left: Logo, hero headline, footer text */
/* Right: Scrollable content */
```

**Blog / Resources pages:**
```css
/* Single-column, centered layout */
/* Full-width hero (blue surface) → paper-surface content area */
```

### Visual Markers
- **Vertical rule:** 1px line in left margin (`opacity: 0.15`), editorial column marker
- **Orange colon prefix (`:`):** Before all section labels and sidebar headers
- **Orange left-edge bar:** 3px orange bar on hover for nav items (`scaleY` animation)
- **Horizontal rules:** Thin separators at `opacity: 0.15–0.25`
- **Site border:** 1px solid frame around viewport (web-specific)

### Spacing
- **Border width:** `1px` throughout (`--border-width`)
- **Radius:** `0px` default — sharp corners everywhere. Only exceptions: `4px` for interactive list items, `9999px` for pills/tags.
- **Section padding:** `3rem–4rem` desktop, `1.25rem–1.75rem` mobile

---

## Interactive States

### Nav Dock Items (Homepage)
- Background fills with section color on hover (Gold / Blue / Lavender)
- Orange 3px left-edge bar scales in from bottom
- Subtitle description text visible at all times; color changes on hover
- Prefix text translates up 2px

### Index Items (Section Sidebar)
- Same orange left-edge bar animation
- Number and title translate right 4px
- Description expands from `max-height: 0`
- First item active by default

### Links
- Secondary links: underline grows from right to left on hover
- CTA links: orange underline grows left to right

### Buttons
| Type | Background | Text | Border | Radius |
|------|-----------|------|--------|--------|
| Primary | `--color-orange` | `#1A1A1A` | none | `0px` |
| Ghost | transparent | `--color-orange` | `1px solid --color-orange` | `0px` |
| Pill | `--color-orange` | `#1A1A1A` | none | `9999px` |
| Dark | `--color-black` | `#FFFFFF` | none | `0px` |

All button labels: Layer 2 (Space Mono), `0.7rem`, uppercase, `letter-spacing: 0.1em`.

---

## Motion & Animation

### Signature Easing
`cubic-bezier(0.16, 1, 0.3, 1)` — fast-start, smooth-land. Used for all layout transitions.

### Standard Timing
| Token | Value | Usage |
|-------|-------|-------|
| `--transition` | `0.15s ease` | Color/opacity changes |
| `--transition-slow` | `0.3s ease` | Transforms, layout shifts |

### Page Load Sequence
1. Border trace: animated clip-path reveals 1px border around viewport
2. Site fade-in: opacity 0→1, translateY(10px)→0
3. Hero word reveal: each word fades in and translates up, staggered 50ms

### Ambient Loops
- Breathe: opacity 0.55↔0.75 over 5s (accent text)
- Drift: translateY 0↔-2px over 6s (nav prefixes)
- Pulse: opacity 1↔0.7 over 4s (section numbers)

---

## Paper Grain Texture

Required on all Paper (`#EBEBE2`) surfaces. Two layers:

1. **Real texture image** (`body::before`): `/public/paper-texture.jpg`, opacity `0.04`, blend `multiply`
2. **SVG noise grain** (`body::after`): `fractalNoise`, baseFrequency `0.65`, 6 octaves, opacity `0.18`, blend `multiply`

Both layers use `pointer-events: none` and sit above content at z-index `10002–10003`.

---

## Compositional Vocabulary

These are recurring design patterns — tools for composing new pages:

### Label-Above-Statement
```
CATEGORY LABEL           ← Layer 2, small, uppercase, tracked wide
"Larger statement."      ← Layer 1 or 2, large
— Attribution            ← Layer 2, small, --text-dim
```

### The Colon Prefix (`:`)
Core brand device. Signals categorization. Colon character is always `--color-orange`.
- Default: lowercase (`:software`, `:experts`)
- Labels above headings: UPPERCASE (`:FOR EXPERTS`)
- Named services: Title Case (`:Human & AI Interviews`)

### Negative Space
Emptiness is intentional. A surface that is 70–80% empty is making a statement. Every element needs room to breathe.

### Full-Bleed Color
When a surface commits to color, it commits fully. No floating colored cards on neutral backgrounds. Color is atmospheric.

### Vertical Rules
Structural markers, not decoration. 1px solid at reduced opacity. Signal compositional intention.

### Photography
All black-and-white, high-contrast, editorial quality. No color photography. When used, it fills a major compositional area.

---

## CSS Custom Properties (Full Reference)

```css
:root {
    /* Typography */
    --font-display: 'ES Klarheit Kurrent', 'Space Mono', monospace;
    --font-mono:    'Space Mono', monospace;
    --font-sans:    'ES Klarheit Grotesk', 'Helvetica Neue', 'Arial', sans-serif;

    /* Palette */
    --color-paper:    #EBEBE2;
    --color-sage:     #D2D0BD;
    --color-orange:   #F66302;
    --color-blue:     #058FF7;
    --color-lavender: #BAADD4;
    --color-gold:     #FFAF11;
    --color-menu-gold: #C8A84E;
    --color-black:    #000000;

    /* Semantic surfaces */
    --surface-paper:    var(--color-paper);
    --surface-sage:     var(--color-sage);
    --surface-dark:     var(--color-black);

    /* Semantic accents */
    --accent-primary:   var(--color-orange);
    --accent-secondary: var(--color-blue);
    --accent-highlight: var(--color-gold);

    /* Text */
    --text-primary: #1A1A1A;
    --text-inverse: #FFFFFF;
    --text-dim:     #4A4A4A;
    --text-muted:   #7A7A7A;

    /* Layout */
    --width-narrow:  800px;
    --width-default: 1000px;
    --width-wide:    1200px;

    /* Radius */
    --radius-none:  0px;
    --radius-small: 4px;
    --radius-pill:  9999px;

    /* Motion */
    --transition:      0.15s ease;
    --transition-slow: 0.3s ease;

    /* Border */
    --border-width: 1px;
}
```

---

## Responsive Breakpoints

| Breakpoint | Target | Key Changes |
|-----------|--------|-------------|
| `max-height: 900px` | 14" laptops | Tighter padding |
| `max-height: 750px` | Short viewports | Reduced type scale |
| `max-height: 600px` | Very short viewports | Minimal padding |
| `max-width: 1200px` | Medium-large screens | — |
| `max-width: 900px` | Tablets | Sidebar narrows to 240px, then stacks |
| `max-width: 768px` | Mobile phones | Grid → single column, intro hidden, panels stack |
| `max-width: 600px` | Small mobile | Form modal adjustments |

---

## Swatch Bar

6px fixed strip at bottom of every page. Order: Paper → Sage → Gold → Orange → Blue → Lavender → Black.
