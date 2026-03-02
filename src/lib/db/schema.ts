import {
  pgTable,
  uuid,
  text,
  integer,
  boolean,
  real,
  timestamp,
  serial,
  varchar,
  jsonb,
  index,
} from 'drizzle-orm/pg-core';

// ─── Countries ───────────────────────────────────────────────

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 10 }).notNull().unique(),
  name: varchar('name', { length: 100 }).notNull(),
  currency: varchar('currency', { length: 10 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
});

// ─── Regions ─────────────────────────────────────────────────

export const regions = pgTable('regions', {
  id: serial('id').primaryKey(),
  countryCode: varchar('country_code', { length: 10 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull(),
  isActive: boolean('is_active').notNull().default(true),
});

// ─── Categories ──────────────────────────────────────────────

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  icon: text('icon'),
  description: text('description'),
  displayOrder: integer('display_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
});

// ─── Activities ──────────────────────────────────────────────

export const activities = pgTable('activities', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  categoryId: integer('category_id').notNull(),
  description: text('description').notNull(),
  shortDescription: text('short_description').notNull(),
  countryCode: varchar('country_code', { length: 10 }).notNull(),
  region: varchar('region', { length: 100 }).notNull(),
  area: varchar('area', { length: 100 }).notNull(),
  address: text('address').notNull(),
  latitude: real('latitude'),
  longitude: real('longitude'),
  ageMin: integer('age_min').notNull().default(0),
  ageMax: integer('age_max').notNull().default(12),
  pricingType: varchar('pricing_type', { length: 20 }).notNull().default('free'),
  adultPrice: real('adult_price'),
  childPrice: real('child_price'),
  currency: varchar('currency', { length: 10 }).notNull().default('AED'),
  pricingNotes: text('pricing_notes'),
  openDays: jsonb('open_days').$type<string[]>().notNull().default([]),
  openTime: varchar('open_time', { length: 10 }).notNull().default('09:00'),
  closeTime: varchar('close_time', { length: 10 }).notNull().default('18:00'),
  timingNotes: text('timing_notes'),
  features: jsonb('features').$type<string[]>().notNull().default([]),
  amenities: jsonb('amenities').$type<string[]>().notNull().default([]),
  images: jsonb('images').$type<string[]>().notNull().default([]),
  rating: real('rating').notNull().default(0),
  reviewCount: integer('review_count').notNull().default(0),
  isIndoor: boolean('is_indoor').notNull().default(false),
  isFamilyFriendly: boolean('is_family_friendly').notNull().default(true),
  hasParking: boolean('has_parking').notNull().default(false),
  isWheelchairAccessible: boolean('is_wheelchair_accessible').notNull().default(false),
  phone: varchar('phone', { length: 30 }),
  website: text('website'),
  instagram: varchar('instagram', { length: 100 }),
  tags: jsonb('tags').$type<string[]>().notNull().default([]),
  isVerified: boolean('is_verified').notNull().default(false),
  isFeatured: boolean('is_featured').notNull().default(false),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// ─── Business Inquiries ──────────────────────────────────────

export const businessInquiries = pgTable('business_inquiries', {
  id: uuid('id').primaryKey().defaultRandom(),
  businessName: varchar('business_name', { length: 255 }).notNull(),
  contactPerson: varchar('contact_person', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 30 }),
  businessType: varchar('business_type', { length: 50 }).notNull(),
  emirate: varchar('emirate', { length: 50 }).notNull(),
  message: text('message'),
  photos: jsonb('photos').$type<string[]>().notNull().default([]),
  status: varchar('status', { length: 20 }).notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Favorites ───────────────────────────────────────────────

export const favorites = pgTable('favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id').notNull(),
  activityId: uuid('activity_id').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Analytics Events ───────────────────────────────────────

export const analyticsEvents = pgTable('analytics_events', {
  id: uuid('id').primaryKey().defaultRandom(),
  eventType: varchar('event_type', { length: 30 }).notNull(), // 'view', 'click', 'share', 'favorite', 'search'
  activityId: uuid('activity_id'), // nullable - not all events have an activity
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// ─── Auth Tables (better-auth) ──────────────────────────────

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
  },
  (table) => [index('session_userId_idx').on(table.userId)],
);

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [index('account_userId_idx').on(table.userId)],
);

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [index('verification_identifier_idx').on(table.identifier)],
);

// ─── Inferred Types ──────────────────────────────────────────

export type Country = typeof countries.$inferSelect;
export type Region = typeof regions.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Activity = typeof activities.$inferSelect;
export type BusinessInquiry = typeof businessInquiries.$inferSelect;
export type Favorite = typeof favorites.$inferSelect;
export type AnalyticsEvent = typeof analyticsEvents.$inferSelect;

export type NewCountry = typeof countries.$inferInsert;
export type NewRegion = typeof regions.$inferInsert;
export type NewCategory = typeof categories.$inferInsert;
export type NewActivity = typeof activities.$inferInsert;
export type NewBusinessInquiry = typeof businessInquiries.$inferInsert;
