import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "List Your Venue | Chloe for Business",
  description:
    "Partner with Chloe to list your family-friendly venue or activity and reach UAE parents searching for things to do with their kids.",
};

export default function ForBusinessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
