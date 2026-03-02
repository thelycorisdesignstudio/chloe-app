"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Star, Clock, Building2, TreePalm, Waves, Palette, BookOpen, Dumbbell } from 'lucide-react';

const activityCategories = [
  {
    icon: TreePalm,
    title: "Parks & Playgrounds",
    description: "From Zabeel Park's sprawling green spaces to community playgrounds in every neighborhood, the UAE has invested heavily in family-friendly outdoor areas.",
    locations: ["Zabeel Park, Dubai", "Umm Suqeim Park", "Khalifa Park, Abu Dhabi", "Al Mamzar Beach Park"],
    tips: "Visit early morning or after 4 PM to avoid peak heat. Many parks have shaded play equipment.",
    ageRange: "All ages",
    bestTime: "Oct-Apr: Any time | May-Sep: Before 9 AM or after 5 PM"
  },
  {
    icon: Waves,
    title: "Beaches & Water Activities",
    description: "The UAE's stunning coastline offers miles of family-friendly beaches. Many feature shallow areas perfect for toddlers and lifeguard stations for safety.",
    locations: ["Kite Beach, Dubai", "JBR Beach", "Corniche Beach, Abu Dhabi", "Al Khan Beach, Sharjah"],
    tips: "Pack a beach tent for shade, reef-safe sunscreen, and plenty of water. Avoid jellyfish season (usually Jan-Feb).",
    ageRange: "All ages (supervised)",
    bestTime: "Early morning for cooler sand, sunset for family-friendly atmosphere"
  },
  {
    icon: Building2,
    title: "Indoor Play Areas",
    description: "When temperatures soar, the UAE's world-class indoor play facilities become essential. Malls across the Emirates feature dedicated kids' zones with everything from soft play to climbing walls.",
    locations: ["KidZania Dubai", "Bounce Abu Dhabi", "Adventure Zone", "Fun City"],
    tips: "Weekday mornings are least crowded. Book ahead for popular venues during school holidays.",
    ageRange: "Varies by venue (0-14 years)",
    bestTime: "Year-round, especially May-September"
  },
  {
    icon: Palette,
    title: "Arts & Creativity",
    description: "Nurture your child's creativity at art studios, pottery classes, and creative workshops across the UAE. Many venues offer drop-in sessions perfect for spontaneous visits.",
    locations: ["Art Jameel, Dubai", "Louvre Abu Dhabi kids programs", "Sharjah Art Museum", "Dubai Design District"],
    tips: "Many museums offer free or discounted entry for children. Check for family workshop schedules.",
    ageRange: "3+ years (varies by activity)",
    bestTime: "Year-round indoor activity"
  },
  {
    icon: BookOpen,
    title: "Libraries & Story Time",
    description: "The UAE has invested in beautiful public libraries offering free story times, reading programs, and educational activities. Many feature dedicated children's sections with interactive elements.",
    locations: ["Mohammed Bin Rashid Library", "Abu Dhabi Public Library", "Sharjah Public Library", "Dubai Public Library"],
    tips: "Most libraries offer free membership for UAE residents. Check schedules for English and Arabic story times.",
    ageRange: "All ages",
    bestTime: "Year-round, check event calendars for special programs"
  },
  {
    icon: Dumbbell,
    title: "Sports & Physical Activities",
    description: "From swimming lessons to junior football clubs, the UAE offers diverse sports programs for kids. Many hotels and clubs offer day passes for families.",
    locations: ["Sports City Dubai", "Yas Sports Academy", "GEMS Sports Academy", "Community clubs across Emirates"],
    tips: "Start water safety lessons early - swimming is essential in the UAE climate. Many sports are offered indoors.",
    ageRange: "3+ years (varies by sport)",
    bestTime: "Indoor: Year-round | Outdoor: Oct-Apr"
  }
];

const topDestinations = [
{
name: "Dubai",
activities: "2,500+",
highlights: ["Dubai Mall KidZania", "Kite Beach", "Dubai Frame", "IMG Worlds", "Legoland"],
image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
searchParam: "Dubai"
},
{
name: "Abu Dhabi",
activities: "1,200+",
highlights: ["Louvre Abu Dhabi", "Yas Waterworld", "Ferrari World", "Corniche Beach", "Emirates Park Zoo"],
image: "https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?w=800",
searchParam: "Abu Dhabi"
},
{
name: "Sharjah",
activities: "600+",
highlights: ["Sharjah Aquarium", "Al Noor Island", "Discovery Centre", "Al Majaz Waterfront", "Rain Room"],
image: "https://images.unsplash.com/photo-1558369981-f9ca78462e61?w=800",
searchParam: "Sharjah"
},
{
name: "Northern Emirates",
activities: "400+",
highlights: ["Jebel Jais (RAK)", "Wadi Adventure (Fujairah)", "Dreamland Aqua Park", "Al Zorah Beach"],
image: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800",
searchParam: "RAK"
}
];

