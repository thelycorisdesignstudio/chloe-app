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

/* ───────────── Topic scenes: one per blog post ───────────── */

export const Beach = (p: P) => (
  <Svg {...p}>
    <circle cx="190" cy="52" r="26" fill={C.yellow} />
    <path d="M110 70 L 110 206" strokeWidth="6" />
    <path d="M44 106 C 52 52, 168 52, 176 106 Z" fill={C.peach} />
    <path d="M76 106 C 80 66, 98 54, 110 54 M144 106 C 140 66, 122 54, 110 54" />
    <path d="M44 106 q 11 12 22 0 q 11 12 22 0 q 11 12 22 0 q 11 12 22 0 q 11 12 22 0 q 11 12 22 0" strokeWidth="4" fill={C.peach} />
    <path d="M10 208 C 40 194, 70 222, 100 208 S 160 194, 190 208 S 222 216, 232 208 L 232 232 L 10 232 Z" fill={C.sky} />
    <path d="M168 192 L 196 192 L 190 214 L 174 214 Z" fill={C.yellow} />
    <path d="M168 192 C 172 180, 192 180, 196 192" />
  </Svg>
);

export const WaterSlide = (p: P) => (
  <Svg {...p}>
    <rect x="30" y="40" width="46" height="170" rx="8" fill={C.lav} />
    <path d="M30 60 h46 M30 84 h46 M30 108 h46 M30 132 h46 M30 156 h46 M30 180 h46" strokeWidth="3.5" />
    <path d="M76 56 C 150 40, 200 70, 160 104 C 124 134, 176 150, 196 176" stroke={C.blue} strokeWidth="26" />
    <path d="M76 56 C 150 40, 200 70, 160 104 C 124 134, 176 150, 196 176" stroke={C.sky} strokeWidth="16" />
    <path d="M10 206 L 230 206" />
    <path d="M120 216 q 10 -10 20 0 q 10 -10 20 0 q 10 -10 20 0 q 10 -10 20 0" stroke={C.blue} />
    <circle cx="200" cy="30" r="18" fill={C.yellow} />
  </Svg>
);

export const Swing = (p: P) => (
  <Svg {...p}>
    <path d="M30 214 L 120 40 L 210 214" />
    <path d="M120 40 L 120 40" />
    <path d="M62 150 L 178 150" strokeWidth="4" />
    <path d="M96 40 L 144 40" strokeWidth="8" />
    <path d="M100 42 L 92 172 M 140 42 L 148 172" strokeWidth="3.5" />
    <rect x="82" y="170" width="76" height="12" rx="6" fill={C.peach} />
    <circle cx="120" cy="128" r="14" fill={C.yellow} />
    <Face x={120} y={129} s={0.65} />
    <path d="M120 142 L 120 170" />
    <path d="M10 214 L 230 214" />
    <circle cx="204" cy="70" r="20" fill={C.sky} stroke={INK} />
  </Svg>
);

export const Blocks = (p: P) => (
  <Svg {...p}>
    <rect x="36" y="150" width="64" height="64" rx="8" fill={C.sky} />
    <circle cx="68" cy="182" r="14" fill={C.yellow} />
    <rect x="104" y="150" width="64" height="64" rx="8" fill={C.peach} />
    <path d="M118 198 L 136 164 L 154 198 Z" fill={C.lav} />
    <rect x="70" y="86" width="64" height="64" rx="8" fill={C.lav} />
    <rect x="88" y="104" width="28" height="28" rx="4" fill={C.yellow} />
    <circle cx="190" cy="168" r="30" fill={C.yellow} />
    <circle cx="170" cy="144" r="11" fill={C.yellow} />
    <circle cx="210" cy="144" r="11" fill={C.yellow} />
    <Face x={190} y={166} s={0.9} />
    <path d="M170 214 L 210 214" />
  </Svg>
);

