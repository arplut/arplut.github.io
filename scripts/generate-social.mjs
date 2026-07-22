/**
 * Draft social-media variants of newly published blog posts.
 *
 * Called by .github/workflows/social-drafts.yml with a list of changed
 * `_posts/*.md` files as CLI args. For each post it asks Claude to write
 * a Twitter/X thread, a LinkedIn post, and an Instagram caption, then writes
 * the result to `social/<slug>.md` for you to review before posting.
 *
 * Nothing is auto-posted — this only produces drafts.
 *
 * Env: ANTHROPIC_API_KEY (required).
 */

import fs from "node:fs/promises";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import matter from "gray-matter";

// Social drafting is a light task, so Opus is overkill on cost — swap to
// "claude-sonnet-5" if you'd rather. Kept on the flagship for best copy.
const MODEL = "claude-opus-4-8";

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

const files = process.argv.slice(2).filter((f) => f.endsWith(".md"));
if (files.length === 0) {
  console.log("No post files passed; nothing to draft.");
  process.exit(0);
}

const SITE_URL = "https://www.pratulv.com";

function postUrl(slug) {
  // Mirrors the Jekyll permalink: /blog/:title/
  const title = slug.replace(/^\d{4}-\d{2}-\d{2}-/, "");
  return `${SITE_URL}/blog/${title}/`;
}

function buildPrompt(title, body, url) {
  return `You are a social-media copywriter for a personal blog called brainLOG,
written by Pratul — thoughtful, warm, a little playful, never clickbait.

Below is a blog post. Draft three platform-native promos that make someone want
to read it. Do NOT invent facts beyond the post. Include the link: ${url}

Return GitHub-flavored Markdown with exactly these three sections:

## X / Twitter thread
(3–5 short tweets, numbered, hook first, link in the last tweet)

## LinkedIn post
(2–4 short paragraphs, professional but human, a soft call to read, 3–5 hashtags)

## Instagram caption
(1 short paragraph + a line of 5–10 hashtags; note "link in bio")

--- BLOG POST ---
Title: ${title}

${body}`;
}

for (const file of files) {
  try {
    const raw = await fs.readFile(file, "utf8");
    const { content, data } = matter(raw);
    const title = data.title || path.basename(file, ".md");
    const slug = path.basename(file, ".md");
    const url = postUrl(slug);

    console.log(`Drafting social copy for: ${title}`);

    const message = await client.messages.create({
      model: MODEL,
      max_tokens: 2000,
      messages: [{ role: "user", content: buildPrompt(title, content.trim(), url) }],
    });

    const draft = message.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("\n");

    await fs.mkdir("social", { recursive: true });
    const outPath = path.join("social", `${slug}.md`);
    const header = `# Social drafts — ${title}\n\nSource: ${url}\nGenerated: ${new Date().toISOString()}\n\n> Review and edit before posting. Nothing here is published automatically.\n\n---\n\n`;
    await fs.writeFile(outPath, header + draft + "\n");
    console.log(`  → wrote ${outPath}`);
  } catch (err) {
    console.error(`  ! failed for ${file}:`, err.message);
    process.exitCode = 1;
  }
}
