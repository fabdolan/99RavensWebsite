# 99Ravens Design System

**Version 3.0 — February 2026**
**Status: Canonical**

---

## Source Hierarchy

When sources conflict, authority flows in this order:

1. **Underline Studio brand book** (Feb 2024) — color palette, logo, core typography
2. **Sales deck and presentation slides** — brand voice, compositional vocabulary, photography, rhetorical devices
3. **Font mockup HTML** — three-layer type system, font stacks, fallback chain
4. **Website and dashboard mockups** — web-specific implementation patterns (not generalizable to other media)

The design system describes the brand's visual language. It does not prescribe layouts for any specific medium.

---

## 1. Intent

99Ravens is an expertise company. The design exists to communicate that expertise is rare, valuable, and worth treating seriously.

**Gravity over friendliness.** The visual language draws from editorial publishing, academic texts, and gallery signage — not SaaS dashboards or startup landing pages. Elements earn their place.

**Emptiness is a material.** Space is not passive. It creates tension, focus, and rhythm. A surface that is mostly empty is making a statement about the weight of what remains. When in doubt, remove.

**Type leads.** Typography is the primary visual. Photography and color serve the text, not the other way around. The first thing the eye should find on any surface is a typographic statement.

**Restraint signals confidence.** The brand never shouts. It uses scale, weight, and space to create presence. One idea per surface. One accent per composition. Calm surrounding intensity.

---

## 2. Color

### 2.1 Palette

Pixel-sampled from the Underline Studio brand book, page 20.

| Token              | Hex       | RGB              |
|--------------------|-----------|------------------|
| `--color-paper`    | `#EBEBE2` | `235, 235, 226`  |
| `--color-sage`     | `#D2D0BD` | `210, 208, 189`  |
| `--color-orange`   | `#F66302` | `246, 99, 2`     |
| `--color-blue`     | `#058FF7` | `5, 143, 247`    |
| `--color-lavender` | `#BAADD4` | `186, 173, 212`  |
| `--color-gold`     | `#FFAF11` | `255, 175, 17`   |
| `--color-black`    | `#000000` | `0, 0, 0`        |

Purple (`#612DFF`) appears in the brand book but is not in the active palette.

### 2.2 Text Colors

| Token            | Hex       | Usage                                            |
|------------------|-----------|--------------------------------------------------|
| `--text-primary` | `#1A1A1A` | Default text, headings                           |
| `--text-dim`     | `#4A4A4A` | Secondary text, descriptions                     |
| `--text-muted`   | `#7A7A7A` | Tertiary text, labels, placeholders              |
| `--text-inverse` | `#FFFFFF` | Text on black surfaces                           |

### 2.3 Surface-to-Text Rule

The surface determines the text color, not the component type.

| Surface                           | Text color      |
|-----------------------------------|-----------------| 
| Paper, Sage                       | `--text-primary` / `--text-dim` / `--text-muted` |
| Orange, Blue, Gold, Lavender      | `--text-primary` (`#1A1A1A`) |
| Black                             | `--text-inverse` (`#FFFFFF`) |

An orange button uses `#1A1A1A` text. A gold badge uses `#1A1A1A` text. The surface rule always wins.

### 2.4 Color as Mood

Colors are not accents applied to small elements on neutral backgrounds. When a color appears, it tends to fill an entire surface — a full slide, a full section, a full panel. Color is either absent (paper) or committed (full-bleed).

Each color carries a register:

| Color    | Register                    | Tendency                                          |
|----------|-----------------------------|---------------------------------------------------|
| Paper    | Intellectual, restrained    | Default. Thinking, reading, evidence.             |
| Sage     | Grounded, archival          | Supporting surfaces, secondary panels.            |
| Orange   | Bold, conclusive            | Closings, calls to action, final statements.      |
| Blue     | Authoritative, evidentiary  | Proof, data, sourced quotes.                      |
| Lavender | Human, approachable         | People, methodology, process.                     |
| Gold     | Alerting, highlighting      | Notifications, new markers, feature labels.       |
| Black    | Definitive, anchoring       | Inverse blocks, dark sections, footers.           |