export const Umbrella = (p: P) => (
  <Svg {...p}>
    <path d="M60 60 C 66 24, 154 24, 160 60 C 140 48, 126 60, 110 60 C 94 60, 80 48, 60 60 Z" fill={C.cream} stroke="none" />
    <path d="M30 120 C 40 50, 180 50, 190 120 C 170 104, 150 120, 130 104 C 120 118, 100 118, 90 104 C 70 120, 50 104, 30 120 Z" fill={C.lav} />
    <path d="M110 76 L 110 176 C 110 196, 84 196, 84 176" strokeWidth="6" />
    <path d="M70 108 C 76 82, 96 70, 110 70 M150 108 C 144 82, 124 70, 110 70" />
    <path d="M26 190 l -4 14 M 50 176 l -4 14 M 170 186 l -4 14 M 194 172 l -4 14 M 206 206 l -4 14" stroke={C.blue} />
    <path d="M40 222 q 14 -10 28 0 q 14 10 28 0 M 130 222 q 14 -10 28 0 q 14 10 28 0" stroke={C.blue} strokeWidth="4" />
    <path d="M150 20 C 170 20, 176 36, 164 40 C 168 54, 140 56, 136 42 C 124 40, 126 22, 150 20 Z" fill={C.white} />
  </Svg>
);

export const Popcorn = (p: P) => (
  <Svg {...p}>
    {[[78, 78, 20], [112, 58, 22], [150, 74, 20], [96, 104, 18], [136, 100, 20], [174, 100, 16], [58, 104, 16]].map(([x, y, r], i) => (
      <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? C.cream : C.yellow} />
    ))}
    <path d="M52 112 L 64 214 L 176 214 L 188 112 Z" fill={C.cream} />
    <path d="M88 112 L 92 214 M 120 112 L 120 214 M 152 112 L 148 214" stroke={C.peach} strokeWidth="14" />
    <path d="M52 112 L 64 214 L 176 214 L 188 112 Z" fill="none" />
    <rect x="186" y="150" width="42" height="64" rx="6" fill={C.sky} transform="rotate(8 207 182)" />
    <circle cx="207" cy="170" r="8" fill={C.yellow} transform="rotate(8 207 182)" />
  </Svg>
);

const flower = (key: string, x: number, y: number, petal: string, r = 16) => (
  <g key={key}>
    {[...Array(6)].map((_, i) => {
      const a = (i * Math.PI) / 3;
      return <circle key={i} cx={x + Math.cos(a) * r} cy={y + Math.sin(a) * r} r={r * 0.8} fill={petal} />;
    })}
    <circle cx={x} cy={y} r={r * 0.7} fill={C.yellow} />
  </g>
);

export const Flowers = (p: P) => (
  <Svg {...p}>
    <path d="M70 214 C 70 170, 64 140, 70 110 M 120 214 C 122 160, 130 120, 124 78 M 176 214 C 174 176, 182 150, 178 124" />
    <path d="M70 180 C 48 170, 44 150, 52 140 C 64 148, 72 164, 70 180 Z" fill={C.sky} />
    <path d="M176 188 C 198 182, 206 164, 198 152 C 184 158, 176 172, 176 188 Z" fill={C.sky} />
    {flower("a", 70, 104, C.peach)}
    {flower("b", 124, 70, C.lav, 20)}
    {flower("c", 178, 118, C.sky)}
    <path d="M10 214 L 230 214" />
  </Svg>
);

export const AbuDhabiSkyline = (p: P) => (
  <Svg {...p}>
    <path d="M10 214 L 230 214" />
    <path d="M52 214 L 78 52 L 104 70 L 82 214 Z" fill={C.lav} />
    <path d="M110 214 L 136 70 L 162 52 L 140 214 Z" fill={C.peach} />
    <path d="M62 150 L 92 154 M 66 120 L 94 126 M 70 90 L 96 98 M 122 150 L 150 146 M 126 120 L 152 114 M 130 90 L 156 82" strokeWidth="3.5" />
    <path d="M168 214 L 168 160 C 168 134, 214 134, 214 160 L 214 214 Z" fill={C.sky} />
    <path d="M191 134 L 191 120" />
    <circle cx="30" cy="48" r="20" fill={C.yellow} />
  </Svg>
);

