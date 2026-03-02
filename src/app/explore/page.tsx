"use client";

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  Search, MapPin, X, Star, Clock, Users,
  Heart, Share2, Phone, Globe, Instagram, ArrowLeft, 
  Sliders, Baby, Building2, Car, Accessibility,
  CheckCircle2, Tag, Navigation, Loader2,
  ShieldCheck, Sparkles
} from 'lucide-react';
import type { Activity, Country, Region, Category } from '@/lib/db/schema';
import { motion } from 'framer-motion';

const openExternalUrl = (url: string) => {
  if (typeof window === 'undefined') return;
  let finalUrl = url;
  if (url && !url.startsWith('http') && !url.startsWith('tel:') && !url.startsWith('mailto:')) {
    finalUrl = `https://${url}`;
  }
  if (window.parent !== window) {
    window.parent.postMessage(
      { type: "OPEN_EXTERNAL_URL", data: { url: finalUrl } },
      window.location.origin
    );
  } else {
    window.open(finalUrl, '_blank', 'noopener,noreferrer');
  }
};

const ageGroups = [
  { label: "All Ages", min: 0, max: 12 },
  { label: "Baby (0-1)", min: 0, max: 1 },
  { label: "Toddler (1-3)", min: 1, max: 3 },
  { label: "Preschool (3-5)", min: 3, max: 5 },
  { label: "School Age (5-8)", min: 5, max: 8 },
  { label: "Pre-teen (8-12)", min: 8, max: 12 }
];

const getMotherFriendlyFeatures = (activity: Activity) => {
  const features = [];
  if (activity.amenities?.some(a => a.toLowerCase().includes('nursing') || a.toLowerCase().includes('feeding'))) {
    features.push({ icon: Baby, label: "Nursing room" });
  }
  if (activity.amenities?.some(a => a.toLowerCase().includes('changing') || a.toLowerCase().includes('diaper'))) {
    features.push({ icon: Baby, label: "Changing facilities" });
  }
  if (activity.amenities?.some(a => a.toLowerCase().includes('stroller') || a.toLowerCase().includes('pram'))) {
    features.push({ icon: ShieldCheck, label: "Stroller friendly" });
  }
  if (activity.isWheelchairAccessible) {
    features.push({ icon: Accessibility, label: "Easy access" });
  }
  if (activity.hasParking) {
    features.push({ icon: Car, label: "Parking available" });
  }
  if (features.length === 0) {
    if (activity.isIndoor) features.push({ icon: Building2, label: "AC indoor" });
    features.push({ icon: ShieldCheck, label: "Family friendly" });
  }
  return features.slice(0, 3);
};

