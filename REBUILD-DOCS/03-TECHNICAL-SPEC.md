# 99RAVENS.AGENCY — TECHNICAL IMPLEMENTATION SPEC
## Stack, file structure, dependencies, and build instructions for Claude.

---

## TECH STACK (MANDATORY — DO NOT CHANGE)

| Layer | Technology |
|-------|------------|
| Markup | Vanilla HTML5 |
| Styling | Vanilla CSS3 (no preprocessors, no Tailwind) |
| Scripting | Vanilla JavaScript (no frameworks, no build tools) |
| Routing | History API (pushState/popstate) |
| Forms | HubSpot Embedded Forms (JS API) |
| Analytics | Google Analytics 4 (gtag.js) |
| Fonts | Self-hosted .woff2 + Google Fonts CDN |
| Server | Any static file server (currently Python `http.server` for dev) |
| Blog CMS | Static HTML files with JS-rendered content from a data file |

**There is no build step.** Files are served directly. No bundling, no transpiling, no npm.

---

## FILE STRUCTURE

```
website-main/
├── index.html                    # Main SPA entry point (all states except blog)
├── styles.css                    # All styles for the SPA
├── script.js                     # All JS for the SPA (data + logic)
├── seo-config.js                 # SEO metadata per route
├── public/
│   ├── animations/
│   │   └── intro.mp4             # Intro video (2.7MB, 5668x3774 landscape)
│   ├── font/
│   │   ├── ESKlarheitKurrent-Rg.woff2       # Display font — regular
│   │   ├── ESKlarheitKurrent-Bd.woff2       # Display font — bold
│   │   ├── ESKlarheitKurrent-XltIt.woff2    # Display font — extra light italic
│   │   ├── ESKlarheitGrotesk-Rg.woff2       # Sans font — regular
│   │   ├── ESKlarheitGrotesk-MdIt.woff2     # Sans font — medium italic
│   │   └── ESKlarheitKurrentMono-BdIt.woff2 # Mono variant — bold italic
│   ├── logos/
│   │   ├── 24006_99Ravens_Logo_black_FA.png # Favicon + panel logo
│   │   ├── 24006_99Ravens_Logo_white_FA.png # White variant
│   │   ├── Beige-Square.svg                 # Brand square
│   │   └── logo99.png                       # Legacy logo
│   ├── uploads/
│   │   └── blog/
│   │       └── 99ravens_ai_interviewer.png  # Blog post image
│   ├── Fab Dolan.png                        # Founder signature photo
│   ├── og-image.png                         # Open Graph image (1200x630)
│   └── site.webmanifest                     # PWA manifest
├── resources/
│   └── blogs/
│       ├── index.html                       # Resource index page
│       ├── [slug]/
│       │   └── index.html                   # One per blog post (14 total)
│       └── ...
├── blog-cms/
│   └── src/
│       ├── styles/
│       │   ├── main.css                     # Blog styles (index + shared)
│       │   └── post.css                     # Article-specific styles
│       ├── js/
│       │   ├── blog-app.js                  # Resource index page logic
│       │   ├── blog-data.js                 # All blog post content (data)
│       │   └── post.js                      # Article page logic
│       └── data/ (empty)
├── CLAUDE-CHAT-DOCS/                        # Legacy design docs (outdated)
├── Feb 15 Proposed Site Overhaul/           # Mockups and handoff (reference)
│   ├── mockup-final-v3.html
│   ├── mockup-resources-v3.html
│   ├── font-mockup.html
│   └── handoff-package/
│       ├── DEVELOPER-HANDOFF-v2.md
│       ├── css-patch-v2.css
│       ├── font-system.css
│       └── nav-overlay-gold.html
└── REBUILD-DOCS/                            # THIS documentation set
    ├── 01-CONTENT-BIBLE.md
    ├── 02-SITE-ARCHITECTURE.md
    └── 03-TECHNICAL-SPEC.md
```

---

## FONT SYSTEM

### Three-Layer Type Hierarchy

