# 99Ravens — Vercel Launch Plan
### Step-by-step deployment guide

---

## Current State

The site is already partially configured for Vercel:
- `vercel.json` exists with redirects, rewrites, and output config
- `.vercelignore` excludes `blog-cms/admin/`, `node_modules/`, `.git/`
- No build step required — this is a static site served directly
- Domain: `99ravens.agency` (needs to be pointed to Vercel)

---

## Pre-Launch Checklist

### 1. Code Cleanup (from Audit)
- [ ] Remove `console.log` statements from `blog-cms/admin/js/admin.js`
- [ ] Compress `public/paper-texture.jpg` to <200KB
- [ ] Compress blog images to WebP
- [ ] Delete `Feb 15 Proposed Site Overhaul/` directory
- [ ] Delete duplicate video files (`intro.mov`, logo mp4 in REBUILD-DOCS)
- [ ] Remove the `.noise` div and CSS class

### 2. Update Cache Bust Versions
- [ ] Bump `styles.css?v=83` to final version number
- [ ] Bump `script.js?v=71` to final version number
- [ ] (Vercel CDN handles caching, but query strings still help during dev)

### 3. Verify vercel.json Configuration

Current config is mostly correct. One issue to address:

**The catch-all rewrite** sends ALL routes to `index.html`:
```json
{ "source": "/(.*)", "destination": "/index.html" }
```

This is correct for the SPA routing (`/experts`, `/brands`, `/builders`, `/about`, `/contact`) but the blog pages at `/resources/blogs/` have their own HTML files. Vercel processes rewrites AFTER checking for static files, so blog HTML files will be served directly — **this should work as-is.**

**Verify the redirect chain:**
- `/blog-cms/admin/*` → `/404` (blocks admin panel) ✓
- `/request-a-demo` → `/contact` (legacy redirect) ✓
- `/nnr-admin` → WordPress admin (legacy) — consider removing after full migration

### 4. Add Security Headers
Add to `vercel.json`:
```json
"headers": [
  {
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "DENY" },
      { "key": "X-XSS-Protection", "value": "1; mode=block" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]
  },
  {
    "source": "/public/(.*)",
    "headers": [
      { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
    ]
  }
]
```

### 5. Add Custom 404 Page
Currently no custom 404. Create a simple `404.html` that matches the site design and auto-redirects to home after 3 seconds.

---

## Deployment Steps

### Step 1: Push to GitHub
```bash
git add -A
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New" → "Project"
3. Import the GitHub repository (`website-main`)
4. Framework Preset: **Other** (not Next.js)
5. Build Command: *leave empty*
6. Output Directory: `.` (root)
7. Install Command: *leave empty*
8. Click "Deploy"

### Step 3: Configure Domain
1. In Vercel dashboard → Settings → Domains
2. Add `99ravens.agency`
3. Add `www.99ravens.agency` (redirect to apex)
4. Update DNS records at your registrar:
   - **A Record:** `@` → `76.76.21.21`
   - **CNAME:** `www` → `cname.vercel-dns.com`
5. Wait for DNS propagation (usually 5-30 minutes)
6. Vercel auto-provisions SSL certificate

### Step 4: Verify Deployment
- [ ] Homepage loads with intro animation
- [ ] All 3 sections open correctly (`/experts`, `/brands`, `/builders`)
- [ ] About page loads (`/about`)
- [ ] Contact page loads (`/contact`)
- [ ] Blog index loads (`/resources/blogs/`)
- [ ] Individual blog posts load
- [ ] Form modals open (HubSpot forms render)
- [ ] Paper texture visible
- [ ] Notification strip appears
- [ ] Mobile responsive layout works
- [ ] Menu overlay opens/closes
- [ ] Browser back/forward navigation works
- [ ] Legacy redirects work (`/request-a-demo` → `/contact`)
- [ ] `/blog-cms/admin/` returns 404 (not accessible)
- [ ] SSL certificate active (green lock)
- [ ] Social share (OG tags) preview correctly

### Step 5: Post-Launch
- [ ] Test Google Analytics is receiving data
- [ ] Submit sitemap to Google Search Console
- [ ] Test all HubSpot forms submit successfully
- [ ] Run Lighthouse audit (target 90+ performance)
- [ ] Set up Vercel Analytics (optional, free tier)
- [ ] Configure Vercel Speed Insights (optional)

---

## Environment Variables

No environment variables needed — all configuration is client-side:
- Google Analytics: hardcoded in `index.html`
- HubSpot: hardcoded in `script.js`
- These are public-facing tracking IDs, not secrets

---

## Ongoing Deployment

Once connected, Vercel will auto-deploy on every push to `main`:
- **Production:** `main` branch → `99ravens.agency`
- **Preview:** Any PR or branch → `*.vercel.app` preview URL

### Recommended Git Workflow
1. Create feature branches for changes
2. Push → Vercel creates preview deploy
3. Review preview URL
4. Merge to `main` → auto-deploys to production

---

## Cost Estimate

Vercel Hobby (Free) tier includes:
- Unlimited static deployments
- 100GB bandwidth/month
- Automatic SSL
- Global CDN (edge network)
- Preview deployments

**This site should run entirely on the free tier.** If traffic exceeds 100GB/month, upgrade to Pro ($20/month) for 1TB bandwidth.

---

## Potential Issues & Solutions

| Issue | Solution |
|-------|----------|
| Blog pages 404 | Verify `/resources/blogs/*/index.html` files are being deployed (check `.vercelignore`) |
| SPA routes 404 on direct access | The catch-all rewrite in `vercel.json` handles this |
| Fonts not loading | Ensure `/public/font/` is not in `.vercelignore` |
| Large deploy size | Clean up dead files per audit (saves ~30MB) |
| WordPress admin redirect | Remove `/nnr-admin` redirect from `vercel.json` when WordPress is fully decommissioned |

---

*Plan date: Feb 2026*
