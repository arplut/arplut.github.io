// Blog page — preserves existing Notion embed, restyled surrounding chrome

// Notion embed URL stored in env var to avoid hardcoding
// If VITE_BLOG_NOTION_URL is not set, falls back to the original embed URL
const NOTION_URL =
  (import.meta.env.VITE_BLOG_NOTION_URL as string | undefined) ??
  'https://glen-hammer-7bb.notion.site/ebd/1abc5691405e80baa346dcda909b50f0';

const Blog = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="border-b border-border bg-card">
        <div className="container px-4 sm:px-6 lg:px-8 py-6">
          <h1
            className="text-4xl font-bold text-foreground"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Blog &amp; Guides
          </h1>
          <p className="text-muted-foreground mt-1 max-w-xl">
            Disposal guides, how to file a complaint, what to do when the truck doesn't come — and more.
          </p>
        </div>
      </div>

      {/* Notion embed — do not replace or re-architect */}
      <div className="container px-4 sm:px-6 lg:px-8 py-6">
        <div className="rounded-xl border border-border overflow-hidden bg-card shadow-soft">
          <iframe
            src={NOTION_URL}
            width="100%"
            height="800"
            frameBorder="0"
            allowFullScreen
            title="GEODHA Knowledge Hub — Blog"
            className="w-full block"
            style={{
              border: 'none',
              outline: 'none',
              minHeight: '800px',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Blog;
