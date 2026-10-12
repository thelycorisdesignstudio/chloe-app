"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations/variants';
import { useTilt3D } from '@/lib/animations/use-tilt';
import { uaeDestinations, withLiveCounts } from '@/lib/data/destinations';

type LiveDestination = ReturnType<typeof withLiveCounts>[number];

function LocationCard({ dest, idx }: { dest: LiveDestination; idx: number }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt3D(8);

  return (
    <motion.div variants={fadeUp} className="h-full">
      <Link
        href={`/explore?search=${encodeURIComponent(dest.searchParam)}`}
        className="block h-full"
      >
        <div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          className="group bg-[#F7F5F2] rounded-[30px] border-2 border-[#004D3F] overflow-hidden shadow-[4px_4px_0px_#004D3F] hover:shadow-[6px_6px_0px_#004D3F] transition-shadow cursor-pointer will-change-transform h-full flex flex-col"
        >
          <div className="relative h-48 overflow-hidden flex-shrink-0">
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#004D3F]/80 to-transparent" />
            <div className="absolute bottom-4 left-5">
              <h4 className="font-black text-white text-2xl uppercase">{dest.name}</h4>
              <p className="text-[#82E9A6] font-bold text-sm">{dest.activities} activities</p>
            </div>
          </div>
          <div className="p-5 flex-1 flex items-start">
            <div className="flex flex-wrap gap-2 content-start">
              {dest.highlights.map((highlight, hIdx) => (
                <span
                  key={hIdx}
                  className="text-[10px] bg-white text-[#004D3F] px-2.5 py-1 rounded-full border border-[#004D3F]/10 font-bold uppercase tracking-wider"
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

export default function LocationGrid({
  regionStats = [],
}: {
  /** Live per-emirate counts from `getRegionStats('UAE')`. Defaults to an
   *  empty list (renders "0" counts) if the caller can't provide live data. */
  regionStats?: { region: string; count: number }[];
}) {
  const destinations = withLiveCounts(uaeDestinations, regionStats);
  const totalCount = regionStats.reduce((sum, r) => sum + r.count, 0);

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
          <h2 className="text-[#004D3F] font-black text-3xl md:text-5xl uppercase mb-4">
            Explore by Emirate
          </h2>
          <p className="text-[#004D3F]/70 text-lg max-w-2xl mx-auto">
            {totalCount > 0
              ? `${totalCount} verified kid-friendly activities across all 7 UAE Emirates`
              : 'Discover unique family experiences across the United Arab Emirates'}
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
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
