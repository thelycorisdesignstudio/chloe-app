export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "tip"; text: string };

export interface BlogPost {
  slug: string; // kebab-case, keyword rich, unique
  title: string; // <= 65 chars, primary keyword first
  description: string; // 140-155 chars meta description
  category: "Dubai" | "Abu Dhabi" | "Sharjah & Northern Emirates" | "Gulf Guides" | "Parenting Tips";
  date: string; // ISO date, 2026-09-01 .. 2026-11-15
  readMinutes: number;
  keywords: string[]; // 5-8 search phrases
  venueIds: string[]; // ids from src/lib/data/activities.ts that the post mentions (3-8)
  content: BlogBlock[]; // 700-1000 words total
}