These are tendencies, not rules. A designer may use blue for something other than evidence — but should understand what the palette's grain is before working against it.

### 2.5 Semantic Aliases

For component code:

```
--accent-primary:   var(--color-orange)
--accent-secondary: var(--color-blue)
--accent-highlight: var(--color-gold)
--surface-paper:    var(--color-paper)
--surface-sage:     var(--color-sage)
--surface-dark:     var(--color-black)
```

---

## 3. Typography

### 3.1 Three-Layer Type System

#### Layer 1 — Display: ES Klarheit Kurrent

The prestige voice. Hero headlines, brand signature moments. Used sparingly for maximum weight.

| Property       | Value                                                     |
|----------------|-----------------------------------------------------------|
| Font family    | `'ES Klarheit Kurrent', 'Space Mono', monospace`          |
| Weights        | 200 italic, 400, 700                                      |
| Letter spacing | `-0.02em` to `-0.025em`                                   |
| Line height    | `1.1` to `1.15`                                           |

**Weight usage:**
- **400** — Primary headlines
- **700** — Emphatic statements
- **200 italic** — Sublines, accent phrases

#### Layer 2 — Workhorse: Space Mono

The brand texture. Labels, metadata, CTAs, descriptions, prefixes, numbers, body copy in presentations. This font is the connective tissue — it shows up everywhere and makes 99Ravens feel like 99Ravens.

| Property       | Value                                                     |
|----------------|-----------------------------------------------------------|
| Font family    | `'Space Mono', monospace`                                 |
| Weights        | 400, 700, 400 italic                                      |
| Letter spacing | `0.03em` to `0.12em` (varies by context)                  |
| Line height    | `1.65` to `1.8` (multi-line)                              |

#### Layer 3 — Reading: ES Klarheit Grotesk

The reading voice. Navigation titles, index headings, long-form body copy, blog content. Used wherever someone reads more than a line or two.

| Property       | Value                                                     |
|----------------|-----------------------------------------------------------|
| Font family    | `'ES Klarheit Grotesk', 'Helvetica Neue', 'Arial', sans-serif` |
| Weights        | 400, 500 italic                                            |
| Letter spacing | `-0.02em` (titles), `0` (body)                            |
| Line height    | `1.3` (titles), `1.6` to `1.7` (body)                    |

### 3.2 Sizing Guidance

The type system does not mandate specific sizes. Sizes depend on medium, viewport, and context. The following are reference ranges observed across canonical sources:

| Role                        | Layer | Size range             |
|-----------------------------|-------|------------------------|
| Hero headline               | 1     | `2.4rem` – `5.5rem`   |
| Accent subline              | 1     | `1.5rem` – `2rem`     |
| Section labels / prefixes   | 2     | `0.6rem` – `0.7rem`   |
| CTAs                        | 2     | `0.7rem`               |
| Body descriptions           | 2     | `0.85rem`              |
| Notification / badge text   | 2     | `0.55rem` – `0.65rem` |
| Nav / index titles          | 3     | `1.1rem` – `1.6rem`   |
| Long-form body              | 3     | `1rem`                 |

### 3.3 Stat / Callout Numbers

Large numerical callouts use **weight 700**. All other text uses weight 400.

### 3.4 Font Loading

- ES Klarheit Kurrent and Grotesk: self-hosted, base64-embedded WOFF2, `font-display: swap`
- Space Mono: Google Fonts (400, 700, 400 italic)

### 3.5 Reserved Face

ES Klarheit Kurrent Mono 700 italic is loaded in the font mockup but has no assigned role. Reserved for future use.

---

## 4. Compositional Vocabulary

These are recurring patterns observed across the brand book, sales deck, and presentation slides. They are a shared vocabulary — tools a designer can reach for — not mandated layouts.

### 4.1 The Editorial Split

Many compositions divide the surface into two unequal zones separated by a vertical rule: a typographic statement on one side, supporting content on the other. The split is asymmetric — roughly 35/65 or 40/60 — but the exact ratio varies. Sometimes the statement is left and evidence is right; sometimes it reverses; sometimes one side is a photograph.

