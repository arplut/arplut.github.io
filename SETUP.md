# Setup Guide (A → Z)

Everything needed to take this repo from "cloned" to "fully live." Most steps are
one-time. Anything marked **🔑 KEY** means you paste a credential and you're done —
the code is already written.

The quick version: the site itself works the moment it's on GitHub Pages. The
extras (CMS login, comments, image uploads, social drafts, analytics) each light
up when you drop in their key. See the [checklist](#z-keys-to-drop-in) at the end.

---

## A. Run it locally

Ruby 3.3 + Bundler are already installed on this machine. From the repo root:

```powershell
bundle install          # first time only
bundle exec jekyll serve
```

Open <http://127.0.0.1:4000/>. Edits to most files hot-reload; changes to
`_config.yml` need a restart.

## B. Publish to GitHub Pages

1. Commit and push to `main`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a
   branch"**, branch `main`, folder `/ (root)`.
3. Wait ~1 minute. GitHub builds the Jekyll site automatically (no Action needed —
   the `github-pages` gem in the `Gemfile` matches their build).

## C. Custom domain (pratulv.com)

The `CNAME` file already points at `www.pratulv.com`. At your DNS provider:

- A `CNAME` record: `www` → `arplut.github.io`
- Optionally four `A` records for the apex `pratulv.com` → GitHub Pages IPs
  (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`), plus a redirect from
  apex to `www`.

Then in **Settings → Pages → Custom domain**, confirm `www.pratulv.com` and tick
**Enforce HTTPS**.

## D. Writing posts

Two ways:

- **By hand:** add a file to `_posts/` named `YYYY-MM-DD-title.md` with front matter
  like the existing posts. `categories` is a **list** — a post can be in several at
  once (e.g. `[reflections, sci-tech]`) and it appears on each category page without
  any file duplication. Delete `_posts/2025-07-20-formatting-playground.md` once
  you've seen the formatting demo.
- **Via the CMS:** once step E is done, go to `/admin/` and write in the browser.

## E. Decap CMS + GitHub login  🔑 KEY

The editor at `/admin/` is already built (`admin/index.html`, `admin/config.yml`).
It needs one small OAuth proxy so GitHub logins work on a static host.

Full walkthrough: [`oauth-proxy/README.md`](oauth-proxy/README.md). In short:

1. Create a **GitHub OAuth App** (get a Client ID + Secret).
2. Deploy the included Cloudflare Worker: `cd oauth-proxy && wrangler secret put …`
   then `wrangler deploy`.
3. Put the Worker URL into `admin/config.yml` as `backend.base_url`.

Draft/publish flow is already configured (`publish_mode: editorial_workflow`): each
draft becomes a branch → PR → merging to `main` publishes it.

## F. Comments (Cusdis)  🔑 KEY

1. Sign up at <https://cusdis.com> and add a site for `pratulv.com`.
2. Copy the **App ID** it gives you.
3. Paste it into `_config.yml` → `cusdis_app_id: "..."`.

Comment threads then appear at the bottom of every post automatically. Until it's
set, the comments block is simply hidden.

## G. Images (Cloudinary)  🔑 KEY

High-res photos should NOT live in the git repo. Host them on a CDN and reference
by URL.

1. Create a free <https://cloudinary.com> account.
2. In Decap's `admin/config.yml`, switch the media library to Cloudinary (Decap has
   built-in support) using your cloud name + an unsigned upload preset. The current
   config uses a simple in-repo `media_folder` as a placeholder — fine for the odd
   small graphic, but move photos to Cloudinary.
3. In posts, just use the Cloudinary URL in a normal Markdown image or `<figure>`.

## H. Google Analytics (GA4)  🔑 KEY

1. Create a GA4 property at <https://analytics.google.com> → copy the **Measurement
   ID** (`G-XXXXXXXXXX`).
2. Paste it into `_config.yml` → `google_analytics: "G-XXXXXXXXXX"`.

The tag (`_includes/analytics.html`) is wired into every page's `<head>` and only
fires in **production** (GitHub Pages sets that automatically), so local dev never
pollutes your stats.

## I. Social repurposing pipeline  🔑 KEY

On every new post pushed to `main`, a GitHub Action drafts X/LinkedIn/Instagram
copy with the Claude API and opens a PR with the drafts (nothing auto-posts).

1. Get an API key at <https://console.anthropic.com>.
2. Repo **Settings → Secrets and variables → Actions → New repository secret**:
   name `ANTHROPIC_API_KEY`, value = your key.

Files involved: [`.github/workflows/social-drafts.yml`](.github/workflows/social-drafts.yml)
and [`scripts/generate-social.mjs`](scripts/generate-social.mjs). It uses
`claude-opus-4-8`; switch the `MODEL` constant to `claude-sonnet-5` if you want it
cheaper.

## J. Posting schedule / tracker (GitHub Projects)

No code. On GitHub: **Projects → New project → Board**. Add a card per article with
fields for status (Idea / Draft / Published) and a publish date. Since drafts are
already branches/PRs, you can link them to cards.

## Z. Keys to drop in

| # | What | Where it goes | Get it from |
|---|------|---------------|-------------|
| 1 | GitHub OAuth Client ID + Secret | Cloudflare Worker secrets (`wrangler secret put`) | GitHub → Developer settings |
| 2 | Worker URL | `admin/config.yml` → `backend.base_url` | Output of `wrangler deploy` |
| 3 | Cusdis App ID | `_config.yml` → `cusdis_app_id` | cusdis.com |
| 4 | Cloudinary cloud name + preset | `admin/config.yml` media library | cloudinary.com |
| 5 | GA4 Measurement ID | `_config.yml` → `google_analytics` | analytics.google.com |
| 6 | `ANTHROPIC_API_KEY` | Repo → Actions secrets | console.anthropic.com |

Once these six are in, everything on the site is live.
