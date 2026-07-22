/**
 * Decap CMS ⇄ GitHub OAuth proxy for Cloudflare Workers.
 *
 * GitHub's OAuth flow needs a server-side step (the client secret must never be
 * exposed to the browser). This tiny Worker is that step — nothing else. Decap
 * running on GitHub Pages points its `base_url` at this Worker.
 *
 * Required secrets (set with wrangler, NOT committed):
 *   wrangler secret put GITHUB_CLIENT_ID
 *   wrangler secret put GITHUB_CLIENT_SECRET
 *
 * Routes:
 *   GET /auth      → redirect the user to GitHub's authorize screen
 *   GET /callback  → exchange the code for a token, hand it back to Decap
 */

const OAUTH_SCOPES = "repo,user";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Step 1: kick off the OAuth dance.
    if (url.pathname === "/auth") {
      const authorize = new URL("https://github.com/login/oauth/authorize");
      authorize.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
      authorize.searchParams.set("redirect_uri", `${url.origin}/callback`);
      authorize.searchParams.set("scope", OAUTH_SCOPES);
      authorize.searchParams.set("state", crypto.randomUUID());
      return Response.redirect(authorize.toString(), 302);
    }

    // Step 2: GitHub redirects back here with a code. Trade it for a token.
    if (url.pathname === "/callback") {
      const code = url.searchParams.get("code");
      if (!code) {
        return new Response("Missing ?code", { status: 400 });
      }

      const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
        }),
      });
      const data = await tokenRes.json();

      const status = data.access_token ? "success" : "error";
      const payload = data.access_token
        ? { token: data.access_token, provider: "github" }
        : { error: data.error || "unknown_error" };

      // The postMessage handshake Decap expects: the popup announces itself,
      // then posts the token back to the CMS window that opened it.
      const body = `<!doctype html><html><head><meta charset="utf-8"><title>Authorizing…</title></head>
<body>
<script>
  (function () {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:${status}:${JSON.stringify(payload)}',
        e.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
<p>${status === "success" ? "Login complete — you can close this window." : "Login failed."}</p>
</body></html>`;

      return new Response(body, {
        headers: { "Content-Type": "text/html; charset=utf-8" },
      });
    }

    // Health check / default.
    if (url.pathname === "/") {
      return new Response("Decap OAuth proxy is running. Use /auth to begin.", {
        headers: { "Content-Type": "text/plain" },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