export const Coaster = (p: P) => (
  <Svg {...p}>
    <path d="M10 214 L 230 214" />
    <circle cx="124" cy="104" r="62" stroke={C.blue} strokeWidth="14" fill="none" />
    <circle cx="124" cy="104" r="62" strokeWidth="4" stroke={C.sky} fill="none" />
    <path d="M10 160 C 40 160, 60 120, 76 150 M 172 150 C 200 120, 214 160, 230 160" stroke={C.blue} strokeWidth="10" />
    <path d="M40 160 L 40 214 M 76 150 L 76 214 M 124 166 L 124 214 M 172 150 L 172 214 M 206 160 L 206 214" strokeWidth="4" />
    <rect x="94" y="30" width="46" height="26" rx="10" fill={C.yellow} transform="rotate(-8 117 43)" />
    <circle cx="108" cy="38" r="9" fill={C.peach} transform="rotate(-8 117 43)" />
    <circle cx="128" cy="36" r="9" fill={C.lav} transform="rotate(-8 117 43)" />
  </Svg>
);

export const Fountain = (p: P) => (
  <Svg {...p}>
    <ellipse cx="120" cy="196" rx="96" ry="22" fill={C.sky} />
    <path d="M120 196 L 120 110" strokeWidth="6" />
    <path d="M120 112 C 120 60, 74 50, 66 98 M120 112 C 120 60, 166 50, 174 98 M120 112 C 120 40, 120 40, 120 28" stroke={C.blue} strokeWidth="5" />
    <path d="M120 112 C 108 76, 90 74, 84 96 M120 112 C 132 76, 150 74, 156 96" stroke={C.white} strokeWidth="4" />
    <ellipse cx="120" cy="112" rx="26" ry="8" fill={C.lav} />
    <path d="M70 196 q 12 -8 24 0 q 12 8 24 0 q 12 -8 24 0 q 12 8 24 0" strokeWidth="4" />
    <circle cx="200" cy="48" r="20" fill={C.yellow} />
    <path d="M10 218 L 230 218" />
  </Svg>
);

const palmTree = (key: string, x: number, h: number, s = 1) => (
  <g key={key} transform={`translate(${x} 214) scale(${s})`}>
    <path d={`M0 0 C 6 -${h * 0.4}, -6 -${h * 0.7}, 4 -${h}`} strokeWidth="9" />
    <path d={`M4 -${h} C -30 -${h + 10}, -46 -${h - 6}, -52 -${h - 22} C -32 -${h - 4}, -14 -${h - 6}, 4 -${h} Z`} fill={C.sky} />
    <path d={`M4 -${h} C 38 -${h + 12}, 58 -${h - 4}, 64 -${h - 20} C 42 -${h - 4}, 22 -${h - 8}, 4 -${h} Z`} fill={C.lav} />
    <path d={`M4 -${h} C -2 -${h + 34}, -24 -${h + 40}, -34 -${h + 30} C -22 -${h + 24}, -8 -${h + 16}, 4 -${h} Z`} fill={C.sky} />
    <path d={`M4 -${h} C 10 -${h + 34}, 34 -${h + 38}, 42 -${h + 28} C 28 -${h + 22}, 14 -${h + 14}, 4 -${h} Z`} fill={C.lav} />
    <circle cx="2" cy={-h + 8} r="6" fill={C.peach} />
  </g>
);

export const Palm = (p: P) => (
  <Svg {...p}>
    <path d="M0 214 C 50 190, 100 220, 150 200 S 220 196, 240 206 L 240 240 L 0 240 Z" fill={C.yellow} stroke="none" />
    <path d="M0 214 C 50 190, 100 220, 150 200 S 220 196, 240 206" />
    {palmTree("a", 86, 120)}
    {palmTree("b", 170, 86, 0.9)}
    <circle cx="42" cy="46" r="20" fill={C.yellow} />
  </Svg>
);

export const Zipline = (p: P) => (
  <Svg {...p}>
    <path d="M8 214 L 66 86 L 96 140 L 116 110 L 170 214 Z" fill={C.lav} />
    <path d="M66 86 L 56 108 L 66 104 L 76 112 Z" fill={C.cream} />
    <path d="M20 46 L 224 150" strokeWidth="4" />
    <path d="M20 40 L 20 70 M 224 144 L 224 176" strokeWidth="6" />
    <path d="M128 90 L 128 108" />
    <path d="M128 108 L 118 130 M 128 108 L 138 130" />
    <circle cx="128" cy="144" r="13" fill={C.yellow} />
    <Face x={128} y={145} s={0.6} />
    <path d="M128 157 L 124 184 M 128 157 L 134 184 M 112 140 L 128 128 L 144 140" />
    <circle cx="206" cy="40" r="20" fill={C.yellow} />
    <path d="M8 214 L 232 214" />
  </Svg>
);