| Layer | Font | CSS Variable | Role | Weights |
|-------|------|-------------|------|---------|
| 1 — Display | ES Klarheit Kurrent | `--font-display` | Hero headlines, section subtitles, accent moments | 400, 700, 200 italic |
| 2 — Workhorse | Space Mono | `--font-mono` | Labels, metadata, CTAs, descriptions, UI elements | 400, 700, 400 italic |
| 3 — Reading | ES Klarheit Grotesk | `--font-sans` | Nav titles, body text, letters, blog content | 400, 500 italic |

### @font-face Declarations (6 files)

```css
@font-face { font-family: 'ES Klarheit Kurrent'; src: url('public/font/ESKlarheitKurrent-Rg.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: 'ES Klarheit Kurrent'; src: url('public/font/ESKlarheitKurrent-Bd.woff2') format('woff2'); font-weight: 700; font-style: normal; font-display: swap; }
@font-face { font-family: 'ES Klarheit Kurrent'; src: url('public/font/ESKlarheitKurrent-XltIt.woff2') format('woff2'); font-weight: 200; font-style: italic; font-display: swap; }
@font-face { font-family: 'ES Klarheit Grotesk'; src: url('public/font/ESKlarheitGrotesk-Rg.woff2') format('woff2'); font-weight: 400; font-style: normal; font-display: swap; }
@font-face { font-family: 'ES Klarheit Grotesk'; src: url('public/font/ESKlarheitGrotesk-MdIt.woff2') format('woff2'); font-weight: 500; font-style: italic; font-display: swap; }
@font-face { font-family: 'ES Klarheit Kurrent Mono'; src: url('public/font/ESKlarheitKurrentMono-BdIt.woff2') format('woff2'); font-weight: 700; font-style: italic; font-display: swap; }
```

### Google Fonts (CDN)
```html
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

### CSS Custom Properties
```css
--font-display: 'ES Klarheit Kurrent', 'Space Mono', monospace;
--font-mono: 'Space Mono', monospace;
--font-sans: 'ES Klarheit Grotesk', 'Helvetica Neue', 'Arial', sans-serif;
```

---

## COLOR SYSTEM

### CSS Custom Properties

```css
/* Surfaces */
--surface-paper: #EFECE3;     /* Primary background — warm beige */
--surface-sage: #C5C2B0;      /* Secondary surface — muted green/taupe */
--surface-gold: #C8A84E;      /* Gold — intro video background, overlay background */
--surface-blue: #1E97FC;      /* Electric blue — heroes, highlights */
--surface-lavender: #B4A8CE;  /* Purple — article heroes, accents */
--surface-dark: #1E1C19;      /* Near-black — footers, dark panels */

/* Accents */
--accent-gold: #FCB928;       /* Bright gold — swatch bar, highlights */
--accent-orange: #FB791B;     /* Orange — CTAs, hover underlines, colon prefix */

/* Text */
--text-primary: #1A1A1A;      /* Primary text — near black */
--text-muted: #7a7a7a;        /* Muted text — hero accent line */
--text-dim: #4a4a4a;          /* Dim text — secondary info */

/* Other */
--bg: #EFECE3;                /* Alias for surface-paper */
--black: #1A1A1A;             /* Alias for text-primary, used in borders */
--border-width: 1px;          /* Standard border width */
```

---

## SVG ASSETS (INLINE)

### Logo Icon (logo-icon)
The 99Ravens mark is an inline SVG with 8 interlocking path elements forming a pinwheel/compass shape. It is used in:
- Header (32x32px)
- Nav overlay header (36x36px)
- Blog headers (32x32px)

The full SVG path data is embedded inline in HTML (not a separate file). Approximately 3.5KB of path data.

### Logo Wordmark (logo-wordmark)
The "99Ravens" wordmark is an inline SVG with the custom letterforms. ViewBox: `0 0 918.2 183.6`. Used alongside the icon mark in headers.

### Social Icons
LinkedIn and YouTube SVG icons are inline (24x24 or 14x14 viewBox, simple single-path icons).

---

## JAVASCRIPT ARCHITECTURE

### Main SPA: `script.js`

**Data structures at top of file:**
- `submenuData` — Content for 3 section pages (experts, enterprises, developers). Each contains: number, title, subtitle, desc, indexTitle, items[], cta.
- `contentData` — Content for 2 detail panels (about, contact). Each contains: title, headline, tagline, footerText, content (HTML string).
- `formConfig` — HubSpot form IDs for 3 sections.

**State variables:**
- `hasEntered` — Whether intro has been dismissed
- `heroAnimated` — Whether hero word animation has run
- `currentSectionIndex` — Which section (0-2) is active
- `currentFormSection` — Which form modal is open
- `sectionOrder` — ['experts', 'enterprises', 'developers']

**Key functions:**
| Function | Purpose |
|----------|---------|
| `enterSite()` | Transition from intro to home |
| `animateHero()` | Word-by-word reveal of hero text |
| `openSection(id)` | Generate and show section page HTML |
| `resetToHome()` | Return to home state |
| `toggleMenu()` | Toggle gold nav overlay |
| `openDetail(key)` | Generate and show detail panel HTML |
| `closeDetail()` | Close detail panel |
| `openFormModal(id)` | Show HubSpot form in modal |
| `closeFormModal()` | Close form modal |
| `handleInitialRoute()` | Parse URL and navigate on page load |
| `updateNavArrows()` | Enable/disable prev/next arrows |

**Section content is generated dynamically** — `openSection()` builds HTML from `submenuData` and injects it into `#section-grid`. Same pattern for `openDetail()` which injects into `#panel-content`.

