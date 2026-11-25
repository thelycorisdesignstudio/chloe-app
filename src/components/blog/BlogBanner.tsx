import React from "react";
import { LogoMark } from "@/components/Logo";
import { Scene, categoryScene, Sparkle, Cloud } from "@/components/illustrations";
import { bannerSpecs } from "@/lib/data/blog/banners";

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
  const spec = bannerSpecs[slug];
  const p = palettes[spec ? spec.palette % palettes.length : h % palettes.length];
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
      {/* category illustration, kept to the right so the title stays on a clean background */}
      <Scene
        name={spec?.scene ?? categoryScene(category)}
        className={`absolute bottom-0 right-[2%] w-auto ${hero ? "h-[86%]" : "h-[74%]"}`}
      />
      {layout !== 1 && <Sparkle className={`absolute w-6 h-6 md:w-8 md:h-8 ${layout === 0 ? "right-[36%] top-[16%]" : "right-[40%] bottom-[18%]"}`} />}
      {layout === 1 && <Cloud className="absolute right-[34%] top-[12%] w-14 md:w-20 h-auto opacity-90" />}

      <div className="relative z-10 flex h-full flex-col justify-between p-4 md:p-6">
        <div className="flex items-center justify-between">
          <span
            className="rounded-full border-2 border-[#3C2364] bg-[#F4F1F8] px-3 py-1 font-display text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#3C2364]"
          >
            {category === "Sharjah & Northern Emirates" ? "Sharjah & North" : category}
          </span>
          <LogoMark className={hero ? "h-10 w-auto" : "h-8 w-auto"} />
        </div>
        <p
          className={`font-display font-extrabold uppercase leading-[0.95] max-w-[50%] ${
            hero ? "text-xl md:text-4xl" : "text-base md:text-lg line-clamp-3"
          }`}
        >
          {title}
        </p>
      </div>
    </div>
  );
}
