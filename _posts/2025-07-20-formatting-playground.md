---
layout: post
title: "The Formatting Playground (and how I write here)"
date: 2025-07-20
categories: [reflections, sci-tech]
excerpt: "A kitchen-sink post showing every formatting trick this blog supports — headings, images, video, code, tables, and more."
---

This post does double duty: it's a demo of everything the blog can render, and a
reference for future-me when I forget the syntax. Notice it's filed under **two**
categories — it shows up on both the Reflections and Sci-Tech pages, from a single file.

## Text basics

You get **bold**, *italic*, ***both***, ~~strikethrough~~, and `inline code`.
Links look [like this](https://www.pratulv.com). Footnotes, quotes, and lists all work:

> "The unexamined life is not worth living."
> — Socrates, allegedly

- Unordered lists
- with a few
- items

1. Ordered lists
2. count themselves
3. automatically

## Images

Markdown images work with the standard syntax. For real posts, the `src` will be a
Cloudinary/Cloudflare URL (high-res photos live on a CDN, not in the repo):

![A placeholder sunset]({{ '/assets/img/sample-photo.svg' | relative_url }})

For a caption, use a small HTML `figure` block:

<figure>
  <img src="{{ '/assets/img/sample-photo.svg' | relative_url }}" alt="A placeholder sunset with caption">
  <figcaption>Replace me with a real photograph — served resized straight from the CDN.</figcaption>
</figure>

## Video embeds

Drop a responsive YouTube (or Vimeo) embed in with a wrapper div — it scales to any screen:

<div class="video-embed">
  <iframe src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ" title="Embedded video" loading="lazy" allowfullscreen></iframe>
</div>

## Code

Fenced code blocks get monospace styling and horizontal scroll when needed:

```python
def greet(name: str) -> str:
    return f"Hare Krishna, {name}!"

print(greet("world"))
```

## Tables

| Feature   | Supported | Notes                          |
| --------- | :-------: | ------------------------------ |
| Markdown  |    ✅     | via kramdown                   |
| Images    |    ✅     | CDN-hosted for real photos     |
| Video     |    ✅     | responsive 16:9 wrapper        |
| Comments  |    ✅     | Cusdis, once the app id is set |

---

That's the whole toolbox. Delete this post whenever you like — it's just here to prove the pipes work.