This pattern appears in the brand book, the sales deck, the presentation slides, and the website. It is the brand's most characteristic layout. But it is not the only layout.

### 4.2 Vertical Rules

Vertical rules (1px solid, often at reduced opacity) are structural markers, not decorative lines. They appear at the left edge of content areas (echoing a printed margin), between columns, and as framing elements. They signal that the composition is intentional — like the mat around a framed print.

### 4.3 Diagonal Lines

Diagonal lines connect one idea to another across a composition. On the title slide, a diagonal links "Expertise" dissolving on the left to ":software" crystallizing on the right. On the training slide, it connects "automate" to "intelligence."

Diagonals are narrative, not decorative. They should connect a before-state to an after-state, or a problem to a solution. Use sparingly — at most one per surface. Always 1px solid.

### 4.4 Negative Space

Space should do work. Emptiness between two elements can represent a conceptual gap (the "quality gap" slide). Isolation around a single statement amplifies its weight (the closing slide). A composition that is 70–80% empty is not underdesigned — it is making a choice about what matters.

There is no minimum or maximum content density. The principle is: every element should have enough room to breathe, and the space between elements should feel intentional, not leftover.

### 4.5 Full-Bleed Color

When a surface commits to a color, it commits fully. Orange slides are entirely orange. Blue slides are entirely blue. There are no floating colored cards on white backgrounds. Color is atmospheric, not applied.

---

## 5. Typographic Devices

The brand uses typography as a rhetorical tool, not just for hierarchy.

### 5.1 Repetition

A word repeated in sequence creates rhythmic emphasis. "Expertise" appears four times at shifting weights. "automate" stacks three times. ":software" repeats six times as a visual mantra. Repetition enacts meaning — the cycle of automation, the building of a concept, the persistence of a claim.

Use in display contexts (Layer 1 or Layer 2), never in body copy.

### 5.2 Fragmentation and Reveal

Text can progressively fragment or assemble to show transformation. On the title slide, "Expertise" decomposes line by line while "becomes :software" materializes — the company's value proposition performed typographically.

Fragments should read as a coherent sequence top to bottom. Use shifting weights, sizes, or styles across the sequence to create visual motion.

### 5.3 Strikethrough

~~Undocumented~~, ~~Uncodified~~, ~~Unstructured~~ — struck-through words represent the old paradigm. The visual act of crossing out is the message: "We make these go away."

Use for concepts the brand actively opposes or resolves. Set in Layer 2 at medium-to-large sizes. No more than three struck-through items in a group.

### 5.4 Label-Above-Statement

A recurring content block pairs an uppercase category label with a larger statement beneath it:

```
FINE TUNING                              ← Category label
"Experts know more than they can tell."  ← Statement
— Polanyi, 1966                          ← Attribution
```

The label is Layer 2, small, uppercase, tracked wide. The statement is Layer 2, large. The attribution is small, `--text-dim`. This pattern appears on evidence slides, product pages, and methodology sections.

---

## 6. Photography

### 6.1 Treatment

All photography is **black-and-white, high-contrast, editorial quality**. No exceptions. No color photography appears anywhere in the brand.

Subjects are serious and direct — intellectual gravitas, not corporate warmth. Grain is welcome; it echoes the paper texture.

### 6.2 Scale

Photography is never small or incidental. When it appears, it is a major compositional element — filling a column, dominating a panel, or serving as the visual anchor of a composition.

### 6.3 Interaction with Other Elements

Line work (knowledge graphs, connecting lines) can overlay directly on photographs. On the Strategic Signature slide, a node diagram is drawn across the subject's body, communicating that expertise is embodied.

When overlaying photography:
- Use thin lines (1px) and pill-shaped node labels with paper-colored backgrounds
- Do not place solid shapes, color blocks, or text boxes on top of portraits

### 6.4 Inset on Color

On colored surfaces, photographs may appear inside a paper-colored inset — the photo retains its paper grain while the color surrounds it, creating a window effect.

---

## 7. The Colon Prefix

The colon prefix (`:`) is a core brand device. It signals categorization — "this thing belongs to a system."

### 7.1 Casing

