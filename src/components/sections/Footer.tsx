"use client";

import React from 'react';
import { Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp, popRotate } from '@/lib/animations/variants';

const Footer = () => {
  return (
    <footer
      className="w-full bg-[#F7F5F2] py-16 px-6 md:px-12 rounded-t-[30px] md:rounded-t-[60px]"
      style={{
        borderTop: '2px solid #004D3F',
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
            <h3 className="text-[#004D3F] font-black text-3xl uppercase mb-4">Chloe</h3>
              <p className="text-[#004D3F]/70 text-lg leading-relaxed mb-6 max-w-md">
                The UAE&apos;s most trusted platform for discovering kid-friendly activities.
                Venues across all 7 Emirates, verified by real parents.
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
                  className="w-10 h-10 rounded-full bg-[#004D3F] flex items-center justify-center text-white hover:bg-[#004D3F]/80 transition-colors"
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
            <h4 className="text-[#004D3F] font-black text-lg uppercase mb-6">Explore</h4>
            <nav className="flex flex-col gap-3">
              <a href="/explore" className="text-[#004D3F]/70 hover:text-[#004D3F] font-medium transition-colors">Browse Activities</a>
              <a href="/#faqs" className="text-[#004D3F]/70 hover:text-[#004D3F] font-medium transition-colors">FAQs</a>
            </nav>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h4 className="text-[#004D3F] font-black text-lg uppercase mb-6">For Business</h4>
            <nav className="flex flex-col gap-3">
              <a href="/forbusiness" className="text-[#004D3F]/70 hover:text-[#004D3F] font-medium transition-colors">List Your Venue</a>
              <a href="/forbusiness#pricing" className="text-[#004D3F]/70 hover:text-[#004D3F] font-medium transition-colors">Partnership Plans</a>
              <a href="/forbusiness#contact" className="text-[#004D3F]/70 hover:text-[#004D3F] font-medium transition-colors">Contact Sales</a>
            </nav>
          </motion.div>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#004D3F]/10 gap-6">
          <div>
            <p className="text-[#004D3F] font-bold text-lg">
              © 2026 Chloe. Made with love in the UAE.
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm">
            <a href="mailto:hello@chloe.com" className="text-[#004D3F]/70 hover:text-[#004D3F] font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              hello@chloe.com
            </a>
          </div>

          <nav className="flex items-center gap-8" aria-label="Footer navigation">
            <a 
              href="/policies" 
              className="text-[#004D3F] font-black text-sm uppercase tracking-widest hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2 rounded"
            >
              POLICIES
            </a>
            <a 
              href="/terms" 
              className="text-[#004D3F] font-black text-sm uppercase tracking-widest hover:opacity-70 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2 rounded"
            >
              TERMS
            </a>
          </nav>
        </div>

          <div className="text-center mt-12 pt-8 border-t border-[#004D3F]/10">
            <p className="font-hand text-2xl text-[#004D3F] opacity-60 mb-6">
              Making memories lighter.
            </p>
            
            <div className="space-y-3">
              <p className="text-[#004D3F]/50 text-sm font-medium">
                A product by
              </p>
              <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-[#004D3F] font-black text-xs md:text-sm uppercase tracking-wider">Schroeder Technologies</span>
                </div>
                <span className="text-[#004D3F]/30 hidden md:inline">×</span>
                <div className="flex flex-col items-center">
                  <span className="text-[#004D3F] font-black text-xs md:text-sm uppercase tracking-wider">Gregorious Creative Studios</span>
                </div>
                <span className="text-[#004D3F]/30 hidden md:inline">×</span>
                <div className="flex flex-col items-center">
                  <span className="text-[#004D3F] font-black text-xs md:text-sm uppercase tracking-wider">Lycoris Design Studios</span>
                </div>
                <span className="text-[#004D3F]/30 hidden md:inline">×</span>
                <div className="flex flex-col items-center">
                  <span className="text-[#004D3F] font-black text-xs md:text-sm uppercase tracking-wider">Dubai Design Studios</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </footer>
  );
};

export default Footer;
