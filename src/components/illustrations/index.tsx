import React from "react";

/**
 * Chloe illustration set. Original hand-drawn marker style to match the wordmark:
 * chunky rounded outlines in brand purple, flat brand-colour fills, smiling faces.
 * Every illustration is pure SVG (server-safe) and scales with its container.
 */
const INK = "#3C2364";
const C = { yellow: "#F5F096", peach: "#F5C8BE", sky: "#AAE6FA", lav: "#C8B9E6", blue: "#3C73C8", white: "#FFFFFF", cream: "#F4F1F8" };

type P = { className?: string; title?: string };

const Svg = ({ children, className, title, vb = "0 0 240 240" }: P & { children: React.ReactNode; vb?: string }) => (
  <svg
    viewBox={vb}
    className={className}
    fill="none"
    stroke={INK}
    strokeWidth="5"
    strokeLinecap="round"
    strokeLinejoin="round"
    role={title ? "img" : undefined}
    aria-label={title}
    aria-hidden={title ? undefined : true}
    xmlns="http://www.w3.org/2000/svg"
  >
    {title && <title>{title}</title>}
    {children}
  </svg>
);

const Face = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} strokeWidth="4.5">
    <circle cx="-9" cy="-3" r="2.6" fill={INK} stroke="none" />
    <circle cx="9" cy="-3" r="2.6" fill={INK} stroke="none" />
    <path d="M-9 7 C -4 14, 4 14, 9 7" />
  </g>
);

export const Sun = (p: P) => (
  <Svg {...p}>
    {[...Array(12)].map((_, i) => {
      const a = (i * Math.PI) / 6;
      return <path key={i} d={`M${120 + Math.cos(a) * 66} ${120 + Math.sin(a) * 66} L${120 + Math.cos(a) * 92} ${120 + Math.sin(a) * 92}`} />;
    })}
    <circle cx="120" cy="120" r="48" fill={C.yellow} />
    <circle cx="94" cy="132" r="7" fill={C.peach} stroke="none" opacity=".9" />
    <circle cx="146" cy="132" r="7" fill={C.peach} stroke="none" opacity=".9" />
    <Face x={120} y={118} s={1.6} />
  </Svg>
);

export const Balloons = (p: P) => (
  <Svg {...p}>
    <path d="M118 226 C 90 190, 70 160, 66 126" />
    <path d="M118 226 C 120 180, 124 140, 128 96" />
    <path d="M118 226 C 150 192, 172 164, 176 130" />
    <ellipse cx="66" cy="96" rx="34" ry="42" fill={C.peach} />
    <path d="M60 138 L 72 138 L 66 148 Z" fill={C.peach} />
    <ellipse cx="128" cy="62" rx="34" ry="42" fill={C.sky} />
    <path d="M122 104 L 134 104 L 128 114 Z" fill={C.sky} />
    <ellipse cx="176" cy="100" rx="32" ry="40" fill={C.lav} />
    <path d="M170 140 L 182 140 L 176 150 Z" fill={C.lav} />
    <path d="M50 80 C 52 70, 58 64, 66 62" strokeWidth="4" stroke={C.white} />
    <path d="M112 46 C 114 36, 120 30, 128 28" strokeWidth="4" stroke={C.white} />
  </Svg>
);

export const Kite = (p: P) => (
  <Svg {...p}>
    <path d="M120 24 L176 100 L120 172 L64 100 Z" fill={C.yellow} />
    <path d="M120 24 L176 100 L120 100 Z" fill={C.peach} />
    <path d="M64 100 L120 172 L120 100 Z" fill={C.sky} />
    <path d="M120 24 L120 172 M64 100 L176 100" />
    <path d="M120 172 C 100 192, 150 200, 128 216 C 114 226, 100 222, 96 232" />
    <path d="M114 196 l-10 -8 l-2 12 z" fill={C.lav} />
    <path d="M132 210 l10 -8 l2 12 z" fill={C.peach} />
  </Svg>
);

