"use client";

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { gsap } from '@/lib/animations/gsap-init';
import { ScrollTrigger } from '@/lib/animations/gsap-init';

const IntroGrid: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRowsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal each text row with clipPath animation synced to scroll
      textRowsRef.current.forEach((row, i) => {
        if (!row) return;
        gsap.fromTo(
          row,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: row,
              start: "top 85%",
              end: "top 40%",
              scrub: 1,
            },
          }
        );
      });

      // Pop-in images with elastic easing
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.fromTo(
          img,
          { scale: 0, rotation: -10 },
          {
            scale: 1,
            rotation: 0,
            duration: 0.8,
            ease: "back.out(2)",
            scrollTrigger: {
              trigger: img,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const setTextRow = (el: HTMLDivElement | null, i: number) => {
    textRowsRef.current[i] = el;
  };
  const setImage = (el: HTMLDivElement | null, i: number) => {
    imagesRef.current[i] = el;
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#82E9A6] py-12 md:py-16 lg:py-20"
      id="intro-block"
      aria-labelledby="intro-heading"
    >
      <h2 id="intro-heading" className="sr-only">Find Free Sanity-Saving Activities</h2>
      <div ref={containerRef} className="container relative z-10 flex flex-col gap-1 md:gap-2 px-4 md:px-6 max-w-[1400px] mx-auto">

        <div ref={(el) => setTextRow(el, 0)} className="flex w-full items-center justify-center gap-2 md:gap-6">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            FIND
          </p>
          <motion.div
            ref={(el) => setImage(el, 0)}
            className="relative aspect-[1.4/1] w-[15%] min-w-[45px] md:min-w-[60px] max-w-[120px] shrink-0 overflow-hidden border-2 border-[#004D3F] bg-[#F7F5F2] rounded-[12px] md:rounded-[20px] shadow-[3px_3px_0px_#004D3F]"
            whileHover={{ rotate: 3, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
          >
            <Image
              src="https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=150&fit=crop"
              alt="Baby crawling and exploring"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 120px"
              loading="lazy"
            />
          </motion.div>
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            FREE
          </p>
        </div>

        <div ref={(el) => setTextRow(el, 1)} className="w-full flex justify-center -mt-1 md:-mt-2">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(1.6rem,7vw,7rem)] text-center" aria-hidden="true">
            SANITY—
          </p>
        </div>
        <div ref={(el) => setTextRow(el, 2)} className="w-full flex justify-center -mt-2 md:-mt-4">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)] text-center" aria-hidden="true">
            SAVING
          </p>
        </div>

        <div ref={(el) => setTextRow(el, 3)} className="flex w-full items-center justify-center gap-1.5 md:gap-4 -mt-1">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(1.8rem,8vw,8rem)]" aria-hidden="true">
            ACTIVITIES
          </p>
          <motion.div
            ref={(el) => setImage(el, 1)}
            className="relative aspect-square w-[12%] min-w-[36px] md:min-w-[50px] max-w-[100px] shrink-0 border-2 border-[#004D3F] bg-[#F7F5F2] rounded-full shadow-[3px_3px_0px_#004D3F] overflow-hidden"
            whileHover={{ rotate: 3, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
          >
            <Image
              src="https://images.unsplash.com/photo-1540479859555-17af45c78602?w=200&h=200&fit=crop"
              alt="Child enjoying a swing at the playground"
              fill
              className="object-cover"
              sizes="100px"
              loading="lazy"
            />
          </motion.div>
        </div>

        <div ref={(el) => setTextRow(el, 4)} className="flex w-full items-center justify-center gap-2 md:gap-6 -mt-1">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            FASTER
          </p>
          <motion.div
            ref={(el) => setImage(el, 2)}
            className="relative aspect-square w-[12%] min-w-[36px] md:min-w-[50px] max-w-[100px] shrink-0 border-2 border-[#004D3F] bg-[#F7F5F2] rounded-full shadow-[3px_3px_0px_#004D3F] overflow-hidden"
            whileHover={{ rotate: 3, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
          >
            <Image
              src="https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=200&h=200&fit=crop"
              alt="Happy child playing in a park"
              fill
              className="object-cover"
              sizes="100px"
              loading="lazy"
            />
          </motion.div>
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            THAN
          </p>
        </div>

        <div ref={(el) => setTextRow(el, 5)} className="flex w-full items-center justify-center gap-2 md:gap-5 -mt-1">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            YOUR
          </p>
          <motion.div
            ref={(el) => setImage(el, 3)}
            className="relative aspect-[1.4/1] w-[15%] min-w-[45px] md:min-w-[70px] max-w-[130px] shrink-0 border-2 border-[#004D3F] bg-[#F7F5F2] rounded-[12px] md:rounded-[20px] shadow-[3px_3px_0px_#004D3F] overflow-hidden"
            whileHover={{ rotate: 3, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
          >
            <Image
              src="https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=200&h=150&fit=crop"
              alt="Toddler enjoying a snack"
              fill
              className="object-cover"
              sizes="130px"
              loading="lazy"
            />
          </motion.div>
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            TODDLER
          </p>
        </div>

        <div ref={(el) => setTextRow(el, 6)} className="w-full flex flex-col items-center -mt-1">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(1.8rem,8vw,8rem)]" aria-hidden="true">
            CAN <span className="italic font-display">EMPTY</span>
          </p>
        </div>
        <div ref={(el) => setTextRow(el, 7)} className="w-full flex justify-center items-center -mt-2 md:-mt-4">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            THE
          </p>
        </div>

        <div ref={(el) => setTextRow(el, 8)} className="w-full flex justify-center -mt-2 md:-mt-4">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(1.5rem,6vw,6rem)] text-center" aria-hidden="true">
            TUPPERWARE
          </p>
        </div>

        <div ref={(el) => setTextRow(el, 9)} className="flex w-full items-center justify-center gap-2 md:gap-8 -mt-1">
          <p className="text-[#004D3F] font-display font-black uppercase leading-[0.85] tracking-[-0.03em] text-[clamp(2rem,9vw,9rem)]" aria-hidden="true">
            DRAWER
          </p>
          <motion.div
            ref={(el) => setImage(el, 4)}
            className="relative aspect-[1.3/1] w-[14%] min-w-[40px] md:min-w-[60px] max-w-[110px] shrink-0 border-2 border-[#004D3F] bg-[#F7F5F2] rounded-[12px] md:rounded-[20px] shadow-[3px_3px_0px_#004D3F] overflow-hidden"
            whileHover={{ rotate: 3, scale: 1.1, transition: { type: "spring", stiffness: 300, damping: 15 } }}
          >
            <Image
              src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=200&h=200&fit=crop"
              alt="Baby laughing joyfully"
              fill
              className="object-cover"
              sizes="110px"
              loading="lazy"
            />
          </motion.div>
        </div>

        <motion.div
          className="mt-8 md:mt-12 w-full flex justify-center"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <motion.div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FFF98F] border-2 border-[#004D3F] shadow-[2px_2px_0px_#004D3F]"
              animate={{ y: [-5, 5] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            />
            <motion.div
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#82E9A6] border-2 border-[#004D3F] shadow-[2px_2px_0px_#004D3F] flex items-center justify-center"
              animate={{ y: [-8, 8] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.3 }}
            >
              <span className="text-[#004D3F] text-lg md:text-xl">☺</span>
            </motion.div>
            <motion.div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#FFF98F] border-2 border-[#004D3F] shadow-[2px_2px_0px_#004D3F]"
              animate={{ y: [-5, 5] }}
              transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 0.6 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IntroGrid;