### SEO Config: `seo-config.js`

Exports `updatePageSEO(pageKey)` which updates `<title>`, `<meta>` tags, OG tags, and canonical URL when routes change.

### Blog: `blog-app.js`

`BlogApp` class that:
- Reads `blogData.posts` from `blog-data.js`
- Renders numbered list view into `.blog-list` container
- Handles filter tag clicks (category filtering)
- Updates article count display

### Blog: `post.js`

`PostPage` class that:
- Finds current post by matching URL slug to `blogData.posts`
- Renders article hero into `#articleHero`
- Renders article body into `#articleContent`
- Renders related posts into `#relatedPosts`
- Handles share functionality (Twitter, LinkedIn, copy link)

### Blog: `blog-data.js`

Single `blogData` object containing:
- `posts[]` — Array of 14 post objects, each with: id, title, slug, excerpt, content (full HTML), date, author, category, readTime
- `authors[]` — Array of 5 author objects with: id, name, title
- `categories[]` — Array of category objects with: slug, name

---

## CSS ARCHITECTURE

### Main SPA: `styles.css`

**Approximate structure (top to bottom):**
1. @font-face declarations (6 fonts)
2. CSS custom properties (:root)
3. Reset / base styles
4. Notification strip
5. Intro (video overlay)
6. Site wrapper
7. Noise texture (::after pseudo-element)
8. Header
9. Nav overlay (gold)
10. Layout grid (home page)
11. Cell headline + hero animation
12. Cell nav (bottom dock)
13. Cell info (bottom right, sage)
14. Section layer (section pages)
15. Section content grid
16. Index items
17. Detail panel
18. Panel left/right split
19. About letter styles
20. Contact styles + constellation map
21. Form modal
22. Section nav arrows
23. Swatch bar
24. Responsive: max-height queries
25. Responsive: max-width: 768px
26. Responsive: max-width: 480px

**Key CSS patterns:**
- `body.page-open` — Triggers section layer visibility
- `body.has-notification` — Adds padding-top to push content below notification strip
- `.nav-overlay.active` — Shows gold overlay
- `.detail-panel.active` — Shows detail panel
- `.intro.hidden` — Fades out intro
- `.site-wrapper.visible` — Fades in main site
- `.word-inner.revealed` — Triggers hero word animation

### Blog: `main.css`

Complete standalone stylesheet for blog pages. Contains its own:
- @font-face declarations (same 6 fonts, absolute paths)
- CSS custom properties (same color palette)
- Header styles
- Nav overlay styles (gold, with overlay-header)
- Resources hero (blue surface)
- Filter tags
- Blog list view
- Dark footer
- Swatch bar
- Responsive rules

### Blog: `post.css`

Article-specific styles layered on top of main.css:
- Article hero (lavender surface)
- Article body (drop cap, headings, blockquotes)
- Sage CTA block
- Share section
- Related posts
- Knowledge node pills

---

