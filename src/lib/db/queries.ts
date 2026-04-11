import { connectDB } from './index';
import {
  Activity as ActivityModel,
  Country as CountryModel,
  Region as RegionModel,
  Category as CategoryModel,
  AnalyticsEvent as AnalyticsEventModel,
} from './schema';
import type { Activity, Country, Region, Category } from './schema';
import mongoose from 'mongoose';

// ─── Helpers ─────────────────────────────────────────────────

/** Convert a Mongoose lean doc (with _id) to a plain object with string `id`.
 *  Also stringifies any ObjectId fields (e.g. categoryId, activityId). */
function toPlain<T extends Record<string, unknown>>(doc: T): Record<string, unknown> {
  const { _id, __v, ...rest } = doc;
  const result: Record<string, unknown> = { id: String(_id) };
  for (const [key, value] of Object.entries(rest)) {
    if (value instanceof mongoose.Types.ObjectId) {
      result[key] = value.toString();
    } else {
      result[key] = value;
    }
  }
  return result;
}

function toPlainList<T extends Record<string, unknown>>(docs: T[]): Record<string, unknown>[] {
  return docs.map(toPlain);
}

/** Safely create an ObjectId from a hex string. Returns null if invalid. */
function toObjectId(id: string): mongoose.Types.ObjectId | null {
  if (!mongoose.isValidObjectId(id)) return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new (mongoose.Types.ObjectId as any)(id) as mongoose.Types.ObjectId;
}

// ─── Filters ─────────────────────────────────────────────────

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

// ─── Activity Queries ────────────────────────────────────────

export async function getActivities(filters?: ActivityFilters): Promise<Activity[]> {
  await connectDB();

  const query: Record<string, unknown> = { isActive: true };

  if (filters?.country) {
    query.countryCode = filters.country;
  }
  if (filters?.region && !['All Emirates', 'All Regions', 'All Areas'].includes(filters.region)) {
    query.region = filters.region;
  }
  if (filters?.category && filters.category !== 'All') {
    const oid = toObjectId(filters.category);
    if (oid) query.categoryId = oid;
  }
  if (filters?.ageMin !== undefined && filters?.ageMax !== undefined) {
    query.ageMin = { $lte: filters.ageMax };
    query.ageMax = { $gte: filters.ageMin };
  }
  if (filters?.isIndoor !== undefined) {
    query.isIndoor = filters.isIndoor;
  }
  if (filters?.isFree) {
    query.pricingType = 'free';
  }
  if (filters?.search) {
    const escaped = filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = { $regex: escaped, $options: 'i' };
    query.$or = [
      { name: regex },
      { shortDescription: regex },
      { region: regex },
      { area: regex },
    ];
  }

  // Sort: featured first, then by user-selected sort
  let sortObj: Record<string, 1 | -1> = { isFeatured: -1, rating: -1 };
  if (filters?.sortBy === 'reviews') {
    sortObj = { isFeatured: -1, reviewCount: -1 };
  } else if (filters?.sortBy === 'name') {
    sortObj = { isFeatured: -1, name: 1 };
  }

  const docs = await ActivityModel
    .find(query)
    .sort(sortObj)
    .skip(filters?.offset ?? 0)
    .limit(filters?.limit ?? 100)
    .lean()
    .exec();

  return toPlainList(docs) as unknown as Activity[];
}

export async function getActivityBySlug(slug: string): Promise<Activity | undefined> {
  await connectDB();

  const doc = await ActivityModel
    .findOne({ slug, isActive: true })
    .lean()
    .exec();

  return doc ? (toPlain(doc) as unknown as Activity) : undefined;
}

export async function getFeaturedActivities(limit = 6): Promise<Activity[]> {
  await connectDB();

  const docs = await ActivityModel
    .find({ isActive: true, isFeatured: true })
    .sort({ rating: -1 })
    .limit(limit)
    .lean()
    .exec();

  return toPlainList(docs) as unknown as Activity[];
}

export async function getActivityCount(filters?: ActivityFilters): Promise<number> {
  await connectDB();

  const query: Record<string, unknown> = { isActive: true };

  if (filters?.country) query.countryCode = filters.country;
  if (filters?.region && !['All Emirates', 'All Regions', 'All Areas'].includes(filters.region)) {
    query.region = filters.region;
  }
  if (filters?.category && filters.category !== 'All') {
    const oid = toObjectId(filters.category);
    if (oid) query.categoryId = oid;
  }
  if (filters?.ageMin !== undefined && filters?.ageMax !== undefined) {
    query.ageMin = { $lte: filters.ageMax };
    query.ageMax = { $gte: filters.ageMin };
  }
  if (filters?.isIndoor !== undefined) {
    query.isIndoor = filters.isIndoor;
  }
  if (filters?.isFree) {
    query.pricingType = 'free';
  }
  if (filters?.search) {
    const escaped = filters.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = { $regex: escaped, $options: 'i' };
    query.$or = [
      { name: regex },
      { shortDescription: regex },
      { region: regex },
      { area: regex },
    ];
  }

  return ActivityModel.countDocuments(query).exec();
}

// ─── Reference Data Queries ──────────────────────────────────

export async function getCountries(): Promise<Country[]> {
  await connectDB();

  const docs = await CountryModel
    .find({ isActive: true })
    .sort({ name: 1 })
    .lean()
    .exec();

  return toPlainList(docs) as unknown as Country[];
}

