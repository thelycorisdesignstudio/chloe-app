import { allActivities, countries } from "./activities";

export interface CountryCard {
  code: string;
  name: string;
  count: number;
  highlights: string[];
  image: string;
}

const GCC = ["UAE", "KSA", "QAT", "KWT", "BHR", "OMN"];

const isStock = (u: string) => u.includes("images.unsplash.com");

/** One card per GCC country with real venue counts, top venue names and a real venue photo. */
export function getCountryCards(): CountryCard[] {
  return GCC.map((code) => {
    const venues = allActivities.filter((a) => a.location.country === code);
    const ranked = [...venues].sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    const withPhoto = ranked.find((v) => v.images.some((u) => !isStock(u)));
    const image = withPhoto?.images.find((u) => !isStock(u)) ?? ranked[0]?.images[0] ?? "";
    return {
      code,
      name: countries.find((c) => c.code === code)?.name ?? code,
      count: venues.length,
      highlights: ranked.slice(0, 5).map((v) => v.name),
      image,
    };
  }).filter((c) => c.count > 0);
}
