import React from "react";
import { LogoMark } from "@/components/Logo";

const palettes = [
  { bg: "#C8B9E6", fg: "#3C2364", a: "#F5F096", b: "#AAE6FA" },
  { bg: "#F5F096", fg: "#3C2364", a: "#C8B9E6", b: "#F5C8BE" },
  { bg: "#AAE6FA", fg: "#3C2364", a: "#F5F096", b: "#C8B9E6" },
  { bg: "#F5C8BE", fg: "#3C2364", a: "#F5F096", b: "#AAE6FA" },
  { bg: "#3C73C8", fg: "#FFFFFF", a: "#F5F096", b: "#C8B9E6" },
  { bg: "#3C2364", fg: "#F4F1F8", a: "#F5F096", b: "#C8B9E6" },
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

interface Props {
  slug: string;
  title: string;
  category: string;
  size?: "card" | "hero";
}

/** Generated editorial banner: palette + shape layout chosen from the slug. */
export default function BlogBanner({ slug, title, category, size = "card" }: Props) {
  const h = hash(slug);
  const p = palettes[h % palettes.length];
  const layout = (h >> 3) % 3;
  const hero = size === "hero";
  const ink = p.fg;

  return (
    <div
      className={`relative overflow-hidden border-2 border-[#3C2364] ${
        hero ? "rounded-[32px] md:rounded-[48px] aspect-[16/9] md:aspect-[21/9]" : "rounded-[24px] aspect-[16/10]"
      }`}
      style={{ background: p.bg, color: ink }}
      role="img"
      aria-label={`${title} — ${category}`}
    >
      {/* decorative shapes */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        {layout === 0 && (
          <>
            <circle cx="340" cy="60" r="70" fill={p.a} stroke="#3C2364" strokeWidth="2" />
            <path d="M250 250V170a50 50 0 0 1 100 0v80Z" fill={p.b} stroke="#3C2364" strokeWidth="2" />
            <circle cx="40" cy="230" r="34" fill={p.a} stroke="#3C2364" strokeWidth="2" />
          </>
        )}
        {layout === 1 && (
          <>
            <path d="M0 250V150a90 90 0 0 1 180 0v100Z" fill={p.a} stroke="#3C2364" strokeWidth="2" />
            <circle cx="330" cy="70" r="44" fill={p.b} stroke="#3C2364" strokeWidth="2" />
            <rect x="300" y="170" width="80" height="80" rx="40" fill={p.a} stroke="#3C2364" strokeWidth="2" />
          </>
        )}
        {layout === 2 && (
          <>
            <circle cx="60" cy="40" r="50" fill={p.b} stroke="#3C2364" strokeWidth="2" />
            <path d="M200 250l60-110 60 110Z" fill={p.a} stroke="#3C2364" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="360" cy="190" r="48" fill={p.b} stroke="#3C2364" strokeWidth="2" />
          </>
        )}
      </svg>

      <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-6">
        <div className="flex items-center justify-between">
          <span
            className="rounded-full border-2 border-[#3C2364] bg-[#F4F1F8] px-3 py-1 font-display text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#3C2364]"
          >
            {category}
          </span>
          <LogoMark className={hero ? "h-10 w-auto" : "h-8 w-auto"} />
        </div>
        <p
          className={`font-display font-extrabold uppercase leading-[0.95] max-w-[78%] ${
            hero ? "text-2xl md:text-5xl" : "text-lg md:text-xl line-clamp-3"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
