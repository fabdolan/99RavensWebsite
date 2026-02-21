# 99Ravens — Resources Content Pages
### Theme Guide: Case Study & White Paper Templates

> **Scope:** This guide covers the two new content page templates in the Resources section: **Case Study** and **White Paper**. It does not redefine or supersede any rules in `99R-Website-Theme_Feb17.md` or `99Ravens_Design_System__Feb_17__PARENT.md`. Where this guide is silent, defer to those documents. Where this guide is specific, it takes precedence for these page types only.
>
> **Reference implementation:** `99ravens-templates-v4.html`

---

## 1. What These Pages Are

Case Studies and White Papers are long-form editorial content. They are not marketing pages. They are not listing pages. They sit inside the Resources section and are reached via the listing index at `/resources`.

Their job is to be read, trusted, and acted on. The design consequence of this is that **the reading experience is the primary surface** — not the hero, not the CTA. Everything else supports the text.

---

## 2. Hero Section

Both page types use an identical hero structure. The only variable is the surface color.

### Surface Color

| Page Type | Hero Surface | Rationale |
|-----------|-------------|-----------|
| Case Study | `--color-gold` `#FFAF11` | Matches the Gold accent role in the existing palette — signals proof, evidence, outcome |
| White Paper | `--color-gold` `#FFAF11` | Consistent with Case Study; both are long-form downloads vs. articles |
| Article (existing) | `--color-lavender` `#BAADD4` | Already established — do not change |

> If future content types are introduced (e.g., Webinar, Tool), assign from the remaining palette: Blue (`#058FF7`) or Orange (`#F66302`). Never reuse Gold or Lavender for a new type.

### Hero Layout

```
┌─────────────────────────────────────────────────────┐
│  [Hero surface — full bleed, color]                 │
│                                                     │
│  ← Back to Resources                                │
│                                                     │
│  [CATEGORY TAG]   DATE                              │
│                                                     │
│  Headline                                           │
│  (large, ES Klarheit Grotesk, weight 400)           │
│                                                     │
│  ─────────────────────────────────────── (rule)    │
│                                                     │
│  [Avatar]  Author Name                              │
│            AUTHOR ROLE / CLIENT DESCRIPTOR          │
│                                                     │
└─────────────────────────────────────────────────────┘
```

- Hero content is constrained to `max-width: 960px; margin: 0 auto` — same container as the body content. Left-aligned within that container.
- No vertical rule in the left margin on these pages (that pattern belongs to the main marketing section pages).
- The thin horizontal rule between the headline and the byline is `1px solid rgba(26,26,26,0.15)`.

### Category Tag

The tag in the hero is a **bordered box, no fill**. The surface color is already doing the signaling — the tag does not need to add another color on top of it.

```css
.hero-tag {
    font-family: var(--font-mono);       /* Space Mono */
    font-size: 0.55rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.2rem 0.6rem;
    border: 1px solid var(--text-primary);
    color: var(--text-primary);
    background: transparent;
}
```

This is distinct from the **listing badges** (see Section 6), which use filled color backgrounds because they need to differentiate content types against a neutral Paper surface. In the hero, the surface color already provides the context.

### Hero Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Back link | Space Mono | 400 | `0.6rem` uppercase |
| Date | Space Mono | 400 | `0.6rem` uppercase |
| Category tag | Space Mono | 400 | `0.55rem` uppercase |
| **Headline (h1)** | **ES Klarheit Grotesk** | **400** | `clamp(2.2rem, 4.5vw, 3.8rem)` |
| Author name | ES Klarheit Grotesk | 400 | `0.95rem` |
| Author role / descriptor | Space Mono | 400 | `0.55rem` uppercase |

**The headline is Grotesk Regular — not Kurrent, not Bold.** The size creates the presence. Kurrent is reserved for brand marketing contexts (homepage hero, section statements). On editorial content pages, Grotesk Regular at display size is the correct voice — it reads as authored, not advertised.

---

## 3. Body Content Area

### Surface

All body content sits on `--color-paper` (`#EBEBE2`). There is no surface change within the body. Section differentiation is handled entirely by typography and thin horizontal rules — not by alternating background colors.

### Container

```css
max-width: 960px;
margin: 0 auto;
padding: 3.5rem 3rem;
```

### Case Study: Three-Section Scaffold

The case study body is divided into three named sections using a consistent two-column label/content grid:

```
┌──────────────┬──────────────────────────────────────┐
│  01          │                                      │
│  :THE BRIEF  │  Section headline (Grotesk 400)      │
│              │                                      │
│              │  Body text (Grotesk 400, 0.96rem)    │
│              │  ...                                 │
└──────────────┴──────────────────────────────────────┘
```

