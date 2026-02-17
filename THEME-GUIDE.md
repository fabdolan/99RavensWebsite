# 99Ravens — Website Theme Guide
### Quick reference for designers and developers working on 99ravens.agency

> **Scope:** This guide covers the **99Ravens website** (99ravens.agency) only — its pages, layouts, and web components. It does not govern other brand assets such as presentations, print materials, or the product dashboard. For the broader brand design system, see `REBUILD-DOCS/99Ravens_Design_System (2).md`.

---

## Color Palette

### Brand Colors (from Underline Studio brand book)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-paper` | `#EBEBE2` | Primary background — warm off-white |
| `--color-sage` | `#D2D0BD` | Secondary surface — sidebar backgrounds |
| `--color-orange` | `#F66302` | Primary accent — CTAs, links, active states |
| `--color-blue` | `#058FF7` | Accent — "For Enterprises" hover state |
| `--color-lavender` | `#BAADD4` | Accent — "For Developers" hover state |
| `--color-gold` | `#FFAF11` | Accent highlight — notification badge |
| `--color-menu-gold` | `#C8A84E` | Menu overlay background, intro video background |
| `--color-black` | `#000000` | Borders, dark surface |

### Semantic Tokens

| Token | Maps To | Usage |
|-------|---------|-------|
| `--surface-paper` | `#EBEBE2` | Page background |
| `--surface-sage` | `#D2D0BD` | Sidebar / nav panel backgrounds |
| `--surface-dark` | `#000000` | Dark surfaces (notification strip) |
| `--accent-primary` | `#F66302` | Orange — primary interactive color |
| `--accent-secondary` | `#058FF7` | Blue — secondary accent |
| `--accent-highlight` | `#FFAF11` | Gold — highlights, badges |

### Text Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#1A1A1A` | Primary body text |
| `--text-inverse` | `#FFFFFF` | Text on dark backgrounds |
| `--text-dim` | `#4A4A4A` | Secondary text, descriptions |
| `--text-muted` | `#7A7A7A` | Labels, metadata, captions |

---

## Typography

### Three-Layer Type System

| Layer | Font Family | Token | Role |
|-------|-------------|-------|------|
| 1 — Display | ES Klarheit Kurrent | `--font-display` | Prestige headlines, hero statements |
| 2 — Workhorse | Space Mono | `--font-mono` | Brand voice — labels, UI, nav, descriptions |
| 3 — Reading | ES Klarheit Grotesk | `--font-sans` | Body text, articles, section titles |

### Display (ES Klarheit Kurrent)
- **Weights available:** 200 italic, 400 regular, 700 bold
- **Use for:** Hero headlines, section subtitles, About page headline, panel hero text
- **Sizing:** `clamp(3.5rem, 7.5vw, 7rem)` for homepage hero; `clamp(2.4rem, 4.5vw, 4.2rem)` for section subtitles
- **Letter spacing:** `-0.035em` (tight)
- **Line height:** `0.98` (very tight, display only)

### Workhorse (Space Mono)
- **Weights available:** 400, 700
- **Use for:** All labels, navigation items, CTAs, descriptions, metadata, the brand's "editorial" voice
- **Typical sizing:** `0.6rem–0.85rem`
- **Letter spacing:** `0.1em–0.15em` uppercase labels; `0.02em` body descriptions
- **Line height:** `1.5–1.8`
- **Style note:** Always uppercase for labels (`text-transform: uppercase`)

### Reading (ES Klarheit Grotesk)
- **Weights available:** 400 regular, 500 italic
- **Use for:** Longer body text (About letter, blog posts), nav overlay links, section sidebar titles
- **Typical sizing:** `0.95rem–1.1rem` for body; `clamp(2rem, 4vw, 3.2rem)` for overlay nav links
- **Line height:** `1.6–1.8`

---

## Texture & Surface

### Paper Texture (Two-Layer System)
Both `body::before` and `body::after` create a layered paper feel:

1. **Real texture image** (`body::before`)
   - Source: `/public/paper-texture.jpg`
   - Opacity: `0.04`
   - Blend: `multiply`
   - Tile size: `1200px auto`
   - Z-index: `10002`

