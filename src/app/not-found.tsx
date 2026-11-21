import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Floating from "@/components/illustrations/Floating";
import { Kite, Cloud, Sparkle } from "@/components/illustrations";

export const metadata: Metadata = {
  title: "Page not found | Chloe",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-[#F4F1F8] overflow-x-hidden">
      <Navigation />
      <section className="grain-gradient pt-32 md:pt-40 pb-20 px-4 md:px-6 min-h-[80vh] flex items-center">
        <div className="relative mx-auto max-w-3xl text-center text-white">
          <Floating className="mx-auto w-36 md:w-48" amplitude={16} rotate={6}>
            <Kite className="w-full h-auto drop-shadow-[0_6px_0_rgba(60,35,100,0.35)]" />
          </Floating>
          <Floating className="absolute left-0 top-4 hidden sm:block w-24 opacity-90" delay={0.4}><Cloud className="w-full h-auto" /></Floating>
          <Floating className="absolute right-4 top-24 hidden sm:block w-10" delay={0.7}><Sparkle className="w-full h-auto" /></Floating>
          <p className="mt-6 font-hand text-3xl">oops, that page flew away</p>
          <h1 className="mt-2 font-display font-extrabold uppercase text-5xl md:text-7xl leading-[0.95]">404</h1>
          <p className="mt-5 text-lg md:text-xl text-white/90 max-w-xl mx-auto">
            We could not find what you were looking for, but there are plenty of family days out waiting for you.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/explore" className="rounded-full border-2 border-[#3C2364] bg-[#F5F096] px-8 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-[#3C2364] shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-0.5">
              Explore activities
            </Link>
            <Link href="/" className="rounded-full border-2 border-[#3C2364] bg-white px-8 py-4 font-display text-sm font-extrabold uppercase tracking-widest text-[#3C2364] shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-0.5">
              Back home
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
