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
            <circle cx="345" cy="62" r="58" fill={p.a} stroke="#3C2364" strokeWidth="2" />
            <path d="M285 250V178a48 48 0 0 1 96 0v72Z" fill={p.b} stroke="#3C2364" strokeWidth="2" />
            <circle cx="262" cy="222" r="26" fill={p.a} stroke="#3C2364" strokeWidth="2" />
          </>
        )}
        {layout === 1 && (
          <>
            <path d="M255 250V165a68 68 0 0 1 136 0v85Z" fill={p.a} stroke="#3C2364" strokeWidth="2" />
            <circle cx="325" cy="52" r="36" fill={p.b} stroke="#3C2364" strokeWidth="2" />
            <circle cx="268" cy="96" r="14" fill={p.a} stroke="#3C2364" strokeWidth="2" />
          </>
        )}
        {layout === 2 && (
          <>
            <circle cx="352" cy="56" r="44" fill={p.b} stroke="#3C2364" strokeWidth="2" />
            <path d="M262 250l56-100 56 100Z" fill={p.a} stroke="#3C2364" strokeWidth="2" strokeLinejoin="round" />
            <circle cx="276" cy="120" r="16" fill={p.b} stroke="#3C2364" strokeWidth="2" />
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
          className={`font-display font-extrabold uppercase leading-[0.95] max-w-[58%] ${
            hero ? "text-2xl md:text-5xl" : "text-lg md:text-xl line-clamp-3"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