| Context | Casing | Example |
|---------|--------|---------|
| Default | lowercase | `:software`, `:experts` |
| Label above title-case content | UPPERCASE | `:FOR EXPERTS`, `:SERVICES` |
| Named service or methodology | Title Case | `:Human & AI Interviews`, `:Paired Prompting` |

**The default is lowercase.** Use uppercase only when lowercase would blur hierarchy with the heading below. Use Title Case only for proper-noun service names.

### 7.2 Styling

- Font: Layer 2 (Space Mono)
- The colon character: `--color-orange`
- The label text: `--text-muted` (lowercase), `--text-primary` (uppercase / Title Case)
- Size: `0.6rem` – `0.7rem`, `letter-spacing: 0.1em` – `0.15em`

---

## 8. Knowledge Graphs

The Strategic Signature diagram is a visual vocabulary for representing expertise structures.

- **Nodes:** Pill-shaped (`--radius-pill`), 1px `--text-primary` border, paper-colored fill. Labels in Layer 2, `0.75–0.9rem`.
- **Connections:** 1px solid `--text-primary`. Straight or angled, never curved.
- **Layout:** Organic, asymmetric. Nodes cluster loosely at varying distances. The irregularity communicates complexity.
- **Can overlay photographs** (see §6.3).

---

## 9. Paper Grain Texture

Required on all Paper (`#EBEBE2`) surfaces in digital media. An SVG feTurbulence noise overlay that gives surfaces a tactile, printed-stock feel.

| Property          | Value                      |
|-------------------|----------------------------|
| Noise type        | `fractalNoise`             |
| Base frequency    | `0.9`                      |
| Octaves           | `4`                        |
| Tile stitching    | `stitch`                   |
| SVG internal opacity | `0.5`                   |
| Element opacity   | `0.35`                     |
| Blend mode        | `multiply`                 |
| Tile size         | `256px × 256px`, repeat    |
| Interaction       | `pointer-events: none`     |

```css
body::after {
    content: '';
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 10002;
    opacity: 0.35;
    mix-blend-mode: multiply;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256'
      xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E
      %3CfeTurbulence type='fractalNoise' baseFrequency='0.9'
      numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E
      %3Crect width='100%25' height='100%25' filter='url(%23noise)'
      opacity='0.5'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
}
```

---

## 10. Web-Specific Tokens

The following tokens apply to web implementations. They are not generalizable to presentations, print, or app interfaces.

### 10.1 Content Max-Width

| Token               | Value    | Usage                                              |
|---------------------|----------|----------------------------------------------------|
| `--width-narrow`    | `800px`  | Settings, forms, focused reading                   |
| `--width-default`   | `1000px` | Grids, cards, section pages                        |
| `--width-wide`      | `1200px` | Tables, document lists, multi-column views         |

### 10.2 Border Radius

| Token               | Value     | Usage                                             |
|---------------------|-----------|---------------------------------------------------|
| `--radius-none`     | `0px`     | Default for all elements                          |
| `--radius-small`    | `4px`     | Interactive list items (hover/active)             |
| `--radius-pill`     | `9999px`  | Pill buttons, tags, knowledge graph nodes         |

### 10.3 Motion

| Token                | Value       | Usage                                            |
|----------------------|-------------|--------------------------------------------------|
| `--transition`       | `0.15s ease` | Color/opacity changes                            |
| `--transition-slow`  | `0.3s ease`  | Transforms, layout shifts, underline reveals     |

### 10.4 Site Wrapper Border

The website uses a 1px solid `--text-primary` border around the viewport as a framing device. This is a web-specific pattern — it echoes the vertical rules seen in presentations but is not required on other media.

### 10.5 Interactive Patterns

**Orange left-edge hover bar:** 3px `--color-orange` bar on interactive list items, scaling in via `transform: scaleY()` on hover.

**Link underline reveal:** Bottom underline expanding from `width: 0` to `100%` on hover, `--color-orange`.

**Buttons:**

