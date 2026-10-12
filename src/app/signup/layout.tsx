import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | Chloe",
  description: "Create a free Chloe account to save favorite activities and get personalized recommendations for your family across the UAE.",
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}
