import React from "react";
import ChloeWordmark from "@/components/ChloeWordmark";

/** Compact brand mark: the smiling "o" from the wordmark. */
export const LogoMark = ({ className = "h-10 w-auto" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="mark-face" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#F5F096" />
        <stop offset="1" stopColor="#F5C8BE" />
      </linearGradient>
    </defs>
    <circle cx="50" cy="50" r="40" fill="url(#mark-face)" stroke="#3C2364" strokeWidth="10" />
    <circle cx="36" cy="43" r="5.5" fill="#3C2364" />
    <circle cx="64" cy="43" r="5.5" fill="#3C2364" />
    <path d="M32 61 C 40 76, 60 76, 68 61" stroke="#3C2364" strokeWidth="6.5" strokeLinecap="round" />
  </svg>
);

/** Logo for headers: hand-lettered wordmark in the current text colour. */
const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center text-teal ${className}`}>
    <ChloeWordmark className="h-9 md:h-10 w-auto" />
  </span>
);

export default Logo;
