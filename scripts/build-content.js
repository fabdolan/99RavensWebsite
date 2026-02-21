'use strict';

// Auto-generated static site builder for 99Ravens content pipeline.
// Run via: npm run build
//
// Reads all .md files from /content/, parses frontmatter + body,
// stamps them into HTML templates, writes output files, and regenerates
// /blog-cms/src/js/blog-data.js.

const fs = require('fs-extra');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// ─── Paths ────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(__dirname, 'templates');
const CONTENT_DIRS = {
  articles:      path.join(ROOT, 'content', 'articles'),
  'case-studies': path.join(ROOT, 'content', 'case-studies'),
  'white-papers': path.join(ROOT, 'content', 'white-papers'),
};
const BLOG_DATA_PATH = path.join(ROOT, 'blog-cms', 'src', 'js', 'blog-data.js');

// ─── Template cache ───────────────────────────────────────────────────────────

const templates = {
  article:      fs.readFileSync(path.join(TEMPLATES_DIR, 'article.html'), 'utf8'),
  'case-study': fs.readFileSync(path.join(TEMPLATES_DIR, 'case-study.html'), 'utf8'),
  'white-paper': fs.readFileSync(path.join(TEMPLATES_DIR, 'white-paper.html'), 'utf8'),
};

// ─── Helper functions ─────────────────────────────────────────────────────────

function getInitials(name) {
  if (!name) return '99';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function getCategoryLabel(category) {
  const map = {
    strategy:       ':Strategy',
    ai:             ':AI Agents',
    platform:       ':Platform',
    'case-studies': ':Case Studies',
    engineering:    ':Engineering',
    'white-papers': ':White Papers',
  };
  return map[category] || ':Resources';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

// ─── Template injection ───────────────────────────────────────────────────────

/**
 * Replace every {{token}} in templateStr with the corresponding value from vars.
 * Tokens with no matching key are replaced with an empty string.
 */
function inject(templateStr, vars) {
  return templateStr.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = vars[key];
    if (value === undefined || value === null) return '';
    return String(value);
  });
}

// ─── CTA blocks ───────────────────────────────────────────────────────────────

function buildArticleCtaBlock() {
  return `<div class="article-cta">
    <div class="article-cta-label">Work with us</div>
    <h3>Expert knowledge becomes working software.</h3>
    <p>We codify expertise for senior practitioners and the enterprises that want to build with it. Tell us what you're solving.</p>
    <a href="mailto:hello@99ravens.ai" class="article-cta-btn">Start a conversation</a>
  </div>`;
}

function buildSubstackBlock() {
  return `<div class="article-cta">
    <div class="article-cta-label">Newsletter</div>
    <h3>Our expertise, delivered.</h3>
    <p>New issues on tacit knowledge, expertise codification, and the future of work. Written by Fab Dolan.</p>
    <a href="https://fabdolan.substack.com" class="article-cta-btn">Subscribe</a>
  </div>`;
}

function buildCaseStudyCtaBlock() {
  return `<div class="inline-cta">
    <div class="inline-cta-label">Next step</div>
    <div class="inline-cta-headline">Your expertise deserves the same infrastructure.</div>
    <div class="inline-cta-body">We build expertise systems for organizations that want AI trained on how their best people think.</div>
    <a href="mailto:hello@99ravens.ai" class="btn-cta">Work with us</a>
  </div>`;
}

function buildWhitepaperCtaBlock() {
  return `<div class="inline-cta">
    <div class="inline-cta-label">Work with us</div>
    <div class="inline-cta-headline">Expert knowledge becomes working software.</div>
    <div class="inline-cta-body">We codify expertise for senior practitioners and the enterprises that want to build with it. Tell us what you're solving.</div>
    <a href="mailto:hello@99ravens.ai" class="btn-cta">Start a conversation</a>
  </div>`;
}

// ─── Case study helpers ───────────────────────────────────────────────────────

/**
 * Split a markdown body on H2 headings and return a map of
 * heading text → rendered HTML for the section body beneath it.
 * e.g. { 'The Brief': '<p>...</p>', 'The Work': '...', 'The Evidence': '...' }
 */
