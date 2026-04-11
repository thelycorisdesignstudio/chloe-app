import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

// Cache the MongoClient on globalThis to prevent connection leaks
// during Next.js hot reloads in development.
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientAuth?: MongoClient;
};

const client =
  globalWithMongo._mongoClientAuth ?? new MongoClient(MONGODB_URI);

if (!globalWithMongo._mongoClientAuth) {
  globalWithMongo._mongoClientAuth = client;
}

const db = client.db();

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
});
