import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import IntroGrid from "@/components/sections/IntroGrid";
import Marquee from "@/components/animations/Marquee";
import LocationGrid from "@/components/sections/LocationGrid";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";
import BlogPreview from "@/components/sections/BlogPreview";
import Reveal from "@/components/animations/Reveal";
import Footer from "@/components/sections/Footer";
import { getCountryCards } from "@/lib/data/country-cards";

export default function Home() {
  const countryCards = getCountryCards();
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Marquee
        text="FREE ACTIVITIES FOR KIDS"
        className="bg-[#F5F096] border-y-2 border-[#3C2364] text-[#3C2364] font-black text-xl md:text-2xl uppercase tracking-wider"
      />
      <Reveal>
        <IntroGrid />
      </Reveal>
      <Reveal>
        <LocationGrid destinations={countryCards} />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <FAQ />
      </Reveal>
      <BlogPreview />
      <Reveal>
        <CallToAction />
      </Reveal>
      <Footer />
    </main>
  );
}
