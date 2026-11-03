import React from "react";

type LogoMarkProps = {
  size?: number;
  className?: string;
};

export function LogoMark({ size = 40, className }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="54" cy="56" r="40" fill="#004D3F" />
      <circle cx="50" cy="50" r="40" fill="#FFF98F" stroke="#004D3F" strokeWidth="6" />
      <circle cx="37" cy="43" r="6" fill="#004D3F" />
      <circle cx="63" cy="43" r="6" fill="#004D3F" />
      <path
        d="M30 59 Q50 82 70 59"
        fill="none"
        stroke="#004D3F"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  markSize?: number;
  tone?: "light" | "dark";
};

export default function Logo({ className = "", markSize = 40, tone = "dark" }: LogoProps) {
  const text = tone === "light" ? "text-[#F5F9FF]" : "text-[#004D3F]";
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark size={markSize} />
      <span
        className={`font-display font-black uppercase leading-none tracking-[-0.04em] ${text}`}
        style={{ fontSize: markSize * 0.62 }}
      >
        Chloe
      </span>
    </span>
  );
}