2. **SVG noise grain** (`body::after`)
   - Type: `fractalNoise`, baseFrequency `0.65`, 6 octaves
   - Opacity: `0.18`
   - Blend: `multiply`
   - Tile size: `512px`
   - Z-index: `10003`

---

## Layout Principles

### Editorial Grid
- **Desktop:** Two-column split — `1fr 320px`
- **900px breakpoint:** Sidebar narrows to `240px`, then stacks
- **768px breakpoint:** Single column, full-width stacking

### Visual Markers
- **Vertical rule:** 1px line in left margin (`opacity: 0.15`), marks editorial column
- **Orange colon prefix:** `:` before all section labels and sidebar headers (e.g., `:Home`, `:How It Works`)
- **Orange left-edge bar:** 3px orange bar on hover for nav items and index items (`scaleY` animation)
- **Horizontal rules:** Thin separators at `opacity: 0.15–0.25`

### Spacing
- **Border width:** `1px` throughout (token `--border-width`)
- **Radius:** Essentially `0px` — sharp corners everywhere
- **Section padding:** `4rem` desktop left, `1.5rem` mobile

---

## Motion & Animation

| Animation | Duration | Easing | Purpose |
|-----------|----------|--------|---------|
| Hero word reveal | `50ms` stagger per word | `0.5s ease` | Words emerge sequentially on load |
| Border trace | `1.8s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Border draws around viewport on enter |
| Section slide-up | `0.6s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Sections slide up from bottom |
| Menu overlay | `0.15s` | `ease` | Instant gold overlay toggle |
| Nav hover bar | `0.4s` | `cubic-bezier(0.16, 1, 0.3, 1)` | Orange bar scales in from bottom |
| Breathe pulse | `5s` loop | `ease-in-out` | Subtle opacity pulse on accent elements |

### Signature Easing
The brand uses `cubic-bezier(0.16, 1, 0.3, 1)` as the primary motion curve — a fast-start, smooth-land feel.

---

## Swatch Bar
A 6px fixed bar at the bottom of every page showing the full brand palette:
`paper → sage → gold → orange → blue → lavender → dark`

---

## Color Assignments per Section

| Section | Hover Color | Accent |
|---------|-------------|--------|
| For Experts (01) | `--color-gold` #FFAF11 | Orange numbers |
| For Enterprises (02) | `--color-blue` #058FF7 | Orange numbers |
| For Developers (03) | `--color-lavender` #BAADD4 | Orange numbers |

---

## Page Templates (for designing new pages)

The site uses four distinct page layouts. Any new page should follow one of these patterns or combine elements from them.

