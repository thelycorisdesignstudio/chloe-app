import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/animations/Reveal";
import { allActivities, countries } from "@/lib/data/activities";

export const metadata: Metadata = {
  title: "All Kid-Friendly Venues in the UAE and GCC | Chloe Directory",
  description:
    "Browse every family venue on Chloe by country and emirate: indoor play, parks, beaches, museums, water parks, cinemas and more, with ages, facilities and tips.",
  alternates: { canonical: "/venues" },
};

export default function VenuesDirectory() {
  const groups = countries
    .map((c) => {
      const inCountry = allActivities.filter((a) => a.location.country === c.code);
      const regions = [...new Set(inCountry.map((a) => a.location.region))].sort();
      return { country: c, regions: regions.map((r) => ({ region: r, venues: inCountry.filter((a) => a.location.region === r) })) };
    })
    .filter((g) => g.regions.length > 0);

  return (
    <main className="relative min-h-screen bg-[#F4F1F8] overflow-x-hidden">
      <Navigation />
      <section className="pt-32 md:pt-40 pb-16 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          <Reveal className="text-center">
            <p className="font-hand text-2xl text-[#3C2364]/80">the directory</p>
            <h1 className="font-display font-extrabold uppercase text-4xl md:text-7xl leading-[0.95] text-[#3C2364] mt-2">All family venues</h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-[#3C2364]/75">
              {allActivities.length} places for kids across {groups.length} countries. Pick a country and emirate, then open any venue for facilities, ages and tips.
            </p>
          </Reveal>

          {groups.map((g) => (
            <div key={g.country.code} className="mt-16">
              <Reveal>
                <h2 className="font-display font-extrabold uppercase text-3xl md:text-4xl text-[#3C2364]">{g.country.name}</h2>
              </Reveal>
              {g.regions.map((r) => (
                <div key={r.region} className="mt-8">
                  <h3 className="font-display font-extrabold text-xl text-[#3C2364]/80">{r.region} <span className="text-[#3C2364]/50">({r.venues.length})</span></h3>
                  <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {r.venues.map((v, i) => (
                      <Reveal as="li" key={v.id} delay={(i % 3) * 0.05}>
                        <Link href={`/venues/${v.id}`} className="group flex items-center gap-3 rounded-[20px] border-2 border-[#3C2364] bg-white p-2 pr-4 shadow-[3px_3px_0px_#3C2364] transition-transform hover:-translate-y-0.5">
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px]">
                            <Image src={v.images[0]} alt={v.name} fill sizes="64px" className="object-cover" />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-display font-extrabold text-[#3C2364] group-hover:underline">{v.name}</p>
                            <p className="truncate text-xs text-[#3C2364]/65">{v.category} · {v.location.area}</p>
                          </div>
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
