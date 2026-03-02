"use client";

import React, { useState, useRef, useEffect } from 'react';
import Navigation from "@/components/sections/Navigation";
import Footer from "@/components/sections/Footer";
import {
  Building2, Users, BarChart3, Globe, ShieldCheck,
  Zap, Star, MessageSquare, ArrowRight, CheckCircle2,
  Trophy, Heart, Search, PieChart, Briefcase, MapPin,
  Clock, TrendingUp, Eye, Target, Sparkles, Check, X,
  Loader2, Send, Upload, Image as ImageIcon, Trash2
} from 'lucide-react';
import { motion, useInView } from 'framer-motion';
import { staggerContainer, fadeUp, scaleBounce } from '@/lib/animations/variants';

const benefits = [
  {
    title: "Reach UAE Families",
    description: "Get your venue in front of thousands of active parents searching for their next family outing across all 7 Emirates.",
    icon: Users,
    color: "#B3F5FF"
  },
  {
    title: "Boost Visibility",
    description: "Our smart recommendation engine highlights the best kid-friendly spots to relevant users based on age, location, and preferences.",
    icon: Zap,
    color: "#FFF98F"
  },
  {
    title: "Direct Engagement",
    description: "Communicate directly with parents through our platform, respond to reviews, and manage your community presence.",
    icon: MessageSquare,
    color: "#82E9A6"
  },
  {
    title: "Real-Time Analytics",
    description: "Track views, clicks, saves, and conversion metrics to understand how families interact with your listing.",
    icon: BarChart3,
    color: "#FDCFDF"
  }
];

