"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";

const links = [
  { href: "/explore", label: "Explore" },
  { href: "/#locations", label: "Locations" },
  { href: "/#faqs", label: "FAQ" },
  { href: "/forbusiness", label: "For Business" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-3 md:top-4 z-[100] px-3 md:px-6 pointer-events-none">
      <motion.nav
        role="navigation"
        aria-label="Main navigation"
        className="pointer-events-auto relative mx-auto max-w-[1100px] rounded-full border-2 border-[#004D3F] bg-[#F7F5F2] shadow-[4px_4px_0px_#004D3F]"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 20 }}
      >
        <div className="flex items-center justify-between gap-3 pl-3 pr-2 py-2 md:pl-5 md:pr-3">
          <Link
            href="/"
            aria-label="Chloe - Home"
            className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004D3F] focus-visible:ring-offset-2"
          >
            <Logo markSize={36} />
          </Link>

          <ul className="hidden md:flex items-center gap-1 lg:gap-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-full px-3 lg:px-4 py-2 font-display font-extrabold text-[12px] lg:text-[13px] uppercase tracking-widest text-[#004D3F] transition-colors hover:bg-[#FFF98F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004D3F]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="hidden sm:inline-flex rounded-full border-2 border-[#004D3F] bg-white px-4 py-2 font-display font-extrabold text-[12px] uppercase tracking-widest text-[#004D3F] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004D3F] focus-visible:ring-offset-2"
            >
              Login
            </Link>
            <Link
              href="/forbusiness"
              className="hidden sm:inline-flex rounded-full border-2 border-[#004D3F] bg-[#FFF98F] px-4 py-2 font-display font-extrabold text-[12px] uppercase tracking-widest text-[#004D3F] shadow-[2px_2px_0px_#004D3F] transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004D3F] focus-visible:ring-offset-2"
            >
              List Your Venue
            </Link>
            <button
              type="button"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#004D3F] bg-[#FFF98F] text-[#004D3F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#004D3F] focus-visible:ring-offset-2"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              className="md:hidden absolute left-0 right-0 top-[calc(100%+8px)] rounded-[28px] border-2 border-[#004D3F] bg-[#F7F5F2] p-3 shadow-[4px_4px_0px_#004D3F]"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <ul className="flex flex-col gap-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-full px-4 py-3 font-display font-extrabold text-sm uppercase tracking-widest text-[#004D3F] hover:bg-[#FFF98F]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full border-2 border-[#004D3F] bg-white py-3 text-center font-display font-extrabold text-xs uppercase tracking-widest text-[#004D3F]"
                >
                  Login
                </Link>
                <Link
                  href="/forbusiness"
                  onClick={() => setOpen(false)}
                  className="rounded-full border-2 border-[#004D3F] bg-[#FFF98F] py-3 text-center font-display font-extrabold text-xs uppercase tracking-widest text-[#004D3F]"
                >
                  List Venue
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
};

export default Navigation;
