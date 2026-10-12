import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy & Policies | Chloe",
  description: "Learn how Chloe collects, uses, and protects your family's data, in line with UAE data protection regulations.",
};

export default function PoliciesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