| Type    | Background        | Text         | Border                       | Radius          |
|---------|-------------------|--------------|------------------------------|-----------------|
| Primary | `--color-orange`  | `#1A1A1A`    | none                         | `--radius-none` |
| Ghost   | transparent       | `--color-orange` | `1px solid --color-orange` | `--radius-none` |
| Pill    | `--color-orange`  | `#1A1A1A`    | none                         | `--radius-pill` |
| Dark    | `--color-black`   | `#FFFFFF`    | none                         | `--radius-none` |

All button labels: Layer 2, `0.7rem`, uppercase, `letter-spacing: 0.1em`.

### 10.6 Web Components

**Notification strip:** Fixed top, full width. `--color-black` background, `--text-inverse` text, Layer 2 at `0.65rem`. Badge: `--color-gold` background.

**Header:** Flex row, `1.1rem 2.5rem` padding, `1px solid --text-primary` bottom border. Logo: SVG icon (32×32) + SVG wordmark (16px height). Menu: Layer 2, `0.65rem`, uppercase.

**Section page sidebar:** `--color-sage` background, Layer 2 headers, Layer 3 index titles, expandable Layer 2 descriptions.

**Swatch bar:** 6px strip at viewport bottom. Order: Paper, Sage, Gold, Orange, Blue, Lavender, Black.

---

## 11. CSS Custom Properties

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
    --color-black:    #000000;

    /* Semantic */
    --surface-paper:    var(--color-paper);
    --surface-sage:     var(--color-sage);
    --surface-dark:     var(--color-black);
    --accent-primary:   var(--color-orange);
    --accent-secondary: var(--color-blue);
    --accent-highlight: var(--color-gold);

    /* Text */
    --text-primary: #1A1A1A;
    --text-dim:     #4A4A4A;
    --text-muted:   #7A7A7A;
    --text-inverse: #FFFFFF;

    /* Layout (web) */
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
}
```

---

## 12. Drift Log

| Color    | Brand Book | Theme Guide | HTML Mockups | React Mockups | Corrected To |
|----------|-----------|-------------|--------------|---------------|-------------|
| Paper    | `#EBEBE2` | `#F5F0E8`  | `#EFECE3`    | `#F5F0E8`     | `#EBEBE2`   |
| Sage     | `#D2D0BD` | `#C5C2B0`  | `#C5C2B0`    | `#C5C2B0`     | `#D2D0BD`   |
| Orange   | `#F66302` | `#FF6B35`  | `#FB791B`    | `#FF6B35`     | `#F66302`   |
| Blue     | `#058FF7` | `#3BA0E6`  | `#1E97FC`    | `#3BA0E6`     | `#058FF7`   |
| Lavender | `#BAADD4` | `#C4B5D4`  | `#B4A8CE`    | `#C4B5D4`     | `#BAADD4`   |
| Black    | `#000000` | `#1E1C19`  | `#1E1C19`    | `#1E1C19`     | `#000000`   |
| Gold     | `#FFAF11` | *(missing)* | `#FCB928`   | *(missing)*   | `#FFAF11`   |

---

## 13. Decision Record

| # | Issue | Resolution | Rationale |
|---|-------|-----------|-----------|
| 1 | Palette drift | Brand book values | Underline Studio is canonical |
| 2 | Black | `#000000` | Brand book |
| 3 | Gold | Include `#FFAF11` | Brand book + sales deck + swatch bar |
| 4 | Purple | Drop | Not used in implementations |
| 5 | Type system | Three-layer | Font mockup defines practical system |
| 6 | Text colors | `#4A4A4A` / `#7A7A7A` | Consistent across mockups |
| 7 | Colon casing | 3 rules: lower / UPPER / Title | Evidence for all three in canonical sources |
| 8 | Paper grain | Required (digital) | Core to brand texture |
| 9 | Stat weight | 700 callouts, 400 else | Visual hierarchy |
| 10 | Border radius | 0 / 4 / 9999 | Minimal exceptions |
| 11 | Max-width | 800 / 1000 / 1200 | Per content type |
| 12 | Button text on orange | `#1A1A1A` | Surface rule wins |
| 13 | Transitions | 0.15s / 0.3s | Color vs. motion |
| 14 | Colon Title Case | Added | Sales deck evidence |
