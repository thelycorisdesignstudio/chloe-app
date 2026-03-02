"use client";

import React from 'react';
import { Shield, Eye, Lock, CheckCircle, Baby, Heart } from 'lucide-react';

const safetyFeatures = [
  {
    icon: Shield,
    title: "Verified Venues",
    description: "Every venue is verified by our team and reviewed by real parents in the community"
  },
  {
    icon: Eye,
    title: "Safety Ratings",
    description: "Clear safety ratings help you choose age-appropriate activities with confidence"
  },
  {
    icon: Lock,
    title: "Privacy First",
    description: "Your family's data is never sold. We only collect what's needed to improve your experience"
  },
  {
    icon: Baby,
    title: "Age-Appropriate",
    description: "Smart filtering ensures you only see activities suitable for your child's age group"
  },
  {
    icon: CheckCircle,
    title: "Parent Reviews",
    description: "Honest reviews from parents who've actually visited with their kids"
  },
  {
    icon: Heart,
    title: "Community Driven",
    description: "Built by parents, for parents. Your feedback shapes our features"
  }
];

export default function SafetyFeatures() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-[#B3F5FF] overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <span className="font-hand text-2xl md:text-3xl text-[#004D3F] mb-4 block">your family comes first</span>
            <h2 className="text-[#004D3F] font-black text-4xl md:text-5xl lg:text-6xl uppercase tracking-tight mb-6">
              Built With Safety In Mind
            </h2>
            <p className="text-[#004D3F] font-medium text-lg md:text-xl leading-relaxed mb-8">
              We understand that your children's safety is non-negotiable. That's why we've built Chloe with multiple layers of protection and verification.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white border-2 border-[#004D3F] rounded-full px-5 py-2 shadow-[3px_3px_0px_#004D3F]">
                <Shield className="w-5 h-5 text-[#004D3F]" />
                <span className="text-[#004D3F] font-bold text-sm">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white border-2 border-[#004D3F] rounded-full px-5 py-2 shadow-[3px_3px_0px_#004D3F]">
                <Lock className="w-5 h-5 text-[#004D3F]" />
                <span className="text-[#004D3F] font-bold text-sm">Encrypted Data</span>
              </div>
              <div className="flex items-center gap-2 bg-white border-2 border-[#004D3F] rounded-full px-5 py-2 shadow-[3px_3px_0px_#004D3F]">
                <CheckCircle className="w-5 h-5 text-[#004D3F]" />
                <span className="text-[#004D3F] font-bold text-sm">No Ads</span>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {safetyFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-[30px] bg-white border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#004D3F] transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF98F] border-2 border-[#004D3F] flex items-center justify-center mb-4 shadow-[2px_2px_0px_#004D3F]">
                    <feature.icon className="w-6 h-6 text-[#004D3F]" strokeWidth={2.5} />
                  </div>
                  <h3 className="text-[#004D3F] font-black text-lg uppercase mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-[#004D3F]/80 font-medium text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}