function parseCaseSections(markdownBody) {
  const sections = {};
  // Split on lines that start with "## "
  const parts = markdownBody.split(/^## (.+)$/m);
  // parts[0] is content before the first H2 (usually empty)
  // parts then alternates: heading, content, heading, content …
  for (let i = 1; i < parts.length; i += 2) {
    const heading = parts[i].trim();
    const body    = parts[i + 1] ? parts[i + 1].trim() : '';
    sections[heading] = marked.parse(body);
  }
  return sections;
}

/**
 * Extract the first sentence of a section's markdown as a headline,
 * or fall back to a frontmatter field.
 */
function extractHeadline(markdownText) {
  if (!markdownText) return '';
  // Strip markdown formatting, take first sentence
  const plain = markdownText
    .replace(/[#*_`[\]()>]/g, '')
    .trim();
  const firstSentence = plain.split(/\.\s/)[0];
  return firstSentence ? firstSentence.trim() : '';
}

function buildStatsBlock(stats) {
  if (!stats || stats.length === 0) return '';
  const items = stats.map(s => `
    <div class="cs-stat">
      <div class="cs-stat-value">${s.value}</div>
      <div class="cs-stat-label">${s.label}</div>
    </div>`).join('');
  return `<div class="cs-stats">${items}</div>`;
}

// ─── White paper helpers ───────────────────────────────────────────────────────

function buildTocBlock(toc) {
  if (!toc || toc.length === 0) return '';
  const items = toc.map((chapter, i) =>
    `<li class="wp-toc-item"><span class="wp-toc-num">${String(i + 1).padStart(2, '0')}</span>${chapter}</li>`
  ).join('\n');
  return `<div class="wp-toc">
  <div class="wp-section-label">Contents</div>
  <ol class="wp-toc-list">
${items}
  </ol>
</div>`;
}

function buildDownloadSidebar(data) {
  if (data.gated) {
    return `<div class="dl-gated">
      <div class="dl-label">Get the full report</div>
      <p class="dl-body">Enter your email. We'll send the report directly. No sequences, no nurture tracks. Just the document.</p>
      <input type="email" class="dl-gated-input" placeholder="your@email.com">
      <button class="btn-cta dl-submit">Send me the report</button>
    </div>`;
  }
  return `<div class="dl-ungated">
    <div class="dl-meta">↓&nbsp;&nbsp;PDF · ${data.pageCount || 'PDF'}</div>
    <a href="${data.pdf || '#'}" class="btn-cta" download>Download the report</a>
  </div>`;
}

// ─── File discovery ───────────────────────────────────────────────────────────

/**
 * Recursively collect all .md file paths under a directory.
 */
function collectMdFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectMdFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

// ─── Per-type processors ──────────────────────────────────────────────────────

function processArticle(data, bodyHtml) {
  const vars = {
    title:          data.title || '',
    slug:           data.slug || '',
    canonicalUrl:   `https://www.99ravens.agency/resources/blogs/${data.slug}/`,
    description:    data.excerpt || data.metaDescription || '',
    ogImage:        data.image || 'https://www.99ravens.agency/public/og-image.png',
    author:         data.author || '99Ravens Team',
    authorTitle:    data.authorTitle || '99Ravens',
    authorInitials: data.authorInitials || getInitials(data.author),
    category:       data.category || 'strategy',
    categoryLabel:  data.categoryLabel || getCategoryLabel(data.category),
    date:           formatDate(data.date),
    dateIso:        data.date ? String(data.date) : '',
    content:        bodyHtml,
    articleCtaBlock: buildArticleCtaBlock(),
    substackBlock:  data.substack ? buildSubstackBlock() : '',
    readTime:       data.readTime ? `${data.readTime} min read` : '',
    // Clear any tokens the template may include but we don't provide
    relatedPostsBlock: '',
  };

  return inject(templates['article'], vars);
}

function processCaseStudy(data, markdownBody) {
  const sections = parseCaseSections(markdownBody);

  // Section content (rendered HTML)
  const briefContent    = sections['The Brief']    || marked.parse(data.briefContent    || '');
  const workContent     = sections['The Work']     || marked.parse(data.workContent     || '');
  const evidenceContent = sections['The Evidence'] || marked.parse(data.evidenceContent || '');

  // Section headlines: prefer explicit frontmatter fields, otherwise extract from content
  const briefRaw    = sections['The Brief']    ? Object.entries(sections).find(([k]) => k === 'The Brief')?.[1]    || '' : '';
  const workRaw     = sections['The Work']     ? Object.entries(sections).find(([k]) => k === 'The Work')?.[1]     || '' : '';
  const evidenceRaw = sections['The Evidence'] ? Object.entries(sections).find(([k]) => k === 'The Evidence')?.[1] || '' : '';

  const briefHeadline    = data.briefHeadline    || extractHeadline(briefRaw.replace(/<[^>]+>/g, ''))    || 'The Brief';
  const workHeadline     = data.workHeadline     || extractHeadline(workRaw.replace(/<[^>]+>/g, ''))     || 'The Work';
  const evidenceHeadline = data.evidenceHeadline || extractHeadline(evidenceRaw.replace(/<[^>]+>/g, '')) || 'The Evidence';

  const vars = {
    title:               data.title || '',
    slug:                data.slug || '',
    canonicalUrl:        `https://www.99ravens.agency/resources/case-studies/${data.slug}/`,
    description:         data.excerpt || data.metaDescription || '',
    ogImage:             data.image || 'https://www.99ravens.agency/public/og-image.png',
    author:              data.author || '99Ravens Team',
    authorTitle:         data.authorTitle || '99Ravens',
    authorInitials:      data.authorInitials || getInitials(data.author),
    category:            data.category || 'case-studies',
    categoryLabel:       data.categoryLabel || getCategoryLabel(data.category),
    date:                formatDate(data.date),
    dateIso:             data.date ? String(data.date) : '',
    briefHeadline,
    briefContent,
    workHeadline,
    workContent,
    evidenceHeadline,
    evidenceContent,
    statsBlock:          buildStatsBlock(data.stats),
    caseStudyCtaBlock:   buildCaseStudyCtaBlock(),
    continueReadingBlock: '',
  };

  return inject(templates['case-study'], vars);
}

function processWhitePaper(data, bodyHtml) {
  const vars = {
    title:                data.title || '',
    slug:                 data.slug || '',
    canonicalUrl:         `https://www.99ravens.agency/resources/white-papers/${data.slug}/`,
    description:          data.excerpt || data.metaDescription || '',
    ogImage:              data.image || 'https://www.99ravens.agency/public/og-image.png',
    author:               data.author || '99Ravens Team',
    authorTitle:          data.authorTitle || '99Ravens',
    authorInitials:       data.authorInitials || getInitials(data.author),
    category:             data.category || 'white-papers',
    categoryLabel:        data.categoryLabel || getCategoryLabel(data.category),
    date:                 formatDate(data.date),
    dateIso:              data.date ? String(data.date) : '',
    pageCount:            data.pageCount || '',
    abstractContent:      bodyHtml,
    tocBlock:             buildTocBlock(data.toc),
    downloadSidebarBlock: buildDownloadSidebar(data),
    whitepaperCtaBlock:   buildWhitepaperCtaBlock(),
    continueReadingBlock: '',
  };

  return inject(templates['white-paper'], vars);
}

// ─── Output path resolver ─────────────────────────────────────────────────────

function getOutputPath(type, slug) {
  switch (type) {
    case 'case-study':
      return path.join(ROOT, 'resources', 'case-studies', slug, 'index.html');
    case 'white-paper':
      return path.join(ROOT, 'resources', 'white-papers', slug, 'index.html');
    case 'article':
    case 'newsletter':
    default:
      return path.join(ROOT, 'resources', 'blogs', slug, 'index.html');
  }
}

// ─── blog-data.js writer ──────────────────────────────────────────────────────

function writeBlogData(posts) {
  // Sort by date descending
  const sorted = [...posts].sort((a, b) => {
    const da = a.publishedAt ? new Date(a.publishedAt) : new Date(0);
    const db = b.publishedAt ? new Date(b.publishedAt) : new Date(0);
    return db - da;
  });

  const postsWithIds = sorted.map((post, i) => ({ id: i + 1, ...post }));

  const lines = postsWithIds.map(p => {
    // Serialise each post entry; use JSON.stringify for safety on string fields
    return `    {
      id: ${p.id},
      title: ${JSON.stringify(p.title || '')},
      slug: ${JSON.stringify(p.slug || '')},
      excerpt: ${JSON.stringify(p.excerpt || '')},
      author: ${JSON.stringify(p.author || '')},
      authorTitle: ${JSON.stringify(p.authorTitle || '')},
      category: ${JSON.stringify(p.category || '')},
      categoryLabel: ${JSON.stringify(p.categoryLabel || '')},
      tags: ${JSON.stringify(p.tags || [])},
      featured: ${Boolean(p.featured)},
      image: ${JSON.stringify(p.image || '')},
      readTime: ${p.readTime !== undefined && p.readTime !== null ? Number(p.readTime) : 'null'},
      publishedAt: ${JSON.stringify(p.publishedAt || '')},
      status: ${JSON.stringify(p.status || 'published')},
      type: ${JSON.stringify(p.type || 'article')},
      substack: ${Boolean(p.substack)},
    }`;
  });

  const categoriesBlock =
    `  categories: [\n` +
    `    { id: 'strategy',     name: ':Strategy' },\n` +
    `    { id: 'ai',           name: ':AI Agents' },\n` +
    `    { id: 'platform',     name: ':Platform' },\n` +
    `    { id: 'case-studies', name: ':Case Studies' },\n` +
    `    { id: 'engineering',  name: ':Engineering' },\n` +
    `    { id: 'white-papers', name: ':White Papers' },\n` +
    `    { id: 'newsletter',   name: ':Newsletter' },\n` +
    `  ]`;

  const fileContent =
    `// Auto-generated by scripts/build-content.js — do not edit manually\n` +
    `const blogData = {\n` +
    `  posts: [\n` +
    lines.join(',\n') +
    `\n  ],\n` +
    categoriesBlock +
    `\n};\n`;

  fs.ensureDirSync(path.dirname(BLOG_DATA_PATH));
  fs.writeFileSync(BLOG_DATA_PATH, fileContent, 'utf8');
  console.log(`Updated: blog-cms/src/js/blog-data.js (${postsWithIds.length} posts)`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  let built = 0;
  let skipped = 0;
  const publishedPosts = [];

  // Collect all .md files across content directories
  const mdFiles = [];
  for (const [contentType, dir] of Object.entries(CONTENT_DIRS)) {
    const files = collectMdFiles(dir);
    for (const filePath of files) {
      mdFiles.push({ filePath, contentType });
    }
  }

  for (const { filePath, contentType } of mdFiles) {
    const raw = fs.readFileSync(filePath, 'utf8');
    const { data, content: markdownBody } = matter(raw);

    // Skip drafts
    if (data.status === 'draft') {
      console.log(`Skipped (draft): ${path.relative(ROOT, filePath)}`);
      skipped++;
      continue;
    }

    // Determine type from frontmatter; fall back to directory-based inference
    let type = data.type;
    if (!type) {
      if (contentType === 'case-studies') type = 'case-study';
      else if (contentType === 'white-papers') type = 'white-paper';
      else type = 'article';
    }

    // Ensure slug exists
    if (!data.slug) {
      data.slug = path.basename(filePath, '.md');
    }

    // Build the HTML output for this post
    let html;
    if (type === 'case-study') {
      html = processCaseStudy(data, markdownBody);
    } else if (type === 'white-paper') {
      const bodyHtml = marked.parse(markdownBody);
      html = processWhitePaper(data, bodyHtml);
    } else {
      // article / newsletter / default
      const bodyHtml = marked.parse(markdownBody);
      html = processArticle(data, bodyHtml);
    }

    // Write output file
    const outputPath = getOutputPath(type, data.slug);
    const outputDir  = path.dirname(outputPath);
    fs.ensureDirSync(outputDir);
    fs.writeFileSync(outputPath, html, 'utf8');

    const relativeOut = path.relative(ROOT, outputPath);
    console.log(`Built: ${relativeOut}`);
    built++;

    // Collect listing metadata for blog-data.js
    publishedPosts.push({
      title:         data.title || '',
      slug:          data.slug || '',
      excerpt:       data.excerpt || data.metaDescription || '',
      author:        data.author || '99Ravens Team',
      authorTitle:   data.authorTitle || '99Ravens',
      category:      data.category || '',
      categoryLabel: data.categoryLabel || getCategoryLabel(data.category),
      tags:          data.tags || [],
      featured:      Boolean(data.featured),
      image:         data.image || '',
      readTime:      data.readTime !== undefined ? data.readTime : null,
      publishedAt:   data.date ? String(data.date) : '',
      status:        data.status || 'published',
      type:          type,
      substack:      Boolean(data.substack),
    });
  }

  // Regenerate blog-data.js
  writeBlogData(publishedPosts);

  console.log(`\nDone. Built ${built} file(s), skipped ${skipped} draft(s).`);
}

main();