export const Playground = (p: P) => (
  <Svg {...p}>
    <path d="M20 214 L 224 214" />
    {/* ladder + platform */}
    <path d="M56 214 L 56 92 M 92 214 L 92 92" />
    <path d="M56 188 L92 188 M56 162 L92 162 M56 136 L92 136 M56 112 L92 112" strokeWidth="4" />
    <rect x="40" y="80" width="68" height="14" rx="7" fill={C.lav} />
    <path d="M40 80 L 74 44 L 108 80" fill={C.peach} />
    {/* slide */}
    <path d="M108 86 C 160 90, 190 130, 206 208 L 176 214 C 168 160, 146 124, 108 112 Z" fill={C.sky} />
    {/* kid on top */}
    <circle cx="74" cy="66" r="0" />
    <circle cx="82" cy="62" r="15" fill={C.yellow} />
    <Face x={82} y={63} s={0.7} />
    <path d="M82 77 L 82 80" />
    {/* ball */}
    <circle cx="28" cy="198" r="14" fill={C.peach} />
    <path d="M16 192 C 24 200, 32 200, 40 194" strokeWidth="3.5" />
  </Svg>
);

export const SkylineDubai = (p: P) => (
  <Svg {...p} vb="0 0 240 240">
    <path d="M10 214 L 230 214" />
    {/* Burj Khalifa-style tapered needle */}
    <path d="M118 214 L 118 128 L 124 96 L 128 62 L 131 22 L 133 22 L 136 62 L 140 96 L 146 128 L 146 214 Z" fill={C.lav} />
    <path d="M132 22 L 132 8" />
    <path d="M124 150 L 140 150 M122 176 L 142 176" strokeWidth="3.5" />
    {/* sail-shaped hotel */}
    <path d="M176 214 C 168 170, 176 110, 206 70 C 214 112, 216 170, 214 214 Z" fill={C.peach} />
    <path d="M188 214 C 186 170, 192 130, 204 98" strokeWidth="3.5" />
    {/* blocks */}
    <rect x="30" y="148" width="34" height="66" rx="5" fill={C.sky} />
    <rect x="68" y="120" width="40" height="94" rx="5" fill={C.yellow} />
    <path d="M40 164 h14 M40 180 h14 M40 196 h14 M78 138 h20 M78 156 h20 M78 174 h20 M78 192 h20" strokeWidth="3.5" />
    <circle cx="48" cy="60" r="22" fill={C.yellow} />
  </Svg>
);

export const Mosque = (p: P) => (
  <Svg {...p}>
    <path d="M14 214 L 226 214" />
    {/* minarets */}
    <rect x="30" y="92" width="18" height="122" rx="6" fill={C.cream} />
    <path d="M30 92 C 30 70, 48 70, 48 92" fill={C.peach} />
    <path d="M39 70 L 39 56" />
    <rect x="192" y="92" width="18" height="122" rx="6" fill={C.cream} />
    <path d="M192 92 C 192 70, 210 70, 210 92" fill={C.peach} />
    <path d="M201 70 L 201 56" />
    {/* main dome */}
    <rect x="62" y="152" width="116" height="62" rx="4" fill={C.cream} />
    <path d="M70 152 C 70 84, 170 84, 170 152 Z" fill={C.lav} />
    <path d="M120 98 L 120 78" />
    <path d="M114 70 a8 8 0 1 0 8 10" strokeWidth="4" />
    {/* side domes */}
    <path d="M62 170 C 62 138, 92 138, 92 170 Z" fill={C.sky} />
    <path d="M148 170 C 148 138, 178 138, 178 170 Z" fill={C.sky} />
    {/* arched door */}
    <path d="M106 214 L 106 188 C 106 170, 134 170, 134 188 L 134 214" fill={C.yellow} />
  </Svg>
);

export const Mountains = (p: P) => (
  <Svg {...p}>
    <circle cx="186" cy="58" r="24" fill={C.yellow} />
    <path d="M10 214 L 84 80 L 118 138 L 146 100 L 232 214 Z" fill={C.lav} />
    <path d="M84 80 L 70 106 L 84 100 L 96 112 Z" fill={C.cream} />
    {/* little fort */}
    <rect x="132" y="156" width="54" height="58" rx="3" fill={C.peach} />
    <path d="M132 156 v-12 h10 v8 h8 v-8 h10 v8 h8 v-8 h10 v12" fill={C.peach} />
    <path d="M152 214 L 152 190 C 152 178, 168 178, 168 190 L 168 214" fill={C.yellow} />
    <path d="M10 214 L 232 214" />
  </Svg>
);

