"use client";

import React, { useState } from 'react';
import { Sun, Thermometer, MapPin, Clock, Heart, Shield, Lightbulb, Baby, Users, Sparkles } from 'lucide-react';

const tips = [
  {
    id: 1,
    icon: Sun,
    title: "Beat the UAE Heat",
    category: "Summer Survival",
    content: "The UAE summer (June-September) can reach 45°C+. Plan outdoor activities for early morning (before 9 AM) or evening (after 5 PM). Indoor play areas, malls, and air-conditioned venues become your best friends during peak heat hours.",
    examples: [
      "Visit beaches at sunrise for cooler sand and water",
      "Mall play areas offer climate-controlled fun all day",
      "Indoor trampoline parks keep energy levels in check",
      "Library story times are free and refreshingly cool"
    ]
  },
  {
    id: 2,
    icon: MapPin,
    title: "Hidden Gems by Emirate",
    category: "Local Secrets",
    content: "Each emirate has unique family-friendly spots that tourists often miss. Local parks, community centers, and lesser-known beaches offer authentic experiences without the crowds.",
    examples: [
      "Dubai: Al Qudra Lakes for wildlife spotting",
      "Abu Dhabi: Mangrove National Park kayaking",
      "Sharjah: Al Noor Island butterfly garden",
      "RAK: Jebel Jais mountain activities"
    ]
  },
  {
    id: 3,
    icon: Clock,
    title: "Timing is Everything",
    category: "Planning Tips",
    content: "UAE weekends are Friday-Saturday. Popular spots get crowded on Friday afternoons after prayers. Thursday evenings and Saturday mornings are often the sweet spot for family outings.",
    examples: [
      "Friday morning: Perfect for beach visits before crowds",
      "Thursday evening: Great for outdoor activities",
      "Saturday morning: Museums and educational venues",
      "Weekday mornings: Best for indoor play areas"
    ]
  },
  {
    id: 4,
    icon: Shield,
    title: "Safety First in the Desert",
    category: "Safety Guide",
    content: "The UAE's unique environment requires special precautions. Always carry water, use high SPF sunscreen, and know the signs of heat exhaustion. Indoor venues should be your go-to during sandstorms.",
    examples: [
      "Always pack 2L water per person for outings",
      "SPF 50+ sunscreen reapplied every 2 hours",
      "Hats and UV-protective swimwear for beach days",
      "Check weather apps for sandstorm warnings"
    ]
  },
  {
    id: 5,
    icon: Heart,
    title: "Free Activities That Kids Love",
    category: "Budget-Friendly",
    content: "The UAE has countless free activities for families. Public beaches, parks, and many cultural venues offer free entry. Mall play areas and community events are perfect for budget-conscious families.",
    examples: [
      "JBR Beach, Kite Beach, Corniche beaches - all free",
      "Dubai Creek Park - minimal entry fee",
      "Sharjah Museums - free on Wednesdays",
      "Community center events - often free"
    ]
  },
  {
    id: 6,
    icon: Baby,
    title: "Age-Appropriate Activity Guide",
    category: "By Age Group",
    content: "Different ages need different activities. Babies thrive with sensory experiences, toddlers need safe exploration spaces, preschoolers enjoy structured play, and school-age kids love adventure.",
    examples: [
      "0-1 year: Sensory play classes, baby swimming",
      "1-3 years: Soft play areas, splash parks",
      "3-5 years: Art classes, mini sports, story time",
      "5-12 years: Adventure parks, museums, sports"
    ]
  }
];

const seasonalGuide = [
  {
    season: "Winter (Nov-Mar)",
    temp: "18-28°C",
    icon: "🌤️",
    description: "Perfect outdoor weather! This is the golden season for UAE families.",
    activities: ["Beach days", "Desert camping", "Outdoor playgrounds", "Park picnics", "Cycling", "Hiking"]
  },
  {
    season: "Spring (Apr-May)",
    temp: "28-38°C",
    icon: "☀️",
    description: "Warming up but still pleasant for morning/evening outings.",
    activities: ["Early morning beaches", "Evening park visits", "Water parks", "Indoor play areas"]
  },
  {
    season: "Summer (Jun-Sep)",
    temp: "35-48°C",
    icon: "🔥",
    description: "Hot season - focus on indoor activities and early morning/late evening plans.",
    activities: ["Mall play areas", "Indoor sports", "Museums", "Aquariums", "Swimming pools", "Libraries"]
  },
  {
    season: "Autumn (Oct)",
    temp: "28-35°C",
    icon: "🌅",
    description: "Transition month - outdoor activities become enjoyable again.",
    activities: ["Evening beaches", "Outdoor sports", "Theme parks", "Garden visits"]
  }
];

