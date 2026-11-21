import type { MetadataRoute } from "next";
import { posts } from "@/lib/data/blog";
import { allActivities } from "@/lib/data/activities";

const base = "https://chloe-app.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/explore", "/forbusiness", "/blog", "/venues", "/policies", "/terms"].map((p) => ({
    url: base + p,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.7,
  }));
  const blog = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));
  const venues = allActivities.map((a) => ({
    url: `${base}/venues/${a.id}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  return [...pages, ...blog, ...venues];
}