export const Dhow = (p: P) => (
  <Svg {...p}>
    <circle cx="48" cy="52" r="22" fill={C.yellow} />
    <path d="M118 30 L 118 150" />
    <path d="M118 36 C 152 70, 176 110, 196 142 L 118 142 Z" fill={C.cream} />
    <path d="M118 60 C 96 86, 80 112, 66 138 L 118 138 Z" fill={C.peach} />
    <path d="M36 148 L 214 148 C 204 180, 184 194, 156 194 L 92 194 C 64 194, 46 180, 36 148 Z" fill={C.blue} />
    <path d="M50 164 L 200 164" stroke={C.yellow} strokeWidth="4" />
    <path d="M14 214 C 36 200, 56 224, 78 210 C 100 196, 120 222, 142 208 C 164 194, 184 220, 206 206 C 214 202, 222 204, 228 208" fill="none" stroke={INK} />
    <path d="M30 228 C 50 218, 70 236, 92 224 C 114 212, 134 236, 156 224" stroke={C.sky} strokeWidth="4" />
  </Svg>
);

export const Stroller = (p: P) => (
  <Svg {...p}>
    <path d="M186 74 L 206 74 L 206 96" />
    <path d="M186 74 L 150 150" />
    <path d="M44 124 C 44 74, 100 62, 128 96 L 150 150 L 44 150 Z" fill={C.sky} />
    <path d="M44 124 C 60 108, 90 106, 128 96" strokeWidth="3.5" />
    <path d="M40 150 L 160 150 C 160 186, 132 196, 100 196 C 66 196, 40 184, 40 150 Z" fill={C.lav} />
    <circle cx="70" cy="206" r="18" fill={C.cream} />
    <circle cx="70" cy="206" r="5" fill={INK} stroke="none" />
    <circle cx="150" cy="206" r="18" fill={C.cream} />
    <circle cx="150" cy="206" r="5" fill={INK} stroke="none" />
    <circle cx="86" cy="130" r="14" fill={C.yellow} />
    <Face x={86} y={131} s={0.6} />
    <path d="M60 60 C 62 48, 74 46, 80 54" strokeWidth="4" />
  </Svg>
);

export const SearchSmile = (p: P) => (
  <Svg {...p}>
    <circle cx="106" cy="104" r="64" fill={C.yellow} />
    <circle cx="106" cy="104" r="64" fill="none" strokeWidth="9" />
    <path d="M154 154 L 214 214" strokeWidth="18" />
    <path d="M154 154 L 214 214" stroke={C.peach} strokeWidth="8" />
    <circle cx="86" cy="94" r="5.5" fill={INK} stroke="none" />
    <circle cx="126" cy="94" r="5.5" fill={INK} stroke="none" />
    <path d="M80 122 C 92 142, 120 142, 132 122" />
    <path d="M62 62 C 72 50, 86 44, 100 44" stroke={C.white} strokeWidth="5" />
  </Svg>
);

export const Sparkle = (p: P) => (
  <Svg {...p} vb="0 0 100 100">
    <path d="M50 8 C 54 36, 64 46, 92 50 C 64 54, 54 64, 50 92 C 46 64, 36 54, 8 50 C 36 46, 46 36, 50 8 Z" fill={C.yellow} />
  </Svg>
);

export const Cloud = (p: P) => (
  <Svg {...p} vb="0 0 240 140">
    <path d="M60 116 C 22 116, 18 70, 54 66 C 56 34, 104 22, 124 50 C 146 30, 190 44, 190 80 C 222 80, 228 116, 190 116 Z" fill={C.white} />
  </Svg>
);

export type SceneName = "sun" | "balloons" | "kite" | "playground" | "skyline" | "mosque" | "mountains" | "dhow" | "stroller";
const SCENES: Record<SceneName, (p: P) => React.ReactElement> = {
  sun: Sun, balloons: Balloons, kite: Kite, playground: Playground, skyline: SkylineDubai,
  mosque: Mosque, mountains: Mountains, dhow: Dhow, stroller: Stroller,
};
export const Scene = ({ name, ...p }: P & { name: SceneName }) => {
  const Comp = SCENES[name];
  return <Comp {...p} />;
};

/** Scene used for each blog category. */
export const categoryScene = (category: string): SceneName =>
  ({ "Dubai": "skyline", "Abu Dhabi": "mosque", "Sharjah & Northern Emirates": "mountains", "Gulf Guides": "dhow", "Parenting Tips": "stroller" } as Record<string, SceneName>)[category] ?? "kite";
