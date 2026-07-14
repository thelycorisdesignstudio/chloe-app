import { NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

function unavailable() {
  return NextResponse.json(
    { error: 'Authentication is not configured. Set MongoDB and Better Auth environment variables.' },
    { status: 503 },
  );
}

async function handle(request: Request) {
  if (!process.env.MONGODB_URI || !process.env.BETTER_AUTH_SECRET) {
    return unavailable();
  }

  const handler = toNextJsHandler(getAuth());
  return handler[request.method as keyof typeof handler](request);
}

export const GET = handle;
export const POST = handle;
export const PATCH = handle;
export const PUT = handle;
export const DELETE = handle;
