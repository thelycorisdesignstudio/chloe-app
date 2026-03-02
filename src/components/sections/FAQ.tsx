"use client";

import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { staggerContainer, fadeUp } from '@/lib/animations/variants';

const faqs = [
  {
    question: "What is Chloe?",
    answer: "Chloe is a growing platform for discovering kid-friendly activities across the Middle East. We help parents find hundreds of venues and activities across 8 countries - from playgrounds and beaches to museums, indoor play areas, and educational centers. Think of us as your personal guide to keeping kids entertained and making family memories."
  },
  {
    question: "Is Chloe free to use?",
    answer: "Yes! Chloe is completely free for parents. We believe every family in the UAE deserves access to great activities without any cost barriers. Venues can partner with us for enhanced listings and features."
  },
  {
    question: "How do you verify the venues and activities?",
    answer: "Every venue goes through our verification process. We cross-reference public information, verify opening hours, and rely on our community of UAE parents to provide honest reviews. Venues that consistently receive poor safety ratings are flagged and reviewed by our team. We also factor in UAE-specific considerations like air-conditioned venues for summer months."
  },
  {
    question: "What age range does Chloe cover?",
    answer: "Chloe covers activities for children from newborns (0-12 months) all the way up to 12 years old. Our smart filtering system lets you select your child's exact age to see only the most relevant activities - whether it's sensory play for babies or adventure parks for older kids."
  },
  {
    question: "Is my family's data safe?",
    answer: "Absolutely. We take privacy seriously and comply with UAE data protection regulations. We only collect the minimum data needed to provide you with personalized recommendations. Your data is encrypted, never sold to third parties, and you can delete your account at any time."
  },
  {
    question: "Can I suggest a venue that's not listed?",
    answer: "Yes! We love hearing from parents across all seven Emirates. You can submit new venues through our platform, and our team will verify and add them. This helps us grow our database and helps other families discover great spots from Dubai to Fujairah."
  },
  {
    question: "Which Emirates does Chloe cover?",
    answer: "Chloe covers all seven Emirates of the UAE - Dubai, Abu Dhabi, Sharjah, Ajman, Umm Al Quwain, Ras Al Khaimah, and Fujairah. We have the most activities listed in Dubai and Abu Dhabi, but we're rapidly expanding coverage in all areas. You can filter by location to find activities near you."
  },
  {
    question: "What types of activities can I find?",
    answer: "Chloe features hundreds of activities including indoor play areas (perfect for summer!), beaches, parks, swimming pools, museums, libraries, sports facilities, educational centers, soft play areas, trampoline parks, and much more. We categorize by activity type, age suitability, and whether it's indoor or outdoor."
  },
  {
    question: "How can I contact support?",
    answer: "You can reach us through the contact form on our website, or email us directly at hello@chloe.com. We typically respond within 24 hours, and our support team understands both Arabic and English."
  }
];

export default function FAQ() {
  return (
    <section id="faqs" className="relative w-full py-16 md:py-24 lg:py-32 bg-[#FFF98F] overflow-hidden">
      <div className="container max-w-[1440px] mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-hand text-2xl md:text-3xl text-[#004D3F] mb-4 block">got questions?</span>
          <h2 className="text-[#004D3F] font-black text-4xl md:text-6xl lg:text-7xl uppercase tracking-tight">
            FAQ
          </h2>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeUp}>
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white rounded-[20px] border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] overflow-hidden data-[state=open]:shadow-[6px_6px_0px_#004D3F] transition-all"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    <span className="text-[#004D3F] font-black text-lg md:text-xl pr-4">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5">
                    <p className="text-[#004D3F]/80 font-medium text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-[#004D3F] font-medium text-lg mb-6">
            Still have questions? We&apos;re here to help!
          </p>
          <motion.a
            href="mailto:hello@chloe.com"
            className="inline-flex items-center gap-3 bg-[#004D3F] text-white font-black text-lg uppercase tracking-wide px-10 py-5 rounded-full border-2 border-[#004D3F] shadow-[4px_4px_0px_#82E9A6]"
            whileHover={{ scale: 1.05, y: -2, boxShadow: "6px 6px 0px #82E9A6" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Mail className="w-5 h-5" />
            Email Us
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
