import type { Metadata, Viewport } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import GlobalAnimations from "@/components/animations/GlobalAnimations";
import CookieBanner from "@/components/CookieBanner";
import localFont from "next/font/local";

// Fonts are bundled with the app (no network access needed at build or run time).
const lexend = localFont({ src: "./fonts/lexend.woff2", weight: "100 900", style: "normal", variable: "--font-lexend", display: "swap" });
const caveat = localFont({ src: "./fonts/caveat.woff2", weight: "400 700", style: "normal", variable: "--font-caveat", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Chloe | Kid-Friendly Activities & Family Venues in the UAE and GCC",
    description: "Discover kid-friendly venues across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman. Playgrounds, beaches, museums, indoor play areas and more. Filter by age (0-12), location, and activity type. Free to use!",
    keywords: ["UAE kids activities", "Saudi Arabia family activities", "Qatar things to do with kids", "GCC family activities", "Dubai family activities", "Abu Dhabi things to do with kids", "UAE playgrounds", "kid-friendly UAE", "family activities Dubai", "children activities UAE", "indoor play Dubai", "UAE beaches for kids", "family day out UAE"],
    authors: [{ name: "Lycoris Labs Inc." }],
    creator: "Lycoris Labs Inc.",
    publisher: "Lycoris Labs Inc.",
    metadataBase: new URL("https://chloe-app.com"),
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: "https://chloe-app.com",
      siteName: "Chloe",
      title: "Chloe | Find Kid-Friendly Activities Across the GCC",
      description: "Discover family activities across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman. Playgrounds, beaches, museums, indoor play. Filter by your child's age and location.",
      images: [
        {
          url: "/brand/og.png",
          width: 1200,
          height: 630,
          alt: "Chloe - Family Activity Guide for the GCC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Chloe | Kid-Friendly Activities & Family Venues in the UAE and GCC",
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
  "description": "Discover kid-friendly activities and family venues across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman: playgrounds, beaches, museums and indoor play areas.",
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
