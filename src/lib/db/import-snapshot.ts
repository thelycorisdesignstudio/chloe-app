import mongoose from 'mongoose';
import snapshot from '../data/live-snapshot.json';
import { Country, Region, Category, Activity } from './schema';

// Imports the venue snapshot (countries, regions, categories, activities)
// into whatever database MONGODB_URI points at. Safe to re-run: every
// record is upserted by its natural key (code / slug).
//
//   MONGODB_URI=... npx tsx src/lib/db/import-snapshot.ts
async function run() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }
  await mongoose.connect(uri);

  for (const c of snapshot.countries) {
    await Country.updateOne({ code: c.code }, { $set: c }, { upsert: true });
  }
  for (const r of snapshot.regions) {
    await Region.updateOne(
      { countryCode: r.countryCode, slug: r.slug },
      { $set: r },
      { upsert: true },
    );
  }

  const categoryIds = new Map<string, mongoose.Types.ObjectId>();
  for (const c of snapshot.categories) {
    const doc = await Category.findOneAndUpdate(
      { slug: c.slug },
      { $set: c },
      { upsert: true, returnDocument: 'after' },
    );
    categoryIds.set(c.slug, doc._id);
  }

  for (const { categorySlug, ...a } of snapshot.activities) {
    await Activity.updateOne(
      { slug: a.slug },
      { $set: { ...a, categoryId: categoryIds.get(categorySlug) } },
      { upsert: true },
    );
  }

  console.log(
    `Imported ${snapshot.countries.length} countries, ${snapshot.regions.length} regions, ` +
      `${snapshot.categories.length} categories, ${snapshot.activities.length} activities.`,
  );
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