export default function ActivityExplorer() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#FFF98F] overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-hand text-2xl md:text-3xl text-[#004D3F] mb-4 block">discover what&apos;s out there</span>
          <h2 className="text-[#004D3F] font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-6">
            Activity Explorer
          </h2>
          <p className="max-w-2xl mx-auto text-[#004D3F]/80 text-lg md:text-xl">
            The UAE is a paradise for families with kids. Here&apos;s your comprehensive guide to every type of activity you can find - from free beaches to world-class theme parks.
          </p>
        </div>

        <div className="space-y-8 mb-20">
          {activityCategories.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-[30px] border-2 border-[#004D3F] shadow-[6px_6px_0px_#004D3F] p-6 md:p-8 hover:shadow-[8px_8px_0px_#004D3F] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="lg:w-16 shrink-0">
                    <div className="w-14 h-14 rounded-full bg-[#82E9A6] border-2 border-[#004D3F] flex items-center justify-center shadow-[3px_3px_0px_#004D3F]">
                      <Icon className="w-7 h-7 text-[#004D3F]" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-black text-[#004D3F] uppercase mb-3">
                      {category.title}
                    </h3>
                    <p className="text-[#004D3F]/80 leading-relaxed mb-6">
                      {category.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-[#B3F5FF]/50 rounded-[16px] p-4 border border-[#004D3F]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-[#004D3F]" />
                          <span className="text-sm font-bold text-[#004D3F] uppercase">Popular Locations</span>
                        </div>
                        <p className="text-sm text-[#004D3F]/70">{category.locations.join(" • ")}</p>
                      </div>
                      
                      <div className="bg-[#FDCFDF]/50 rounded-[16px] p-4 border border-[#004D3F]/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="w-4 h-4 text-[#004D3F]" />
                          <span className="text-sm font-bold text-[#004D3F] uppercase">Pro Tip</span>
                        </div>
                        <p className="text-sm text-[#004D3F]/70">{category.tips}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="flex items-center gap-2 bg-[#FFF98F] rounded-full px-4 py-2 border border-[#004D3F]/30">
                        <Users className="w-4 h-4 text-[#004D3F]" />
                        <span className="text-sm font-medium text-[#004D3F]">{category.ageRange}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-[#82E9A6] rounded-full px-4 py-2 border border-[#004D3F]/30">
                        <Clock className="w-4 h-4 text-[#004D3F]" />
                        <span className="text-sm font-medium text-[#004D3F]">{category.bestTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#004D3F] rounded-[40px] border-2 border-[#004D3F] p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-2">
              Explore by Emirate
            </h3>
            <p className="text-white/70">Each emirate has its own character and unique family experiences</p>
          </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topDestinations.map((dest, idx) => (
                <Link 
                  key={idx}
                  href={`/explore?search=${encodeURIComponent(dest.searchParam)}`}
                  className="bg-white rounded-[24px] border-2 border-white/20 overflow-hidden group hover:translate-y-[-4px] transition-all cursor-pointer"
                >
                  <div className="relative h-32 overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#004D3F]/80 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <h4 className="font-black text-white text-xl">{dest.name}</h4>
                      <p className="text-white/80 text-sm">{dest.activities} activities</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {dest.highlights.map((highlight, hIdx) => (
                        <span 
                          key={hIdx}
                          className="text-xs bg-[#FFF98F] text-[#004D3F] px-2 py-1 rounded-full border border-[#004D3F]/20 font-medium"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
        </div>

        <div className="mt-16 bg-white rounded-[30px] border-2 border-[#004D3F] shadow-[6px_6px_0px_#004D3F] p-8 md:p-10">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-black text-[#004D3F] uppercase mb-4">
                Essential UAE Parenting Resources
              </h3>
              <p className="text-[#004D3F]/70 mb-6">
                Beyond activities, here are resources every UAE parent should know about:
              </p>
              <ul className="space-y-3">
                {[
                  "Dubai Municipality website - report issues, find services",
                  "Hayyak - official UAE family events calendar",
                  "UAE Government portals for school enrollment",
                  "Health insurance coverage for children is mandatory",
                  "Public transport is free for children under 5"
                ].map((resource, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-[#004D3F]/80">
                    <div className="w-2 h-2 rounded-full bg-[#82E9A6] border border-[#004D3F] mt-2 shrink-0" />
                    <span>{resource}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <div className="w-40 h-40 rounded-full bg-[#82E9A6] border-2 border-[#004D3F] flex items-center justify-center shadow-[4px_4px_0px_#004D3F]">
                <div className="text-center">
                  <p className="text-4xl font-black text-[#004D3F]">5K+</p>
                  <p className="text-sm font-medium text-[#004D3F]">Activities</p>
                  <p className="text-xs text-[#004D3F]/70">across UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