export async function getRegions(countryCode?: string): Promise<Region[]> {
  await connectDB();

  const query: Record<string, unknown> = { isActive: true };
  if (countryCode) query.countryCode = countryCode;

  const docs = await RegionModel
    .find(query)
    .sort({ name: 1 })
    .lean()
    .exec();

  return toPlainList(docs) as unknown as Region[];
}

export async function getCategories(): Promise<Category[]> {
  await connectDB();

  const docs = await CategoryModel
    .find({ isActive: true })
    .sort({ displayOrder: 1 })
    .lean()
    .exec();

  return toPlainList(docs) as unknown as Category[];
}

// ─── Stats ───────────────────────────────────────────────────

export async function getStats() {
  await connectDB();

  const [venueCount, avgResult] = await Promise.all([
    ActivityModel.countDocuments({ isActive: true }).exec(),
    ActivityModel.aggregate<{ avg: number | null }>([
      { $match: { isActive: true } },
      { $group: { _id: null, avg: { $avg: '$rating' } } },
    ]).exec(),
  ]);

  return {
    venueCount,
    averageRating: Number(avgResult[0]?.avg ?? 0).toFixed(1),
  };
}

// ─── Recommendations ─────────────────────────────────────────

export async function getRecommendations(activityId: string, limit = 6): Promise<Activity[]> {
  await connectDB();

  const objectId = toObjectId(activityId);
  if (!objectId) return [];

  // 1. Fetch the source activity
  const source = await ActivityModel.findById(objectId).lean().exec();
  if (!source) return [];

  // 2. Aggregation pipeline: score by relevance signals
  //    Same category +4, same region +2, overlapping age +1, same pricing +1
  const results = await ActivityModel.aggregate([
    {
      $match: {
        isActive: true,
        _id: { $ne: objectId },
        $or: [
          { categoryId: source.categoryId },
          { region: source.region },
          { pricingType: source.pricingType },
          { ageMin: { $lte: source.ageMax }, ageMax: { $gte: source.ageMin } },
        ],
      },
    },
    {
      $addFields: {
        relevance: {
          $add: [
            { $cond: [{ $eq: ['$categoryId', source.categoryId] }, 4, 0] },
            { $cond: [{ $eq: ['$region', source.region] }, 2, 0] },
            {
              $cond: [
                {
                  $and: [
                    { $lte: ['$ageMin', source.ageMax] },
                    { $gte: ['$ageMax', source.ageMin] },
                  ],
                },
                1,
                0,
              ],
            },
            { $cond: [{ $eq: ['$pricingType', source.pricingType] }, 1, 0] },
          ],
        },
      },
    },
    { $sort: { relevance: -1 as const, rating: -1 as const } },
    { $limit: limit },
    { $project: { relevance: 0 } },
  ]).exec();

  let recommendations = results.map((doc: Record<string, unknown>) =>
    toPlain(doc) as unknown as Activity,
  );

  // 3. Fallback: fill with top-rated from same country
  if (recommendations.length < limit) {
    const existingIds = [
      objectId,
      ...recommendations.map((a) => new (mongoose.Types.ObjectId as any)(a.id) as mongoose.Types.ObjectId),
    ];

    const fallbackDocs = await ActivityModel
      .find({
        isActive: true,
        countryCode: source.countryCode,
        _id: { $nin: existingIds },
      })
      .sort({ rating: -1 })
      .limit(limit - recommendations.length)
      .lean()
      .exec();

    recommendations = [
      ...recommendations,
      ...toPlainList(fallbackDocs) as unknown as Activity[],
    ];
  }

  return recommendations;
}

// ─── Analytics ──────────────────────────────────────────────

export async function trackEvent(
  eventType: string,
  activityId?: string,
  metadata?: Record<string, unknown>,
): Promise<void> {
  await connectDB();

  await AnalyticsEventModel.create({
    eventType,
    activityId: activityId ? toObjectId(activityId) : null,
    metadata: metadata ?? {},
  });
}

export async function getActivityStats(
  activityId: string,
): Promise<{ views: number; shares: number; favorites: number }> {
  await connectDB();

  const objectId = toObjectId(activityId);
  if (!objectId) return { views: 0, shares: 0, favorites: 0 };

  const results = await AnalyticsEventModel.aggregate<{
    _id: string;
    count: number;
  }>([
    { $match: { activityId: objectId } },
    { $group: { _id: '$eventType', count: { $sum: 1 } } },
  ]).exec();

  const stats = { views: 0, shares: 0, favorites: 0 };
  for (const row of results) {
    if (row._id === 'view') stats.views = row.count;
    else if (row._id === 'share') stats.shares = row.count;
    else if (row._id === 'favorite') stats.favorites = row.count;
  }
  return stats;
}

export async function getPopularActivities(
  limit = 10,
): Promise<Array<{ activityId: string; views: number }>> {
  await connectDB();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const results = await AnalyticsEventModel.aggregate<{
    _id: mongoose.Types.ObjectId;
    views: number;
  }>([
    {
      $match: {
        eventType: 'view',
        createdAt: { $gte: thirtyDaysAgo },
        activityId: { $ne: null },
      },
    },
    { $group: { _id: '$activityId', views: { $sum: 1 } } },
    { $sort: { views: -1 } },
    { $limit: limit },
  ]).exec();

  return results.map((r) => ({
    activityId: String(r._id),
    views: r.views,
  }));
}
