# 99RAVENS.AGENCY — SITE ARCHITECTURE
## Page states, content hierarchy, user flows, and functional requirements. NO layout or visual prescriptions.

> **IMPORTANT: This document describes WHAT each page must contain and HOW pages connect. It says NOTHING about WHERE things are positioned, what grid/layout to use, or how things look. All visual and compositional decisions belong to the designer.**

---

## SITE TYPE
Single Page Application (SPA) with History API routing. One `index.html` serves all main page states. Blog/Resources are separate static HTML files with their own CSS/JS.

---

## PAGE STATES

The site has **7 functional states:**

```
STATE 1: INTRO → STATE 2: HOME
STATE 2: HOME → STATE 3, 4, 5, or 7
STATE 3: SECTION PAGE → STATE 6 (form), or navigate between sections
STATE 4: DETAIL PAGE → close back to home
STATE 5: NAV OVERLAY → navigate to any state
STATE 6: FORM MODAL → close back to section
STATE 7: RESOURCES → standalone pages (index + articles)
```

---

## STATE 1: INTRO (VIDEO ANIMATION)

> **MANDATORY: This intro video is a sourced brand asset. It MUST be preserved in any rebuild. The video file and the session-gating logic below are non-negotiable.**

**URL:** / (initial load only)
**Video file:** `/public/animations/intro.mp4` (2.7MB, 5668x3774 landscape — do not replace or regenerate)

### First-Visit-Only Gating Logic

The intro plays **exactly once per browser session**, then never again until the session expires:

1. **First visit in session:** Video plays. User watches, then enters site.
2. **Return visit in same session:** Intro skipped. User goes straight to home.
3. **New session (browser reopened):** Video plays again.
4. **Mobile (width <= 768px):** Intro plays with `object-fit: contain` and `#C8A84E` background. Enter button scales up for touch targets.

### Implementation
- `sessionStorage` (not `localStorage`) — resets when browser session ends
- Sets `hasSeenIntro = true` after first entry
- Checks on page load; if set, skip intro entirely

### User Controls
- Skip/Enter button available for impatient users
- Enter key also triggers skip
- If video fails to load: auto-enter after 500ms (graceful fallback)

### Post-Intro Sequence
- Intro fades out → Home fades in → Hero text animates → URL routing resolves → Notification strip appears

---

## STATE 2: HOME

**URL:** /

### Content Hierarchy (in order of importance)
1. **Hero message** — The primary brand statement (2 lines of headline text + description paragraph, see Content Bible)
2. **Section navigation** — 3 audience entry points: Experts, Enterprises, Developers
3. **Secondary navigation** — About, Resources, Contact
4. **Social links** — LinkedIn, YouTube
5. **Persistent header** — Logo + Menu button (present on all states)
6. **Notification strip** — Dismissible topbar promoting latest content

### Functional Requirements
- Hero text should have an entrance animation (word-by-word reveal, staggered)
- Section navigation must be immediately visible — these are the 3 core audience paths
- Clicking a section entry point → STATE 3
- Clicking About or Contact → STATE 4
- Clicking Resources → leaves SPA, loads /resources/blogs/
- Clicking Menu → STATE 5
- Clicking Logo → returns to home from any state

### Notification Strip
- Appears after site loads (slight delay)
- Contains: label ("New") + linked headline text
- User can dismiss it (close button)
- When visible, content below should accommodate it (not be covered)
- Dismissed state persists within the page session

---

## STATE 3: SECTION PAGE

**URLs:** /experts, /enterprises, /developers
**3 sections, navigable sequentially**

### Content Hierarchy Per Section
1. **Section label** — Number + audience identifier (e.g., "01 FOR EXPERTS")
2. **Subtitle** — One-line display statement (see Content Bible)
3. **Description** — Paragraph explaining the value proposition
4. **CTA button** — Primary action (opens form modal)
5. **Service/Solution index** — Numbered list of offerings, each with title + description

### Section Data Summary

| Section | # of Index Items | CTA Text |
|---------|-----------------|----------|
| Experts | 4 | Apply for Representation |
| Enterprises | 4 | Work with us |
| Developers | 4 | Request access to the repo |

### Functional Requirements
- User can navigate between sections (prev/next)
- Arrow key navigation (← →) when section is active
- Previous disabled on first section, Next disabled on last
- Index items can expand/collapse to reveal descriptions
- CTA button → STATE 6 (form modal)
- Escape or Logo click → return to home
- Content is generated dynamically from data (not hardcoded HTML)

---

## STATE 4: DETAIL PAGE

**URLs:** /about, /contact

### Content: About (/about)

**Information hierarchy:**
1. **Headline** — "Expertise is everything."
2. **Philosophy statement** — Summary of the company's reason for existing
3. **Founder letter** — 10-paragraph first-person narrative (full text in Content Bible)
4. **Signature block** — Photo, name (linked to LinkedIn), title

### Content: Contact (/contact)

**Information hierarchy:**
1. **Headline** — "Real intelligence."
2. **Supporting statement** — Brief invitation to get in touch
3. **Contact emails** — 3 categories: General, Representation, Licensing
4. **Office network** — 4 cities: San Francisco, Waterloo, Los Angeles, Toronto (each with a function label like "Engineering Office")

### Functional Requirements
- Close/dismiss action returns to home
- Logo click returns to home
- Escape key closes
- Content area should be scrollable if it exceeds viewport

---

## STATE 5: NAV OVERLAY

**Trigger:** Menu button in header

