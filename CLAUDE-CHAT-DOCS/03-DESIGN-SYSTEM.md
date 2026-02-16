# 99Ravens Design System & Theme Reference

## Color Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--bg` | `#d8d6c5` | Primary background (warm beige/taupe) |
| `--bg-dark` | `#d8d6c5` | Same as bg (used in index sidebar) |
| `--orange` | `#D96A32` | Accent color (CTAs, numbers, active states, links) |
| `--black` | `#1a1a1a` | Text, borders, dark backgrounds on hover |
| `--text` | `#1a1a1a` | Primary text color |
| `--text-dim` | `#4a4a4a` | Body text, descriptions |
| `--text-muted` | `#7a7a7a` | Labels, secondary text, prefixes |
| `--border` | `#1a1a1a` | All borders |

### Color Relationships
- Background is always the warm beige `#d8d6c5`
- Text is near-black `#1a1a1a` for maximum contrast
- Orange `#D96A32` is used sparingly: numbering, CTAs, hover states, active indicators
- Three text levels: `--text` (headings) > `--text-dim` (body) > `--text-muted` (labels)
- Hover states on navigation: background flips to `--black`, text flips to `--bg`

## Typography

### Font Stack
| Variable | Fonts | Usage |
|----------|-------|-------|
| `--font-mono` | `'ES Klarheit Grotesk Mono', 'IBM Plex Mono', monospace` | Labels, numbers, metadata, descriptions, CTAs, body of section descriptions |
| `--font-sans` | `'IBM Plex Sans', sans-serif` | Headlines, titles, body paragraphs, nav titles |

### Font Files (Custom)
- `public/font/ESKlarheitGroteskMono-Rg.otf` (Regular weight 400)
- `public/font/ESKlarheitGroteskMono-It-Trial.otf` (Italic weight 400)

### Google Fonts Import
```
IBM Plex Mono: weights 300, 400, 500 (normal + italic 300, 400)
IBM Plex Sans: weights 300, 400, 500 (normal + italic 300, 400)
```

### Type Scale
| Element | Font | Size | Weight | Tracking | Case |
|---------|------|------|--------|----------|------|
| Hero headline | Sans | `clamp(3rem, 6vw, 5.5rem)` | 400 | -0.03em | Sentence |
| Hero accent line | Sans italic | `clamp(1.5rem, 2.5vw, 2rem)` | 400 | 0 | Sentence |
| Section subtitle | Sans | `clamp(2.5rem, 6vw, 5rem)` | 400 | -0.03em | Sentence |
| Nav title | Sans | 1.6rem | 400 | -0.02em | Title case |
| Nav prefix | Mono | 0.7rem | 400 | 0.1em | UPPERCASE |
| Section number | Mono | 0.7rem | 400 | 0.1em | N/A |
| Section title | Sans | 1rem | 400 | 0.1em | UPPERCASE |
| Section description | Mono | 0.85rem | 400 | 0 | Sentence |
| Index title | Sans | 1.1rem | 400 | 0 | Sentence |
| Index description | Mono | 0.75rem | 400 | 0 | Sentence |
| CTA text | Mono | 0.75rem | 400 | 0.1em | UPPERCASE |
| Panel hero h2 | Sans | `clamp(2rem, 4vw, 3.5rem)` | 400 | -0.03em | Sentence |
| Panel body | Sans | 0.95-1rem | 400 | 0 | Sentence |
| Panel h3 labels | Mono | 0.6rem | 400 | 0.15em | UPPERCASE |
| Menu text | Mono | 0.65rem | 400 | 0.1em | UPPERCASE |
| Notification | Mono | 0.65rem | 400 | 0.03em | Sentence |
| About letter body | Sans | 1rem | 400 | 0 | Sentence, first-letter is 3.5rem drop cap |
| Signature title | Mono | 0.7rem | 400 | 0.1em | UPPERCASE |

### Key Type Rules
- Almost everything is weight 400 (normal). Very rarely 500.
- Sans is for display/reading text. Mono is for UI labels, metadata, technical text.
- Negative letter-spacing on large headings (-0.03em). Positive on small labels (0.1em-0.15em).
- Uppercase is reserved for labels, prefixes, CTAs, and section markers.

