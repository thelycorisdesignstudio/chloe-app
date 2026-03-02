"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: "FIND ACTIVITIES",
    subtitle: "in your Local area",
    description: "Discover playgrounds, libraries, swimming pools, and more near you",
    images: {
      photoLeft: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=300&h=300&fit=crop",
      uiCenter: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=300&h=600&fit=crop",
      photoRight: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=300&h=300&fit=crop",
    },
    color: "#FDCFDF"
  },
  {
    id: 2,
    title: "SAVE FAVORITES",
    subtitle: "for later adventures",
    description: "Keep track of the best spots your family loves to visit",
    images: {
      photoLeft: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=300&h=300&fit=crop",
      uiCenter: "https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=300&h=600&fit=crop",
      photoRight: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=300&h=300&fit=crop",
    },
    color: "#FFF98F"
  },
  {
    id: 3,
    title: "FILTER BY AGE",
    subtitle: "perfect for your little one",
    description: "Find age-appropriate activities from babies to big kids",
    images: {
      photoLeft: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=300&h=300&fit=crop",
      uiCenter: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=300&h=600&fit=crop",
      photoRight: "https://images.unsplash.com/photo-1536640712-4d4c36ff0e4e?w=300&h=300&fit=crop",
    },
    color: "#B3F5FF"
  }
];

export default function FeatureSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  const currentFeature = features[currentIndex];

  return (
    <section className="relative w-full py-10 md:py-20 px-4 md:px-10 overflow-hidden bg-[#82E9A6]">
      <div className="container max-w-[1440px] mx-auto mb-12 text-center">
        <h2 className="font-hand text-3xl md:text-4xl text-[#004D3F] mb-4">with Chloe you can</h2>
        <h3 className="text-[#004D3F] font-black text-4xl md:text-6xl uppercase tracking-tight">Explore & Discover</h3>
      </div>
      
      <div className="container max-w-[1440px] mx-auto relative flex items-center justify-center">
        <button 
          onClick={prevSlide}
          aria-label="Previous feature"
          className="absolute left-0 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#004D3F] bg-[#FFF98F] shadow-[4px_4px_0px_#004D3F] flex items-center justify-center hover:translate-y-[-2px] transition-transform active:translate-y-[1px] active:shadow-none"
        >
          <ArrowLeft className="text-[#004D3F]" size={24} strokeWidth={3} />
        </button>

        <div 
          className="w-full max-w-[1100px] aspect-[16/10] md:aspect-[1.8/1] rounded-[40px] md:rounded-[60px] border-2 border-[#004D3F] shadow-[8px_8px_0px_#004D3F] relative overflow-hidden flex flex-col items-center justify-between p-8 md:p-12 transition-colors duration-300"
          style={{ backgroundColor: currentFeature.color }}
        >
          <div className="relative flex-1 w-full flex items-center justify-center mb-8">
            <div className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 -rotate-6 w-[100px] h-[100px] md:w-[180px] md:h-[180px] overflow-hidden rounded-[20px] border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] z-10 transition-transform hover:scale-105">
              <Image 
                src={currentFeature.images.photoLeft}
                alt="Activities preview"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative w-[140px] h-[280px] md:w-[220px] md:h-[440px] z-20 transition-transform hover:scale-[1.02]">
              <div className="absolute inset-0 bg-white rounded-[28px] md:rounded-[35px] border-[4px] md:border-[6px] border-[#004D3F] shadow-[8px_8px_0px_#004D3F] md:shadow-[10px_10px_0px_#004D3F] overflow-hidden">
                <Image 
                  src={currentFeature.images.uiCenter}
                  alt="Chloe UI"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="absolute right-[5%] md:right-[10%] top-1/3 -translate-y-1/2 rotate-6 w-[90px] h-[90px] md:w-[150px] md:h-[150px] overflow-hidden rounded-[20px] border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] z-10 transition-transform hover:scale-105">
              <Image 
                src={currentFeature.images.photoRight}
                alt="Activities preview"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="text-center z-30">
            <h2 className="font-display font-[900] text-[#004D3F] text-[clamp(1.5rem,5vw,2.5rem)] leading-[1] uppercase tracking-tight">
              {currentFeature.title}
            </h2>
            <h3 className="font-display font-extrabold text-[#004D3F] text-[clamp(1rem,3vw,1.5rem)] leading-[1] uppercase tracking-tight mt-1">
              {currentFeature.subtitle}
            </h3>
          </div>
        </div>

        <button 
          onClick={nextSlide}
          aria-label="Next feature"
          className="absolute right-0 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-[#004D3F] bg-[#FFB866] shadow-[4px_4px_0px_#004D3F] flex items-center justify-center hover:translate-y-[-2px] transition-transform active:translate-y-[1px] active:shadow-none"
        >
          <ArrowRight className="text-[#004D3F]" size={24} strokeWidth={3} />
        </button>
      </div>

      <div className="flex justify-center gap-3 mt-8">
        {features.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-4 h-4 rounded-full border-2 border-[#004D3F] transition-all ${idx === currentIndex ? 'bg-[#FFF98F] scale-110' : 'bg-transparent hover:bg-[#FFF98F]/50'}`}
          />
        ))}
      </div>
    </section>
  );
}