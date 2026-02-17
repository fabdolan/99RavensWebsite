# 99Ravens Site Architecture Reference

## Tech Stack
- **Framework:** None. Pure vanilla HTML/CSS/JavaScript (no React, no build tools)
- **Deployment:** Vercel (static hosting, no build step)
- **Forms:** HubSpot embedded forms (3 forms, loaded on-demand)
- **Analytics:** Google Analytics GA4 (tag: G-YQSPJRDC08)
- **Fonts:** ES Klarheit Grotesk Mono (custom .otf files) + IBM Plex Mono & IBM Plex Sans (Google Fonts CDN)

## How the Site Works (SPA Pattern)
This is a **single-page application** built without a framework. One `index.html` file handles all main pages. JavaScript uses the browser History API to swap content in and out without full page reloads.

### Core Files (4 files = the entire main site)
| File | Purpose | Lines |
|------|---------|-------|
| `index.html` | HTML shell: header, hero, nav dock, section layer, detail panel, form modal | ~280 |
| `styles.css` | All CSS: variables, layout, components, animations, responsive breakpoints | ~2070 |
| `script.js` | All JS: data objects, routing, DOM manipulation, event handlers, animations | ~750 |
| `seo-config.js` | SEO metadata per route, updates `<meta>` tags on navigation | ~120 |

### How Routing Works
1. User lands on `index.html` (always, via Vercel rewrite rules)
2. `handleInitialRoute()` reads `window.location.pathname`
3. Maps path to a handler: `/experts` -> `openSection('experts')`, `/about` -> `openDetail('about')`, etc.
4. `history.pushState()` updates the URL bar without reload
5. `popstate` event handles browser back/forward buttons

### How Content Is Stored
All page content lives as **JavaScript objects** inside `script.js`:
- `submenuData` object: content for Experts, Enterprises, Developers sections (titles, descriptions, service items, CTAs)
- `contentData` object: content for About and Contact pages (headlines, body HTML, footer text)
- `formConfig` object: HubSpot form IDs for each section's CTA form

There is no database, no CMS, no markdown files for the main site. Content is hardcoded in JS.

### Page States / Views
The site has 4 visual states, all achieved by toggling CSS classes:

1. **Home** (default): Hero text + 3 vertically-stacked nav items (mobile) or 2-column grid (desktop) + secondary nav
2. **Section** (Experts/Enterprises/Developers): Section layer slides up from bottom, showing a two-column layout (statement left, index right)
3. **Detail** (About/Contact): Full-screen overlay panel, two-column layout (hero left, content right)
4. **Form Modal**: Dark backdrop overlay with centered HubSpot form

### CSS Class Triggers
- `body.page-open` -> shows section layer, hides main content
- `.detail-panel.active` -> shows about/contact overlay
- `.form-modal.active` -> shows form modal
- `.nav-overlay.active` -> shows hamburger dropdown menu
- `.site-wrapper.visible` -> fades in main site after intro

## Layout System
**CSS Grid** drives the main layout:
```
.layout-grid {
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 1fr minmax(150px, auto);
}
```

- Top row spans full width: hero headline
- Bottom-left: 3-column nav dock (sub-grid of 3 equal columns)
- Bottom-right: secondary nav (About, Resources, Contact, social links)

**Section pages** use a different grid:
```
.section-content {
  grid-template-columns: 1fr 320px;
}
```
- Left: statement area (header, big subtitle, description + CTA)
- Right: index sidebar (numbered list of services/solutions, expandable on click)

**Detail panels** use flexbox:
- 50/50 split: left panel (logo, hero text, footer) | right panel (scrollable content)

## Animation System
All animations are CSS-only:
- `traceBorder`: Animated border line around viewport on load
- `breathe`: Subtle opacity pulse on accent text
- `drift`: Gentle vertical float on nav prefixes
- `pulse`: Orange accent element pulse
- `subtleSpin`: Logo rotation on hover
- `fadeIn`: Intro skip button fade
- `nodePulse`: Contact page map node animation
- Word reveal: JS splits hero text into `<span>` words, staggers CSS `transition-delay`, adds `.revealed` class

## Responsive Breakpoints
| Breakpoint | Target |
|-----------|--------|
| `max-height: 900px` | 14" laptop screens |
| `max-height: 750px` | Short viewports |
| `max-height: 600px` | Very short viewports |
| `max-width: 1200px` | Medium-large screens |
| `max-width: 900px` | Tablets / small laptops |
| `max-width: 768px` | Mobile phones |
| `max-width: 600px` | Small mobile (form modal) |

On mobile (768px and below):
- Grid collapses to single column
- Intro video plays with `object-fit: contain` (background: #C8A84E to match video)
- Enter button scales up for mobile tap targets
- Nav items stack vertically; `.main-content` is the scroll container if content exceeds viewport
- Detail panels stack vertically (left on top, right below)
- Section panels stack vertically
- Close button becomes fixed position

## Blog Subsystem (Separate from Main Site)
The blog lives at `/resources/blogs/` and is a **completely separate set of HTML files** - not part of the SPA. Each blog post is a static HTML file in its own directory. The blog has its own CSS and JS files under `/blog-cms/`. The main site links to the blog but does not render it within the SPA.

## External Dependencies
| Dependency | URL / Source |
|-----------|-------------|
| Google Fonts | `https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:...&family=IBM+Plex+Sans:...` |
| HubSpot Forms | `https://js.hsforms.net/forms/embed/47610301.js` |
| Google Analytics | `https://www.googletagmanager.com/gtag/js?id=G-YQSPJRDC08` |
| ES Klarheit Grotesk Mono | Local files: `public/font/ESKlarheitGroteskMono-Rg.otf` and `ESKlarheitGroteskMono-It-Trial.otf` |

## Deployment Config
Vercel rewrites all routes to `index.html` (SPA pattern). Key redirects:
- `/request-a-demo*` -> `/contact`
- `/about-us*` -> `/about`
- `/blog-cms/admin*` -> `/404` (hidden)
- `/brands` -> `/enterprises` (301 permanent redirect)
- `/builders` -> `/developers` (301 permanent redirect)
