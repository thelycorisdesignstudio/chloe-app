"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "chloe-consent-v1";

/** Small rounded consent popup. Choice is stored in localStorage only. */
export default function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen: string | null = null;
    try {
      seen = localStorage.getItem(KEY);
    } catch {}
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);

  const choose = (value: "all" | "essential") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {}
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie and privacy choices"
          className="fixed bottom-4 left-4 right-4 md:right-auto md:bottom-6 md:left-6 z-[150] md:max-w-[400px] rounded-[28px] border-2 border-[#3C2364] bg-[#F4F1F8] p-5 shadow-[6px_6px_0px_#3C2364]"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
        >
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#3C2364] bg-[#F5F096]">
              <Cookie className="h-5 w-5 text-[#3C2364]" />
            </span>
            <div>
              <p className="font-display font-extrabold text-[#3C2364]">Your privacy, your call</p>
              <p className="mt-1 text-sm leading-relaxed text-[#3C2364]/80">
                We use essential storage to remember your favourites, and optional analytics to improve our guides. Read our{" "}
                <Link href="/policies" className="font-bold underline">privacy policy</Link>.
              </p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={() => choose("essential")}
              className="flex-1 rounded-full border-2 border-[#3C2364] bg-white px-4 py-2.5 font-display text-xs font-extrabold uppercase tracking-widest text-[#3C2364] transition-colors hover:bg-[#C8B9E6]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C73C8]"
            >
              Essential only
            </button>
            <button
              type="button"
              onClick={() => choose("all")}
              className="flex-1 rounded-full border-2 border-[#3C2364] bg-[#3C2364] px-4 py-2.5 font-display text-xs font-extrabold uppercase tracking-widest text-white transition-colors hover:bg-[#3C73C8] hover:border-[#3C73C8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C73C8]"
            >
              Accept all
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
