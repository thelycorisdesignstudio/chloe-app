import type { Variants } from "framer-motion";

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const fadeUp: Variants = {
  hidden: { y: 40 },
  visible: {
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, mass: 0.8 },
  },
};

export const scaleBounce: Variants = {
  hidden: { scale: 0.8 },
  visible: {
    scale: 1,
    transition: { type: "spring", stiffness: 200, damping: 12 },
  },
};

export const slideInLeft: Variants = {
  hidden: { x: -80 },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export const slideInRight: Variants = {
  hidden: { x: 80 },
  visible: {
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 18 },
  },
};

export const popRotate: Variants = {
  hidden: { scale: 0, rotate: -15 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 20 },
  },
};
