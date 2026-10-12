import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import IntroGrid from "@/components/sections/IntroGrid";
import Marquee from "@/components/animations/Marquee";
import LocationGrid from "@/components/sections/LocationGrid";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";
import { getStats, getRegionStats } from "@/lib/db/queries";

// Live stats drive visible copy and JSON-LD on this page, so it must not be
// statically cached at build time (that would freeze today's seed count).
export const dynamic = "force-dynamic";

async function loadHomeStats() {
  try {
    const [stats, regionStats] = await Promise.all([
      getStats(),
      getRegionStats("UAE"),
    ]);
    return { stats, regionStats };
  } catch (error) {
    // Build-time / DB-unreachable fallback only — never a fabricated number.
    console.error("Failed to load live stats for homepage:", error);
    return {
      stats: { venueCount: 0, averageRating: "0.0", totalReviewCount: 0 },
      regionStats: [] as { region: string; count: number }[],
    };
  }
}

export default async function Home() {
  const { stats, regionStats } = await loadHomeStats();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero averageRating={stats.averageRating} />
      <Marquee
        text="FREE ACTIVITIES FOR KIDS"
        className="bg-[#FFF98F] border-y-2 border-[#004D3F] text-[#004D3F] font-black text-xl md:text-2xl uppercase tracking-wider"
      />
      <IntroGrid />
      <LocationGrid regionStats={regionStats} />
      <Testimonials averageRating={stats.averageRating} />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