## Spacing & Layout

### Border System
- All borders: `1px solid #1a1a1a` (uniform)
- Border width variable: `--border-width: 1px`
- No rounded corners anywhere. Everything is sharp/square.

### Padding Patterns
| Context | Padding |
|---------|---------|
| Header | `1.25rem 3rem` |
| Hero area | `4rem 3rem` |
| Nav dock items | `2rem` |
| Section main | `3rem 4rem` |
| Index items | `1.5rem 2rem` |
| Detail panel sides | `2rem 3rem` |
| Form modal content | `1.5rem` |

### Grid Layouts
**Home page:**
```css
grid-template-columns: 1fr 1.5fr;
grid-template-rows: 1fr minmax(150px, auto);
```

**Section pages:**
```css
grid-template-columns: 1fr 320px;
```

**Nav dock (sub-grid):**
```css
grid-template-columns: 1fr 1fr 1fr;
```

## Interactive States & Transitions

### Global Transition
```css
--transition: 0.5s cubic-bezier(0.19, 1, 0.22, 1);
```
This custom easing is used site-wide for a smooth, slightly springy feel.

### Hover Patterns

**Nav dock items:**
- Background: transparent -> `--black`
- Text color: `--text` -> `--bg`
- Orange left border bar scales in from bottom (3px wide, `scaleY(0)` -> `scaleY(1)`)
- Prefix text: translates up 2px, full opacity
- Title text: translates up 3px

**Index items (section sidebar):**
- Same orange left bar animation
- Number and title translate right 4px
- Description expands from `max-height: 0` to `max-height: 200px`
- Active state persists (first item active by default)

**Secondary links:**
- Underline grows from right to left (`width: 0` -> `width: 100%`)

**CTA links:**
- Orange underline grows left to right

**Close buttons:**
- X rotates 90deg on hover
- Lines change to orange

**Logo:**
- Opacity dims on hover (main logo)
- Subtle spin animation on hover (panel logo)

### Cursor
All interactive elements explicitly set `cursor: pointer`.

## Animations

### On Page Load
1. **Border trace** (`traceBorder`): Animated clip-path reveals a 1px border around the viewport
2. **Site fade-in**: Opacity 0 -> 1, translateY(10px) -> 0
3. **Word reveal**: Each word in hero text fades in and translates up, staggered by 50ms per word

### Ambient/Looping
1. **Breathe** (accent text): opacity oscillates 0.55 <-> 0.75 over 5s
2. **Drift** (nav prefixes): translateY oscillates 0 <-> -2px over 6s, staggered per item
3. **Pulse** (section numbers): opacity oscillates 1 <-> 0.7 over 4s
4. **Node pulse** (contact map): circle radius and opacity pulse, staggered per city node

### Transition Animations
1. **Section open**: Section layer translates from `translateY(100%)` to `translateY(0)`, main content fades/translates up
2. **Detail panel open**: Opacity 0 -> 1 (full screen)
3. **Form modal open**: Opacity 0 -> 1, content translateY(20px) -> 0
4. **Nav overlay**: translateY(-10px) -> 0, opacity 0 -> 1
5. **Notification strip**: translateY(-100%) -> 0

## Visual Signature Elements
- **No rounded corners** - everything is sharp rectangles
- **1px borders everywhere** - grid-like, editorial aesthetic
- **Warm beige background** - not white, not cream, specifically `#d8d6c5`
- **Monospace for UI, sans-serif for content** - dual-font editorial system
- **Orange as sole accent** - `#D96A32`, used very sparingly
- **Left-edge orange bars** on hover - consistent vertical accent indicator
- **Large display type** with negative tracking - editorial/magazine feel
- **UPPERCASE for labels and metadata** - structured, systematic
- **Inverted hover states** - light-on-dark flip for navigation
- **Drop cap** on About page first letter - editorial tradition
- **Constellation map** on Contact - SVG network visualization with animated nodes
- **Intro video** - branded animation before site reveal
- **Noise texture** (element exists but currently `display: none`)
