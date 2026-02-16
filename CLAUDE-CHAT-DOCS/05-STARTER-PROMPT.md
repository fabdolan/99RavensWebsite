# Starter Prompt for Claude Chat

Copy everything below the line and paste it as your first message in a new Claude Chat conversation. Then attach the files listed at the bottom.

---

I need you to rebuild a website with a completely new visual theme. I'm providing the full source code and documentation of the existing site so you understand the structure, content, and functionality. Your job is to recreate this site with the same content, navigation, and behavior but apply my new theme (which I'll describe/provide separately).

## What This Site Is
A single-page application (SPA) for 99Ravens, a talent agency for marketing experts in the AI age. It's built with vanilla HTML, CSS, and JavaScript (no framework, no build tools). One `index.html` file handles all routes using the browser History API.

## Attached Files — Read All of These First

1. **01-SITE-ARCHITECTURE.md** — How the site works technically: routing, file structure, SPA pattern, layout system, animations, responsive breakpoints, external dependencies
2. **02-SITEMAP.md** — Every page/route, what content appears on each, navigation structure, all CTAs and their form IDs, all external links
3. **03-DESIGN-SYSTEM.md** — The CURRENT theme (colors, typography, spacing, animations, hover states, visual signature). You will REPLACE this theme with my new one, but use this as a reference for what design decisions need to be made.
4. **04-COMPONENT-INVENTORY.md** — Every UI component, its CSS classes, HTML structure, and behavior. These components need to exist in the rebuild with equivalent functionality.
5. **index.html** — The main HTML file (234 lines)
6. **styles.css** — All CSS (1951 lines)
7. **script.js** — All JavaScript logic, content data, routing, event handlers (741 lines)
8. **seo-config.js** — SEO metadata per page (117 lines)
9. **persona.md** — Brand voice and personality guidelines

## What I Need You To Do

### Phase 1: Understand
- Read all documentation files first to understand the site architecture
- Read all code files to understand the implementation
- Confirm you understand the full scope before proceeding

### Phase 2: Apply New Theme
Once I provide my new theme (colors, fonts, visual direction), rebuild the site with:
- **Same content** — All text, copy, descriptions, CTAs remain identical
- **Same structure** — Same pages, same routes, same navigation hierarchy
- **Same functionality** — SPA routing, section switching, detail panels, form modals, keyboard navigation, responsive behavior, intro animation
- **New visual design** — New colors, fonts, spacing, animations, hover states based on the theme I provide
- **Same external integrations** — HubSpot forms (same IDs), Google Analytics (same tag), same social links

### Phase 3: Deliver
Output the complete rebuilt site as 4 files:
1. `index.html`
2. `styles.css`
3. `script.js`
4. `seo-config.js`

## Important Rules
- Do NOT use any framework (React, Vue, etc.). Keep it vanilla HTML/CSS/JS.
- Do NOT add a build step. The site must work by opening `index.html` or deploying the folder to Vercel.
- Do NOT change any text content, page routes, or HubSpot form IDs.
- Do NOT restructure the SPA routing logic — it works and must stay the same.
- Keep the blog section as a separate link (it has its own HTML files, not part of this rebuild).
- The site must remain responsive with equivalent mobile behavior.

## Next Step
After you've read everything, confirm you understand and ask me for my new theme. I'll then provide the new color palette, fonts, and visual direction for you to apply.
