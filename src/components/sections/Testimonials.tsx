"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote, Users, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: "Fatima A.",
    location: "Dubai, UAE",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "Chloe has completely changed our weekends! My 3-year-old used to drive me crazy asking 'what are we doing today?' Now I just check Chloe and we always find something fun nearby. From Dubai Mall play areas to Zabeel Park - we've discovered so many hidden gems!",
    kidAge: "Mum of a 3-year-old"
  },
  {
    id: 2,
    name: "Ahmed K.",
    location: "Abu Dhabi, UAE",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "As a dad working long hours, I needed activities that would tire out my twins during weekends. The age filter is genius - everything we find is perfect for 5-year-olds. From Yas Island to the Corniche beaches - absolute lifesaver!",
    kidAge: "Dad of 5-year-old twins"
  },
  {
    id: 3,
    name: "Sarah M.",
    location: "Sharjah, UAE",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "We just moved from the UK and had no idea what was around us. Chloe helped us discover Al Majaz Waterfront, amazing indoor play areas, and a fantastic library within our first week! The summer heat makes indoor activities essential here.",
    kidAge: "Mum of 2 & 4-year-olds"
  },
  {
    id: 4,
    name: "Omar H.",
    location: "Dubai Marina, UAE",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    rating: 5,
    text: "The reviews from other UAE parents are so helpful. We avoid the overcrowded spots and find hidden gems. My daughter now has 'favorite' spots from JBR beach to cool indoor activities at Ibn Battuta Mall!",
    kidAge: "Dad of a 6-year-old"
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-[#FDCFDF] overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-hand text-2xl md:text-3xl text-[#004D3F] mb-4 block">real families, real stories</span>
          <h2 className="text-[#004D3F] font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight">
            Parents Love Us
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-[40px] md:rounded-[60px] border-2 border-[#004D3F] shadow-[8px_8px_0px_#004D3F] p-8 md:p-12">
            <div className="absolute top-4 left-6 md:-top-6 md:left-12 z-10">
              <motion.div
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FFF98F] border-2 border-[#004D3F] flex items-center justify-center shadow-[3px_3px_0px_#004D3F]"
                initial={{ scale: 0.5, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.3 }}
              >
                <Quote className="w-5 h-5 md:w-6 md:h-6 text-[#004D3F]" />
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ x: 50, rotateY: 5 }}
                animate={{ x: 0, rotateY: 0 }}
                exit={{ x: -50, rotateY: -5 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="flex flex-col md:flex-row gap-8 items-center md:items-start"
              >
                <motion.div
                  className="relative w-24 h-24 md:w-32 md:h-32 shrink-0"
                  initial={{ scale: 0.5 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                >
                  <div className="w-full h-full rounded-full border-4 border-[#004D3F] overflow-hidden shadow-[4px_4px_0px_#004D3F]">
                    <Image
                      src={currentTestimonial.avatar}
                      alt={currentTestimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.05, type: "spring", stiffness: 300 }}
                      >
                        <Star className="w-5 h-5 fill-[#FFF98F] text-[#004D3F]" />
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-[#004D3F] font-medium text-lg md:text-xl leading-relaxed mb-6">
                    &ldquo;{currentTestimonial.text}&rdquo;
                  </p>

                  <div>
                    <p className="text-[#004D3F] font-black text-xl uppercase">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-[#004D3F]/70 font-medium">
                      {currentTestimonial.kidAge} • {currentTestimonial.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="w-12 h-12 rounded-full bg-white border-2 border-[#004D3F] shadow-[3px_3px_0px_#004D3F] flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#004D3F] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <ChevronLeft className="w-6 h-6 text-[#004D3F]" />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`w-3 h-3 rounded-full border-2 border-[#004D3F] transition-all ${
                    idx === currentIndex ? 'bg-[#004D3F] scale-125' : 'bg-transparent hover:bg-[#004D3F]/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="w-12 h-12 rounded-full bg-white border-2 border-[#004D3F] shadow-[3px_3px_0px_#004D3F] flex items-center justify-center hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#004D3F] transition-all active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
            >
              <ChevronRight className="w-6 h-6 text-[#004D3F]" />
            </button>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {[
            { icon: Users, text: "Trusted by UAE families" },
            { icon: Star, text: "4.9 Average Rating", fill: true },
            { icon: MapPin, text: "All 7 Emirates" },
          ].map((badge, i) => (
            <motion.div
              key={i}
              className={`flex items-center gap-2 bg-white border-2 border-[#004D3F] rounded-full px-6 py-3 shadow-[3px_3px_0px_#004D3F]`}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 200, damping: 20 }}
            >
              <badge.icon className={`w-5 h-5 text-[#004D3F] ${badge.fill ? 'fill-[#FFF98F]' : ''}`} />
              <span className="text-[#004D3F] font-bold">{badge.text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
