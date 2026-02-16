# 99Ravens — Theme Guide
### Quick reference for designers and developers

---

## Color Palette

### Brand Colors (from Underline Studio brand book)

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-paper` | `#EBEBE2` | Primary background — warm off-white |
| `--color-sage` | `#D2D0BD` | Secondary surface — sidebar backgrounds |
| `--color-orange` | `#F66302` | Primary accent — CTAs, links, active states |
| `--color-blue` | `#058FF7` | Accent — "For Brands" hover state |
| `--color-lavender` | `#BAADD4` | Accent — "For Builders" hover state |
| `--color-gold` | `#FFAF11` | Accent highlight — intro animation bg, notification badge |
| `--color-menu-gold` | `#C8A84E` | Menu overlay background (matches intro video yellow) |
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
- **Orange colon prefix:** `:` before all section labels and sidebar headers (e.g., `:Home`, `:Services`)
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
| For Brands (02) | `--color-blue` #058FF7 | Orange numbers |
| For Builders (03) | `--color-lavender` #BAADD4 | Orange numbers |

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
