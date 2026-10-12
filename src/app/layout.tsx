import type { Metadata, Viewport } from "next";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import GlobalAnimations from "@/components/animations/GlobalAnimations";
import { getStats } from "@/lib/db/queries";
import { UAE_EMIRATES } from "@/lib/data/destinations";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

// Metadata and JSON-LD here embed live DB stats (venue count, rating), so the
// whole app renders dynamically rather than being frozen at build time.
export const dynamic = "force-dynamic";

/** Live site-wide stats used by both <title>/description metadata and the
 *  JSON-LD below. Falls back to zeroed, clearly-non-fabricated values only
 *  when the database is unreachable (e.g. during a build without DB access) —
 *  this must never be replaced with a hardcoded "round" marketing number. */
async function loadSiteStats() {
  try {
    return await getStats();
  } catch (error) {
    console.error("Failed to load live stats for metadata:", error);
    return { venueCount: 0, averageRating: "0.0", totalReviewCount: 0 };
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { venueCount } = await loadSiteStats();
  const countLabel = venueCount > 0 ? `${venueCount}+` : "growing a list of";

  return {
    title: "Chloe | UAE's Platform for Family Activities & Kid-Friendly Venues",
    description: `Discover ${countLabel} verified kid-friendly activities across all 7 UAE Emirates. Playgrounds, beaches, museums, indoor play areas - all reviewed by local parents. Filter by age (0-12), location, and activity type. Free to use!`,
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
      title: `Chloe | Find ${countLabel} Kid-Friendly Activities Across UAE`,
      description: "The UAE's trusted platform for discovering family activities. Playgrounds, beaches, museums, indoor play - all verified by local parents. Filter by your child's age and location.",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Chloe - UAE Family Activity Platform",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Chloe | UAE Platform for Family Activities",
      description: `Discover ${countLabel} verified kid-friendly activities across all 7 UAE Emirates.`,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { venueCount, averageRating, totalReviewCount } = await loadSiteStats();

  const webApplicationJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Chloe",
    "applicationCategory": "LifestyleApplication",
    "description": `UAE platform for discovering kid-friendly activities. ${venueCount} verified venues across all 7 Emirates - playgrounds, beaches, museums, indoor play areas - all verified by local parents.`,
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "AED"
    },
    ...(Number(averageRating) > 0 && totalReviewCount > 0
      ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": averageRating,
            "ratingCount": String(totalReviewCount),
            "bestRating": "5"
          },
        }
      : {}),
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

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Chloe",
    "url": "https://chloe-app.com",
    "description": "Chloe helps UAE families find kid-friendly activities and venues across all seven Emirates.",
    "areaServed": UAE_EMIRATES.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#82E9A6" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webApplicationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
