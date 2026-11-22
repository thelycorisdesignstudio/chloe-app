"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations/variants';
import { useTilt3D } from '@/lib/animations/use-tilt';

import type { CountryCard } from "@/lib/data/country-cards";

function LocationCard({ dest, idx }: { dest: CountryCard; idx: number }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(8);

  return (
    <motion.div variants={fadeUp} className="h-full">
      <Link
        href={`/explore?country=${dest.code}`}
        className="block h-full"
      >
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="group bg-[#F4F1F8] rounded-[30px] border-2 border-[#3C2364] overflow-hidden shadow-[4px_4px_0px_#3C2364] hover:shadow-[6px_6px_0px_#3C2364] transition-shadow cursor-pointer will-change-transform h-full flex flex-col"
        >
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#3C2364]/80 to-transparent" />
            <div className="absolute bottom-4 left-5">
              <h4 className="font-black text-white text-2xl uppercase">{dest.name}</h4>
              <p className="text-[#C8B9E6] font-bold text-sm">{dest.count} {dest.count === 1 ? "venue" : "venues"}</p>
            </div>
          </div>
          <div className="p-5 flex-1 flex items-start">
            <div className="flex flex-wrap gap-2 content-start">
              {dest.highlights.map((highlight, hIdx) => (
                <span
                  key={hIdx}
                  className="text-[10px] bg-white text-[#3C2364] px-2.5 py-1 rounded-full border border-[#3C2364]/10 font-bold uppercase tracking-wider"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function LocationGrid({ destinations }: { destinations: CountryCard[] }) {
  return (
    <section id="locations" className="w-full py-12 md:py-20 bg-white">
      <div className="container max-w-[1440px] mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-[#3C2364] font-black text-3xl md:text-5xl uppercase mb-4">
            Explore by country
          </h2>
          <p className="text-[#3C2364]/70 text-lg max-w-2xl mx-auto">
            Discover family days out across the UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman
          </p>
        </motion.div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {destinations.map((dest, idx) => (
            <LocationCard key={idx} dest={dest} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
