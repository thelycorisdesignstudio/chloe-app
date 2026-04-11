import mongoose, { Schema, type InferSchemaType, type Types } from 'mongoose';

// ─── Countries ───────────────────────────────────────────────

const countrySchema = new Schema(
  {
    code: { type: String, required: true, unique: true, maxlength: 10 },
    name: { type: String, required: true, maxlength: 100 },
    currency: { type: String, required: true, maxlength: 10 },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

// ─── Regions ─────────────────────────────────────────────────

const regionSchema = new Schema(
  {
    countryCode: { type: String, required: true, maxlength: 10, index: true },
    name: { type: String, required: true, maxlength: 100 },
    slug: { type: String, required: true, maxlength: 100 },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

regionSchema.index({ countryCode: 1, slug: 1 }, { unique: true });

// ─── Categories ──────────────────────────────────────────────

const categorySchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    slug: { type: String, required: true, unique: true, maxlength: 100 },
    icon: { type: String, default: null },
    description: { type: String, default: null },
    displayOrder: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

// ─── Activities ──────────────────────────────────────────────

const activitySchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 255 },
    slug: { type: String, required: true, unique: true, maxlength: 255 },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category', index: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },
    countryCode: { type: String, required: true, maxlength: 10 },
    region: { type: String, required: true, maxlength: 100 },
    area: { type: String, required: true, maxlength: 100 },
    address: { type: String, required: true },
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    ageMin: { type: Number, required: true, default: 0 },
    ageMax: { type: Number, required: true, default: 12 },
    pricingType: { type: String, required: true, default: 'free', maxlength: 20 },
    adultPrice: { type: Number, default: null },
    childPrice: { type: Number, default: null },
    currency: { type: String, required: true, default: 'AED', maxlength: 10 },
    pricingNotes: { type: String, default: null },
    openDays: { type: [String], required: true, default: [] },
    openTime: { type: String, required: true, default: '09:00', maxlength: 10 },
    closeTime: { type: String, required: true, default: '18:00', maxlength: 10 },
    timingNotes: { type: String, default: null },
    features: { type: [String], required: true, default: [] },
    amenities: { type: [String], required: true, default: [] },
    images: { type: [String], required: true, default: [] },
    rating: { type: Number, required: true, default: 0 },
    reviewCount: { type: Number, required: true, default: 0 },
    isIndoor: { type: Boolean, required: true, default: false },
    isFamilyFriendly: { type: Boolean, required: true, default: true },
    hasParking: { type: Boolean, required: true, default: false },
    isWheelchairAccessible: { type: Boolean, required: true, default: false },
    phone: { type: String, default: null, maxlength: 30 },
    website: { type: String, default: null },
    instagram: { type: String, default: null, maxlength: 100 },
    tags: { type: [String], required: true, default: [] },
    isVerified: { type: Boolean, required: true, default: false },
    isFeatured: { type: Boolean, required: true, default: false },
    isActive: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

activitySchema.index({ isActive: 1, isFeatured: -1, rating: -1 });
activitySchema.index({ countryCode: 1, region: 1 });
activitySchema.index({ isActive: 1, countryCode: 1, rating: -1 });
activitySchema.index(
  { name: 'text', shortDescription: 'text', region: 'text', area: 'text' },
  { weights: { name: 10, shortDescription: 5, region: 3, area: 2 } },
);

// ─── Business Inquiries ──────────────────────────────────────

const businessInquirySchema = new Schema(
  {
    businessName: { type: String, required: true, maxlength: 255 },
    contactPerson: { type: String, required: true, maxlength: 255 },
    email: { type: String, required: true, maxlength: 255 },
    phone: { type: String, default: null, maxlength: 30 },
    businessType: { type: String, required: true, maxlength: 50 },
    emirate: { type: String, required: true, maxlength: 50 },
    message: { type: String, default: null },
    photos: { type: [String], required: true, default: [] },
    status: { type: String, required: true, default: 'pending', maxlength: 20 },
  },
  { timestamps: true },
);

// ─── Favorites ───────────────────────────────────────────────

const favoriteSchema = new Schema(
  {
    userId: { type: String, required: true },
    activityId: { type: Schema.Types.ObjectId, required: true, ref: 'Activity' },
  },
  { timestamps: true },
);

favoriteSchema.index({ userId: 1, activityId: 1 }, { unique: true });
favoriteSchema.index({ userId: 1 });

// ─── Analytics Events ───────────────────────────────────────

const analyticsEventSchema = new Schema(
  {
    eventType: { type: String, required: true, maxlength: 30 },
    activityId: { type: Schema.Types.ObjectId, default: null, ref: 'Activity' },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

analyticsEventSchema.index({ eventType: 1, activityId: 1 });
analyticsEventSchema.index({ activityId: 1 });
analyticsEventSchema.index({ createdAt: 1 });

// ─── Models ──────────────────────────────────────────────────
// Use mongoose.models cache to prevent OverwriteModelError in Next.js hot reload

export const Country =
  (mongoose.models.Country as mongoose.Model<InferSchemaType<typeof countrySchema>>) ||
  mongoose.model('Country', countrySchema);

export const Region =
  (mongoose.models.Region as mongoose.Model<InferSchemaType<typeof regionSchema>>) ||
  mongoose.model('Region', regionSchema);

export const Category =
  (mongoose.models.Category as mongoose.Model<InferSchemaType<typeof categorySchema>>) ||
  mongoose.model('Category', categorySchema);

export const Activity =
  (mongoose.models.Activity as mongoose.Model<InferSchemaType<typeof activitySchema>>) ||
  mongoose.model('Activity', activitySchema);

export const BusinessInquiry =
  (mongoose.models.BusinessInquiry as mongoose.Model<InferSchemaType<typeof businessInquirySchema>>) ||
  mongoose.model('BusinessInquiry', businessInquirySchema);

export const Favorite =
  (mongoose.models.Favorite as mongoose.Model<InferSchemaType<typeof favoriteSchema>>) ||
  mongoose.model('Favorite', favoriteSchema);

export const AnalyticsEvent =
  (mongoose.models.AnalyticsEvent as mongoose.Model<InferSchemaType<typeof analyticsEventSchema>>) ||
  mongoose.model('AnalyticsEvent', analyticsEventSchema);

// ─── TypeScript Types ────────────────────────────────────────
// Plain-object types matching the old Drizzle inferred types so that
// every consumer (queries.ts, explore/page.tsx, API routes) keeps compiling
// without changes.  `_id` is mapped to `id` via a type helper.

type DocToPlain<S extends Schema> = InferSchemaType<S> & {
  _id: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

export type CountryDoc = DocToPlain<typeof countrySchema>;
export type RegionDoc = DocToPlain<typeof regionSchema>;
export type CategoryDoc = DocToPlain<typeof categorySchema>;
export type ActivityDoc = DocToPlain<typeof activitySchema>;
export type BusinessInquiryDoc = DocToPlain<typeof businessInquirySchema>;
export type FavoriteDoc = DocToPlain<typeof favoriteSchema>;
export type AnalyticsEventDoc = DocToPlain<typeof analyticsEventSchema>;

// ─── Lean types (POJO returned by .lean()) ───────────────────
// These replace the old Drizzle inferred types.  The `id` field is a string
// (from _id.toString()) so downstream code that references `activity.id`
// keeps working after we map it in queries.ts.

export type Country = {
  id: string;
  code: string;
  name: string;
  currency: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Region = {
  id: string;
  countryCode: string;
  name: string;
  slug: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  icon: string | null;
  description: string | null;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Activity = {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
  description: string;
  shortDescription: string;
  countryCode: string;
  region: string;
  area: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
  ageMin: number;
  ageMax: number;
  pricingType: string;
  adultPrice: number | null;
  childPrice: number | null;
  currency: string;
  pricingNotes: string | null;
  openDays: string[];
  openTime: string;
  closeTime: string;
  timingNotes: string | null;
  features: string[];
  amenities: string[];
  images: string[];
  rating: number;
  reviewCount: number;
  isIndoor: boolean;
  isFamilyFriendly: boolean;
  hasParking: boolean;
  isWheelchairAccessible: boolean;
  phone: string | null;
  website: string | null;
  instagram: string | null;
  tags: string[];
  isVerified: boolean;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BusinessInquiry = {
  id: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string | null;
  businessType: string;
  emirate: string;
  message: string | null;
  photos: string[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Favorite = {
  id: string;
  userId: string;
  activityId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AnalyticsEvent = {
  id: string;
  eventType: string;
  activityId: string | null;
  metadata: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
};

// Insert types (for seed script compatibility)
export type NewCountry = Omit<Country, 'id' | 'createdAt' | 'updatedAt'>;
export type NewRegion = Omit<Region, 'id' | 'createdAt' | 'updatedAt'>;
export type NewCategory = Omit<Category, 'id' | 'createdAt' | 'updatedAt'>;
export type NewActivity = Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>;
export type NewBusinessInquiry = Omit<BusinessInquiry, 'id' | 'createdAt' | 'updatedAt'>;
