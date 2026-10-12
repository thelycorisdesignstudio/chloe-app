import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Chloe",
  description: "Read Chloe's terms of service for using our family activity directory across the UAE.",
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
