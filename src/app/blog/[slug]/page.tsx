import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import BlogBanner from "@/components/blog/BlogBanner";
import Reveal from "@/components/animations/Reveal";
import { posts, getPost, getRelated, formatDate, type BlogBlock } from "@/lib/data/blog";
import { allActivities } from "@/lib/data/activities";

const SITE = "https://chloe-app.com";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Chloe`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${SITE}/blog/${post.slug}`,
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.description },
  };
}

function Block({ b }: { b: BlogBlock }) {
  switch (b.type) {
    case "h2":
      return <h2 className="mt-12 mb-4 font-display font-extrabold text-2xl md:text-3xl leading-tight text-[#3C2364]">{b.text}</h2>;
    case "h3":
      return <h3 className="mt-8 mb-3 font-display font-extrabold text-xl text-[#3C2364]">{b.text}</h3>;
    case "p":
      return <p className="mb-5 text-lg leading-relaxed text-[#3C2364]/85">{b.text}</p>;
    case "ul":
      return (
        <ul className="mb-6 space-y-2 pl-1">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3 text-lg leading-relaxed text-[#3C2364]/85">
              <span className="mt-2.5 h-2.5 w-2.5 shrink-0 rounded-full border-2 border-[#3C2364] bg-[#F5F096]" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <aside className="my-8 rounded-[24px] border-2 border-[#3C2364] bg-[#F5F096] p-5 shadow-[4px_4px_0px_#3C2364]">
          <p className="font-display text-xs font-extrabold uppercase tracking-widest text-[#3C2364]">Parent tip</p>
          <p className="mt-1 text-lg leading-relaxed text-[#3C2364]">{b.text}</p>
        </aside>
      );
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const venues = post.venueIds
    .map((id) => allActivities.find((a) => a.id === id))
    .filter((v): v is NonNullable<typeof v> => Boolean(v));
  const related = getRelated(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        keywords: post.keywords.join(", "),
        mainEntityOfPage: `${SITE}/blog/${post.slug}`,
        author: { "@type": "Organization", name: "Chloe" },
        publisher: { "@type": "Organization", name: "Chloe" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: `${SITE}/blog/${post.slug}` },
        ],
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-[#F4F1F8] overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      <article className="pt-28 md:pt-36 px-4 md:px-6">
        <div className="max-w-[1000px] mx-auto">
          <nav aria-label="Breadcrumb" className="mb-5 font-display text-xs font-extrabold uppercase tracking-widest text-[#3C2364]/60">
            <Link href="/" className="hover:text-[#3C2364]">Home</Link> / <Link href="/blog" className="hover:text-[#3C2364]">Blog</Link>
          </nav>
          <Reveal>
            <h1 className="font-display font-extrabold text-3xl md:text-6xl leading-[1.02] text-[#3C2364]">{post.title}</h1>
            <p className="mt-4 text-lg md:text-xl text-[#3C2364]/75">{post.description}</p>
            <p className="mt-4 font-display text-xs font-extrabold uppercase tracking-widest text-[#3C2364]/60">
              {formatDate(post.date)} · {post.readMinutes} min read · {post.category}
            </p>
          </Reveal>
          <Reveal className="mt-8" scale>
            <BlogBanner slug={post.slug} title={post.title} category={post.category} size="hero" />
          </Reveal>

          <div className="max-w-[720px] mx-auto mt-10">
            {post.content.map((b, i) => (
              <Reveal key={i} duration={0.5}>
                <Block b={b} />
              </Reveal>
            ))}
          </div>

          {venues.length > 0 && (
            <section className="mt-16" aria-labelledby="venues-heading">
              <h2 id="venues-heading" className="font-display font-extrabold text-2xl md:text-3xl text-[#3C2364]">
                Venues mentioned in this guide
              </h2>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {venues.map((v, i) => (
                  <Reveal key={v.id} delay={(i % 3) * 0.08}>
                    <Link href={`/venues/${v.id}`} className="group block overflow-hidden rounded-[24px] border-2 border-[#3C2364] bg-white shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-1">
                      <div className="relative h-36">
                        <Image src={v.images[0]} alt={v.name} fill sizes="(min-width:1024px) 320px, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                      <div className="p-4">
                        <p className="font-display font-extrabold text-[#3C2364]">{v.name}</p>
                        <p className="mt-1 text-sm text-[#3C2364]/70">{v.location.area}, {v.location.region} · Ages {v.ageRange.min}-{v.ageRange.max}</p>
                      </div>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </section>
          )}

          <Reveal className="mt-16 rounded-[32px] border-2 border-[#3C2364] bg-[#C8B9E6] p-8 md:p-12 text-center shadow-[6px_6px_0px_#3C2364]">
            <p className="font-hand text-2xl text-[#3C2364]">ready to go?</p>
            <h2 className="font-display font-extrabold uppercase text-3xl md:text-5xl text-[#3C2364] mt-1">Find activities near you</h2>
            <Link href="/explore" className="mt-6 inline-block rounded-full border-2 border-[#3C2364] bg-[#F5F096] px-8 py-4 font-display font-extrabold uppercase tracking-widest text-[#3C2364] shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-0.5">
              Explore activities
            </Link>
          </Reveal>

          <section className="mt-20 pb-24" aria-labelledby="related-heading">
            <h2 id="related-heading" className="font-display font-extrabold text-2xl md:text-3xl text-[#3C2364]">Keep reading</h2>
            <div className="mt-6 grid md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.08}>
                  <Link href={`/blog/${p.slug}`} className="group block rounded-[28px] border-2 border-[#3C2364] bg-white p-3 shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-1">
                    <BlogBanner slug={p.slug} title={p.title} category={p.category} />
                    <h3 className="p-3 font-display font-extrabold leading-snug text-[#3C2364] group-hover:underline">{p.title}</h3>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        </div>
      </article>
      <Footer />
    </main>
  );
}
