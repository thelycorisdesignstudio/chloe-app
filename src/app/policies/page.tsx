"use client";

import React from 'react';
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

const policies = [
  {
    title: "Who We Are",
    icon: Users,
    content: [
      "Chloe (chloe-app.com) is operated by Lycoris Labs Inc. (\"Lycoris Labs\", \"we\", \"us\"). We are the controller of the personal data described in this policy.",
      "You can reach our privacy team at privacy@chloe-app.com.",
    ],
  },
  {
    title: "What We Collect",
    icon: FileText,
    content: [
      "Account details: your name, email address and a securely hashed password when you create an account.",
      "Your activity on Chloe: venues you save as favourites, searches and filters you use, and which venues and guides you open. This helps us show better recommendations and understand which guides are useful.",
      "Business enquiries: the details a venue owner submits through our partner form, including contact details and any images they upload.",
      "Payments: if you buy a partner plan, payment is handled by Stripe. We receive confirmation of the purchase but never see or store your full card number.",
      "Technical data: basic device and browser information and IP address, used to keep the service secure and working.",
      "We do not ask for information about your children, and you do not need to share it to use Chloe.",
    ],
  },
  {
    title: "How We Use Your Data",
    icon: Eye,
    content: [
      "To run Chloe: sign you in, remember your favourites and show activities that suit your family.",
      "To improve Chloe: understand which venues, filters and guides parents find useful.",
      "To keep Chloe safe: detect abuse, prevent automated scraping and protect accounts.",
      "To respond to you: answer questions and process business enquiries and purchases.",
      "We rely on your consent for optional analytics, our legitimate interest in running and securing the service, and the need to perform our contract with you when you hold an account or buy a plan.",
    ],
  },
  {
    title: "Cookies and Local Storage",
    icon: Shield,
    content: [
      "Essential storage keeps you signed in and remembers choices such as your cookie preference and saved favourites. The service does not work properly without it.",
      "Optional analytics help us understand how the site is used. You can choose \"Essential only\" in the privacy popup, and you can clear site data in your browser at any time.",
    ],
  },
  {
    title: "Who We Share Data With",
    icon: Users,
    content: [
      "We never sell your personal data.",
      "We use trusted service providers to run Chloe: hosting and file storage, our database, and Stripe for payments. They may only use your data to provide their service to us.",
      "We may share anonymised, aggregated statistics with venue partners (for example, how many families viewed a listing). These never identify you.",
      "We may disclose data where the law requires it or to protect our users and service.",
    ],
  },
  {
    title: "Data Security",
    icon: Lock,
    content: [
      "Data is encrypted in transit using HTTPS. Passwords are stored hashed, never in plain text.",
      "Access to our systems is limited to people who need it, and we protect our data services against automated bulk collection with rate limiting and bot controls.",
      "No online service can be perfectly secure. If a breach affecting your data occurs, we will notify you and the relevant authorities as the law requires.",
    ],
  },
  {
    title: "Children's Privacy",
    icon: Shield,
    content: [
      "Chloe is designed for parents and carers. Accounts are for adults aged 18 and over. We do not knowingly collect personal information from children. If you believe a child has given us personal data, contact us and we will delete it.",
    ],
  },
  {
    title: "How Long We Keep Data",
    icon: FileText,
    content: [
      "We keep account data while your account is active and delete or anonymise it within a reasonable period after you close it, unless the law requires us to keep certain records (for example, payment records).",
    ],
  },
  {
    title: "International Transfers",
    icon: Eye,
    content: [
      "Our providers may process data outside the UAE. Where that happens we take steps to make sure your data stays protected to a standard consistent with this policy.",
    ],
  },
  {
    title: "Changes to This Policy",
    icon: FileText,
    content: [
      "If we make material changes we will update the date below and, where appropriate, tell you on the site or by email.",
    ],
  },
];

export default function PoliciesPage() {
  return (
    <main className="relative min-h-screen bg-[#F4F1F8] overflow-x-hidden">
      <Navigation />
      
      <div className="pt-32 pb-20 px-6">
        <div className="container max-w-[1440px] mx-auto">
          <div className="text-center mb-16">
            <span className="font-hand text-3xl text-[#3C2364] mb-4 block">transparency first</span>
            <h1 className="text-[#3C2364] font-black text-5xl md:text-8xl uppercase tracking-tighter mb-8">
              PRIVACY POLICY
            </h1>
            <p className="max-w-3xl mx-auto text-[#3C2364]/80 text-xl md:text-2xl leading-relaxed">
              Your privacy matters to us. Here&apos;s what Lycoris Labs Inc. collects through Chloe, why, and the choices you have.
            </p>
            <p className="text-[#3C2364]/60 mt-4">Last updated: November 2026</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-16">
            {policies.map((policy, idx) => {
              const Icon = policy.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-[30px] border-2 border-[#3C2364] p-8 shadow-[6px_6px_0px_#3C2364]"
                >
                  <div className="flex items-start gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-[#C8B9E6] border-2 border-[#3C2364] flex items-center justify-center shrink-0">
                      <Icon className="w-7 h-7 text-[#3C2364]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-[#3C2364] uppercase mb-3">{policy.title}</h3>
                      <div className="space-y-3">
                        {policy.content.map((para, i) => (
                          <p key={i} className="text-[#3C2364]/80 text-lg leading-relaxed">{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="max-w-4xl mx-auto bg-[#F5F096] rounded-[40px] border-2 border-[#3C2364] p-10 shadow-[8px_8px_0px_#3C2364]">
            <h2 className="text-2xl font-black text-[#3C2364] uppercase mb-6">Your Rights</h2>
            <ul className="space-y-4 text-[#3C2364]/80 text-lg">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#3C2364] mt-3 shrink-0" />
                <span><strong>Access:</strong> You can request a copy of all data we hold about you.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#3C2364] mt-3 shrink-0" />
                <span><strong>Correction:</strong> You can update or correct your personal information at any time.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#3C2364] mt-3 shrink-0" />
                <span><strong>Deletion:</strong> You can request deletion of your account and all associated data.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#3C2364] mt-3 shrink-0" />
                <span><strong>Portability:</strong> You can export your data in a standard format.</span>
              </li>
            </ul>
          </div>

          <div className="text-center mt-16">
            <p className="text-[#3C2364]/70 text-lg mb-6">Have questions about our privacy practices?</p>
            <a 
              href="mailto:privacy@chloe-app.com"
              className="inline-flex items-center gap-3 bg-[#3C2364] text-white font-black text-lg uppercase px-10 py-5 rounded-full shadow-[4px_4px_0px_#C8B9E6] hover:translate-y-[-2px] transition-all"
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
