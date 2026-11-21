"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "none";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 48 },
  down: { x: 0, y: -48 },
  left: { x: 56, y: 0 },
  right: { x: -56, y: 0 },
  none: { x: 0, y: 0 },
};

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  scale?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "li";
}

/** Fades + slides content in once as it scrolls into view. */
export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  scale = false,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;
  if (reduce) return <Comp className={className}>{children}</Comp>;
  const o = offsets[direction];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, x: o.x, y: o.y, scale: scale ? 0.92 : 1 }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}