export default function ParentingGuide() {
  const [activeTip, setActiveTip] = useState(0);

  return (
    <section className="relative w-full py-24 md:py-32 bg-[#B3F5FF] overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-hand text-2xl md:text-3xl text-[#004D3F] mb-4 block">real talk for UAE parents</span>
          <h2 className="text-[#004D3F] font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight mb-6">
            Parenting Guide
          </h2>
          <p className="max-w-2xl mx-auto text-[#004D3F]/80 text-lg md:text-xl">
            Practical tips and local insights to help your family thrive in the UAE. From beating the summer heat to discovering hidden gems across all seven Emirates.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="lg:col-span-1 space-y-3">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <button
                  key={tip.id}
                  onClick={() => setActiveTip(index)}
                  className={`w-full text-left p-4 rounded-[20px] border-2 border-[#004D3F] transition-all ${
                    activeTip === index 
                      ? 'bg-[#004D3F] text-white shadow-[4px_4px_0px_#FFF98F]' 
                      : 'bg-white text-[#004D3F] shadow-[3px_3px_0px_#004D3F] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[5px_5px_0px_#004D3F]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-5 h-5 shrink-0" />
                    <div>
                      <p className="font-black text-sm uppercase">{tip.category}</p>
                      <p className={`font-medium ${activeTip === index ? 'text-white/80' : 'text-[#004D3F]/70'}`}>
                        {tip.title}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white rounded-[30px] border-2 border-[#004D3F] shadow-[6px_6px_0px_#004D3F] p-8 md:p-10 h-full">
              <div className="flex items-center gap-4 mb-6">
                {React.createElement(tips[activeTip].icon, { className: "w-10 h-10 text-[#004D3F]" })}
                <div>
                  <p className="text-sm font-bold uppercase text-[#004D3F]/60">{tips[activeTip].category}</p>
                  <h3 className="text-2xl md:text-3xl font-black text-[#004D3F]">{tips[activeTip].title}</h3>
                </div>
              </div>
              
              <p className="text-[#004D3F]/80 text-lg leading-relaxed mb-8">
                {tips[activeTip].content}
              </p>

              <div className="space-y-3">
                <p className="font-black text-[#004D3F] uppercase text-sm flex items-center gap-2">
                  <Lightbulb className="w-4 h-4" /> Practical Examples
                </p>
                <ul className="grid md:grid-cols-2 gap-3">
                  {tips[activeTip].examples.map((example, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#004D3F]/80">
                      <Sparkles className="w-4 h-4 text-[#004D3F] shrink-0 mt-1" />
                      <span>{example}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[40px] border-2 border-[#004D3F] shadow-[6px_6px_0px_#004D3F] p-8 md:p-12">
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-black text-[#004D3F] uppercase mb-2">
              Seasonal Activity Planner
            </h3>
            <p className="text-[#004D3F]/70">Know what to do in each season for maximum family fun</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {seasonalGuide.map((season, idx) => (
              <div 
                key={idx}
                className="bg-[#FFF98F] rounded-[20px] border-2 border-[#004D3F] shadow-[3px_3px_0px_#004D3F] p-6"
              >
                <div className="text-4xl mb-3">{season.icon}</div>
                <h4 className="font-black text-[#004D3F] text-lg mb-1">{season.season}</h4>
                <div className="flex items-center gap-1 text-[#004D3F]/70 text-sm mb-3">
                  <Thermometer className="w-4 h-4" />
                  <span>{season.temp}</span>
                </div>
                <p className="text-[#004D3F]/80 text-sm mb-4">{season.description}</p>
                <div className="flex flex-wrap gap-1">
                  {season.activities.map((activity, actIdx) => (
                    <span 
                      key={actIdx}
                      className="text-xs bg-white/70 text-[#004D3F] px-2 py-1 rounded-full border border-[#004D3F]/30"
                    >
                      {activity}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-[#FDCFDF] rounded-[20px] border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] p-6 text-center">
            <Users className="w-10 h-10 text-[#004D3F] mx-auto mb-3" />
            <h4 className="font-black text-[#004D3F] text-xl mb-2">Join Our Community</h4>
            <p className="text-[#004D3F]/70 text-sm">Connect with 10,000+ UAE parents sharing tips and recommendations</p>
          </div>
          
          <div className="bg-[#82E9A6] rounded-[20px] border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] p-6 text-center">
            <MapPin className="w-10 h-10 text-[#004D3F] mx-auto mb-3" />
            <h4 className="font-black text-[#004D3F] text-xl mb-2">5,000+ Venues</h4>
            <p className="text-[#004D3F]/70 text-sm">Verified activities across all seven Emirates of the UAE</p>
          </div>
          
          <div className="bg-[#FFF98F] rounded-[20px] border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] p-6 text-center">
            <Heart className="w-10 h-10 text-[#004D3F] mx-auto mb-3" />
            <h4 className="font-black text-[#004D3F] text-xl mb-2">Parent-Tested</h4>
            <p className="text-[#004D3F]/70 text-sm">Every tip and guide written by real UAE parents for real results</p>
          </div>
        </div>
      </div>
    </section>
  );
}