- Grid: `200px 1fr` with `3rem` gap
- Section number: Space Mono, `0.55rem`, `--color-orange`
- Section name: Space Mono, `0.6rem`, uppercase, `--text-muted`, with orange `:` prefix
- Section headline: ES Klarheit Grotesk, `400`, `clamp(1.4rem, 2.5vw, 1.9rem)`
- Body text: ES Klarheit Grotesk, `400`, `0.96rem`, `line-height: 1.75`, color `--text-dim`
- Sections separated by `1px solid rgba(26,26,26,0.15)` bottom border

Standard three sections are: **The Brief**, **The Work**, **The Evidence**. These can be renamed per engagement but the structural count of three is intentional — it mirrors a professional case brief structure and respects the reader's time.

### Case Study: Stat Boxes

When quantitative evidence is available, render stat boxes below the Evidence section body text.

```css
/* Container: Paper surface, 1px full border, flex row */
.cs-stats {
    display: grid;
    grid-template-columns: repeat(3, 1fr); /* or repeat(N, 1fr) */
    border: 1px solid var(--text-primary);
}
/* Each box: internal right border only */
.cs-stat {
    padding: 2rem 1.75rem;
    border-right: 1px solid rgba(26,26,26,0.2);
    background: var(--color-paper); /* stays on Paper, no surface change */
}
```

- Stat number: ES Klarheit Kurrent, `700`, `clamp(2.4rem, 4vw, 3.2rem)` — this is the **one place Kurrent is used on these pages**, because a large isolated numeral is a typographic object, not a headline
- Stat label: Space Mono, `0.55rem`, uppercase, `--text-muted`
- Between 1 and 4 boxes. If no hard metrics exist, omit the component entirely — do not fill with soft claims

### White Paper: Two-Column Reading Layout

```
┌─────────────────────────────────┬─────────────┐
│  :ABSTRACT                      │  :DOWNLOAD  │
│                                 │             │
│  Body text...                   │  [sidebar]  │
│                                 │             │
│  :CONTENTS                      │             │
│  01  Chapter name               │             │
│  02  Chapter name               │             │
│  ...                            │             │
└─────────────────────────────────┴─────────────┘
```

- Grid: `1fr 260px` with `4rem` gap
- Sidebar is `position: sticky; top: calc(header height + 2rem)`
- TOC items: Space Mono, `0.65rem`, with orange leading zero counter and a subtle hover to orange

---

## 4. Download Sidebar (White Paper only)

The sidebar exists in three states driven by CMS/form configuration. The state is determined server-side and only one state renders at a time.

### State A — Ungated

The paper is free. No gate. The container is minimal — just enough to frame the download action.

```
┌─────────────────────┐
│  ↓  PDF · 42 pages  │
│                     │
│  [Download button]  │
└─────────────────────┘
```

- Container: `--color-paper` surface, `1px solid var(--text-primary)` border
- Button: dark background (`--text-primary`), white text, Grotesk, no radius

### State B — Gated

Access requires an email address. The container shifts to Sage to signal it is a distinct interaction zone.

```
┌─────────────────────┐  ← Sage surface
│  Get the full       │
│  report             │
│                     │
│  [email input]      │  ← Paper surface input inside Sage
│                     │
│  [Submit button]    │
└─────────────────────┘
```

- Container: `--color-sage` background, `1px solid rgba(26,26,26,0.3)` border
- Headline: ES Klarheit Grotesk, `400`
- Body: Grotesk, `0.78rem`
- Input: Paper background inside the Sage container — the contrast signals "interactive field"
- The Sage shift is doing the work of saying "this is different" — no dark surface needed

### State C — Post-submit confirmation

The form disappears. The Sage container remains (surface continuity signals the transaction resolved here). A single confirmation line replaces the form.

```
┌─────────────────────┐  ← Sage surface persists
│  ✓  Check your      │
│     inbox.          │
└─────────────────────┘
```

- Tick mark in a small `18×18px` bordered box
- Text: Space Mono, `0.65rem`

---

## 5. In-Page CTA Block

Both page types include a CTA block at the end of the reading content, before the share row.

This is **not** a full-bleed footer CTA. It is a contained box inside the reading column — it sits within the `960px` container as part of the content flow.

```css
.inline-cta {
    background: var(--color-sage);
    border: 1px solid rgba(26,26,26,0.25);
    padding: 2rem;
    margin: 3.5rem 0;
}
```