export const Shell = (p: P) => (
  <Svg {...p}>
    <path d="M40 150 C 40 70, 200 70, 200 150 C 180 168, 150 172, 120 172 C 90 172, 60 168, 40 150 Z" fill={C.peach} />
    <path d="M120 172 L 64 100 M 120 172 L 92 82 M 120 172 L 120 76 M 120 172 L 148 82 M 120 172 L 176 100" strokeWidth="4" />
    <path d="M96 172 L 144 172 L 150 192 L 90 192 Z" fill={C.lav} />
    <path d="M200 206 L 208 178 L 224 196 L 232 170 L 238 202 L 220 218 Z" fill={C.yellow} transform="translate(-24 -4) scale(0.9)" />
    <path d="M30 208 C 24 190, 26 182, 40 180 L 50 210 Z" fill={C.sky} />
    <path d="M10 218 L 230 218" />
    <path d="M14 232 q 14 -8 28 0 q 14 8 28 0 q 14 -8 28 0 q 14 8 28 0 q 14 -8 28 0 q 14 8 28 0" stroke={C.blue} strokeWidth="4" />
  </Svg>
);

export const Lantern = (p: P) => (
  <Svg {...p}>
    <path d="M70 30 a 38 38 0 1 0 48 52 a 30 30 0 1 1 -48 -52 Z" fill={C.yellow} />
    <path d="M168 48 L 172 60 L 184 62 L 174 70 L 178 82 L 168 74 L 158 82 L 162 70 L 152 62 L 164 60 Z" fill={C.yellow} />
    <path d="M150 100 L 150 118" />
    <path d="M128 118 L 172 118 L 164 130 L 136 130 Z" fill={C.peach} />
    <path d="M136 130 C 112 150, 112 184, 136 204 L 164 204 C 188 184, 188 150, 164 130 Z" fill={C.lav} />
    <path d="M150 140 C 136 156, 136 178, 150 194 C 164 178, 164 156, 150 140 Z" fill={C.yellow} />
    <path d="M132 204 L 168 204 L 162 216 L 138 216 Z" fill={C.peach} />
    <circle cx="46" cy="158" r="6" fill={C.yellow} />
    <circle cx="206" cy="150" r="5" fill={C.yellow} />
    <path d="M20 222 L 220 222" />
  </Svg>
);

export const Tent = (p: P) => (
  <Svg {...p}>
    <circle cx="190" cy="48" r="22" fill={C.yellow} />
    <path d="M20 214 L 100 60 L 180 214 Z" fill={C.peach} />
    <path d="M100 60 L 100 214" />
    <path d="M100 214 L 74 214 L 100 120 L 126 214 Z" fill={C.lav} />
    <path d="M100 60 L 100 44" />
    <path d="M100 44 L 118 50 L 100 58 Z" fill={C.yellow} />
    <path d="M168 214 C 156 196, 172 188, 170 174 C 184 184, 196 196, 188 214 Z" fill={C.yellow} />
    <path d="M160 218 L 200 208 M 160 208 L 200 218" strokeWidth="6" />
    <path d="M10 222 L 230 222" />
    <path d="M40 40 l 5 8 l 9 1 l -7 6 l 2 9 l -9 -5 l -9 5 l 2 -9 l -7 -6 l 9 -1 Z" fill={C.yellow} strokeWidth="3" />
  </Svg>
);

