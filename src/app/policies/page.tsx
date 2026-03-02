"use client";

import React from 'react';
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

const policies = [
  {
    title: "Data Collection",
    icon: FileText,
    content: "We collect only the minimum data necessary to provide you with personalized activity recommendations. This includes your location (with permission), saved favorites, and search preferences."
  },
  {
    title: "Data Usage",
    icon: Eye,
    content: "Your data is used exclusively to improve your experience on Chloe. We analyze usage patterns to recommend better activities and venues for your family."
  },
  {
    title: "Data Security",
    icon: Lock,
    content: "All data is encrypted in transit and at rest. We use industry-standard security measures and comply with UAE data protection regulations."
  },
  {
    title: "Third Parties",
    icon: Users,
    content: "We never sell your personal data to third parties. We may share anonymized, aggregated data with venue partners to help them improve their services."
  },
  {
    title: "Children's Privacy",
    icon: Shield,
    content: "We take extra care with any information related to children. We do not collect personal information directly from children under 13 without parental consent."
  }
];

export default function PoliciesPage() {
  return (
    <main className="relative min-h-screen bg-[#F7F5F2] overflow-x-hidden">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-hand text-3xl text-[#004D3F] mb-4 block">transparency first</span>
            <h1 className="text-[#004D3F] font-black text-5xl md:text-8xl uppercase tracking-tighter mb-8">
              PRIVACY POLICY
            </h1>
            <p className="max-w-3xl mx-auto text-[#004D3F]/80 text-xl md:text-2xl leading-relaxed">
              Your privacy matters to us. Here&apos;s how we protect your family&apos;s data.
            </p>
            <p className="text-[#004D3F]/60 mt-4">Last updated: January 2026</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            {policies.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-[30px] border-2 border-[#004D3F] p-8 shadow-[6px_6px_0px_#004D3F]"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#82E9A6] border-2 border-[#004D3F] flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-[#004D3F]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#004D3F] uppercase mb-3">{policy.title}</h3>
                      <p className="text-[#004D3F]/80 text-lg leading-relaxed">{policy.content}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto bg-[#FFF98F] rounded-[40px] border-2 border-[#004D3F] p-10 shadow-[8px_8px_0px_#004D3F]">
            <h2 className="text-2xl font-black text-[#004D3F] uppercase mb-6">Your Rights</h2>
            <ul className="space-y-4 text-[#004D3F]/80 text-lg">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#004D3F] mt-3 shrink-0" />
                <span><strong>Access:</strong> You can request a copy of all data we hold about you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#004D3F] mt-3 shrink-0" />
                <span><strong>Correction:</strong> You can update or correct your personal information at any time.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#004D3F] mt-3 shrink-0" />
                <span><strong>Deletion:</strong> You can request deletion of your account and all associated data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#004D3F] mt-3 shrink-0" />
                <span><strong>Portability:</strong> You can export your data in a standard format.</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-16">
            <p className="text-[#004D3F]/70 text-lg mb-6">Have questions about our privacy practices?</p>
            <a 
              href="mailto:privacy@chloe-app.com"
              className="inline-flex items-center gap-3 bg-[#004D3F] text-white font-black text-lg uppercase px-10 py-5 rounded-full shadow-[4px_4px_0px_#82E9A6] hover:translate-y-[-2px] transition-all"
            >
              <Mail className="w-5 h-5" />
              Contact Privacy Team
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
