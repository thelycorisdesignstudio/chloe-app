import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
import {
  countries as countryData,
  regionsByCountry,
  categories as categoryNames,
} from '../data/activities';

async function seed() {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error('DATABASE_URL is not set');
    process.exit(1);
  }

  const sql = neon(databaseUrl);
  const db = drizzle(sql, { schema });

  console.log('Seeding database...');

  // 1. Seed countries
  console.log('Seeding countries...');
  for (const country of countryData) {
    await db
      .insert(schema.countries)
      .values({
        code: country.code,
        name: country.name,
        currency: country.currency,
        isActive: true,
      })
      .onConflictDoNothing();
  }

  // 2. Seed regions
  console.log('Seeding regions...');
  for (const [countryCode, regionList] of Object.entries(regionsByCountry)) {
    for (const regionName of regionList) {
      if (regionName === 'All Regions') continue;
      await db
        .insert(schema.regions)
        .values({
          countryCode,
          name: regionName,
          slug: regionName.toLowerCase().replace(/\s+/g, '-'),
          isActive: true,
        })
        .onConflictDoNothing();
    }
  }

  // 3. Seed categories
  console.log('Seeding categories...');
  for (let i = 0; i < categoryNames.length; i++) {
    if (categoryNames[i] === 'All') continue;
    await db
      .insert(schema.categories)
      .values({
        name: categoryNames[i],
        slug: categoryNames[i].toLowerCase().replace(/[&\s]+/g, '-'),
        displayOrder: i,
        isActive: true,
      })
      .onConflictDoNothing();
  }

  // 4. Seed activities from local data (132 curated + 400+ generated)
  console.log('Seeding activities...');
  const { allActivities: activityData } = await import('../data/activities');

  // Build a category name → id mapping
  const dbCategories = await db.select().from(schema.categories);
  const categoryMap = new Map<string, number>();
  for (const cat of dbCategories) {
    categoryMap.set(cat.name, cat.id);
  }

  for (const activity of activityData) {
    const categoryId = categoryMap.get(activity.category) ?? 1;

    await db
      .insert(schema.activities)
      .values({
        name: activity.name,
        slug: activity.id,
        categoryId,
        description: activity.description,
        shortDescription: activity.shortDescription,
        countryCode: activity.location.country,
        region: activity.location.region,
        area: activity.location.area,
        address: activity.location.address,
        ageMin: activity.ageRange.min,
        ageMax: activity.ageRange.max,
        pricingType: activity.pricing.type,
        adultPrice: activity.pricing.adultPrice ?? null,
        childPrice: activity.pricing.childPrice ?? null,
        currency: activity.pricing.currency,
        pricingNotes: activity.pricing.notes ?? null,
        openDays: activity.timing.openDays,
        openTime: activity.timing.openTime,
        closeTime: activity.timing.closeTime,
        timingNotes: activity.timing.notes ?? null,
        features: activity.features,
        amenities: activity.amenities,
        images: activity.images,
        rating: activity.rating,
        reviewCount: activity.reviewCount,
        isIndoor: activity.isIndoor,
        isFamilyFriendly: activity.isFamilyFriendly,
        hasParking: activity.hasParking,
        isWheelchairAccessible: activity.isWheelchairAccessible,
        phone: activity.contact?.phone ?? null,
        website: activity.contact?.website ?? null,
        instagram: activity.contact?.instagram ?? null,
        tags: activity.tags,
        isVerified: true,
        isFeatured: activity.rating >= 4.7,
        isActive: true,
      })
      .onConflictDoNothing();
  }

  console.log('Seed complete!');
}

seed().catch(console.error);
