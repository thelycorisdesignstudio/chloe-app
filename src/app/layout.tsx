import type { Metadata, Viewport } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import GlobalAnimations from "@/components/animations/GlobalAnimations";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Chloe | UAE's #1 Platform for Family Activities & Kid-Friendly Venues",
    description: "Discover 5,000+ verified kid-friendly activities across all 7 UAE Emirates. Playgrounds, beaches, museums, indoor play areas - all reviewed by local parents. Filter by age (0-12), location, and activity type. Free to use!",
    keywords: ["UAE kids activities", "Dubai family activities", "Abu Dhabi things to do with kids", "UAE playgrounds", "kid-friendly UAE", "family activities Dubai", "children activities UAE", "indoor play Dubai", "UAE beaches for kids", "family day out UAE"],
    authors: [
      { name: "Schroeder Technologies" },
      { name: "Gregorious Creative Studios" },
      { name: "Lycoris Design Studios" }
    ],
    creator: "Schroeder Technologies",
    publisher: "Chloe",
    metadataBase: new URL("https://chloe-app.com"),
    openGraph: {
      type: "website",
      locale: "en_AE",
      url: "https://chloe-app.com",
      siteName: "Chloe",
      title: "Chloe | Find 5,000+ Kid-Friendly Activities Across UAE",
      description: "The UAE's most trusted platform for discovering family activities. Playgrounds, beaches, museums, indoor play - all verified by local parents. Filter by your child's age and location.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Chloe - UAE's #1 Family Activity Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Chloe | UAE's #1 Platform for Family Activities",
      description: "Discover 5,000+ verified kid-friendly activities across all 7 UAE Emirates.",
      images: ["/og-image.png"],
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
  "description": "UAE's #1 platform for discovering kid-friendly activities. 5,000+ venues across all 7 Emirates - playgrounds, beaches, museums, indoor play areas - all verified by local parents.",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "AED"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "10000",
    "bestRating": "5"
  },
  "author": {
    "@type": "Organization",
    "name": "Schroeder Technologies",
    "url": "https://chloe-app.com"
  },
  "creator": [
    {
      "@type": "Organization",
      "name": "Schroeder Technologies"
    },
    {
      "@type": "Organization", 
      "name": "Gregorious Creative Studios"
    },
    {
      "@type": "Organization",
      "name": "Lycoris Design Studios"
    }
  ],
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
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#82E9A6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <GlobalAnimations />
        <ErrorReporter />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#004D3F] focus:text-white focus:px-4 focus:py-2 focus:rounded-full"
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
