import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

// Global cache to prevent connection leaks during Next.js hot reloads
// in development.  In production the module-level cache is sufficient.
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const globalWithMongoose = globalThis as typeof globalThis & {
  _mongoose?: MongooseCache;
};

const cached: MongooseCache = globalWithMongoose._mongoose ?? {
  conn: null,
  promise: null,
};

if (!globalWithMongoose._mongoose) {
  globalWithMongoose._mongoose = cached;
}

export async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  return cached.conn;
}
