import type { MetadataRoute } from "next";

// Search engines get full access to public pages. API routes and account
// pages are off-limits to everyone, and bulk AI-training crawlers are opted out.
const aiTraining = ["GPTBot", "CCBot", "Google-Extended", "anthropic-ai", "ClaudeBot", "Bytespider", "Applebot-Extended", "cohere-ai", "Diffbot", "ImagesiftBot"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      ...aiTraining.map((userAgent) => ({ userAgent, disallow: "/" })),
    ],
    sitemap: "https://chloe-app.com/sitemap.xml",
    host: "https://chloe-app.com",
  };
}
