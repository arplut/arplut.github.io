# arplut.github.io — brainLOG

Personal blog for Pratul Venkatesh, built with Jekyll and hosted on GitHub Pages.

**New here? See [SETUP.md](SETUP.md)** for the full A→Z setup and the list of keys
to drop in.

## Stack

- **Engine**: Jekyll (native GitHub Pages build — no custom Action for the site)
- **Editor**: Decap CMS at `/admin/` — git-backed editorial workflow (draft branch →
  PR → merge = publish), authenticated via a lightweight Cloudflare Worker OAuth proxy
- **Categories**: list-based labels — one post can appear under multiple categories
  with no file duplication; URLs are flat (`/blog/:title/`)
- **Images**: external CDN (Cloudinary), referenced by URL — not stored in-repo
- **Comments**: Cusdis, embedded on every post
- **Analytics**: Google Analytics 4, production-only, on every page
- **Social pipeline**: GitHub Action on publish → Claude API drafts X/LinkedIn/IG
  copy → opens a PR for review (never auto-posts)
- **Scheduling/tracking**: GitHub Projects board
- **SEO**: `jekyll-seo-tag`, `jekyll-sitemap`, `jekyll-feed`

## Layout

```
_config.yml            Site config + third-party keys
_layouts/              default, page, post, category
_includes/             header, footer, analytics, category-label partials
_posts/                Blog posts (YYYY-MM-DD-title.md)
_category_pages/       One page per category (auto-lists its posts)
assets/css/main.css    All styles
admin/                 Decap CMS (index.html + config.yml)
oauth-proxy/           Cloudflare Worker for Decap GitHub login
scripts/               Social-draft generator (Claude API)
.github/workflows/     Social-drafts Action
```

## Local development

```powershell
bundle install
bundle exec jekyll serve   # http://127.0.0.1:4000/
```

## Status

- [x] Jekyll site: homepage, blog, category pages, nav pages, sample posts
- [x] Multi-category label system + flat permalinks
- [x] Decap CMS admin (CDN embed, editorial workflow)
- [x] Cusdis comments embed
- [x] Google Analytics include (production-gated)
- [x] Decap OAuth proxy (Cloudflare Worker) — boilerplate ready
- [x] Social pipeline Action + script — boilerplate ready
- [ ] Drop in the six keys (see [SETUP.md](SETUP.md#z-keys-to-drop-in))
- [ ] Point Cloudinary media library in `admin/config.yml`
- [ ] Create the GitHub Projects board
