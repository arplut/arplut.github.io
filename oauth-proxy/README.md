# Decap OAuth proxy

A ~60-line Cloudflare Worker that performs the GitHub OAuth token exchange for
Decap CMS. It's the one server-side piece a static (GitHub Pages) Decap setup
needs. Free tier is far more than enough — this handles logins only.

## One-time setup

1. **Create a GitHub OAuth App** — GitHub → Settings → Developer settings →
   OAuth Apps → New. Set:
   - **Homepage URL:** `https://www.pratulv.com`
   - **Authorization callback URL:** `https://<your-worker-subdomain>.workers.dev/callback`
     (you'll know the worker URL after step 3 — you can edit it back in afterward)
   - Note the **Client ID** and generate a **Client Secret**.

2. **Install Wrangler and log in:**
   ```sh
   npm i -g wrangler
   wrangler login
   ```

3. **From this folder**, set the secrets and deploy:
   ```sh
   cd oauth-proxy
   wrangler secret put GITHUB_CLIENT_ID       # paste the Client ID
   wrangler secret put GITHUB_CLIENT_SECRET   # paste the Client Secret
   wrangler deploy
   ```
   Wrangler prints the deployed URL, e.g. `https://decap-oauth.<you>.workers.dev`.

4. **Point Decap at it** — in `admin/config.yml`, set:
   ```yaml
   backend:
     base_url: https://decap-oauth.<you>.workers.dev
   ```

5. **Fix the callback URL** — go back to the GitHub OAuth App and make sure the
   callback is exactly `https://decap-oauth.<you>.workers.dev/callback`.

That's it. Visit `https://www.pratulv.com/admin/`, click "Login with GitHub", and
the popup will round-trip through this Worker.
