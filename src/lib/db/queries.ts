import { db } from './index';
import { activities, countries, regions, categories, analyticsEvents } from './schema';
import { eq, and, or, ne, ilike, lte, gte, desc, asc, sql, count, avg } from 'drizzle-orm';
import type { Activity, Country, Region, Category } from './schema';

export type ActivityFilters = {
  country?: string;
  region?: string;
  category?: string;
  ageMin?: number;
  ageMax?: number;
  isIndoor?: boolean;
  isFree?: boolean;
  search?: string;
  sortBy?: 'rating' | 'reviews' | 'name';
  limit?: number;
  offset?: number;
};

export async function getActivities(filters?: ActivityFilters): Promise<Activity[]> {
  const conditions = [eq(activities.isActive, true)];

  if (filters?.country) {
    conditions.push(eq(activities.countryCode, filters.country));
  }
  if (filters?.region && !['All Emirates', 'All Regions', 'All Areas'].includes(filters.region)) {
    conditions.push(eq(activities.region, filters.region));
  }
  if (filters?.category && filters.category !== 'All') {
    const catId = parseInt(filters.category);
    if (!isNaN(catId)) {
      conditions.push(eq(activities.categoryId, catId));
    }
  }
  if (filters?.ageMin !== undefined && filters?.ageMax !== undefined) {
    conditions.push(lte(activities.ageMin, filters.ageMax));
    conditions.push(gte(activities.ageMax, filters.ageMin));
  }
  if (filters?.isIndoor !== undefined) {
    conditions.push(eq(activities.isIndoor, filters.isIndoor));
  }
  if (filters?.isFree) {
    conditions.push(eq(activities.pricingType, 'free'));
  }
  if (filters?.search) {
    const escaped = filters.search.replace(/[%_\\]/g, '\\$&');
    conditions.push(
      or(
        ilike(activities.name, `%${escaped}%`),
        ilike(activities.shortDescription, `%${escaped}%`),
        ilike(activities.region, `%${escaped}%`),
        ilike(activities.area, `%${escaped}%`)
      )!
    );
  }

  let orderByClause;
  if (filters?.sortBy === 'reviews') {
    orderByClause = desc(activities.reviewCount);
  } else if (filters?.sortBy === 'name') {
    orderByClause = asc(activities.name);
  } else {
    orderByClause = desc(activities.rating);
  }

  return db
    .select()
    .from(activities)
    .where(and(...conditions))
    .orderBy(desc(activities.isFeatured), orderByClause)
    .limit(filters?.limit ?? 100)
    .offset(filters?.offset ?? 0);
}

export async function getActivityBySlug(slug: string): Promise<Activity | undefined> {
  const result = await db
    .select()
    .from(activities)
    .where(and(eq(activities.slug, slug), eq(activities.isActive, true)))
    .limit(1);
  return result[0];
}

export async function getFeaturedActivities(limit = 6): Promise<Activity[]> {
  return db
    .select()
    .from(activities)
    .where(and(eq(activities.isActive, true), eq(activities.isFeatured, true)))
    .orderBy(desc(activities.rating))
    .limit(limit);
}

export async function getActivityCount(filters?: Pick<ActivityFilters, 'country' | 'region' | 'category'>): Promise<number> {
  const conditions = [eq(activities.isActive, true)];

  if (filters?.country) conditions.push(eq(activities.countryCode, filters.country));
  if (filters?.region && !['All Emirates', 'All Regions'].includes(filters.region)) {
    conditions.push(eq(activities.region, filters.region));
  }
  if (filters?.category && filters.category !== 'All') {
    const catId = parseInt(filters.category);
    if (!isNaN(catId)) {
      conditions.push(eq(activities.categoryId, catId));
    }
  }

  const result = await db
    .select({ value: count() })
    .from(activities)
    .where(and(...conditions));
  return result[0]?.value ?? 0;
}

export async function getCountries(): Promise<Country[]> {
  return db
    .select()
    .from(countries)
    .where(eq(countries.isActive, true))
    .orderBy(asc(countries.name));
}

export async function getRegions(countryCode?: string): Promise<Region[]> {
  const conditions = [eq(regions.isActive, true)];
  if (countryCode) conditions.push(eq(regions.countryCode, countryCode));

  return db
    .select()
    .from(regions)
    .where(and(...conditions))
    .orderBy(asc(regions.name));
}

export async function getCategories(): Promise<Category[]> {
  return db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(asc(categories.displayOrder));
}