## ANIMATION & TRANSITION PATTERNS

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Intro fade out | `intro.hidden` class | 1s | ease |
| Site wrapper fade in | `site-wrapper.visible` class | 0.8s | ease |
| Hero word reveal | `.word-inner.revealed` class | 0.6s | cubic-bezier(0.16, 1, 0.3, 1) |
| Hero word stagger | Per-word `transitionDelay` | 50ms increments | — |
| Section layer slide in | `body.page-open` class | 0.6s | cubic-bezier(0.16, 1, 0.3, 1) |
| Detail panel slide in | `.detail-panel.active` class | 0.5s | cubic-bezier(0.16, 1, 0.3, 1) |
| Nav overlay fade in | `.nav-overlay.active` class | 0.3s | ease |
| Form modal fade in | `.form-modal.active` class | 0.3s | ease |
| Nav item hover | CSS :hover | 0.3s | ease |
| Orange accent bar | CSS :hover + ::after | 0.3s | ease |
| Notification strip | `.visible` class | 0.4s | ease |
| Nav prefix drift | @keyframes drift | 6s | ease-in-out infinite |

---

## THIRD-PARTY DEPENDENCIES

| Service | Purpose | Loading |
|---------|---------|---------|
| Google Fonts | Space Mono font | `<link>` in `<head>` |
| Google Analytics | Site analytics | `<script async>` gtag.js |
| HubSpot Forms | Contact/apply forms | `<script defer>` |

### HubSpot Integration
```javascript
// Form rendering via HubSpot JS API
hbspt.forms.create({
    region: 'na1',
    portalId: '47610301',
    formId: '[form-specific-id]',
    target: '.form-modal-body'
});
```

---

## DEPLOYMENT NOTES

- No build step required. Deploy by copying files to any static host.
- The Python dev server (`python3 -m http.server 8000`) must be run from the `website-main/` directory root.
- CSS cache busting: Blog pages use `?v=6` query strings on CSS `<link>` tags. Increment on changes.
- SPA routing requires server-side URL rewriting in production (all non-file routes should serve `index.html`). Blog routes (`/resources/blogs/*`) should serve their own `index.html` files directly.

---

## MANDATORY INSTRUCTIONS FOR CLAUDE

When rebuilding from approved mockups:

1. **Do not invent content.** All text comes from `01-CONTENT-BIBLE.md`. If content needs to change, the user will provide it.

2. **Do not change the tech stack.** Vanilla HTML/CSS/JS only. No frameworks, no build tools, no npm.

3. **Preserve all SEO.** Every meta tag, OG tag, canonical URL, and structured data from `seo-config.js` must be maintained.

4. **Preserve all HubSpot form IDs.** The portal ID and three form IDs are business-critical integrations.

5. **Preserve all external links.** LinkedIn, YouTube, Substack, app sign-in URLs must not change.

6. **Preserve blog content exactly.** The 14 blog posts in `blog-data.js` contain full article HTML. Do not modify article content.

7. **Preserve URL structure.** All SPA routes (/experts, /enterprises, /developers, /about, /contact) and blog routes (/resources/blogs/[slug]/) must resolve correctly. 301 redirects exist for legacy URLs (/brands → /enterprises, /builders → /developers).

8. **Preserve Google Analytics.** The GA4 tracking ID (G-YQSPJRDC08) must remain in `<head>`.

9. **Font files stay in `/public/font/`.** Do not move or rename font files.

10. **The presentation deck (`sales preso/`) and theme guide (`Notes (Walkie Talkie) Scoping/99R Feb15 Theme.md`) are the canonical brand references.** When mockups reference brand language, visual patterns, or design energy, defer to these documents.

11. **The intro video (`/public/animations/intro.mp4`) is a sourced brand asset and MUST be preserved.** It plays once per browser session (first visit only) on all devices including mobile. On mobile it uses `object-fit: contain` with `#C8A84E` background. Uses `sessionStorage` (not `localStorage`) so it resets when the browser session ends. Do not replace, regenerate, or remove this video. The session-gating logic is documented in `02-SITE-ARCHITECTURE.md` under STATE 1.

---

*END OF TECHNICAL SPEC. This document describes every implementation detail needed to rebuild the site from approved mockups without losing any functionality, content, or integration.*
