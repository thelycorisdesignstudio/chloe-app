import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import IntroGrid from "@/components/sections/IntroGrid";
import Marquee from "@/components/animations/Marquee";
import LocationGrid from "@/components/sections/LocationGrid";
import Testimonials from "@/components/sections/Testimonials";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Navigation />
      <Hero />
      <Marquee
        text="FREE ACTIVITIES FOR KIDS"
        className="bg-[#F5F096] border-y-2 border-[#3C2364] text-[#3C2364] font-black text-xl md:text-2xl uppercase tracking-wider"
      />
      <IntroGrid />
      <LocationGrid />
      <Testimonials />
      <FAQ />
      <CallToAction />
      <Footer />
    </main>
  );
}
