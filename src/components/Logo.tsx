import React from "react";

/**
 * Chloe logo mark: a map pin (finding places) with a smiling face (happy kids).
 * Pure inline SVG so it needs no remote assets and scales crisply.
 */
export const LogoMark = ({ className = "h-10 w-auto" }: { className?: string }) => (
  <svg
    viewBox="0 0 48 58"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* pin */}
    <path
      d="M24 2C12.4 2 4 10.6 4 21.4c0 13.2 14.6 26.6 19 33.6a1.2 1.2 0 0 0 2 0c4.4-7 19-20.4 19-33.6C44 10.6 35.6 2 24 2Z"
      fill="#3C2364"
    />
    {/* face */}
    <circle cx="24" cy="21.5" r="12.5" fill="#F5F096" />
    {/* cheeks */}
    <circle cx="15.8" cy="25" r="2.2" fill="#F5C8BE" />
    <circle cx="32.2" cy="25" r="2.2" fill="#F5C8BE" />
    {/* eyes */}
    <circle cx="19.6" cy="19.2" r="2" fill="#3C2364" />
    <circle cx="28.4" cy="19.2" r="2" fill="#3C2364" />
    {/* smile */}
    <path
      d="M18.6 24.4c1.4 3.4 8.4 3.4 9.8 0"
      stroke="#3C2364"
      strokeWidth="2.4"
      strokeLinecap="round"
    />
    {/* sparkle */}
    <path
      d="M41 4.5l1.1 2.4 2.4 1.1-2.4 1.1L41 11.5l-1.1-2.4-2.4-1.1 2.4-1.1L41 4.5Z"
      fill="#AAE6FA"
      stroke="#3C2364"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

const Logo = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center gap-2 ${className}`}>
    <LogoMark className="h-9 md:h-10 w-auto" />
    <span className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-teal leading-none">
      chloe
    </span>
  </span>
);

export default Logo;
