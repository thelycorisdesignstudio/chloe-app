import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | Chloe",
  description: "Log in to your Chloe account to access your saved family activities across the UAE.",
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
