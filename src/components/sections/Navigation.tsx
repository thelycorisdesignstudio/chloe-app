"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent, useSpring } from "framer-motion";

const Navigation = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const eyeContainerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (latest > prev && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const eyeTransform = (() => {
    if (!eyeContainerRef.current) return { x: 0, y: 0 };
    const rect = eyeContainerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX);
    const distance = Math.min(
      Math.sqrt(Math.pow(mousePos.x - centerX, 2) + Math.pow(mousePos.y - centerY, 2)) / 15,
      4
    );
    return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
  })();

  const eyeX = useSpring(eyeTransform.x, { stiffness: 150, damping: 15 });
  const eyeY = useSpring(eyeTransform.y, { stiffness: 150, damping: 15 });

  useEffect(() => {
    eyeX.set(eyeTransform.x);
    eyeY.set(eyeTransform.y);
  }, [eyeTransform.x, eyeTransform.y, eyeX, eyeY]);

  const btnSpring = {
    whileHover: { scale: 1.06, y: -2 } as const,
    whileTap: { scale: 0.95 } as const,
    transition: { type: "spring" as const, stiffness: 400, damping: 17 },
  };

  return (
    <motion.nav
      className="fixed bottom-4 md:bottom-6 left-0 right-0 z-[100] pointer-events-none flex justify-center px-3 md:px-6"
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: 100 }}
      animate={{ y: hidden ? 100 : 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: hidden ? 0 : 1 }}
    >
      <motion.div
        className="flex items-center gap-1.5 md:gap-2 pointer-events-auto"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 1.2 }}
      >
        
        <div className="hidden lg:flex items-center gap-2">
          <motion.a href="/explore" className="bg-[#FFF98F] border-2 border-teal rounded-full px-4 py-2 shadow-[3px_3px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[12px] tracking-widest leading-none">EXPLORE</span>
          </motion.a>
          <motion.a href="/forbusiness" className="bg-bubblegum border-2 border-teal rounded-full px-4 py-2 shadow-[3px_3px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[12px] tracking-widest leading-none">ADD VENUE</span>
          </motion.a>
        </div>

        <div className="hidden md:flex lg:hidden items-center gap-1.5">
          <motion.a href="/explore" className="bg-[#FFF98F] border-2 border-teal rounded-full px-3 py-1.5 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[10px] tracking-wider leading-none">EXPLORE</span>
          </motion.a>
          <motion.a href="/forbusiness" className="bg-bubblegum border-2 border-teal rounded-full px-3 py-1.5 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[10px] tracking-wider leading-none">ADD VENUE</span>
          </motion.a>
        </div>

        <div className="flex md:hidden items-center gap-1.5">
          <motion.a href="/explore" className="bg-[#FFF98F] border-2 border-teal rounded-full px-3 py-2 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[11px] tracking-wider leading-none">EXPLORE</span>
          </motion.a>
          <motion.a href="/forbusiness" className="bg-bubblegum border-2 border-teal rounded-full px-3 py-2 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[11px] tracking-wider leading-none">VENUES</span>
          </motion.a>
        </div>

        <div className="relative group mx-0.5 md:mx-1">
          <motion.a
            href="/"
            aria-label="Chloe - Home"
            className="bg-off-white border-2 border-teal rounded-full w-[56px] h-[56px] md:w-[80px] md:h-[80px] shadow-[2px_2px_0px_#004D3F] md:shadow-[3px_3px_0px_#004D3F] flex items-center justify-center overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <div className="relative flex items-center justify-center w-full h-full">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
                <Image
                  src="https://framerusercontent.com/images/U3eklzblYN0OjgoZYP0NopGM.svg"
                  alt=""
                  width={48}
                  height={64}
                  className="object-contain w-[32px] h-[40px] md:w-[48px] md:h-[64px]"
                  priority
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-off-white" aria-hidden="true">
                <div className="relative w-6 h-6 md:w-10 md:h-10" ref={eyeContainerRef}>
                   <motion.div className="absolute top-[40%] left-[20%] w-1.5 h-1.5 md:w-2 md:h-2 bg-teal rounded-full" style={{ x: eyeX, y: eyeY }} />
                   <motion.div className="absolute top-[40%] right-[20%] w-1.5 h-1.5 md:w-2 md:h-2 bg-teal rounded-full" style={{ x: eyeX, y: eyeY }} />
                   <div className="absolute bottom-[30%] left-1/2 -translate-x-1/2 w-2.5 h-1 md:w-3 md:h-1.5 bg-teal rounded-b-full" />
                </div>
              </div>
            </div>
          </motion.a>
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <motion.a href="/#locations" className="bg-sky border-2 border-teal rounded-full px-4 py-2 shadow-[3px_3px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[12px] tracking-widest leading-none">LOCATIONS</span>
          </motion.a>
          <motion.a href="/login" className="bg-off-white border-2 border-teal rounded-full px-4 py-2 shadow-[3px_3px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[12px] tracking-widest leading-none">LOGIN</span>
          </motion.a>
        </div>

        <div className="hidden md:flex lg:hidden items-center gap-1.5">
          <motion.a href="/#locations" className="bg-sky border-2 border-teal rounded-full px-3 py-1.5 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[10px] tracking-wider leading-none">LOCATIONS</span>
          </motion.a>
          <motion.a href="/login" className="bg-off-white border-2 border-teal rounded-full px-3 py-1.5 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[10px] tracking-wider leading-none">LOGIN</span>
          </motion.a>
        </div>

        <div className="flex md:hidden items-center gap-1.5">
          <motion.a href="/#locations" className="bg-sky border-2 border-teal rounded-full px-3 py-2 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[11px] tracking-wider leading-none">LOCATIONS</span>
          </motion.a>
          <motion.a href="/login" className="bg-off-white border-2 border-teal rounded-full px-3 py-2 shadow-[2px_2px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2" {...btnSpring}>
            <span className="text-teal font-display font-extrabold text-[11px] tracking-wider leading-none">LOGIN</span>
          </motion.a>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