- Label: Space Mono, `:NEXT STEP`, orange colon prefix
- Headline: ES Klarheit Grotesk, `400`, `1.15rem`
- Body: Space Mono, `0.7rem`, `line-height: 1.65`
- Button: `--text-primary` background, `--text-inverse` text, Grotesk — matches the "Apply for Representation" button pattern on existing article pages. **Not orange.**

---

## 6. End-of-Page Furniture

After the inline CTA, both page types include:

### Share Row

```
Share   [X]  [LinkedIn]  [Link]
```

- Label: Space Mono, `0.6rem`, uppercase, `--text-muted`
- Each icon button: `36×36px`, `1px solid rgba(26,26,26,0.25)` border, transparent background
- Separator: `1px solid rgba(26,26,26,0.15)` above and below the row

### Continue Reading

```
:CONTINUE READING

01   Title of next piece
02   Title of another piece
```

- Section label: Space Mono, `0.55rem`, uppercase, orange colon prefix
- Number: Space Mono, `0.6rem`, `--color-orange`
- Title: ES Klarheit Grotesk, `400`, `1rem` — same as listing card titles
- Hover: title color transitions to `--color-orange`
- Separated by `1px solid rgba(26,26,26,0.12)` bottom borders

---

## 7. Listing Badges (Resources Index only)

When content type badges appear in the listing index, they use filled color to differentiate types against the neutral Paper surface. These are distinct from the hero category tag.

| Content Type | Background | Text |
|-------------|-----------|------|
| Case Study | `--color-orange` `#F66302` | White |
| White Paper | `--color-black` `#000000` | White |
| Newsletter | `--color-sage` `#D2D0BD` | `--text-primary` + 1px border |
| Article | No badge | Default listing treatment |

```css
.content-type-badge {
    font-family: var(--font-mono);
    font-size: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    padding: 0.15rem 0.5rem;
}
```

---

## 8. Author Avatar

A `36×36px` square, no border-radius, `--text-primary` (`#1A1A1A`) background, white initials in Space Mono Bold. If a headshot is used instead: `filter: grayscale(100%) contrast(1.15)`, tightly cropped square. Grayscale photography only — no color headshots.

---

## 9. Typography Summary for These Pages

| Context | Font | Weight | Notes |
|---------|------|--------|-------|
| Page headline (h1) | ES Klarheit Grotesk | 400 | Size creates presence, not weight |
| Section headlines (h2) | ES Klarheit Grotesk | 400 | Scaled down from h1 |
| Body text | ES Klarheit Grotesk | 400 | `0.96rem`, `line-height: 1.75` |
| Stat numbers | ES Klarheit Kurrent | 700 | Isolated numerals — typographic object |
| All labels, meta, UI | Space Mono | 400 | Uppercase, letter-spaced |
| Author name | ES Klarheit Grotesk | 400 | Same font as body, slightly larger |
| Download sidebar headline | ES Klarheit Grotesk | 400 | |

**Kurrent appears exactly once per page** — on the stat numbers in Case Studies, where a large isolated numeral functions as a typographic object rather than a heading. Everywhere else on these pages, Grotesk carries both display and body work.

---

## 10. Black Usage Rule (Reiterated for These Pages)

From the parent system: black is structural chrome only.

On content pages this means:
- Header border-bottom: `1px solid var(--text-primary)`
- Stat box outer border: `1px solid var(--text-primary)`
- Hero tag border: `1px solid var(--text-primary)`
- Footer surface: `--color-black`
- Avatar background: `--text-primary` (`#1A1A1A`, not pure black)

Black does **not** appear as a content block background, a section divider fill, a sidebar container, or any element within the Paper reading surface.

---

## 11. What Not to Do

These are the specific failure modes encountered during the design of these templates. Avoid them.

| ❌ Wrong | ✓ Correct |
|---------|----------|
| Stat boxes on black/dark surface | Stat boxes on Paper, bordered |
| Download form on black/dark surface | Download form on Sage with 1px border |
| Headline in Kurrent Bold | Headline in Grotesk Regular |
| Headline in Grotesk Bold | Headline in Grotesk Regular (400) |
| Full-bleed orange CTA button | Dark-bg button matching existing article pattern |
| Category tag with filled color in hero | Category tag with 1px border, transparent bg |
| Full-bleed CTA block | Contained Sage box within reading column |
| Card grid for listing items | Vertical numbered list (existing pattern) |
| Alternating surface colors between sections | Single Paper surface throughout body |

---

*Last updated: February 2026*
*Reference file: `99ravens-templates-v4.html`*
*Parent docs: `99R-Website-Theme_Feb17.md` · `99Ravens_Design_System__Feb_17__PARENT.md`*