export async function getStats() {
  const [activityCount] = await db
    .select({ value: count() })
    .from(activities)
    .where(eq(activities.isActive, true));
  const [avgRating] = await db
    .select({ value: avg(activities.rating) })
    .from(activities)
    .where(eq(activities.isActive, true));

  return {
    venueCount: activityCount.value,
    averageRating: Number(avgRating.value ?? 0).toFixed(1),
  };
}

export async function getRecommendations(activityId: string, limit = 6): Promise<Activity[]> {
  // 1. Fetch the source activity
  const [source] = await db
    .select()
    .from(activities)
    .where(eq(activities.id, activityId))
    .limit(1);

  if (!source) return [];

  // 2. Find similar activities based on multiple signals, scored by relevance.
  //    Scoring:
  //      - Same category:      +4
  //      - Same region:         +2
  //      - Overlapping age range: +1
  //      - Same pricing type:   +1
  //    We exclude the source activity and inactive activities.
  const results = await db
    .select({
      activity: activities,
      relevance: sql<number>`(
        CASE WHEN ${activities.categoryId} = ${source.categoryId} THEN 4 ELSE 0 END
        + CASE WHEN ${activities.region} = ${source.region} THEN 2 ELSE 0 END
        + CASE WHEN ${activities.ageMin} <= ${source.ageMax} AND ${activities.ageMax} >= ${source.ageMin} THEN 1 ELSE 0 END
        + CASE WHEN ${activities.pricingType} = ${source.pricingType} THEN 1 ELSE 0 END
      )`.as('relevance'),
    })
    .from(activities)
    .where(
      and(
        eq(activities.isActive, true),
        ne(activities.id, activityId),
        // At least one signal must match for the row to be relevant
        or(
          eq(activities.categoryId, source.categoryId),
          eq(activities.region, source.region),
          eq(activities.pricingType, source.pricingType),
          and(
            lte(activities.ageMin, source.ageMax),
            gte(activities.ageMax, source.ageMin)
          )
        )
      )
    )
    .orderBy(sql`relevance DESC`, desc(activities.rating))
    .limit(limit);

  let recommendations = results.map(r => r.activity);

  // 3. Fallback: if fewer than limit results, fill with top-rated from same country
  if (recommendations.length < limit) {
    const existingIds = [activityId, ...recommendations.map(a => a.id)];
    const fallback = await db
      .select()
      .from(activities)
      .where(
        and(
          eq(activities.isActive, true),
          eq(activities.countryCode, source.countryCode),
          sql`${activities.id} NOT IN (${sql.join(existingIds.map(id => sql`${id}`), sql`, `)})`
        )
      )
      .orderBy(desc(activities.rating))
      .limit(limit - recommendations.length);

    recommendations = [...recommendations, ...fallback];
  }

  return recommendations;
}

// ─── Analytics ──────────────────────────────────────────────

export async function trackEvent(eventType: string, activityId?: string, metadata?: Record<string, unknown>): Promise<void> {
  await db.insert(analyticsEvents).values({ eventType, activityId: activityId ?? null, metadata: metadata ?? {} });
}

export async function getActivityStats(activityId: string): Promise<{ views: number; shares: number; favorites: number }> {
  const results = await db
    .select({
      eventType: analyticsEvents.eventType,
      eventCount: count(),
    })
    .from(analyticsEvents)
    .where(eq(analyticsEvents.activityId, activityId))
    .groupBy(analyticsEvents.eventType);

  const stats = { views: 0, shares: 0, favorites: 0 };
  for (const row of results) {
    if (row.eventType === 'view') stats.views = row.eventCount;
    else if (row.eventType === 'share') stats.shares = row.eventCount;
    else if (row.eventType === 'favorite') stats.favorites = row.eventCount;
  }
  return stats;
}

export async function getPopularActivities(limit = 10): Promise<Array<{ activityId: string; views: number }>> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const results = await db
    .select({
      activityId: analyticsEvents.activityId,
      views: count(),
    })
    .from(analyticsEvents)
    .where(
      and(
        eq(analyticsEvents.eventType, 'view'),
        gte(analyticsEvents.createdAt, thirtyDaysAgo),
        sql`${analyticsEvents.activityId} IS NOT NULL`
      )
    )
    .groupBy(analyticsEvents.activityId)
    .orderBy(desc(count()))
    .limit(limit);

  return results.map(r => ({
    activityId: r.activityId as string,
    views: r.views,
  }));
}
