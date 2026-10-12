"use client";

import React from 'react';
import Link from 'next/link';
import { Trees, Waves, BookOpen, Palette, Music, Dumbbell, Dog, Utensils } from 'lucide-react';

// `name` must exactly match a category name in src/lib/data/activities.ts's
// `categories` list (and thus the seeded Category documents) — /explore
// resolves this name to the category's real database _id client-side.
const categories = [
  {
    icon: Trees,
    name: "Parks & Playgrounds",
    count: "25+",
    color: "#82E9A6",
    description: "Parks, nature reserves, and outdoor fun",
  },
  {
    icon: Waves,
    name: "Swimming Pools",
    count: "15+",
    color: "#B3F5FF",
    description: "Pools, beaches, and splash parks",
  },
  {
    icon: BookOpen,
    name: "Libraries & Books",
    count: "10+",
    color: "#FFF98F",
    description: "Story time, reading programs, and more",
  },
  {
    icon: Palette,
    name: "Art & Culture",
    count: "15+",
    color: "#FDCFDF",
    description: "Creative workshops and art classes",
  },
  {
    icon: Music,
    name: "Theme Parks",
    count: "22+",
    color: "#FFB866",
    description: "Rides, shows, and family entertainment",
  },
  {
    icon: Dumbbell,
    name: "Sports & Recreation",
    count: "22+",
    color: "#B3F5FF",
    description: "Soccer, gymnastics, martial arts, and more",
  },
  {
    icon: Dog,
    name: "Zoos & Wildlife",
    count: "24+",
    color: "#82E9A6",
    description: "Zoos, farms, and wildlife encounters",
  },
  {
    icon: Utensils,
    name: "Restaurants & Cafes",
    count: "10+",
    color: "#FFF98F",
    description: "Family restaurants and play cafes",
  }
];

export default function ActivityCategories() {
  return (
    <section 
      id="activities"
      className="relative w-full py-24 md:py-32 bg-[#1D6FEB] overflow-hidden"
      aria-labelledby="categories-heading"
    >
      <div className="container max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-hand text-2xl md:text-3xl text-[#F5F9FF] mb-4 block">something for everyone</span>
          <h2 id="categories-heading" className="text-[#F5F9FF] font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-4">
            Activity Categories
          </h2>
          <p className="text-[#F5F9FF] font-medium text-lg md:text-xl max-w-2xl mx-auto">
            From outdoor adventures to creative workshops, find the perfect activity for your little ones
          </p>
        </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6" role="list">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={`/explore?category=${encodeURIComponent(category.name)}`}
                role="listitem"
                className="group relative p-6 md:p-8 rounded-[30px] md:rounded-[40px] border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] transition-all duration-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#004D3F] text-left cursor-pointer focus-within:ring-2 focus-within:ring-[#004D3F] focus-within:ring-offset-2"
                style={{ backgroundColor: category.color }}
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white border-2 border-[#004D3F] flex items-center justify-center mb-4 shadow-[2px_2px_0px_#004D3F] group-hover:scale-110 transition-transform" aria-hidden="true">
                  <category.icon className="w-6 h-6 md:w-7 md:h-7 text-[#004D3F]" strokeWidth={2.5} />
                </div>
                
                <h3 className="text-[#004D3F] font-black text-lg md:text-xl uppercase mb-1">
                  {category.name}
                </h3>
                
                <p className="text-[#004D3F] font-bold text-sm mb-2">
                  {category.count} venues
                </p>
                
                <p className="text-[#004D3F]/70 font-medium text-xs md:text-sm hidden md:block">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>

        <div className="mt-16 text-center">
          <Link 
            href="/explore"
            className="inline-flex items-center gap-3 bg-[#004D3F] text-white font-black text-lg uppercase tracking-wide px-10 py-5 rounded-full border-2 border-[#004D3F] shadow-[4px_4px_0px_#F7F5F2] hover:shadow-[6px_6px_0px_#F7F5F2] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all focus:outline-none focus:ring-2 focus:ring-[#004D3F] focus:ring-offset-2"
          >
            Explore All Categories
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}