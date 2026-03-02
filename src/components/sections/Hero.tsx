"use client";

import React, { useRef } from 'react';
import { MapPin, Filter, Star, LogIn } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
const headingWords = "Your pocket guide to surviving parenthood, one activity at a time.".split(" ");

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const leftY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const centerY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rightY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const leftRotate = useTransform(scrollYProgress, [0, 1], [-8, -15]);
  const rightRotate = useTransform(scrollYProgress, [0, 1], [8, 15]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#82E9A6] pt-4 md:pt-6"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.p
          className="mb-2 md:mb-3 flex justify-center"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="font-hand text-[28px] md:text-[36px] text-[#004D3F] lowercase">
            meet chloe
          </span>
        </motion.p>

        <div className="mx-auto max-w-[1200px] mb-3 md:mb-4">
          <h1
            id="hero-heading"
            className="font-display font-black text-[#004D3F] uppercase leading-[0.85] tracking-[-0.05em] text-[clamp(2rem,8vw,6rem)] flex flex-wrap justify-center gap-x-[0.3em]"
          >
            {headingWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 40, rotateX: 40 }}
                animate={{ y: 0, rotateX: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: 0.2 + i * 0.08,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          className="text-[#004D3F]/80 text-base md:text-lg max-w-2xl mx-auto mb-4 md:mb-5"
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 1 }}
        >
          Discover <strong>free activities</strong> for kids across all 7 Emirates.
          Playgrounds, beaches, museums, indoor play areas &mdash; all verified by UAE parents.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-4 md:mb-5"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: 1.2 }}
        >
          <motion.a
            href="#locations"
            className="group flex h-[44px] md:h-[52px] items-center justify-center gap-2 rounded-[999px] border-2 border-[#004D3F] bg-[#FFF98F] px-4 md:px-6 shadow-[3px_3px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-sm md:text-base font-black text-[#004D3F] uppercase tracking-wide">Learn More</span>
          </motion.a>

          <motion.a
            href="/explore"
            className="group flex h-[44px] md:h-[52px] items-center justify-center gap-2 rounded-[999px] border-2 border-[#004D3F] bg-white px-4 md:px-6 shadow-[3px_3px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <span className="text-sm md:text-base font-black text-[#004D3F] uppercase tracking-wide">Explore Activities</span>
          </motion.a>

          <motion.a
            href="/login"
            className="group flex h-[44px] md:h-[52px] items-center justify-center gap-2 rounded-[999px] border-2 border-[#004D3F] bg-off-white px-4 md:px-6 shadow-[3px_3px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <LogIn className="w-4 h-4 text-[#004D3F]" />
            <span className="text-sm md:text-base font-black text-[#004D3F] uppercase tracking-wide">Login</span>
          </motion.a>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-3 md:gap-5 mb-4 md:mb-6"
          initial={{ y: 10 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 1.4 }}
        >
          {[
            { icon: MapPin, text: "All 7 Emirates", fill: false },
            { icon: Filter, text: "Age 0-12 Years", fill: false },
            { icon: Star, text: "4.9 Rating", fill: true },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-1.5 text-[#004D3F] text-sm md:text-base"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
            >
              <item.icon className={`w-4 h-4 ${item.fill ? 'fill-[#FFF98F]' : ''}`} />
              <span className="font-bold">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative mt-4 mx-auto max-w-[1280px]">
          <div className="relative h-[300px] md:h-[580px] w-full rounded-t-[40px] md:rounded-t-[120px] bg-[#FFF98F] border-x-4 border-t-4 border-[#004D3F] overflow-hidden">
            <div className="absolute inset-0 flex items-end justify-center px-4">
              <div className="relative w-full max-w-[800px] flex justify-center items-end h-full">
                <motion.div
                  className="absolute left-[5%] md:left-[10%] bottom-[-5%] w-[38%] md:w-[35%] z-10"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.6 }}
                  style={{ y: leftY, rotate: leftRotate }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=400&h=700&fit=crop"
                    alt="Chloe home screen showing activity categories"
                    className="w-full h-auto rounded-[24px] md:rounded-[40px] border-3 md:border-4 border-[#004D3F] shadow-brutalist-lg"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="absolute bottom-[-2%] w-[45%] md:w-[40%] z-30"
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.4 }}
                  style={{ y: centerY }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=700&fit=crop"
                    alt="Chloe map screen showing nearby activities"
                    className="w-full h-auto rounded-[24px] md:rounded-[40px] border-3 md:border-4 border-[#004D3F] shadow-brutalist-lg"
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  className="absolute right-[5%] md:right-[10%] bottom-[-5%] w-[38%] md:w-[35%] z-20"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.8 }}
                  style={{ y: rightY, rotate: rightRotate }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&h=700&fit=crop"
                    alt="Chloe activity details screen"
                    className="w-full h-auto rounded-[24px] md:rounded-[40px] border-3 md:border-4 border-[#004D3F] shadow-brutalist-lg"
                    loading="lazy"
                  />
                </motion.div>
              </div>
            </div>

            <motion.div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40"
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ delay: 1.8, duration: 0.5 }}
            >
              <p className="font-hand text-xl md:text-2xl text-[#004D3F] lowercase">
                You&apos;re welcome!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
