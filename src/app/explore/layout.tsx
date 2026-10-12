import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Activities | Chloe",
  description:
    "Browse and filter kid-friendly activities across all 7 UAE Emirates by age, category, indoor/outdoor, and price. Find playgrounds, beaches, museums and more near you.",
};

export default function ExploreLayout({ children }: { children: React.ReactNode }) {
  return children;
}
