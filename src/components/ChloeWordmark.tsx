"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hand-lettered "chloe" wordmark. Monoline marker strokes with round caps, and the
 * "o" is a smiling face. Letters are authored in local coordinates so they can be
 * laid out inline (this component) or stacked (see public/brand/chloe-logo.svg).
 */
export const LETTERS = {
  c: "M62 84 C 48 66, 14 68, 10 108 C 8 142, 44 152, 64 128",
  h: "M12 12 C 10 60, 14 110, 12 150 M12 108 C 20 76, 62 70, 64 106 C 65 122, 64 138, 66 150",
  l: "M14 10 C 10 60, 16 110, 13 150",
  o: "M50 63 C 84 61, 97 92, 90 120 C 82 148, 40 156, 20 130 C 4 108, 20 67, 52 63",
  e: "M14 110 L 72 108 C 76 78, 40 64, 22 90 C 4 116, 24 154, 58 150 C 68 148, 74 144, 80 136",
} as const;

const OFFSETS = { c: 0, h: 84, l: 170, o: 208, e: 304 } as const;
const ORDER = ["c", "h", "l", "o", "e"] as const;

interface Props {
  className?: string;
  /** Stroke colour of the letters (defaults to currentColor). */
  ink?: string;
  /** Face fill colours for the "o". */
  faceFrom?: string;
  faceTo?: string;
  /** Colour of the eyes and smile (kept dark so they read on the yellow face). */
  faceInk?: string;
  /** Draw the letters in as the element scrolls into view. */
  animate?: boolean;
  title?: string;
}

export default function ChloeWordmark({
  className = "h-10 w-auto",
  ink = "currentColor",
  faceFrom = "#F5F096",
  faceTo = "#F5C8BE",
  faceInk = "#3C2364",
  animate = false,
  title = "Chloe",
}: Props) {
  const reduce = useReducedMotion();
  const live = animate && !reduce;
  const gid = React.useId().replace(/:/g, "");

  const draw = (i: number) =>
    live
      ? {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.9, delay: i * 0.18, ease: [0.22, 1, 0.36, 1] as const },
        }
      : {};

  return (
    <svg
      viewBox="0 0 392 170"
      className={className}
      role="img"
      aria-label={title}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <defs>
        <linearGradient id={`face-${gid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={faceFrom} />
          <stop offset="1" stopColor={faceTo} />
        </linearGradient>
      </defs>
      {ORDER.map((k, i) => (
        <g key={k} transform={`translate(${OFFSETS[k]} 0)`}>
          {k === "o" && (
            <motion.circle
              cx="52"
              cy="106"
              r="42"
              fill={`url(#face-${gid})`}
              {...(live
                ? {
                    initial: { scale: 0, opacity: 0 },
                    whileInView: { scale: 1, opacity: 1 },
                    viewport: { once: true },
                    transition: { type: "spring" as const, stiffness: 160, damping: 12, delay: 0.55 },
                    style: { transformOrigin: "52px 106px" },
                  }
                : {})}
            />
          )}
          <motion.path
            d={LETTERS[k]}
            stroke={ink}
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...draw(i)}
          />
          {k === "o" && (
            <>
              <motion.circle
                cx="39"
                cy="99"
                r="5.2"
                fill={faceInk}
                {...(live
                  ? { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true }, transition: { delay: 1.0, type: "spring" as const }, style: { transformOrigin: "39px 99px" } }
                  : {})}
              />
              <motion.circle
                cx="63"
                cy="99"
                r="5.2"
                fill={faceInk}
                {...(live
                  ? { initial: { scale: 0 }, whileInView: { scale: 1 }, viewport: { once: true }, transition: { delay: 1.08, type: "spring" as const }, style: { transformOrigin: "63px 99px" } }
                  : {})}
            />
              <motion.path
                d="M37 117 C 44 130, 60 130, 67 117"
                stroke={faceInk}
                strokeWidth="6"
                strokeLinecap="round"
                {...(live
                  ? { initial: { pathLength: 0 }, whileInView: { pathLength: 1 }, viewport: { once: true }, transition: { delay: 1.15, duration: 0.5 } }
                  : {})}
              />
            </>
          )}
        </g>
      ))}
    </svg>
  );
}
