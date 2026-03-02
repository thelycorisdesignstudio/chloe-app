"use client";

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const ctaWords = "TURN CHAOS INTO CHUCKLES WITH CHLOE!".split(" ");

export default function CallToAction() {
  return (
    <section id="contact" className="flex flex-col w-full overflow-hidden">
      <div
        className="bg-[#82E9A6] py-16 md:py-24 lg:py-32 px-6 relative"
        aria-labelledby="cta-heading"
      >
        <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center">
          <motion.span
            className="font-hand text-[#004D3F] text-3xl md:text-4xl mb-6 block"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            ready to explore?
          </motion.span>

          <h2
            id="cta-heading"
            className="text-[#004D3F] font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight max-w-4xl mb-8 flex flex-wrap justify-center gap-x-[0.25em]"
          >
            {ctaWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ y: 30, scale: 0.8 }}
                whileInView={{ y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 14,
                  delay: 0.1 + i * 0.06,
                }}
              >
                {word}
              </motion.span>
            ))}
          </h2>

          <motion.p
            className="text-[#004D3F]/80 text-xl max-w-2xl mb-12"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            Stop stressing about what to do with the kids. Start exploring activities near you,
            filter by age, save your favorites, and create memories that matter.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 items-center"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <motion.a
              href="/explore"
              className="group relative inline-flex items-center justify-center bg-[#FFF98F] border-2 border-[#004D3F] rounded-full px-10 py-5 shadow-[4px_4px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-6 h-6 text-[#004D3F] mr-3" />
              </motion.div>
              <span className="text-xl font-black text-[#004D3F] uppercase tracking-tight">Start Exploring</span>
            </motion.a>

            <motion.a
              href="/forbusiness"
              className="group relative inline-flex items-center justify-center bg-white border-2 border-[#004D3F] rounded-full px-10 py-5 shadow-[4px_4px_0px_#004D3F] focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="text-xl font-black text-[#004D3F] uppercase tracking-tight">List Your Venue</span>
              <ArrowRight className="w-5 h-5 text-[#004D3F] ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