const stats = [
  { label: "Active Families", value: "500+", icon: Users },
  { label: "Venues Listed", value: "530+", icon: MapPin },
  { label: "Countries Covered", value: "8", icon: Globe },
  { label: "Avg. Rating", value: "4.5/5", icon: Star }
];

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description: "Perfect for getting started",
    features: [
      "Basic listing with photos",
      "Contact information display",
      "Customer reviews",
      "Basic analytics"
    ],
    notIncluded: [
      "Priority placement",
      "Verified badge",
      "Promoted listings"
    ],
    cta: "Get Listed Free",
    popular: false
  },
  {
    name: "Professional",
    price: "AED 299",
    period: "/month",
    description: "For growing businesses",
    features: [
      "Everything in Basic",
      "Verified badge",
      "Priority in search results",
      "Advanced analytics dashboard",
      "Respond to reviews",
      "Multiple photos & videos"
    ],
    notIncluded: [
      "Homepage features"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Premium",
    price: "AED 599",
    period: "/month",
    description: "Maximum visibility",
    features: [
      "Everything in Professional",
      "Featured on homepage",
      "Promoted in recommendations",
      "Dedicated account manager",
      "Custom branding options",
      "API access for bookings"
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false
  }
];

const testimonials = [
  {
    name: "Sarah Ahmed",
    role: "Founder, Little Explorers UAE",
    text: "Chloe has been a game-changer for our indoor play center. We've seen a 40% increase in new customers since getting verified on the platform.",
    rating: 5
  },
  {
    name: "Mohammed Al-Hassan",
    role: "Manager, Adventure Zone Dubai",
    text: "The analytics dashboard helps us understand what parents are looking for. We've optimized our offerings based on the insights and seen great results.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Owner, Creative Kids Academy",
    text: "As a small educational center, Chloe helped us compete with bigger venues. The verified badge builds instant trust with parents.",
    rating: 5
  }
];

const venueTypes = [
  "Indoor Play Centers",
  "Outdoor Parks & Playgrounds",
  "Swimming Pools & Water Parks",
  "Museums & Educational Centers",
  "Sports Clubs & Academies",
  "Art & Music Studios",
  "Family Restaurants & Cafés",
  "Libraries & Book Clubs",
  "Theme Parks & Attractions",
  "Birthday Venues",
  "Trampoline Parks",
  "Sensory Play Centers"
];

export default function ForBusinessPage() {
  const [formState, setFormState] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    businessType: '',
    emirate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedPhotos, setUploadedPhotos] = useState<{url: string, name: string}[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        continue;
      }

      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await response.json();

        if (response.ok) {
          setUploadedPhotos(prev => [...prev, { url: data.url, name: file.name }]);
        }
      } catch {
        // Upload failed silently for this file
      }
    }

    setIsUploading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePhoto = async (index: number) => {
    const photo = uploadedPhotos[index];
    try {
      await fetch('/api/upload', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: photo.url }),
      });
    } catch {
      // Cleanup failed, still remove from UI
    }
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/business-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formState,
          photos: uploadedPhotos.map(p => p.url),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Submission failed');
      }

      setSubmitStatus('success');
      setFormState({
        businessName: '',
        contactPerson: '',
        email: '',
        phone: '',
        businessType: '',
        emirate: '',
        message: '',
      });
      setUploadedPhotos([]);

      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F7F5F2] overflow-x-hidden">
      <Navigation />
      
      <div className="pt-20 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
        <div className="container max-w-[1440px] mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
            <motion.div
              className="lg:w-1/2"
              initial={{ x: -50 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <span className="font-hand text-3xl text-[#004D3F] mb-4 block">partner with chloe</span>
              <h1 className="text-[#004D3F] font-black text-5xl md:text-7xl uppercase tracking-tighter mb-8">
                GROW YOUR<br />FAMILY BUSINESS
              </h1>
              <p className="text-[#004D3F]/80 text-xl md:text-2xl leading-relaxed mb-6">
                Join the UAE&apos;s fastest-growing platform for family-friendly venues. 
                List your business, reach more parents, and become a community favorite.
              </p>
              <ul className="space-y-3 mb-10">
                <li className="flex items-center gap-3 text-[#004D3F]">
                  <CheckCircle2 className="w-6 h-6 text-[#82E9A6]" />
                  <span className="font-medium">Growing community of active families</span>
                </li>
                <li className="flex items-center gap-3 text-[#004D3F]">
                  <CheckCircle2 className="w-6 h-6 text-[#82E9A6]" />
                  <span className="font-medium">Coverage across all 7 Emirates</span>
                </li>
                <li className="flex items-center gap-3 text-[#004D3F]">
                  <CheckCircle2 className="w-6 h-6 text-[#82E9A6]" />
                  <span className="font-medium">Free basic listing available</span>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#contact"
                  className="bg-[#004D3F] text-white px-10 py-5 rounded-full font-black text-lg uppercase shadow-[4px_4px_0px_#82E9A6] hover:translate-y-[-2px] transition-all"
                >
                  GET LISTED NOW
                </a>
                <a 
                  href="#pricing"
                  className="bg-white border-2 border-[#004D3F] text-[#004D3F] px-10 py-5 rounded-full font-black text-lg uppercase shadow-[4px_4px_0px_#004D3F] hover:translate-y-[-2px] transition-all"
                >
                  VIEW PRICING
                </a>
              </div>
            </motion.div>
            <motion.div
              className="lg:w-1/2 relative"
              initial={{ x: 50 }}
              animate={{ x: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
            >
              <div className="bg-[#FFF98F] rounded-[30px] md:rounded-[50px] p-6 md:p-12 border-2 border-[#004D3F] shadow-[12px_12px_0px_#004D3F] relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-3xl font-black text-[#004D3F] uppercase mb-6">Why List on Chloe?</h3>
                  <div className="space-y-6">
                    {benefits.map((benefit, idx) => {
                      const Icon = benefit.icon;
                      return (
                        <div key={idx} className="flex gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl border-2 border-[#004D3F] flex items-center justify-center shrink-0"
                            style={{ backgroundColor: benefit.color }}
                          >
                            <Icon className="w-6 h-6 text-[#004D3F]" />
                          </div>
                          <div>
                            <p className="font-black text-[#004D3F] uppercase">{benefit.title}</p>
                            <p className="text-[#004D3F]/70 text-sm">{benefit.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10">
                  <Building2 className="w-64 h-64 text-[#004D3F]" />
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="grid md:grid-cols-4 gap-8 mb-24"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div key={idx} variants={fadeUp} className="bg-white rounded-[30px] border-2 border-[#004D3F] p-8 text-center shadow-[6px_6px_0px_#004D3F]">
                  <Icon className="w-8 h-8 text-[#004D3F] mx-auto mb-4" />
                  <p className="text-4xl md:text-5xl font-black text-[#004D3F] mb-2">{stat.value}</p>
                  <p className="text-[#004D3F]/60 font-bold uppercase tracking-widest text-sm">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="font-hand text-2xl text-[#004D3F] mb-4 block">venue types we support</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#004D3F] uppercase">Perfect For All Family Venues</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {venueTypes.map((type, idx) => (
                <span 
                  key={idx}
                  className="bg-white border-2 border-[#004D3F] rounded-full px-6 py-3 font-bold text-[#004D3F] shadow-[3px_3px_0px_#004D3F]"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-[#004D3F] rounded-[30px] md:rounded-[50px] p-6 md:p-10 lg:p-20 text-white mb-24">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-center mb-16">Features for Partners</h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                { title: "Smart Dashboard", text: "Track your views, clicks, saves, and engagement in real-time. Understand what parents are looking for.", icon: BarChart3 },
                { title: "Verified Badge", text: "Build instant trust with families through our verification system. Stand out from unverified listings.", icon: ShieldCheck },
                { title: "Promoted Listings", text: "Get featured at the top of search results and on our homepage. Maximize your visibility.", icon: Trophy },
                { title: "Review Management", text: "Respond to customer reviews, address concerns, and build your reputation with parents.", icon: MessageSquare },
                { title: "Smart Targeting", text: "Your venue is shown to parents based on their children's ages and location preferences.", icon: Target },
                { title: "Performance Insights", text: "Weekly reports on how your listing performs compared to similar venues in your area.", icon: TrendingUp }
              ].map((feature, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center mb-6">
                    <feature.icon className="w-10 h-10 text-[#82E9A6]" />
                  </div>
                  <h4 className="text-2xl font-bold mb-4 uppercase tracking-tight">{feature.title}</h4>
                  <p className="text-white/70 leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="pricing" className="mb-24">
            <div className="text-center mb-12">
              <span className="font-hand text-2xl text-[#004D3F] mb-4 block">simple pricing</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#004D3F] uppercase mb-4">Choose Your Plan</h2>
              <p className="text-[#004D3F]/70 text-lg max-w-2xl mx-auto">
                Start free and upgrade as you grow. No hidden fees, cancel anytime.
              </p>
            </div>
            <motion.div
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {pricingPlans.map((plan, idx) => (
                <motion.div
                  key={idx}
                  variants={plan.popular ? scaleBounce : fadeUp}
                  className={`relative bg-white rounded-[30px] border-2 border-[#004D3F] p-8 ${
                    plan.popular
                      ? 'shadow-[8px_8px_0px_#82E9A6] md:scale-105'
                      : 'shadow-[6px_6px_0px_#004D3F]'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#82E9A6] border-2 border-[#004D3F] px-4 py-1 rounded-full">
                      <span className="text-[#004D3F] font-black text-sm uppercase">Most Popular</span>
                    </div>
                  )}
                  <h3 className="text-2xl font-black text-[#004D3F] uppercase mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-black text-[#004D3F]">{plan.price}</span>
                    {plan.period && <span className="text-[#004D3F]/60 font-medium">{plan.period}</span>}
                  </div>
                  <p className="text-[#004D3F]/70 mb-6">{plan.description}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-[#004D3F]">
                        <Check className="w-5 h-5 text-[#82E9A6] shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-[#004D3F]/40">
                        <X className="w-5 h-5 shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a 
                    href="#contact"
                    className={`block w-full text-center py-4 rounded-full font-black uppercase transition-all ${
                      plan.popular
                        ? 'bg-[#004D3F] text-white hover:bg-[#004D3F]/90'
                        : 'bg-[#F7F5F2] text-[#004D3F] border-2 border-[#004D3F] hover:bg-[#004D3F] hover:text-white'
                    }`}
                  >
                    {plan.cta}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <div className="mb-24">
            <div className="text-center mb-12">
              <span className="font-hand text-2xl text-[#004D3F] mb-4 block">success stories</span>
              <h2 className="text-3xl md:text-5xl font-black text-[#004D3F] uppercase">What Partners Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="bg-[#FDCFDF] rounded-[30px] p-8 border-2 border-[#004D3F] shadow-[6px_6px_0px_#004D3F]">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#FFF98F] text-[#004D3F]" />
                    ))}
                  </div>
                  <p className="text-[#004D3F] font-medium text-lg mb-6 italic">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <div>
                    <p className="text-[#004D3F] font-black">{testimonial.name}</p>
                    <p className="text-[#004D3F]/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="contact" className="bg-white rounded-[30px] md:rounded-[50px] border-2 border-[#004D3F] p-5 md:p-8 lg:p-16 shadow-[10px_10px_0px_#004D3F]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="font-hand text-2xl text-[#004D3F] mb-4 block">get started</span>
                <h2 className="text-3xl md:text-5xl font-black text-[#004D3F] uppercase mb-4">Contact Partnership Team</h2>
                <p className="text-[#004D3F]/70">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>
              </div>

              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-50 rounded-[20px] p-4 border-2 border-red-300 flex items-center gap-3">
                  <X className="w-5 h-5 text-red-600 shrink-0" />
                  <p className="text-red-700 font-medium text-sm">
                    Something went wrong. Please check your details and try again.
                  </p>
                </div>
              )}

              {submitStatus === 'success' ? (
                <div className="bg-[#82E9A6] rounded-[30px] p-12 text-center border-2 border-[#004D3F]">
                  <CheckCircle2 className="w-16 h-16 text-[#004D3F] mx-auto mb-6" />
                  <h3 className="text-2xl font-black text-[#004D3F] uppercase mb-4">Request Sent!</h3>
                  <p className="text-[#004D3F]/80">
                    Thank you for your interest! Our partnership team will contact you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="businessName" className="text-sm font-black text-[#004D3F] uppercase ml-4">
                      Business Name <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="businessName"
                      name="businessName"
                      value={formState.businessName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#82E9A6] transition-all" 
                      placeholder="e.g. Sunny Day Play Center" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contactPerson" className="text-sm font-black text-[#004D3F] uppercase ml-4">
                      Contact Person <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      id="contactPerson"
                      name="contactPerson"
                      value={formState.contactPerson}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#82E9A6] transition-all" 
                      placeholder="e.g. John Smith" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-black text-[#004D3F] uppercase ml-4">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#82E9A6] transition-all" 
                      placeholder="e.g. contact@business.com" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-black text-[#004D3F] uppercase ml-4">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#82E9A6] transition-all" 
                      placeholder="e.g. +971 50 123 4567" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="businessType" className="text-sm font-black text-[#004D3F] uppercase ml-4">
                      Business Type <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="businessType"
                      name="businessType"
                      value={formState.businessType}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#82E9A6] appearance-none transition-all"
                    >
                      <option value="">Select Type</option>
                      <option value="play-center">Indoor Play Center</option>
                      <option value="educational">Educational Venue</option>
                      <option value="sports">Sports Club / Academy</option>
                      <option value="restaurant">Family Restaurant / Café</option>
                      <option value="outdoor">Park / Outdoor Venue</option>
                      <option value="water">Swimming / Water Park</option>
                      <option value="arts">Arts & Music Studio</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="emirate" className="text-sm font-black text-[#004D3F] uppercase ml-4">
                      Emirate <span className="text-red-500">*</span>
                    </label>
                    <select 
                      id="emirate"
                      name="emirate"
                      value={formState.emirate}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#82E9A6] appearance-none transition-all"
                    >
                      <option value="">Select Emirate</option>
                      <option value="dubai">Dubai</option>
                      <option value="abudhabi">Abu Dhabi</option>
                      <option value="sharjah">Sharjah</option>
                      <option value="ajman">Ajman</option>
                      <option value="rak">Ras Al Khaimah</option>
                      <option value="fujairah">Fujairah</option>
                      <option value="uaq">Umm Al Quwain</option>
                    </select>
                  </div>
<div className="space-y-2 md:col-span-2">
                      <label htmlFor="message" className="text-sm font-black text-[#004D3F] uppercase ml-4">
                        Tell Us About Your Business
                      </label>
                      <textarea 
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleInputChange}
                        className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-[30px] px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#82E9A6] min-h-[150px] transition-all" 
                        placeholder="Share details about your venue, target age groups, special features, etc..."
                      />
                    </div>
                    
                    <div className="space-y-4 md:col-span-2">
                      <label className="text-sm font-black text-[#004D3F] uppercase ml-4">
                        Upload Venue Photos (Up to 10)
                      </label>
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-[#004D3F] rounded-[30px] p-8 text-center cursor-pointer hover:bg-[#F7F5F2] transition-colors"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handlePhotoUpload}
                          accept="image/*"
                          multiple
                          className="hidden"
                        />
                        {isUploading ? (
                          <div className="flex flex-col items-center gap-3">
                            <Loader2 className="w-10 h-10 text-[#004D3F] animate-spin" />
                            <p className="text-[#004D3F] font-medium">Uploading photos...</p>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center gap-3">
                            <Upload className="w-10 h-10 text-[#004D3F]/60" />
                            <p className="text-[#004D3F] font-medium">Click or drag photos here</p>
                            <p className="text-[#004D3F]/60 text-sm">JPG, PNG, WEBP up to 10MB each</p>
                          </div>
                        )}
                      </div>
                      
                      {uploadedPhotos.length > 0 && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
                          {uploadedPhotos.map((photo, idx) => (
                            <div key={idx} className="relative group">
                              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-[#004D3F]">
                                <img 
                                  src={photo.url} 
                                  alt={photo.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <button
                                type="button"
                                onClick={() => removePhoto(idx)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="md:col-span-2 bg-[#82E9A6] text-[#004D3F] font-black text-xl uppercase py-5 rounded-full border-2 border-[#004D3F] shadow-[4px_4px_0px_#004D3F] hover:translate-y-[-2px] transition-all mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-6 h-6" />
                        Send Partnership Request
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
