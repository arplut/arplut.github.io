// Blog page — Notion embed fills the full page, no surrounding chrome

const NOTION_URL =
  (import.meta.env.VITE_BLOG_NOTION_URL as string | undefined) ??
  'https://glen-hammer-7bb.notion.site/ebd/1abc5691405e80baa346dcda909b50f0';

const Blog = () => {
  return (
    <iframe
      src={NOTION_URL}
      title="GEODHA Knowledge Hub — Blog"
      allowFullScreen
      style={{
        display: 'block',
        width: '100%',
        height: 'calc(100vh - 4rem)',
        border: 'none',
        outline: 'none',
      }}
    />
  );
};

export default Blog;
