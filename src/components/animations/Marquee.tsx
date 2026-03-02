"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface MarqueeProps {
  text: string;
  repeat?: number;
  baseVelocity?: number;
  className?: string;
}

export default function Marquee({
  text,
  repeat = 8,
  baseVelocity = -2,
  className = "",
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Speed up based on scroll velocity
  const x = useTransform(scrollY, (latest) => {
    const offset = (latest * baseVelocity * 0.1) % (100 / repeat);
    return `${offset}%`;
  });

  const items = Array.from({ length: repeat }, (_, i) => (
    <span key={i} className="whitespace-nowrap mx-8 inline-block">
      {text} <span className="mx-4">★</span>
    </span>
  ));

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden py-4 ${className}`}
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        <div className="flex shrink-0">
          {items}
        </div>
        <div className="flex shrink-0">
          {items}
        </div>
      </motion.div>
    </div>
  );
}
