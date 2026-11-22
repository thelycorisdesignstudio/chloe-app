"use client";

import React, { useState } from "react";
import Logo from "@/components/Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/explore", label: "Explore" },
  { href: "/#locations", label: "Locations" },
  { href: "/blog", label: "Blog" },
];

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <motion.header
      className="fixed top-3 md:top-5 left-0 right-0 z-[100] flex justify-center px-3 md:px-6 pointer-events-none"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="pointer-events-auto relative w-full max-w-5xl"
      >
        {/* The rounded bar */}
        <div className="flex items-center justify-between gap-3 rounded-full border-2 border-teal bg-off-white pl-2 pr-2 py-2 shadow-[4px_4px_0px_#3C2364]">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Chloe - Home"
            className="flex items-center rounded-full pl-2 pr-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C73C8] focus-visible:ring-offset-2"
          >
            <Logo />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => {
              const active = pathname === l.href || (l.href === "/blog" && pathname.startsWith("/blog"));
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`block rounded-full px-4 py-2 font-display font-extrabold text-[12px] tracking-widest uppercase leading-none transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C73C8] ${
                      active
                        ? "bg-lemon text-teal"
                        : "text-teal hover:bg-[#C8B9E6]/60"
                    }`}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/forbusiness"
              className="rounded-full border-2 border-teal bg-teal px-4 py-2 font-display font-extrabold text-[11px] sm:text-[12px] tracking-widest uppercase leading-none text-white hover:bg-[#3C73C8] hover:border-[#3C73C8] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C73C8] focus-visible:ring-offset-2"
            >
              List your venue
            </Link>
            <button
              type="button"
              className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border-2 border-teal bg-lemon text-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3C73C8]"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              className="md:hidden mt-3 rounded-[28px] border-2 border-teal bg-off-white p-3 shadow-[4px_4px_0px_#3C2364]"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.18 }}
            >
              <ul className="flex flex-col gap-1">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-full px-5 py-3 font-display font-extrabold text-sm tracking-widest uppercase text-teal hover:bg-[#C8B9E6]/60"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Navigation;