function ExplorePageContent() {
  const searchParams = useSearchParams();
  const categoryFromUrl = searchParams.get('category');
  const searchFromUrl = searchParams.get('search');
  
  const [searchQuery, setSearchQuery] = useState(searchFromUrl || '');
  const [selectedCountry, setSelectedCountry] = useState('UAE');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl || '');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState(ageGroups[0]);
  const [showIndoorOnly, setShowIndoorOnly] = useState(false);
  const [showFreeOnly, setShowFreeOnly] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(!!categoryFromUrl || !!searchFromUrl);
  const [sortBy, setSortBy] = useState<'rating' | 'reviews' | 'name'>('rating');

  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activityCount, setActivityCount] = useState(0);

  useEffect(() => {
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
      setShowFilters(true);
    }
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
      setShowFilters(true);
    }
  }, [categoryFromUrl, searchFromUrl]);

  useEffect(() => {
    async function loadInitialData() {
      try {
        const [countriesRes, categoriesRes] = await Promise.all([
          fetch('/api/countries').then(r => r.json()),
          fetch('/api/categories').then(r => r.json()),
        ]);
        setCountries(countriesRes);
        setCategories(categoriesRes);
      } catch (error) {
        setError('Failed to load data. Please try again.');
      }
    }
    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadRegions() {
      if (!selectedCountry) return;
      try {
        const data = await fetch(`/api/regions?countryCode=${selectedCountry}`).then(r => r.json());
        setRegions(data);
        setSelectedRegion('');
      } catch (error) {
        setError('Failed to load regions. Please try again.');
      }
    }
    loadRegions();
  }, [selectedCountry]);

  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      params.set('country', selectedCountry);
      if (selectedRegion) params.set('region', selectedRegion);
      if (selectedCategory) params.set('category', selectedCategory);
      if (showIndoorOnly) params.set('isIndoor', 'true');
      if (showFreeOnly) params.set('isFree', 'true');
      if (searchQuery) params.set('search', searchQuery);
      if (selectedAgeGroup.label !== 'All Ages') {
        params.set('ageMin', String(selectedAgeGroup.min));
        params.set('ageMax', String(selectedAgeGroup.max));
      }
      params.set('sortBy', sortBy);

      const res = await fetch(`/api/activities?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setActivities(data);
      setActivityCount(data.length);
    } catch {
      setError('Failed to load activities. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [selectedCountry, selectedRegion, selectedCategory, showIndoorOnly, showFreeOnly, searchQuery, selectedAgeGroup, sortBy]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      loadActivities();
    }, 300);
    return () => clearTimeout(debounce);
  }, [loadActivities]);

  useEffect(() => {
    const saved = localStorage.getItem('chloe-favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(f => f !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('chloe-favorites', JSON.stringify(newFavorites));
    // Track favorite event
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'favorite', activityId: id }),
    }).catch(() => {}); // Fire and forget
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedRegion('');
    setSelectedAgeGroup(ageGroups[0]);
    setShowIndoorOnly(false);
    setShowFreeOnly(false);
  };

  const activeFilterCount = [
    selectedCategory !== '',
    selectedRegion !== '',
    selectedAgeGroup.label !== 'All Ages',
    showIndoorOnly,
    showFreeOnly
  ].filter(Boolean).length;

  const currentCountry = countries.find(c => c.code === selectedCountry);

  if (selectedActivity) {
    return (
      <ActivityDetail
        activity={selectedActivity}
        onBack={() => setSelectedActivity(null)}
        isFavorite={favorites.includes(selectedActivity.id)}
        onToggleFavorite={() => toggleFavorite(selectedActivity.id)}
        countries={countries}
        onSelectActivity={setSelectedActivity}
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      <header className="sticky top-0 z-50 bg-[#82E9A6] border-b-2 border-[#004D3F]">
        <div className="max-w-[1440px] mx-auto px-3 md:px-4 py-2 md:py-3">
          <div className="flex items-center gap-2 md:gap-3">
            <Link 
              href="/"
              className="flex items-center gap-1.5 text-[#004D3F] hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="font-black text-base md:text-lg uppercase hidden sm:inline">Chloe</span>
            </Link>

            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#004D3F]/50" />
              <input
                type="text"
                placeholder="Search activities, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border-2 border-[#004D3F] rounded-full pl-9 pr-3 py-2 text-sm font-medium text-[#004D3F] placeholder:text-[#004D3F]/50 focus:outline-none focus:ring-2 focus:ring-[#FFF98F] shadow-[2px_2px_0px_#004D3F]"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <X className="w-4 h-4 text-[#004D3F]/50 hover:text-[#004D3F]" />
                </button>
              )}
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full border-2 border-[#004D3F] font-bold text-sm transition-all shadow-[2px_2px_0px_#004D3F] ${
                showFilters || activeFilterCount > 0
                  ? 'bg-[#FFF98F] text-[#004D3F]'
                  : 'bg-white text-[#004D3F]'
              }`}
            >
              <Sliders className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-[#004D3F] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex gap-1.5 mt-2 overflow-x-auto pb-1 scrollbar-hide">
            {countries.map(country => (
              <button
                key={country.code}
                onClick={() => setSelectedCountry(country.code)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full border-2 font-bold text-xs whitespace-nowrap transition-all ${
                  selectedCountry === country.code
                    ? 'bg-[#004D3F] text-white border-[#004D3F]'
                    : 'bg-white text-[#004D3F] border-[#004D3F]/30 hover:border-[#004D3F]'
                }`}
              >
                <span>{country.name}</span>
              </button>
            ))}
          </div>

          {showFilters && (
            <div className="mt-2 p-3 bg-white rounded-[16px] border-2 border-[#004D3F] shadow-[3px_3px_0px_#004D3F]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="text-[10px] font-black text-[#004D3F] uppercase mb-1 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none"
                  >
                    <option value="">All Categories</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-[#004D3F] uppercase mb-1 block">Region</label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none"
                  >
                    <option value="">All Regions</option>
                    {regions.map(region => (
                      <option key={region.id} value={region.name}>{region.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-[#004D3F] uppercase mb-1 block">Age Group</label>
                  <select
                    value={selectedAgeGroup.label}
                    onChange={(e) => setSelectedAgeGroup(ageGroups.find(ag => ag.label === e.target.value) || ageGroups[0])}
                    className="w-full bg-[#F7F5F2] border-2 border-[#004D3F] rounded-full px-3 py-1.5 text-xs font-medium focus:outline-none"
                  >
                    {ageGroups.map(ag => (
                      <option key={ag.label} value={ag.label}>{ag.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-2 pt-2 border-t border-[#004D3F]/10">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showIndoorOnly}
                    onChange={(e) => setShowIndoorOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-[#004D3F] accent-[#82E9A6]"
                  />
                  <span className="font-bold text-[#004D3F] text-xs flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Indoor Only
                  </span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showFreeOnly}
                    onChange={(e) => setShowFreeOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-2 border-[#004D3F] accent-[#82E9A6]"
                  />
                  <span className="font-bold text-[#004D3F] text-xs flex items-center gap-1">
                    <Tag className="w-3 h-3" /> Free Entry
                  </span>
                </label>

                <div className="flex-1" />

                <button
                  onClick={clearFilters}
                  className="text-[#004D3F] text-xs font-bold underline hover:no-underline"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-3 md:px-4 py-4">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-red-300 rounded-xl flex items-center justify-between">
            <span className="text-red-700 text-sm font-medium">{error}</span>
            <button onClick={() => { setError(null); loadActivities(); }} className="text-red-700 font-bold text-sm underline ml-4">
              Retry
            </button>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <h1 className="text-lg md:text-xl font-black text-[#004D3F] uppercase">
              {activityCount} Activities in {currentCountry?.name || 'UAE'}
            </h1>
            {activeFilterCount > 0 && (
              <p className="text-[#004D3F]/70 text-xs font-medium">
                Filtered by: {[
                  selectedCategory && categories.find(c => c.id === parseInt(selectedCategory))?.name,
                  selectedRegion,
                  selectedAgeGroup.label !== 'All Ages' && selectedAgeGroup.label,
                  showIndoorOnly && 'Indoor',
                  showFreeOnly && 'Free'
                ].filter(Boolean).join(' • ')}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#004D3F]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'rating' | 'reviews' | 'name')}
              className="bg-white border-2 border-[#004D3F] rounded-full px-3 py-1 text-xs font-medium focus:outline-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="reviews">Most Reviews</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[20px] border-2 border-[#004D3F]/20 overflow-hidden animate-pulse">
                <div className="h-40 bg-[#004D3F]/10" />
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <div className="h-4 bg-[#004D3F]/10 rounded-full w-3/5" />
                    <div className="h-4 bg-[#FFF98F]/60 rounded-full w-12" />
                  </div>
                  <div className="h-3 bg-[#004D3F]/10 rounded-full w-4/5" />
                  <div className="flex gap-2">
                    <div className="h-5 bg-[#004D3F]/5 rounded-full w-20" />
                    <div className="h-5 bg-[#004D3F]/5 rounded-full w-24" />
                  </div>
                  <div className="flex gap-3">
                    <div className="h-3 bg-[#004D3F]/5 rounded-full w-16" />
                    <div className="h-3 bg-[#004D3F]/5 rounded-full w-20" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-[#FFF98F] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#004D3F]">
              <Search className="w-8 h-8 text-[#004D3F]" />
            </div>
            <h2 className="text-xl font-black text-[#004D3F] mb-3">No Activities Found</h2>
            <p className="text-[#004D3F]/70 mb-4 text-sm max-w-md mx-auto">
              Try adjusting your filters or search terms, or explore another country.
            </p>
            <button
              onClick={clearFilters}
              className="bg-[#82E9A6] text-[#004D3F] font-black px-6 py-3 rounded-full border-2 border-[#004D3F] shadow-[3px_3px_0px_#004D3F] hover:translate-y-[-2px] transition-all text-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                category={categories.find(c => c.id === activity.categoryId)}
                onClick={() => setSelectedActivity(activity)}
                isFavorite={favorites.includes(activity.id)}
                onToggleFavorite={(e) => {
                  e.stopPropagation();
                  toggleFavorite(activity.id);
                }}
              />
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-[#004D3F] rounded-[20px] text-white">
          <h3 className="text-sm font-black uppercase mb-3">Explore More Countries</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
            {countries.map(country => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className={`p-2 rounded-xl text-center transition-all ${
                    selectedCountry === country.code
                      ? 'bg-[#82E9A6] text-[#004D3F]'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <div className="text-xs font-bold">{country.name}</div>
                  <div className="text-[10px] opacity-70">{country.currency}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-[#F7F5F2] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#004D3F] animate-spin" />
      </main>
    }>
      <ExplorePageContent />
    </Suspense>
  );
}

function ActivityCard({
  activity, 
  category,
  onClick, 
  isFavorite, 
  onToggleFavorite 
}: { 
  activity: Activity;
  category?: Category;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}) {
  const motherFeatures = getMotherFriendlyFeatures(activity);

  return (
    <motion.article
      onClick={onClick}
      className="group bg-white rounded-[20px] border-2 border-[#004D3F] overflow-hidden shadow-[3px_3px_0px_#004D3F] hover:shadow-[5px_5px_0px_#004D3F] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer"
      initial={{ y: 20 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={activity.images?.[0] || 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800'}
          alt={activity.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        <button
          onClick={onToggleFavorite}
          className={`absolute top-2 right-2 w-10 h-10 rounded-full flex items-center justify-center transition-all ${
            isFavorite
              ? 'bg-[#FDCFDF] border-2 border-[#004D3F]'
              : 'bg-white/90 border-2 border-transparent hover:border-[#004D3F]'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-[#004D3F]'}`} />
        </button>

        <div className="absolute bottom-2 left-2 flex gap-1.5 flex-wrap">
          {activity.pricingType === 'free' && (
            <span className="bg-[#82E9A6] text-[#004D3F] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#004D3F]">
              FREE
            </span>
          )}
          {activity.isIndoor && (
            <span className="bg-[#B3F5FF] text-[#004D3F] text-[10px] font-black px-2 py-0.5 rounded-full border border-[#004D3F]">
              INDOOR
            </span>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-base font-black text-[#004D3F] leading-tight group-hover:text-[#004D3F]/80 line-clamp-1">
            {activity.name}
          </h3>
          <div className="flex items-center gap-0.5 bg-[#FFF98F] px-1.5 py-0.5 rounded-full shrink-0">
            <Star className="w-3 h-3 fill-[#004D3F] text-[#004D3F]" />
            <span className="text-xs font-black text-[#004D3F]">{activity.rating}</span>
          </div>
        </div>

        <p className="text-xs text-[#004D3F]/70 mb-2 line-clamp-2">
          {activity.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-2">
          {motherFeatures.map((feature, idx) => (
            <span key={idx} className="flex items-center gap-1 text-[10px] text-[#004D3F] bg-[#F7F5F2] px-2 py-0.5 rounded-full">
              <feature.icon className="w-3 h-3" />
              {feature.label}
            </span>
          ))}
        </div>

          <div className="flex flex-wrap items-center gap-2 text-[10px] text-[#004D3F]/70">
            <span className="flex items-center gap-0.5">
              <MapPin className="w-3 h-3" />
              {activity.area}
            </span>
            <span className="flex items-center gap-0.5">
              <Users className="w-3 h-3" />
              Ages {activity.ageMin}-{activity.ageMax}
            </span>
          </div>

        {category && (
          <div className="mt-2 pt-2 border-t border-[#004D3F]/10">
            <span className="text-[10px] font-bold text-[#004D3F] bg-[#F7F5F2] px-2 py-0.5 rounded-full">
              {category.name}
            </span>
          </div>
        )}
      </div>
    </motion.article>
  );
}

function ActivityDetail({
  activity,
  onBack,
  isFavorite,
  onToggleFavorite,
  countries,
  onSelectActivity
}: {
  activity: Activity;
  onBack: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  countries: Country[];
  onSelectActivity: (activity: Activity) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [recommendations, setRecommendations] = useState<Activity[]>([]);
  const [loadingRecs, setLoadingRecs] = useState(false);
  const country = countries.find(c => c.code === activity.countryCode);
  const motherFeatures = getMotherFriendlyFeatures(activity);

  useEffect(() => {
    let cancelled = false;
    async function fetchRecommendations() {
      setLoadingRecs(true);
      try {
        const res = await fetch(`/api/recommendations?activityId=${activity.id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (!cancelled) setRecommendations(data);
      } catch {
        if (!cancelled) setRecommendations([]);
      } finally {
        if (!cancelled) setLoadingRecs(false);
      }
    }
    fetchRecommendations();
    return () => { cancelled = true; };
  }, [activity.id]);

  // Track activity view
  useEffect(() => {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventType: 'view', activityId: activity.id }),
    }).catch(() => {}); // Fire and forget
  }, [activity.id]);

  return (
    <main className="min-h-screen bg-[#F7F5F2]">
      <header className="sticky top-0 z-50 bg-white border-b-2 border-[#004D3F]">
        <div className="max-w-[1440px] mx-auto px-3 md:px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#004D3F] font-bold hover:opacity-70 transition-opacity text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleFavorite}
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-[#004D3F] transition-all ${
                isFavorite ? 'bg-[#FDCFDF]' : 'bg-white hover:bg-[#F7F5F2]'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-[#FF6B6B] text-[#FF6B6B]' : 'text-[#004D3F]'}`} />
            </button>
            <button
              onClick={async () => {
                const shareData = {
                  title: activity.name,
                  text: activity.shortDescription || '',
                  url: `${window.location.origin}/explore?search=${encodeURIComponent(activity.name)}`,
                };
                // Track share event
                fetch('/api/analytics', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ eventType: 'share', activityId: activity.id }),
                }).catch(() => {});
                try {
                  if (navigator.share) {
                    await navigator.share(shareData);
                  } else {
                    await navigator.clipboard.writeText(shareData.url);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }
                } catch {
                  // User cancelled share dialog
                }
              }}
              className={`relative h-8 rounded-full flex items-center justify-center border-2 border-[#004D3F] transition-all ${
                copied ? 'bg-[#82E9A6] px-3 gap-1' : 'bg-white hover:bg-[#F7F5F2] w-8'
              }`}
            >
              {copied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#004D3F]" />
                  <span className="text-[10px] font-bold text-[#004D3F]">Copied!</span>
                </>
              ) : (
                <Share2 className="w-4 h-4 text-[#004D3F]" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="relative h-[250px] md:h-[350px]">
        <Image
          src={activity.images?.[0] || 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800'}
          alt={activity.name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-wrap gap-1.5 mb-3">
              {activity.pricingType === 'free' && (
                <span className="bg-[#FFF98F] text-[#004D3F] text-xs font-black px-3 py-1 rounded-full border border-[#004D3F]">
                  FREE ENTRY
                </span>
              )}
              {activity.isIndoor && (
                <span className="bg-[#B3F5FF] text-[#004D3F] text-xs font-black px-3 py-1 rounded-full border border-[#004D3F]">
                  INDOOR
                </span>
              )}
              {country && (
                <span className="bg-white text-[#004D3F] text-xs font-black px-3 py-1 rounded-full border border-[#004D3F]">
                  {country.name}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-white uppercase mb-2">
              {activity.name}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-white/90 text-sm">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {activity.address}
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-[#FFF98F] text-[#FFF98F]" />
                {activity.rating} ({activity.reviewCount?.toLocaleString()} reviews)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-3 md:px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {motherFeatures.length > 0 && (
              <section className="bg-[#82E9A6] rounded-[20px] border-2 border-[#004D3F] p-4 shadow-[3px_3px_0px_#004D3F]">
                <h2 className="text-base font-black text-[#004D3F] uppercase mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Family Friendly Info
                </h2>
                <div className="flex flex-wrap gap-2">
                  {motherFeatures.map((feature, idx) => (
                    <span key={idx} className="flex items-center gap-1 text-xs text-[#004D3F] bg-white/60 px-3 py-1 rounded-full font-medium">
                      <feature.icon className="w-3 h-3" />
                      {feature.label}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="bg-white rounded-[20px] border-2 border-[#004D3F] p-4 shadow-[3px_3px_0px_#004D3F]">
              <h2 className="text-base font-black text-[#004D3F] uppercase mb-3">About</h2>
              <p className="text-[#004D3F]/80 text-sm leading-relaxed">{activity.description}</p>
            </section>

            {activity.features && activity.features.length > 0 && (
              <section className="bg-white rounded-[20px] border-2 border-[#004D3F] p-4 shadow-[3px_3px_0px_#004D3F]">
                <h2 className="text-base font-black text-[#004D3F] uppercase mb-3">Features & Highlights</h2>
                <div className="flex flex-wrap gap-2">
                  {activity.features.map((feature, idx) => (
                    <span 
                      key={idx}
                      className="bg-[#82E9A6] text-[#004D3F] font-bold px-3 py-1 rounded-full border border-[#004D3F] text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {activity.amenities && activity.amenities.length > 0 && (
              <section className="bg-white rounded-[20px] border-2 border-[#004D3F] p-4 shadow-[3px_3px_0px_#004D3F]">
                <h2 className="text-base font-black text-[#004D3F] uppercase mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {activity.amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-[#004D3F] text-sm">
                      <CheckCircle2 className="w-4 h-4 text-[#82E9A6]" />
                      <span className="font-medium">{amenity}</span>
                    </div>
                  ))}
                  {activity.hasParking && (
                    <div className="flex items-center gap-2 text-[#004D3F] text-sm">
                      <Car className="w-4 h-4 text-[#82E9A6]" />
                      <span className="font-medium">Parking Available</span>
                    </div>
                  )}
                  {activity.isWheelchairAccessible && (
                    <div className="flex items-center gap-2 text-[#004D3F] text-sm">
                      <Accessibility className="w-4 h-4 text-[#82E9A6]" />
                      <span className="font-medium">Wheelchair Accessible</span>
                    </div>
                  )}
                </div>
              </section>
            )}
          </div>

          <div className="space-y-4">
            <div className="bg-[#FFF98F] rounded-[20px] border-2 border-[#004D3F] p-4 shadow-[3px_3px_0px_#004D3F]">
              <h3 className="text-sm font-black text-[#004D3F] uppercase mb-3">Quick Info</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-[10px] font-bold text-[#004D3F]/60 uppercase mb-0.5">Age Range</p>
                  <p className="text-[#004D3F] font-bold text-sm flex items-center gap-2">
                    <Baby className="w-4 h-4" />
                    {activity.ageMin === 0 ? 'Newborns' : `${activity.ageMin} years`} - {activity.ageMax} years
                  </p>
                </div>

                  <div>
                    <p className="text-[10px] font-bold text-[#004D3F]/60 uppercase mb-0.5">Entry</p>
                    <p className="text-[#004D3F] text-sm font-bold">
                      {activity.pricingType === 'free' ? 'Free Entry' : 'Check venue for details'}
                    </p>
                  </div>

                {activity.openTime && activity.closeTime && (
                  <div>
                    <p className="text-[10px] font-bold text-[#004D3F]/60 uppercase mb-0.5">Opening Hours</p>
                    <p className="text-[#004D3F] font-bold text-sm flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {activity.openTime} - {activity.closeTime}
                    </p>
                    {activity.timingNotes && (
                      <p className="text-xs text-[#004D3F]/70 mt-1">{activity.timingNotes}</p>
                    )}
                  </div>
                )}

                {activity.openDays && activity.openDays.length > 0 && (
                  <div>
                    <p className="text-[10px] font-bold text-[#004D3F]/60 uppercase mb-0.5">Open Days</p>
                    <p className="text-xs text-[#004D3F] font-medium">
                      {activity.openDays.length === 7 
                        ? 'Open Daily' 
                        : activity.openDays.join(', ')}
                    </p>
                  </div>
                )}
              </div>
            </div>

              {(activity.phone || activity.website || activity.instagram) && (
                <div className="bg-white rounded-[20px] border-2 border-[#004D3F] p-4 shadow-[3px_3px_0px_#004D3F]">
                  <h3 className="text-sm font-black text-[#004D3F] uppercase mb-3">Contact</h3>
                  <div className="space-y-2">
                    {activity.phone && (
                      <button 
                        onClick={() => openExternalUrl(`tel:${activity.phone}`)}
                        className="flex items-center gap-2 text-[#004D3F] font-medium hover:text-[#004D3F]/70 transition-colors w-full text-left text-sm"
                      >
                        <Phone className="w-4 h-4" />
                        {activity.phone}
                      </button>
                    )}
                    {activity.website && (
                      <button 
                        onClick={() => openExternalUrl(activity.website!)}
                        className="flex items-center gap-2 text-[#004D3F] font-medium hover:text-[#004D3F]/70 transition-colors w-full text-left text-sm"
                      >
                        <Globe className="w-4 h-4" />
                        Visit Website
                      </button>
                    )}
                    {activity.instagram && (
                      <button 
                        onClick={() => openExternalUrl(`https://instagram.com/${activity.instagram!.replace('@', '')}`)}
                        className="flex items-center gap-2 text-[#004D3F] font-medium hover:text-[#004D3F]/70 transition-colors w-full text-left text-sm"
                      >
                        <Instagram className="w-4 h-4" />
                        {activity.instagram}
                      </button>
                    )}
                  </div>
                </div>
              )}

            <div className="bg-white rounded-[20px] border-2 border-[#004D3F] p-4 shadow-[3px_3px_0px_#004D3F]">
              <h3 className="text-sm font-black text-[#004D3F] uppercase mb-3">Location</h3>
              <p className="text-[#004D3F] font-medium text-sm mb-3">
                {activity.address}
              </p>
              <button
                onClick={() => openExternalUrl(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.address || activity.name)}`)}
                className="flex items-center justify-center gap-2 w-full bg-[#82E9A6] text-[#004D3F] font-black py-2.5 rounded-full border-2 border-[#004D3F] shadow-[2px_2px_0px_#004D3F] hover:translate-y-[-2px] transition-all text-sm"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </button>
            </div>

            {activity.tags && activity.tags.length > 0 && (
              <div>
                <p className="text-[10px] font-bold text-[#004D3F]/60 uppercase mb-2">Tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {activity.tags.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="bg-[#F7F5F2] text-[#004D3F]/70 text-xs px-2 py-0.5 rounded-full border border-[#004D3F]/20"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You May Also Like - Recommendations */}
        {(loadingRecs || recommendations.length > 0) && (
          <section className="mt-6">
            <h2 className="text-base font-black text-[#004D3F] uppercase mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              You May Also Like
            </h2>

            {loadingRecs ? (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[200px] bg-white rounded-[16px] border-2 border-[#004D3F]/20 overflow-hidden animate-pulse"
                  >
                    <div className="h-28 bg-[#004D3F]/10" />
                    <div className="p-3 space-y-2">
                      <div className="h-3 bg-[#004D3F]/10 rounded-full w-4/5" />
                      <div className="h-2 bg-[#004D3F]/10 rounded-full w-3/5" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {recommendations.map((rec) => (
                  <button
                    key={rec.id}
                    onClick={() => {
                      onSelectActivity(rec);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex-shrink-0 w-[200px] bg-white rounded-[16px] border-2 border-[#004D3F] overflow-hidden shadow-[2px_2px_0px_#004D3F] hover:shadow-[4px_4px_0px_#004D3F] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all text-left group"
                  >
                    <div className="relative h-28 overflow-hidden">
                      <Image
                        src={rec.images?.[0] || 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=400'}
                        alt={rec.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      {rec.pricingType === 'free' && (
                        <span className="absolute top-1.5 left-1.5 bg-[#82E9A6] text-[#004D3F] text-[8px] font-black px-1.5 py-0.5 rounded-full border border-[#004D3F]">
                          FREE
                        </span>
                      )}
                    </div>
                    <div className="p-2.5">
                      <h4 className="text-xs font-black text-[#004D3F] leading-tight line-clamp-1 mb-1">
                        {rec.name}
                      </h4>
                      <div className="flex items-center justify-between gap-1">
                        <span className="flex items-center gap-0.5 text-[10px] text-[#004D3F]/70">
                          <MapPin className="w-2.5 h-2.5" />
                          <span className="line-clamp-1">{rec.area}</span>
                        </span>
                        <span className="flex items-center gap-0.5 bg-[#FFF98F] px-1.5 py-0.5 rounded-full shrink-0">
                          <Star className="w-2.5 h-2.5 fill-[#004D3F] text-[#004D3F]" />
                          <span className="text-[10px] font-black text-[#004D3F]">{rec.rating}</span>
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}
