/**
 * Static fallback for the read-only catalogue queries.
 *
 * When MONGODB_URI is missing, the database is unreachable, or it has no venues yet,
 * the API serves the curated venue dataset bundled with the app instead, with the same
 * shapes and the same filter/sort semantics as the MongoDB queries in ./queries.ts.
 * That way the site never shows an empty catalogue.
 */
import {
  allActivities,
  categories as categoryNames,
  countries as countryList,
  regionsByCountry,
} from '../data/activities';
import type { Activity, Country, Region, Category } from './schema';
import type { ActivityFilters } from './queries';

const slugify = (s: string) => s.toLowerCase().replace(/[&\s]+/g, '-');

type Flat = Record<string, unknown> & {
  id: string; slug: string; name: string; categoryId: string; countryCode: string; region: string; area: string;
  shortDescription: string; ageMin: number; ageMax: number; isIndoor: boolean; pricingType: string;
  rating: number; reviewCount: number; isFeatured: boolean; isActive: boolean;
};

const flat: Flat[] = allActivities.map((a) => ({
  id: a.id,
  slug: a.id,
  name: a.name,
  categoryId: slugify(a.category),
  description: a.description,
  shortDescription: a.shortDescription,
  countryCode: a.location.country,
  region: a.location.region,
  area: a.location.area,
  address: a.location.address,
  latitude: null,
  longitude: null,
  ageMin: a.ageRange.min,
  ageMax: a.ageRange.max,
  pricingType: a.pricing.type,
  adultPrice: a.pricing.adultPrice ?? null,
  childPrice: a.pricing.childPrice ?? null,
  currency: a.pricing.currency,
  pricingNotes: a.pricing.notes ?? null,
  openDays: a.timing.openDays,
  openTime: a.timing.openTime,
  closeTime: a.timing.closeTime,
  timingNotes: a.timing.notes ?? null,
  features: a.features,
  amenities: a.amenities,
  images: a.images,
  rating: a.rating,
  reviewCount: a.reviewCount,
  isIndoor: a.isIndoor,
  isFamilyFriendly: a.isFamilyFriendly,
  hasParking: a.hasParking,
  isWheelchairAccessible: a.isWheelchairAccessible,
  phone: a.contact?.phone ?? null,
  website: a.contact?.website ?? null,
  instagram: a.contact?.instagram ?? null,
  tags: a.tags,
  isVerified: a.rating > 0,
  isFeatured: a.rating >= 4.7,
  isActive: true,
}));

function matches(a: Flat, f?: ActivityFilters): boolean {
  if (f?.country && a.countryCode !== f.country) return false;
  if (f?.region && !['All Emirates', 'All Regions', 'All Areas'].includes(f.region) && a.region !== f.region) return false;
  if (f?.category && f.category !== 'All' && a.categoryId !== f.category) return false;
  if (f?.ageMin !== undefined && f?.ageMax !== undefined && !(a.ageMin <= f.ageMax && a.ageMax >= f.ageMin)) return false;
  if (f?.isIndoor !== undefined && a.isIndoor !== f.isIndoor) return false;
  if (f?.isFree && a.pricingType !== 'free') return false;
  if (f?.search) {
    const q = f.search.toLowerCase();
    if (![a.name, a.shortDescription, a.region, a.area].some((v) => String(v).toLowerCase().includes(q))) return false;
  }
  return true;
}

export function staticActivities(f?: ActivityFilters): Activity[] {
  const sorted = flat.filter((a) => matches(a, f)).sort((x, y) => {
    if (x.isFeatured !== y.isFeatured) return x.isFeatured ? -1 : 1;
    if (f?.sortBy === 'name') return x.name.localeCompare(y.name);
    if (f?.sortBy === 'reviews') return y.reviewCount - x.reviewCount;
    return y.rating - x.rating;
  });
  const start = f?.offset ?? 0;
  return sorted.slice(start, start + (f?.limit ?? 1000)) as unknown as Activity[];
}

export const staticActivityBySlug = (slug: string) =>
  flat.find((a) => a.slug === slug) as unknown as Activity | undefined;

export const staticFeatured = (limit = 6) =>
  flat.filter((a) => a.isFeatured).sort((x, y) => y.rating - x.rating).slice(0, limit) as unknown as Activity[];

export const staticCount = (f?: ActivityFilters) => flat.filter((a) => matches(a, f)).length;

export function staticCountries(): Country[] {
  const used = new Set(flat.map((a) => a.countryCode));
  return countryList
    .filter((c) => used.has(c.code))
    .map((c) => ({ id: c.code, code: c.code, name: c.name, currency: c.currency, isActive: true }))
    .sort((a, b) => a.name.localeCompare(b.name)) as unknown as Country[];
}

export function staticRegions(countryCode?: string): Region[] {
  const out: Record<string, unknown>[] = [];
  for (const [cc, list] of Object.entries(regionsByCountry)) {
    if (countryCode && cc !== countryCode) continue;
    for (const name of list) {
      if (name === 'All Regions') continue;
      if (!flat.some((a) => a.countryCode === cc && a.region === name)) continue;
      out.push({ id: `${cc}-${slugify(name)}`, countryCode: cc, name, slug: slugify(name), isActive: true });
    }
  }
  return out.sort((a, b) => String(a.name).localeCompare(String(b.name))) as unknown as Region[];
}

export function staticCategories(): Category[] {
  return categoryNames
    .map((name, i) => ({ name, i }))
    .filter(({ name }) => name !== 'All' && flat.some((a) => a.categoryId === slugify(name)))
    .map(({ name, i }) => ({
      id: slugify(name), name, slug: slugify(name), icon: null, description: null, displayOrder: i, isActive: true,
    })) as unknown as Category[];
}

export function staticStats() {
  const rated = flat.filter((a) => a.rating > 0);
  const avg = rated.length ? rated.reduce((s, a) => s + a.rating, 0) / rated.length : 0;
  return { venueCount: flat.length, averageRating: avg.toFixed(1) };
}

export function staticRecommendations(activityId: string, limit = 6): Activity[] {
  const src = flat.find((a) => a.id === activityId);
  if (!src) return [];
  const scored = flat
    .filter((a) => a.id !== src.id)
    .map((a) => ({
      a,
      score:
        (a.categoryId === src.categoryId ? 4 : 0) +
        (a.region === src.region ? 2 : 0) +
        (a.ageMin <= src.ageMax && a.ageMax >= src.ageMin ? 1 : 0) +
        (a.pricingType === src.pricingType ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score || y.a.rating - x.a.rating)
    .slice(0, limit)
    .map((x) => x.a);
  if (scored.length < limit) {
    const have = new Set([src.id, ...scored.map((a) => a.id)]);
    scored.push(
      ...flat
        .filter((a) => a.countryCode === src.countryCode && !have.has(a.id))
        .sort((x, y) => y.rating - x.rating)
        .slice(0, limit - scored.length),
    );
  }
  return scored as unknown as Activity[];
}
