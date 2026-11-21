import Link from "next/link";
import BlogBanner from "@/components/blog/BlogBanner";
import Reveal from "@/components/animations/Reveal";
import { posts } from "@/lib/data/blog";

export default function BlogPreview() {
  const latest = posts.slice(0, 3);
  return (
    <section className="w-full bg-[#F4F1F8] py-16 md:py-24 px-4 md:px-6" aria-labelledby="blog-preview-heading">
      <div className="max-w-[1200px] mx-auto">
        <Reveal className="text-center">
          <p className="font-hand text-2xl text-[#3C2364]/80">fresh from the blog</p>
          <h2 id="blog-preview-heading" className="font-display font-extrabold uppercase text-3xl md:text-6xl text-[#3C2364] mt-1">
            Guides for happier family days
          </h2>
        </Reveal>
        <div className="mt-10 grid md:grid-cols-3 gap-6 md:gap-8">
          {latest.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} as="article">
              <Link href={`/blog/${p.slug}`} className="group block h-full rounded-[28px] border-2 border-[#3C2364] bg-white p-3 shadow-[4px_4px_0px_#3C2364] transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_#3C2364]">
                <BlogBanner slug={p.slug} title={p.title} category={p.category} />
                <h3 className="p-3 font-display font-extrabold text-lg leading-snug text-[#3C2364] group-hover:underline">{p.title}</h3>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/blog" className="inline-block rounded-full border-2 border-[#3C2364] bg-[#F5F096] px-8 py-4 font-display font-extrabold uppercase tracking-widest text-[#3C2364] shadow-[4px_4px_0px_#3C2364] transition-transform hover:-translate-y-0.5">
            Read all guides
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
