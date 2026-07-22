# arplut.github.io — Site Plan

Personal blog, hosted on GitHub Pages.

## Locked-in stack

- **Engine**: Jekyll (native GitHub Pages build)
- **Editor**: Decap CMS — git-backed, branch-per-draft workflow (draft branch → PR → merge = publish), with a lightweight OAuth proxy for GitHub auth (no Netlify)
- **Images**: External CDN (Cloudinary or Cloudflare Images), not stored in-repo
- **Comments**: Cusdis
- **Social pipeline**: GitHub Action on publish → Claude API drafts social variants for review (no auto-posting)
- **Scheduling/tracking**: GitHub Projects board
- **Mobile editing**: Same Decap CMS web UI, installable as a PWA — no native app

## Status

- [x] Jekyll scaffold (layouts, includes, styles)
- [x] Homepage, nav pages, sample posts
- [x] Decap CMS admin (`/admin`, CDN embed, editorial workflow)
- [x] Cusdis embed in post layout (needs `cusdis_app_id` once account exists)
- [ ] Decap OAuth proxy (needed before `/admin` login works)
- [ ] Cloudinary/Cloudflare Images for photo hosting
- [ ] Social pipeline Action
- [ ] GitHub Projects board
