import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock, MapPin, Users, Star, Car, Accessibility, Ticket, Globe } from "lucide-react";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import Reveal from "@/components/animations/Reveal";
import BlogBanner from "@/components/blog/BlogBanner";
import { allActivities, countries } from "@/lib/data/activities";
import { posts } from "@/lib/data/blog";

const SITE = "https://chloe-app.com";

export function generateStaticParams() {
  return allActivities.map((a) => ({ id: a.id }));
}

const find = (id: string) => allActivities.find((a) => a.id === id);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const v = find(id);
  if (!v) return {};
  const where = `${v.location.area}, ${v.location.region}`;
  return {
    title: `${v.name} with Kids: Hours, Ages & Tips (${v.location.region}) | Chloe`,
    description: `${v.shortDescription}. ${where}. Ages ${v.ageRange.min}-${v.ageRange.max}. See facilities, pricing and family tips for ${v.name}.`.slice(0, 158),
    alternates: { canonical: `/venues/${v.id}` },
    openGraph: { title: `${v.name} | Chloe`, description: v.shortDescription, type: "website", images: [v.images[0]] },
  };
}

function hours(v: NonNullable<ReturnType<typeof find>>) {
  const days = v.timing.openDays.length === 7 ? "Daily" : v.timing.openDays.map((d) => d.slice(0, 3)).join(", ");
  return `${days} · ${v.timing.openTime} – ${v.timing.closeTime}`;
}

function price(v: NonNullable<ReturnType<typeof find>>) {
  const p = v.pricing;
  if (p.type === "free") return "Free entry";
  const parts = [];
  if (p.childPrice != null) parts.push(`Child ${p.currency} ${p.childPrice}`);
  if (p.adultPrice != null) parts.push(`Adult ${p.currency} ${p.adultPrice}`);
  return (parts.join(" · ") || "Paid entry") + (p.notes ? ` (${p.notes})` : "");
}