export const Telescope = (p: P) => (
  <Svg {...p}>
    <path d="M120 140 L 70 214 M 120 140 L 120 214 M 120 140 L 170 214" />
    <rect x="52" y="76" width="130" height="38" rx="14" fill={C.sky} transform="rotate(-28 117 95)" />
    <rect x="150" y="38" width="46" height="28" rx="8" fill={C.lav} transform="rotate(-28 173 52)" />
    <path d="M80 100 l 30 -14" strokeWidth="3.5" />
    <circle cx="48" cy="52" r="24" fill={C.yellow} />
    <ellipse cx="48" cy="52" rx="40" ry="9" fill="none" transform="rotate(-20 48 52)" />
    <path d="M210 150 l 5 8 l 9 1 l -7 6 l 2 9 l -9 -5 l -9 5 l 2 -9 l -7 -6 l 9 -1 Z" fill={C.yellow} strokeWidth="3" />
    <path d="M30 120 l 4 6 l 7 1 l -5 5 l 1 7 l -7 -4 l -7 4 l 1 -7 l -5 -5 l 7 -1 Z" fill={C.yellow} strokeWidth="3" />
    <path d="M10 214 L 230 214" />
  </Svg>
);

export const Backpack = (p: P) => (
  <Svg {...p}>
    <path d="M84 70 C 84 40, 156 40, 156 70" strokeWidth="7" />
    <rect x="60" y="64" width="120" height="146" rx="40" fill={C.peach} />
    <rect x="80" y="138" width="80" height="54" rx="16" fill={C.lav} />
    <path d="M80 160 L 160 160" strokeWidth="3.5" />
    <circle cx="120" cy="146" r="5" fill={C.yellow} />
    <path d="M90 100 C 90 88, 150 88, 150 100" strokeWidth="4" />
    <rect x="186" y="150" width="30" height="60" rx="12" fill={C.sky} />
    <rect x="192" y="138" width="18" height="14" rx="4" fill={C.yellow} />
    <path d="M10 214 L 230 214" />
    <circle cx="44" cy="52" r="20" fill={C.yellow} />
  </Svg>
);

export const Pearl = (p: P) => (
  <Svg {...p}>
    <path d="M30 150 C 30 80, 120 60, 120 150 Z" fill={C.lav} />
    <path d="M210 150 C 210 80, 120 60, 120 150 Z" fill={C.peach} />
    <path d="M50 120 C 56 100, 76 90, 90 92 M 190 120 C 184 100, 164 90, 150 92" strokeWidth="3.5" />
    <path d="M30 150 C 40 196, 200 196, 210 150 Z" fill={C.cream} />
    <circle cx="120" cy="140" r="30" fill={C.white} />
    <path d="M104 128 C 108 120, 116 116, 124 118" stroke={C.sky} strokeWidth="5" />
    <path d="M10 222 q 14 -10 28 0 q 14 10 28 0 q 14 -10 28 0 q 14 10 28 0 q 14 -10 28 0 q 14 10 28 0 q 14 -10 28 0 q 14 10 28 0" stroke={C.blue} strokeWidth="4" />
    <path d="M196 40 l 5 8 l 9 1 l -7 6 l 2 9 l -9 -5 l -9 5 l 2 -9 l -7 -6 l 9 -1 Z" fill={C.yellow} strokeWidth="3" />
  </Svg>
);

export const Tower = (p: P) => (
  <Svg {...p}>
    <path d="M10 214 L 230 214" />
    <path d="M78 214 L 84 44 C 104 30, 136 30, 156 44 L 162 214 Z" fill={C.lav} />
    <path d="M96 100 C 96 74, 144 74, 144 100 L 144 150 L 96 150 Z" fill={C.cream} />
    <path d="M96 100 L 144 100" />
    <path d="M90 190 L 150 190 M 90 170 L 150 170" strokeWidth="3.5" />
    <path d="M40 214 L 40 150 L 74 150 L 74 214 Z" fill={C.sky} />
    <path d="M168 214 L 168 130 L 204 130 L 204 214 Z" fill={C.peach} />
    <path d="M50 164 h14 M 50 184 h14 M 178 148 h16 M 178 170 h16 M 178 192 h16" strokeWidth="3.5" />
    <circle cx="206" cy="48" r="18" fill={C.yellow} />
  </Svg>
);

