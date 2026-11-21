"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Gently bobbing wrapper for decorative illustrations. */
export default function Floating({
  children,
  className,
  delay = 0,
  amplitude = 12,
  rotate = 4,
  duration = 6,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  amplitude?: number;
  rotate?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      initial={{ opacity: 0, scale: 0.6 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 120, damping: 14, delay }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -amplitude, 0], rotate: [-rotate, rotate, -rotate] }}
        transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