### Content Hierarchy
1. **Logo mark** — Brand identity anchor
2. **Primary links** — The 3 section links (numbered: 01, 02, 03)
3. **Secondary links** — About, Resources, Contact, Sign in
4. **Brand tagline** — "Expertise becomes :software. / Anything but artificial."
5. **Footer** — Copyright + social links
6. **Close control** — Dismiss the overlay

### Functional Requirements
- Full-screen overlay (covers everything)
- Clicking a section link → STATE 3 (overlay closes)
- Clicking About/Contact → STATE 4 (overlay closes)
- Clicking Resources → navigates to /resources/blogs/
- Clicking Sign in → external link (https://app.99ravens.ai/u/login)
- Close button, Escape, or clicking outside → dismiss
- Gold surface background is a brand requirement from the theme guide

---

## STATE 6: FORM MODAL

**Trigger:** CTA button on section page

### Content Hierarchy
1. **Modal title** — Matches the CTA text (e.g., "Apply for Representation")
2. **HubSpot embedded form** — Rendered via JS API
3. **Close control**

### Functional Requirements
- Modal overlays current view with backdrop
- Close via button, backdrop click, or Escape
- Body scroll locked while modal is open
- HubSpot form IDs are business-critical — see Technical Spec for portal/form IDs

---

## STATE 7a: RESOURCE INDEX

**URL:** /resources/blogs/
**Separate HTML file** (not part of SPA)

### Content Hierarchy
1. **Header** — Logo (icon + wordmark) + Menu button
2. **Page hero** — Title ("Resources") + subtitle
3. **Filter controls** — Category filters: All, AI, Strategy, Case Studies, Culture
4. **Article count** — "Showing X articles"
5. **Article list** — Numbered entries, each showing: date, category, title, excerpt, author
6. **Footer** — Copyright, social links, swatch bar
7. **Nav overlay** — Same gold overlay as main site (accessible via Menu)

### Functional Requirements
- Filters update the visible list dynamically (JS)
- Articles link to their individual pages
- Has its own CSS and JS (independent from main SPA)
- Must include the same nav overlay with logo and close button

---

## STATE 7b: ARTICLE PAGE

**URL:** /resources/blogs/[slug]/
**14 separate HTML files** (one per post)

### Content Hierarchy
1. **Header** — Logo + Menu
2. **Article hero** — Back link, category, title, author + date
3. **Article body** — Full HTML content (headings, paragraphs, lists, images, links)
4. **CTA block** — Invitation to engage ("Want to see how this applies to your team?")
5. **Share section** — Twitter, LinkedIn, Copy Link
6. **Related posts** — Up to 3 related articles (numbered list)
7. **Footer** — Copyright, social links, swatch bar
8. **Nav overlay** — Same as other pages

### Functional Requirements
- Article content comes from `blog-data.js` and is rendered by JS
- Back link returns to Resource Index
- Share buttons work (Twitter intent, LinkedIn share, clipboard copy)
- Related posts are determined by matching category
- Has its own CSS (post.css layered on main.css)

---

## USER FLOWS

### Flow 1: New Visitor
Intro video → Home → Browse sections → Read about a service → Submit form

### Flow 2: Returning Visitor (same session)
Home (no intro) → Navigate via menu or dock → Read content → Contact

### Flow 3: Direct URL
Arrives at /experts or /about → Intro skipped if returning → Lands directly on that state

### Flow 4: Blog Reader
Arrives at /resources/blogs/ (or direct article link) → Reads article → May click through to related articles → May navigate to main site via header logo or menu

### Flow 5: Mobile
Intro video plays (object-fit: contain) → Home (responsive, single column) → `.main-content` scrolls if content exceeds viewport → Same functional states but layout adapts to single column

---

## URL ROUTING TABLE

| URL | State | Type |
|-----|-------|------|
| / | Home | SPA |
| /experts | Section: Experts | SPA |
| /enterprises | Section: Enterprises | SPA |
| /developers | Section: Developers | SPA |
| /about | Detail: About | SPA |
| /contact | Detail: Contact | SPA |
| /brands | 301 redirect to /enterprises | Vercel redirect |
| /builders | 301 redirect to /developers | Vercel redirect |
| /resources/blogs/ | Resource Index | Separate HTML |
| /resources/blogs/[slug]/ | Article Page | Separate HTML |

### Routing Requirements
- SPA routes use History API (`pushState`/`popstate`)
- Browser back/forward must work correctly between all SPA states
- Unknown routes redirect to /
- /resources/* paths load their own HTML files (not handled by SPA)
- Each route change updates page title, meta tags, and canonical URL

---

## KEYBOARD NAVIGATION

| Key | Context | Action |
|-----|---------|--------|
| Enter | Intro visible | Enter site |
| Escape | Any overlay/modal/panel | Close/dismiss (priority: form > panel > overlay > section) |
| ← | Section page | Previous section |
| → | Section page | Next section |

---

## RESPONSIVE REQUIREMENTS

- All states must work on mobile (down to 320px width)
- All states must work on short viewports (down to 750px height, for laptops)
- Intro video plays on mobile with `object-fit: contain` and scaled-up Enter button
- Content must be scrollable on mobile (`.main-content` is the scroll container)
- Designer determines how layout adapts — this doc does not prescribe mobile layouts

---

*END OF SITE ARCHITECTURE. This document describes what each page contains, how pages connect, and what the functional requirements are. It intentionally says nothing about layout, composition, typography scale, color application, or visual treatment — those decisions belong entirely to the designer and the approved mockups.*
