# 99Ravens — Code Audit Report
### Cleanup recommendations, organized by priority

---

## Critical (Do First)

### 1. Console.log in Production
**File:** `blog-cms/admin/js/admin.js` (lines ~252-253)
```js
console.log('Post saved:', postData);
console.log('Updated posts:', this.posts);
```
**Fix:** Remove both lines.

### 2. Large Unoptimized Images
| File | Size | Action |
|------|------|--------|
| `public/99RavensBrandConcept.pdf` | 8.8 MB | Remove from public (not served) |
| `public/uploads/blog/99ravens_ai_interviewer.png` | 1.9 MB | Compress to WebP, target <300KB |
| `public/paper-texture.jpg` | 1.1 MB | Compress to <200KB (repeating tile) |

### 3. Missing Accessibility Attributes
- Intro video (`<video>` tag) — add `aria-label="99Ravens intro animation"`
- Logo SVGs in header and overlay — add `aria-label="99Ravens logo"`
- Social link SVGs — add `aria-label` to each (LinkedIn, YouTube)
- All interactive SVG buttons need `role="img"` + `aria-label`

---

## Moderate (Do Soon)

### 4. Dead Files — ~30MB Reclaimable
| Directory/File | Size | Action |
|----------------|------|--------|
| `Feb 15 Proposed Site Overhaul/` | 11 MB | Delete (mockups, duplicate fonts) |
| `REBUILD-DOCS/99Ravens_Logo-Header_Yas 2.mp4` | 2.7 MB | Delete (duplicate of intro.mp4) |
| `public/animations/intro.mov` | 1.1 MB | Delete (mp4 version is the one used) |

### 5. Missing Favicon Files
`public/site.webmanifest` references icons that may not exist. Generate a proper favicon set (16x16, 32x32, 180x180, favicon.ico) from the logo PNG.

### 6. Keyboard Focus Indicators
Add `:focus-visible` outlines to all interactive elements:
```css
:focus-visible {
    outline: 2px solid var(--color-orange);
    outline-offset: 2px;
}
```

### 7. Modal Focus Trapping
`openFormModal()` and `openDetail()` should trap focus within the panel and return focus when closed.

### 8. No Error Handling on Form Load
`script.js` — HubSpot form creation (line ~648) has no fallback if `hbspt.forms` fails to load. Add try/catch and a user-facing message.

---

## Minor (Do Eventually)

### 9. Manual Cache Busting
`styles.css?v=83` and `script.js?v=71` — easy to forget. Will be resolved when deploying via Vercel (content hashing).

### 10. Unused CSS Class `.noise`
`styles.css` line 437: `.noise { display: none; }` — the `.noise` div in HTML does nothing. Remove both.

### 11. Consolidate Similar Animations
`breathe`, `pulse`, `drift` keyframes have overlapping purposes. Consider merging into one or two.

### 12. Spacing Tokens
Currently using hardcoded pixel values for border-width (1px), bar widths (3px), etc. Consider adding:
```css
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-3: 1rem;
/* etc. */
```

### 13. Blog CMS Admin is Client-Side Only
`blog-cms/admin/js/admin.js` has a note: "In a real implementation, you would save to a backend here." Clarify if a backend CMS is planned or if static generation is the path.

---

## What's Already Good

- CSS variable system is well-structured with semantic tokens
- SEO config is comprehensive (`seo-config.js`)
- Responsive breakpoints cover all major sizes
- No `.env` files or credentials exposed
- Clean file organization for a vanilla site
- Proper `gitignore` setup
- Font preloading and async script loading

---

## Estimated Impact

| Category | Savings |
|----------|---------|
| Delete dead files | ~30 MB repo size |
| Optimize images | ~3 MB bandwidth per visit |
| Fix accessibility | WCAG AA compliance |
| Remove console.logs | Cleaner production |

---

*Audit date: Feb 2026*
