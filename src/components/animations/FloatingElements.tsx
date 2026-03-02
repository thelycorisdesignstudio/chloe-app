"use client";

import { motion } from "framer-motion";

interface FloatingShape {
  color: string;
  size: number;
  x: string;
  y: string;
  duration: number;
  delay: number;
  shape: "circle" | "square" | "triangle";
}

const shapes: FloatingShape[] = [
  { color: "#82E9A6", size: 60, x: "10%", y: "20%", duration: 6, delay: 0, shape: "circle" },
  { color: "#FFF98F", size: 40, x: "85%", y: "15%", duration: 7, delay: 1, shape: "square" },
  { color: "#FF6B6B", size: 50, x: "75%", y: "70%", duration: 5, delay: 0.5, shape: "circle" },
  { color: "#4ECDC4", size: 35, x: "20%", y: "75%", duration: 8, delay: 2, shape: "triangle" },
];

function ShapeElement({ shape }: { shape: FloatingShape }) {
  return (
    <motion.div
      className="absolute pointer-events-none opacity-15"
      style={{
        left: shape.x,
        top: shape.y,
        width: shape.shape === "triangle" ? 0 : shape.size,
        height: shape.shape === "triangle" ? 0 : shape.size,
        backgroundColor: shape.shape !== "triangle" ? shape.color : "transparent",
        borderRadius: shape.shape === "circle" ? "50%" : shape.shape === "square" ? "8px" : "0",
        ...(shape.shape === "triangle"
          ? {
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }
          : {}),
      }}
      animate={{
        y: [-20, 15],
        x: [10, -10],
        rotate: [5, -5],
      }}
      transition={{
        duration: shape.duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: shape.delay,
      }}
    />
  );
}

export default function FloatingElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <ShapeElement key={i} shape={shape} />
      ))}
    </div>
  );
}
