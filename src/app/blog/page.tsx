import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import BlogBanner from "@/components/blog/BlogBanner";
import Reveal from "@/components/animations/Reveal";
import { posts, formatDate } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Family Activity Guides & Tips for the UAE and GCC | Chloe Blog",
  description:
    "Practical guides to the best kid-friendly activities, parks, beaches, indoor play areas and day trips across the UAE and the Gulf, written by parents.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "The Chloe Blog: family activity guides for the UAE and GCC",
    description: "Where to go, what to pack and how to survive parenthood one activity at a time.",
    type: "website",
  },
};

const categories = ["All", "Dubai", "Abu Dhabi", "Sharjah & Northern Emirates", "Gulf Guides", "Parenting Tips"];

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category = "All" } = await searchParams;
  const list = category === "All" ? posts : posts.filter((p) => p.category === category);
  const [featured, ...rest] = list;

  return (
    <main className="relative min-h-screen bg-[#F4F1F8] overflow-x-hidden">
      <Navigation />
      <section className="pt-32 md:pt-40 pb-8 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <Reveal>
            <p className="font-hand text-2xl text-[#3C2364]/80">the chloe blog</p>
            <h1 className="font-display font-extrabold uppercase text-4xl md:text-7xl leading-[0.95] text-[#3C2364] mt-2">
              Guides for happier family days
            </h1>
            <p className="mt-5 max-w-2xl mx-auto text-lg text-[#3C2364]/75">
              Where to go, what to pack and how to choose the right activity for every age, across the UAE and the Gulf.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <Link
                key={c}
                href={c === "All" ? "/blog" : `/blog?category=${encodeURIComponent(c)}`}
                className={`rounded-full border-2 border-[#3C2364] px-4 py-2 font-display text-xs font-extrabold uppercase tracking-widest transition-colors ${
                  c === category ? "bg-[#3C2364] text-white" : "bg-white text-[#3C2364] hover:bg-[#F5F096]"
                }`}
              >
                {c}
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-[1200px] mx-auto">
          {featured && (
            <Reveal className="mb-10">
              <Link href={`/blog/${featured.slug}`} className="group grid md:grid-cols-2 gap-6 items-center rounded-[32px] border-2 border-[#3C2364] bg-white p-4 md:p-6 shadow-[6px_6px_0px_#3C2364] transition-transform hover:-translate-y-1">
                <BlogBanner slug={featured.slug} title={featured.title} category={featured.category} />
                <div>
                  <p className="font-display text-xs font-extrabold uppercase tracking-widest text-[#3C73C8]">
                    Latest · {formatDate(featured.date)} · {featured.readMinutes} min read
                  </p>
                  <h2 className="mt-2 font-display font-extrabold text-2xl md:text-4xl leading-tight text-[#3C2364] group-hover:underline">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-[#3C2364]/75">{featured.description}</p>
                  <span className="mt-5 inline-block rounded-full bg-[#3C2364] px-5 py-2 font-display text-xs font-extrabold uppercase tracking-widest text-white">
                    Read the guide
                  </span>
                </div>
              </Link>
            </Reveal>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 0.08} as="article">
                <Link href={`/blog/${p.slug}`} className="group block h-full rounded-[28px] border-2 border-[#3C2364] bg-white p-3 shadow-[4px_4px_0px_#3C2364] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#3C2364]">
                  <BlogBanner slug={p.slug} title={p.title} category={p.category} />
                  <div className="p-3">
                    <p className="font-display text-[11px] font-extrabold uppercase tracking-widest text-[#3C2364]/60">
                      {formatDate(p.date)} · {p.readMinutes} min read
                    </p>
                    <h2 className="mt-2 font-display font-extrabold text-lg leading-snug text-[#3C2364] group-hover:underline">
                      {p.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#3C2364]/70 line-clamp-3">{p.description}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
