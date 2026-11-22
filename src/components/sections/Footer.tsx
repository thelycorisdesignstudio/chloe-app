"use client";

import React from 'react';
import Link from 'next/link';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, popRotate } from '@/lib/animations/variants';
import Logo from '@/components/Logo';
import ChloeWordmark from '@/components/ChloeWordmark';

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#F4F1F8] py-16 px-6 md:px-12 rounded-t-[30px] md:rounded-t-[60px]"
      style={{
        borderTop: '2px solid #3C2364',
        marginTop: '-2px'
      }}
      role="contentinfo"
    >
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          className="grid md:grid-cols-4 gap-8 md:gap-12 mb-16"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="md:col-span-2" variants={fadeUp}>
            <Link href="/" aria-label="Chloe home" className="inline-block mb-5"><Logo className="scale-125 origin-left" /></Link>
              <p className="text-[#3C2364]/70 text-lg leading-relaxed mb-6 max-w-md">
                Kid-friendly activities and family venues across the GCC,
                researched for parents in the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman.
              </p>
            <div className="flex gap-4">
              {[
                { href: "https://instagram.com/chloe.uae", icon: Instagram, label: "Follow us on Instagram" },
                { href: "https://facebook.com/chloe.uae", icon: Facebook, label: "Follow us on Facebook" },
                { href: "https://twitter.com/chloe_uae", icon: Twitter, label: "Follow us on Twitter" },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-[#3C2364] flex items-center justify-center text-white hover:bg-[#3C2364]/80 transition-colors"
                  variants={popRotate}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-[#3C2364] font-black text-lg uppercase mb-6">Explore</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/explore" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium transition-colors">Browse Activities</Link>
              <Link href="/venues" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium transition-colors">All Venues</Link>
              <Link href="/blog" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium transition-colors">Blog &amp; Guides</Link>
              <Link href="/#faqs" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium transition-colors">FAQs</Link>
            </nav>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-[#3C2364] font-black text-lg uppercase mb-6">For Business</h4>
            <nav className="flex flex-col gap-3">
              <Link href="/forbusiness" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium transition-colors">List Your Venue</Link>
              <Link href="/forbusiness#pricing" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium transition-colors">Partnership Plans</Link>
              <Link href="/forbusiness#contact" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium transition-colors">Contact Sales</Link>
            </nav>
          </motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#3C2364]/10 gap-6">
          <div>
            <p className="text-[#3C2364] font-bold text-lg">
              © 2026 Lycoris Labs Inc. Made with love in the UAE.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:hello@chloe.com" className="text-[#3C2364]/70 hover:text-[#3C2364] font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              hello@chloe.com
            </a>
          </div>

          <nav className="flex items-center gap-8" aria-label="Footer navigation">
            <Link
              href="/policies" 
              className="text-[#3C2364] font-black text-sm uppercase tracking-widest hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#3C2364] focus:ring-offset-2 rounded"
            >
              POLICIES
            </Link>
            <Link
              href="/terms" 
              className="text-[#3C2364] font-black text-sm uppercase tracking-widest hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#3C2364] focus:ring-offset-2 rounded"
            >
              TERMS
            </Link>
          </nav>
        </div>

          <div className="text-center mt-12 pt-8 border-t border-[#3C2364]/10">
            <p className="font-hand text-2xl text-[#3C2364] opacity-60 mb-6">
              Making memories lighter.
            </p>
            
            <p className="text-[#3C2364]/50 text-sm font-medium">A product by</p>
            <p className="mt-2 text-[#3C2364] font-black text-sm md:text-base uppercase tracking-widest">Lycoris Labs Inc.</p>
          </div>

        {/* Giant hand-lettered wordmark */}
        <div className="grain-gradient mt-14 md:mt-20 rounded-[32px] md:rounded-[56px] border-2 border-[#3C2364] px-6 py-12 md:py-20 flex justify-center select-none">
          <ChloeWordmark animate ink="#FFFFFF" className="w-full max-w-[1000px] h-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
