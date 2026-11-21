import type { BlogPost } from "./types";
import { postsDubai } from "./posts-dubai";
import { postsEmirates } from "./posts-emirates";
import { postsGuides } from "./posts-guides";

export type { BlogPost, BlogBlock } from "./types";

export const posts: BlogPost[] = [...postsDubai, ...postsEmirates, ...postsGuides].sort(
  (a, b) => (a.date < b.date ? 1 : -1),
);

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const getRelated = (post: BlogPost, n = 3) =>
  posts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, n);

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