### Template A — Hero + Content (Resources / Blog Index)
Used for: landing pages, listing pages, campaign pages.
```
┌─────────────────────────────────┐
│  Header (logo left, menu right) │
├─────────────────────────────────┤
│                                 │
│  Full-width Hero                │
│  (color surface — e.g. blue)    │
│  Label (Layer 2, uppercase)     │
│  Headline (Layer 1, large)      │
│  Subtitle (Layer 2, dim)        │
│                                 │
├─────────────────────────────────┤
│                                 │
│  Paper-surface content area     │
│  (centered, max-width 1000px)   │
│  Filter row / content grid      │
│                                 │
├─────────────────────────────────┤
│  Footer (dark surface)          │
│  Nav links + copyright          │
├─────────────────────────────────┤
│  Swatch bar (6px)               │
└─────────────────────────────────┘
```
- Hero uses full-bleed color (blue, gold, lavender, or orange)
- Text on colored hero surfaces uses `--text-primary` (#1A1A1A)
- Content area sits on paper surface with paper grain texture
- Footer is black surface with white text

### Template B — Editorial Split (Section Pages)
Used for: service detail pages, product pages, methodology pages.
```
┌─────────────────────────────────┐
│  Header                         │
├─────────────────────┬───────────┤
│                     │           │
│  Statement Area     │  Sidebar  │
│  (paper surface)    │  (sage)   │
│                     │           │
│  :LABEL (Layer 2)   │  :HEADER  │
│  Number + Title     │  01 Item  │
│                     │  02 Item  │
│  Big Subtitle       │  03 Item  │
│  (Layer 1, display) │  04 Item  │
│                     │           │
│  ──────────         │           │
│  Description        │           │
│  (Layer 2)          │           │
│                     │           │
│  [CTA BUTTON]       │           │
│                     │           │
├─────────────────────┴───────────┤
│  Swatch bar                     │
└─────────────────────────────────┘
```
- Grid: `1fr 320px`
- Left: statement area on paper
- Right: sage-colored sidebar with numbered index
- Orange left-edge bar on hover for index items
- Navigation arrows (prev/next) fixed bottom-right

### Template C — 50/50 Panel (About / Contact)
Used for: detail overlays, long-form content, information pages.
```
┌────────────────┬────────────────┐
│                │          [X]   │
│  Logo          │                │
│                │  Scrollable    │
│  Hero          │  Content       │
│  Headline      │                │
│  (Layer 1)     │  (paragraphs,  │
│                │   forms,       │
│                │   maps, etc.)  │
│  Footer text   │                │
│  (Layer 2)     │                │
│                │                │
└────────────────┴────────────────┘
```
- Full-screen overlay (z-index 1000)
- Left panel: paper surface, vertically justified (logo top, headline middle, footer bottom)
- Right panel: paper surface, scrollable content area
- Close button (X) top-right
- Stacks vertically on mobile (left on top, right below)

### Template D — Homepage Grid
Used for: homepage only. Included here so designers understand how it works.
```
Desktop:
┌─────────────────────────────────────────┐
│  Header                                 │
├──────────────────────────┬──────────────┤
│                          │              │
│  :Home                   │  Explore     │
│  Hero Headline (2 lines) │  01 Experts  │
│  (Layer 1 display)       │  02 Enterpr. │
│  ─────────               │  03 Develop. │
│  Description paragraph   │              │
│                          │              │
├──────────────────────────┴──────────────┤
│  Swatch bar                             │
└─────────────────────────────────────────┘

Mobile (stacked, .main-content scrolls if needed):
┌─────────────────────┐
│  Header             │
├─────────────────────┤
│  :Home              │
│  Hero Headline      │
│  Description        │
├─────────────────────┤
│  Explore            │
│  01 For Experts     │
│  02 For Enterprises │
│  03 For Developers  │
└─────────────────────┘
```

### Shared Elements (present on every page)
- **Header:** Logo (SVG icon + wordmark) left, hamburger menu right. 1px bottom border.
- **Menu overlay:** Gold background, full-screen. Links to all sections + About, Resources, Contact, Sign in.
- **Swatch bar:** 6px strip fixed to bottom. Palette order: Paper → Sage → Gold → Orange → Blue → Lavender → Black.
- **Paper grain texture:** Two-layer SVG noise overlay on all paper surfaces.
- **Footer** (on blog/resource pages): Black surface, white text, nav links + copyright.

---

## Design Principles (for new pages)

1. **Type leads.** Typography is the primary visual. The first thing the eye should find is a typographic statement.
2. **Emptiness is material.** Space creates tension and focus. A surface that is 70–80% empty is deliberate.
3. **Restraint signals confidence.** One idea per surface. One accent per composition. Calm surrounding intensity.
4. **Color commits.** When a surface uses color, it fills the whole area. No floating colored cards on neutral backgrounds.
5. **Sharp edges.** Zero border-radius everywhere (except pills/tags). 1px borders only.
6. **The colon is a brand mark.** Use `:` (in orange) before category labels. It signals "this belongs to a system."
7. **B&W photography only.** High-contrast, editorial quality. No color photos. When used, they fill a major area.

---

## Key Design Tokens Summary

```css
/* Copy into any new page/component */
--font-display: 'ES Klarheit Kurrent', 'Space Mono', monospace;
--font-mono: 'Space Mono', monospace;
--font-sans: 'ES Klarheit Grotesk', 'Helvetica Neue', 'Arial', sans-serif;

--color-paper: #EBEBE2;
--color-sage: #D2D0BD;
--color-orange: #F66302;
--color-blue: #058FF7;
--color-lavender: #BAADD4;
--color-gold: #FFAF11;
--color-menu-gold: #C8A84E;
--color-black: #000000;

--text-primary: #1A1A1A;
--text-dim: #4A4A4A;
--text-muted: #7A7A7A;
```

---

*Last updated: Feb 2026*
