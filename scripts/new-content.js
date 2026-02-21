'use strict';

// CLI scaffolding helper for the 99Ravens content pipeline.
// Usage: npm run new -- --type article --title "My New Article"
//        npm run new -- --type case-study --title "Client Name: Challenge"
//        npm run new -- --type white-paper --title "Report Title"

const fs = require('fs-extra');
const path = require('path');

// ─── Paths ────────────────────────────────────────────────────────────────────

const ROOT = path.resolve(__dirname, '..');

// ─── Argument parsing ─────────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2);
      const next = argv[i + 1];
      if (next && !next.startsWith('--')) {
        args[key] = next;
        i++; // consume the value token
      } else {
        args[key] = true; // boolean flag
      }
    }
  }
  return args;
}

// ─── Slug generator ───────────────────────────────────────────────────────────

function toSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')   // strip special chars except hyphens
    .trim()
    .replace(/[\s]+/g, '-')          // spaces → hyphens
    .replace(/-+/g, '-');            // collapse multiple hyphens
}

// ─── Today's date ─────────────────────────────────────────────────────────────

function todayIso() {
  const d = new Date();
  const year  = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day   = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ─── Frontmatter scaffolds ────────────────────────────────────────────────────

function articleFrontmatter(title, slug, date) {
  return `---
title: "${title}"
slug: ${slug}
date: ${date}
author: ""
authorTitle: ""
authorInitials: ""
category: strategy
categoryLabel: ":Strategy"
excerpt: ""
image: ""
imageAlt: ""
status: draft
type: article
substack: false
readTime: 5
featured: false
tags: []
---

Write your article content here. Standard Markdown is supported.

## Section Heading

Body text...
`;
}

function caseStudyFrontmatter(title, slug, date) {
  return `---
title: "${title}"
slug: ${slug}
date: ${date}
author: "99Ravens Team"
authorTitle: "Client descriptor e.g. A global market research firm"
authorInitials: "9R"
category: case-studies
categoryLabel: ":Case Studies"
excerpt: ""
image: ""
imageAlt: ""
status: draft
type: case-study
substack: false
stats: []
---

## The Brief

Describe the client situation and challenge here.

## The Work

Describe what was built and how.

## The Evidence

Describe outcomes and results here.
`;
}

function whitePaperFrontmatter(title, slug, date) {
  return `---
title: "${title}"
slug: ${slug}
date: ${date}
author: "Fab Dolan"
authorTitle: "Founder, 99Ravens"
authorInitials: "FD"
category: white-papers
categoryLabel: ":White Papers"
excerpt: ""
image: ""
imageAlt: ""
status: draft
type: white-paper
substack: false
gated: false
pdf: ""
pageCount: ""
toc: []
---

Write the abstract / executive summary here. This content is visible on the landing page to all readers.
`;
}

// ─── Type → directory and scaffold resolver ───────────────────────────────────

function resolveType(rawType) {
  const normalized = (rawType || '').toLowerCase().replace(/_/g, '-');
  switch (normalized) {
    case 'case-study':
    case 'case_study':
    case 'casestudy':
      return {
        dirKey:      'case-studies',
        outputDir:   path.join(ROOT, 'content', 'case-studies'),
        buildFm:     caseStudyFrontmatter,
      };
    case 'white-paper':
    case 'white_paper':
    case 'whitepaper':
      return {
        dirKey:      'white-papers',
        outputDir:   path.join(ROOT, 'content', 'white-papers'),
        buildFm:     whitePaperFrontmatter,
      };
    case 'article':
    case 'newsletter':
    default:
      return {
        dirKey:      'articles',
        outputDir:   path.join(ROOT, 'content', 'articles'),
        buildFm:     articleFrontmatter,
      };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  // process.argv: [ 'node', 'new-content.js', '--type', 'article', '--title', 'My Title' ]
  const args = parseArgs(process.argv.slice(2));

  const rawType  = typeof args.type  === 'string' ? args.type  : 'article';
  const rawTitle = typeof args.title === 'string' ? args.title : '';

  if (!rawTitle) {
    console.error('Error: --title is required.');
    console.error('Usage: npm run new -- --type article --title "My New Article"');
    process.exit(1);
  }

  const { outputDir, buildFm } = resolveType(rawType);
  const slug  = toSlug(rawTitle);
  const date  = todayIso();
  const outFile = path.join(outputDir, `${slug}.md`);

  // Guard against overwriting an existing file
  if (fs.existsSync(outFile)) {
    console.error(`Error: File already exists: ${path.relative(ROOT, outFile)}`);
    console.error('Rename or delete it first, then re-run.');
    process.exit(1);
  }

  fs.ensureDirSync(outputDir);
  fs.writeFileSync(outFile, buildFm(rawTitle, slug, date), 'utf8');

  console.log(`Created: ${path.relative(ROOT, outFile)}`);
}

main();
