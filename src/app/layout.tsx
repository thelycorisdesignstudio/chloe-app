import type { Metadata, Viewport } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import GlobalAnimations from "@/components/animations/GlobalAnimations";
import CookieBanner from "@/components/CookieBanner";
import { Lexend, Caveat } from "next/font/google";

const lexend = Lexend({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], variable: "--font-lexend", display: "swap" });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-caveat", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Chloe | Kid-Friendly Activities & Family Venues in the UAE",
    description: "Discover 160+ kid-friendly venues across the UAE. Playgrounds, beaches, museums, indoor play areas - all reviewed by local parents. Filter by age (0-12), location, and activity type. Free to use!",
    keywords: ["UAE kids activities", "Dubai family activities", "Abu Dhabi things to do with kids", "UAE playgrounds", "kid-friendly UAE", "family activities Dubai", "children activities UAE", "indoor play Dubai", "UAE beaches for kids", "family day out UAE"],
    authors: [{ name: "Lycoris Labs Inc." }],
    creator: "Lycoris Labs Inc.",
    publisher: "Lycoris Labs Inc.",
    metadataBase: new URL("https://chloe-app.com"),
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: "https://chloe-app.com",
      siteName: "Chloe",
      title: "Chloe | Find Kid-Friendly Activities Across the UAE",
      description: "The UAE's most trusted platform for discovering family activities. Playgrounds, beaches, museums, indoor play - all verified by local parents. Filter by your child's age and location.",
      images: [
        {
          url: "/brand/og.png",
          width: 1200,
          height: 630,
          alt: "Chloe - Family Activity Guide for the UAE",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Chloe | Kid-Friendly Activities & Family Venues in the UAE",
      description: "Discover 160+ kid-friendly venues across the UAE.",
      images: ["/brand/og.png"],
    },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Chloe",
  "applicationCategory": "LifestyleApplication",
  "description": "Discover kid-friendly activities. 160+ family venues across the UAE - playgrounds, beaches, museums, indoor play areas - all verified by local parents.",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AED"
  },
  "author": {
    "@type": "Organization",
    "name": "Lycoris Labs Inc.",
    "url": "https://chloe-app.com"
  },
  "creator": {
    "@type": "Organization",
    "name": "Lycoris Labs Inc."
  },
  "areaServed": {
    "@type": "Country",
    "name": "United Arab Emirates"
  },
  "audience": {
    "@type": "PeopleAudience",
    "audienceType": "Parents",
    "suggestedMinAge": "0",
    "suggestedMaxAge": "12"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lexend.variable} ${caveat.variable}`}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#C8B9E6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <GlobalAnimations />
        <CookieBanner />
        <ErrorReporter />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#3C2364] focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
        >
          Skip to main content
        </a>
        <div id="main-content">
          {children}
        </div>
      </body>
    </html>
  );
}
