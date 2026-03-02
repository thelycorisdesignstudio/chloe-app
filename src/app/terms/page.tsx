"use client";

import React from 'react';
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { FileText, CheckCircle2, AlertTriangle, Scale, Mail } from 'lucide-react';

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: "By accessing or using Chloe, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms apply to all users, including parents, venue partners, and visitors."
  },
  {
    title: "2. Use of Service",
    content: "Chloe provides information about kid-friendly activities and venues across the UAE. While we strive to ensure accuracy, we recommend verifying details directly with venues before visiting. Users must be 18 years or older to create an account."
  },
  {
    title: "3. User Accounts",
    content: "You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized access. We reserve the right to suspend or terminate accounts that violate our terms."
  },
  {
    title: "4. Content & Reviews",
    content: "Users may submit reviews and ratings. You agree that your content will be truthful, not defamatory, and respectful. We reserve the right to remove content that violates our community guidelines or UAE law."
  },
  {
    title: "5. Venue Information",
    content: "Activity information, prices, and opening hours are provided by venues and may change. Chloe is not responsible for inaccuracies. Always confirm details before planning your visit, especially for paid activities."
  },
  {
    title: "6. Intellectual Property",
    content: "All content on Chloe, including logos, designs, and text, is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission."
  },
  {
    title: "7. Limitation of Liability",
    content: "Chloe provides information 'as is' without warranties. We are not liable for any injuries, losses, or damages arising from the use of venues listed on our platform. Parents are responsible for supervising their children."
  },
  {
    title: "8. Governing Law",
    content: "These terms are governed by the laws of the United Arab Emirates. Any disputes will be resolved in the courts of Dubai, UAE."
  }
];

export default function TermsPage() {
  return (
    <main className="relative min-h-screen bg-[#F7F5F2] overflow-x-hidden">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-hand text-3xl text-[#004D3F] mb-4 block">the fine print</span>
            <h1 className="text-[#004D3F] font-black text-5xl md:text-8xl uppercase tracking-tighter mb-8">
              TERMS OF SERVICE
            </h1>
            <p className="max-w-3xl mx-auto text-[#004D3F]/80 text-xl md:text-2xl leading-relaxed">
              Please read these terms carefully before using Chloe.
            </p>
            <p className="text-[#004D3F]/60 mt-4">Effective Date: January 2026</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-[#B3F5FF] rounded-[30px] border-2 border-[#004D3F] p-8 mb-12 shadow-[6px_6px_0px_#004D3F]">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-8 h-8 text-[#004D3F] shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-black text-[#004D3F] uppercase mb-2">Important Notice</h3>
                  <p className="text-[#004D3F]/80">
                    By using Chloe, you acknowledge that visiting any venue or activity listed on our platform is at your own risk. 
                    Parents and guardians are solely responsible for the safety and supervision of their children.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-8 mb-16">
              {sections.map((section, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-[30px] border-2 border-[#004D3F] p-8 shadow-[4px_4px_0px_#004D3F]"
                >
                  <h3 className="text-xl font-black text-[#004D3F] uppercase mb-4">{section.title}</h3>
                  <p className="text-[#004D3F]/80 text-lg leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>

            <div className="bg-[#82E9A6] rounded-[40px] border-2 border-[#004D3F] p-10 shadow-[8px_8px_0px_#004D3F]">
              <div className="flex items-start gap-6">
                <Scale className="w-12 h-12 text-[#004D3F] shrink-0" />
                <div>
                  <h2 className="text-2xl font-black text-[#004D3F] uppercase mb-4">Agreement Summary</h2>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-[#004D3F]">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" />
                      <span>Use Chloe responsibly and respect other users</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#004D3F]">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" />
                      <span>Always verify venue details before visiting</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#004D3F]">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" />
                      <span>Supervise children at all times during activities</span>
                    </li>
                    <li className="flex items-start gap-3 text-[#004D3F]">
                      <CheckCircle2 className="w-5 h-5 shrink-0 mt-1" />
                      <span>Submit honest and respectful reviews</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className="text-[#004D3F]/70 text-lg mb-6">Questions about our terms?</p>
            <a 
              href="mailto:legal@chloe-app.com"
              className="inline-flex items-center gap-3 bg-[#004D3F] text-white font-black text-lg uppercase px-10 py-5 rounded-full shadow-[4px_4px_0px_#82E9A6] hover:translate-y-[-2px] transition-all"
            >
              <Mail className="w-5 h-5" />
              Contact Legal Team
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
