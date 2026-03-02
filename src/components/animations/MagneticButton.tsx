"use client";

import React, { useRef, useCallback, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  as = "button",
  href,
  onClick,
  type,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    },
    [strength]
  );

  const onMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.33, 1, 0.68, 1)";
    ref.current.style.transform = "translate(0px, 0px)";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 500);
  }, []);

  const Tag = as === "a" ? motion.a : motion.button;

  return (
    <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <Tag
        href={as === "a" ? href : undefined}
        onClick={onClick}
        type={as === "button" ? type : undefined}
        className={className}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {children}
      </Tag>
    </div>
  );
}
