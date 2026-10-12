// Shared "explore by emirate" destination metadata, used by both
// LocationGrid.tsx and ActivityExplorer.tsx so there is a single source of
// truth instead of two copy-pasted arrays. The activity *counts* are NOT
// stored here (those must always come live from the database via
// `getRegionStats()` in `src/lib/db/queries.ts`) — this file only holds the
// static display info (highlights, imagery, link target) per destination.

export interface DestinationInfo {
  /** Display name shown on the card. */
  name: string;
  /** Curated highlight venues/landmarks shown as chips. */
  highlights: string[];
  /** Card image. */
  image: string;
  /** Value passed to `/explore?search=` when the card is clicked. */
  searchParam: string;
  /** DB `region` values (as seeded in Region/Activity docs) aggregated into this card. */
  regions: string[];
}

/** All 7 emirates, for JSON-LD `areaServed` and other "all 7 emirates" copy. */
export const UAE_EMIRATES = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain',
] as const;

export const uaeDestinations: DestinationInfo[] = [
  {
    name: 'Dubai',
    highlights: ['Dubai Mall KidZania', 'Kite Beach', 'Dubai Frame', 'IMG Worlds', 'Legoland'],
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    searchParam: 'Dubai',
    regions: ['Dubai'],
  },
  {
    name: 'Abu Dhabi',
    highlights: ['Louvre Abu Dhabi', 'Yas Waterworld', 'Ferrari World', 'Corniche Beach', 'Emirates Park Zoo'],
    image: 'https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?w=800',
    searchParam: 'Abu Dhabi',
    regions: ['Abu Dhabi'],
  },
  {
    name: 'Sharjah',
    highlights: ['Sharjah Aquarium', 'Al Noor Island', 'Discovery Centre', 'Al Majaz Waterfront', 'Rain Room'],
    image: 'https://images.unsplash.com/photo-1558369981-f9ca78462e61?w=800',
    searchParam: 'Sharjah',
    regions: ['Sharjah'],
  },
  {
    name: 'Northern Emirates',
    highlights: ['Jebel Jais (RAK)', 'Wadi Adventure (Fujairah)', 'Dreamland Aqua Park', 'Al Zorah Beach'],
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?w=800',
    searchParam: 'RAK',
    regions: ['Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain'],
  },
];

/** Formats a live count for display without ever inventing or rounding up.
 *  Small counts are shown exactly; larger ones are rounded DOWN to the
 *  nearest 10 and shown as "N+" so the figure never overstates reality. */
export function formatActivityCount(count: number): string {
  if (count >= 20) return `${Math.floor(count / 10) * 10}+`;
  return `${count}`;
}

/** Merges static destination info with live per-region counts from
 *  `getRegionStats()`, returning a display-ready `activities` string. */
export function withLiveCounts(
  destinations: DestinationInfo[],
  regionStats: { region: string; count: number }[],
): (DestinationInfo & { activities: string; rawCount: number })[] {
  const countByRegion = new Map(regionStats.map((r) => [r.region, r.count]));

  return destinations.map((dest) => {
    const rawCount = dest.regions.reduce((sum, r) => sum + (countByRegion.get(r) ?? 0), 0);
    return { ...dest, rawCount, activities: formatActivityCount(rawCount) };
  });
}