export const KuwaitTowers = (p: P) => (
  <Svg {...p}>
    <path d="M10 214 L 230 214" />
    <path d="M92 214 L 100 90 L 108 90 L 116 214 Z" fill={C.sky} />
    <path d="M100 90 L 104 22" strokeWidth="4" />
    <circle cx="104" cy="104" r="22" fill={C.blue} />
    <path d="M86 98 C 96 92, 112 92, 122 98" stroke={C.sky} strokeWidth="3.5" />
    <ellipse cx="104" cy="156" rx="12" ry="9" fill={C.lav} />
    <path d="M150 214 L 156 120 L 162 120 L 168 214 Z" fill={C.sky} />
    <circle cx="159" cy="132" r="14" fill={C.blue} />
    <path d="M159 120 L 162 78" strokeWidth="4" />
    <rect x="186" y="150" width="14" height="64" rx="3" fill={C.peach} />
    <circle cx="40" cy="48" r="20" fill={C.yellow} />
    <path d="M10 226 q 14 -8 28 0 q 14 8 28 0 q 14 -8 28 0 q 14 8 28 0 q 14 -8 28 0 q 14 8 28 0 q 14 -8 28 0" stroke={C.blue} strokeWidth="4" />
  </Svg>
);

export const Fort = (p: P) => (
  <Svg {...p}>
    <path d="M10 214 L 230 214" />
    <rect x="62" y="110" width="116" height="104" rx="4" fill={C.peach} />
    <path d="M62 110 v-16 h14 v10 h12 v-10 h14 v10 h12 v-10 h14 v10 h12 v-10 h14 v16" fill={C.peach} />
    <rect x="30" y="70" width="44" height="144" rx="4" fill={C.lav} />
    <path d="M30 70 v-14 h10 v8 h8 v-8 h8 v8 h8 v-8 h10 v14" fill={C.lav} />
    <rect x="166" y="70" width="44" height="144" rx="4" fill={C.lav} />
    <path d="M166 70 v-14 h10 v8 h8 v-8 h8 v8 h8 v-8 h10 v14" fill={C.lav} />
    <path d="M102 214 L 102 168 C 102 140, 138 140, 138 168 L 138 214" fill={C.yellow} />
    <rect x="46" y="100" width="12" height="22" rx="6" fill={C.cream} />
    <rect x="182" y="100" width="12" height="22" rx="6" fill={C.cream} />
    <path d="M120 94 L 120 54" />
    <path d="M120 54 L 150 64 L 120 76 Z" fill={C.yellow} />
  </Svg>
);

export type SceneName =
  | "sun" | "balloons" | "kite" | "playground" | "skyline" | "mosque" | "mountains" | "dhow" | "stroller"
  | "beach" | "waterslide" | "swing" | "blocks" | "umbrella" | "popcorn" | "flowers" | "abudhabi" | "coaster"
  | "fountain" | "palm" | "zipline" | "shell" | "lantern" | "tent" | "telescope" | "backpack" | "pearl"
  | "tower" | "kuwait" | "fort";
const SCENES: Record<SceneName, (p: P) => React.ReactElement> = {
  sun: Sun, balloons: Balloons, kite: Kite, playground: Playground, skyline: SkylineDubai,
  mosque: Mosque, mountains: Mountains, dhow: Dhow, stroller: Stroller,
  beach: Beach, waterslide: WaterSlide, swing: Swing, blocks: Blocks, umbrella: Umbrella, popcorn: Popcorn,
  flowers: Flowers, abudhabi: AbuDhabiSkyline, coaster: Coaster, fountain: Fountain, palm: Palm,
  zipline: Zipline, shell: Shell, lantern: Lantern, tent: Tent, telescope: Telescope, backpack: Backpack,
  pearl: Pearl, tower: Tower, kuwait: KuwaitTowers, fort: Fort,
};
export const Scene = ({ name, ...p }: P & { name: SceneName }) => {
  const Comp = SCENES[name];
  return <Comp {...p} />;
};

/** Scene used for each blog category. */
export const categoryScene = (category: string): SceneName =>
  ({ "Dubai": "skyline", "Abu Dhabi": "mosque", "Sharjah & Northern Emirates": "mountains", "Gulf Guides": "dhow", "Parenting Tips": "stroller" } as Record<string, SceneName>)[category] ?? "kite";