export default async function VenuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const v = find(id);
  if (!v) notFound();

  const country = countries.find((c) => c.code === v.location.country)?.name ?? v.location.country;
  const related = allActivities
    .filter((a) => a.id !== v.id && a.location.region === v.location.region && a.category === v.category)
    .concat(allActivities.filter((a) => a.id !== v.id && a.location.region === v.location.region && a.category !== v.category))
    .slice(0, 3);
  const mentions = posts.filter((p) => p.venueIds.includes(v.id)).slice(0, 3);
  const free = v.pricing.type === "free";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristAttraction",
        name: v.name,
        description: v.description,
        image: v.images,
        url: `${SITE}/venues/${v.id}`,
        isAccessibleForFree: free,
        address: {
          "@type": "PostalAddress",
          streetAddress: v.location.address,
          addressLocality: v.location.area,
          addressRegion: v.location.region,
          addressCountry: country,
        },
        ...(v.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: v.rating, reviewCount: v.reviewCount } } : {}),
        ...(v.contact?.website ? { sameAs: [v.contact.website] } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Venues", item: `${SITE}/venues` },
          { "@type": "ListItem", position: 3, name: v.name, item: `${SITE}/venues/${v.id}` },
        ],
      },
    ],
  };

  const facts = [
    { icon: Clock, label: "Hours", value: hours(v) },
    { icon: Ticket, label: "Entry", value: price(v) },
    { icon: Users, label: "Ages", value: `${v.ageRange.min}–${v.ageRange.max} years` },
    { icon: MapPin, label: "Address", value: `${v.location.address}, ${v.location.region}` },
    { icon: Car, label: "Parking", value: v.hasParking ? "Available" : "Not listed" },
    { icon: Accessibility, label: "Wheelchair access", value: v.isWheelchairAccessible ? "Yes" : "Not listed" },
  ];

  return (
    <main className="relative min-h-screen bg-[#F4F1F8] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <article className="pt-28 md:pt-36 px-4 md:px-6 pb-24">
        <div className="max-w-[1100px] mx-auto">
          <nav aria-label="Breadcrumb" className="mb-5 font-display text-xs font-extrabold uppercase tracking-widest text-[#3C2364]/60">
            <Link href="/" className="hover:text-[#3C2364]">Home</Link> / <Link href="/venues" className="hover:text-[#3C2364]">Venues</Link> / {v.location.region}
          </nav>

          <Reveal>
            <div className="relative h-64 md:h-[26rem] overflow-hidden rounded-[32px] md:rounded-[48px] border-2 border-[#3C2364] shadow-[6px_6px_0px_#3C2364]">
              <Image src={v.images[0]} alt={`${v.name} in ${v.location.region}`} fill priority sizes="(min-width:1100px) 1100px, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3C2364]/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="rounded-full border-2 border-[#3C2364] bg-[#F5F096] px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-widest text-[#3C2364]">{v.category}</span>
                  {free && <span className="rounded-full border-2 border-[#3C2364] bg-[#C8B9E6] px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-widest text-[#3C2364]">Free</span>}
                  {v.isIndoor && <span className="rounded-full border-2 border-[#3C2364] bg-[#AAE6FA] px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-widest text-[#3C2364]">Indoor</span>}
                </div>
                <h1 className="font-display font-extrabold text-3xl md:text-6xl leading-[1.02] text-white">{v.name}</h1>
                <p className="mt-2 flex items-center gap-4 text-white/90">
                  <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{v.location.area}, {v.location.region}</span>
                  {v.rating > 0 && <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-[#F5F096] text-[#F5F096]" />{v.rating.toFixed(1)}</span>}
                </p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-12 items-start">
            <div>
              <Reveal>
                <h2 className="font-display font-extrabold text-2xl md:text-3xl text-[#3C2364]">About {v.name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-[#3C2364]/85">{v.description}</p>
              </Reveal>

              {v.features.length > 0 && (
                <Reveal className="mt-10">
                  <h2 className="font-display font-extrabold text-2xl text-[#3C2364]">Highlights</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {v.features.map((f) => (
                      <li key={f} className="rounded-full border-2 border-[#3C2364] bg-white px-4 py-2 text-sm font-bold text-[#3C2364]">{f}</li>
                    ))}
                  </ul>
                </Reveal>
              )}
              {v.amenities.length > 0 && (
                <Reveal className="mt-8">
                  <h2 className="font-display font-extrabold text-2xl text-[#3C2364]">Facilities for families</h2>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {v.amenities.map((f) => (
                      <li key={f} className="rounded-full bg-[#C8B9E6]/60 px-4 py-2 text-sm font-semibold text-[#3C2364]">{f}</li>
                    ))}
                  </ul>
                </Reveal>
              )}

              {v.images.length > 1 && (
                <Reveal className="mt-10">
                  <h2 className="font-display font-extrabold text-2xl text-[#3C2364]">Photos</h2>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    {v.images.slice(1, 5).map((src, i) => (
                      <div key={src} className="relative h-40 md:h-52 overflow-hidden rounded-[24px] border-2 border-[#3C2364]">
                        <Image src={src} alt={`${v.name} photo ${i + 2}`} fill sizes="(min-width:1024px) 360px, 50vw" className="object-cover" />
                      </div>
                    ))}
                  </div>
                </Reveal>
              )}
            </div>

            <Reveal direction="left" as="section" className="rounded-[28px] border-2 border-[#3C2364] bg-white p-6 shadow-[6px_6px_0px_#3C2364] lg:sticky lg:top-28">
              <h2 className="font-display font-extrabold text-xl text-[#3C2364]">Plan your visit</h2>
              <dl className="mt-4 space-y-4">
                {facts.map((f) => (
                  <div key={f.label} className="flex gap-3">
                    <f.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#3C73C8]" />
                    <div>
                      <dt className="font-display text-[11px] font-extrabold uppercase tracking-widest text-[#3C2364]/60">{f.label}</dt>
                      <dd className="text-[#3C2364]">{f.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
              {v.contact?.website && /^https?:\/\//.test(v.contact.website) && !/\.(png|jpe?g|webp)$/i.test(v.contact.website) && (
                <a href={v.contact.website} target="_blank" rel="noopener noreferrer" className="mt-6 flex items-center justify-center gap-2 rounded-full border-2 border-[#3C2364] bg-[#F5F096] px-5 py-3 font-display text-xs font-extrabold uppercase tracking-widest text-[#3C2364] shadow-[3px_3px_0px_#3C2364] transition-transform hover:-translate-y-0.5">
                  <Globe className="h-4 w-4" /> Visit website
                </a>
              )}
              <p className="mt-4 text-xs text-[#3C2364]/60">Check the venue for current hours and prices before you go.</p>
            </Reveal>
          </div>

          {mentions.length > 0 && (
            <section className="mt-16" aria-labelledby="mentions">
              <h2 id="mentions" className="font-display font-extrabold text-2xl md:text-3xl text-[#3C2364]">Read more about {v.name}</h2>
              <div className="mt-6 grid md:grid-cols-3 gap-6">
                {mentions.map((p, i) => (
                  <Reveal key={p.slug} delay={i * 0.08}>
                    <Link href={`/blog/${p.slug}`} className="group block rounded-[28px] border-2 border-[#3C2364] bg-white p-3 shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-1">
                      <BlogBanner slug={p.slug} title={p.title} category={p.category} />
                      <h3 className="p-3 font-display font-extrabold leading-snug text-[#3C2364] group-hover:underline">{p.title}</h3>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          {related.length > 0 && (
            <section className="mt-16" aria-labelledby="related">
              <h2 id="related" className="font-display font-extrabold text-2xl md:text-3xl text-[#3C2364]">More in {v.location.region}</h2>
              <div className="mt-6 grid sm:grid-cols-3 gap-6">
                {related.map((r, i) => (
                  <Reveal key={r.id} delay={i * 0.08}>
                    <Link href={`/venues/${r.id}`} className="group block overflow-hidden rounded-[24px] border-2 border-[#3C2364] bg-white shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-1">
                      <div className="relative h-36">
                        <Image src={r.images[0]} alt={r.name} fill sizes="(min-width:640px) 340px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <p className="font-display font-extrabold text-[#3C2364]">{r.name}</p>
                        <p className="mt-1 text-sm text-[#3C2364]/70">{r.location.area} · Ages {r.ageRange.min}-{r.ageRange.max}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
