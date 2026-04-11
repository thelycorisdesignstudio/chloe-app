import mongoose from 'mongoose';
import {
  Country,
  Region,
  Category,
  Activity,
} from './schema';
import {
  countries as countryData,
  regionsByCountry,
  categories as categoryNames,
} from '../data/activities';

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB. Seeding database...');

  // 1. Seed countries
  console.log('Seeding countries...');
  for (const country of countryData) {
    await Country.updateOne(
      { code: country.code },
      {
        $setOnInsert: {
          code: country.code,
          name: country.name,
          currency: country.currency,
          isActive: true,
        },
      },
      { upsert: true },
    );
  }

  // 2. Seed regions
  console.log('Seeding regions...');
  for (const [countryCode, regionList] of Object.entries(regionsByCountry)) {
    for (const regionName of regionList) {
      if (regionName === 'All Regions') continue;
      const slug = regionName.toLowerCase().replace(/\s+/g, '-');
      await Region.updateOne(
        { countryCode, slug },
        {
          $setOnInsert: {
            countryCode,
            name: regionName,
            slug,
            isActive: true,
          },
        },
        { upsert: true },
      );
    }
  }

  // 3. Seed categories
  console.log('Seeding categories...');
  for (let i = 0; i < categoryNames.length; i++) {
    if (categoryNames[i] === 'All') continue;
    const slug = categoryNames[i].toLowerCase().replace(/[&\s]+/g, '-');
    await Category.updateOne(
      { slug },
      {
        $setOnInsert: {
          name: categoryNames[i],
          slug,
          displayOrder: i,
          isActive: true,
        },
      },
      { upsert: true },
    );
  }

  // 4. Seed activities from local data (132 curated venues)
  console.log('Seeding activities...');
  const { allActivities: activityData } = await import('../data/activities');

  // Build a category name → ObjectId mapping
  const dbCategories = await Category.find().lean().exec();
  const categoryMap = new Map<string, mongoose.Types.ObjectId>();
  for (const cat of dbCategories) {
    categoryMap.set(cat.name, cat._id);
  }

  // Fallback categoryId: first category in the DB
  const fallbackCategoryId = dbCategories[0]?._id;

  for (const activity of activityData) {
    const categoryId = categoryMap.get(activity.category) ?? fallbackCategoryId;
    if (!categoryId) {
      console.warn(`Skipping "${activity.name}" — no category found for "${activity.category}"`);
      continue;
    }

    await Activity.updateOne(
      { slug: activity.id },
      {
        $setOnInsert: {
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
        },
      },
      { upsert: true },
    );
  }

  console.log('Seed complete!');
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
