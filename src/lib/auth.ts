import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { MongoClient } from 'mongodb';

// Cache the MongoClient on globalThis to prevent connection leaks
// during Next.js hot reloads in development.
const globalWithMongo = globalThis as typeof globalThis & {
  _mongoClientAuth?: MongoClient;
};

function buildAuth(client: MongoClient, authSecret: string) {
  return betterAuth({
    secret: authSecret,
    database: mongodbAdapter(client.db(), { client }),
    emailAndPassword: {
      enabled: true,
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
  });
}

let authInstance: ReturnType<typeof buildAuth> | null = null;

export function getAuth() {
  if (authInstance) return authInstance;

  const mongoUri = process.env.MONGODB_URI;
  const authSecret = process.env.BETTER_AUTH_SECRET;

  if (!mongoUri || !authSecret) {
    throw new Error(
      'Please define MONGODB_URI and BETTER_AUTH_SECRET inside .env.local',
    );
  }

  const client =
    globalWithMongo._mongoClientAuth ?? new MongoClient(mongoUri);

  if (!globalWithMongo._mongoClientAuth) {
    globalWithMongo._mongoClientAuth = client;
  }

  const instance = buildAuth(client, authSecret);

  authInstance = instance;
  return instance;
}
