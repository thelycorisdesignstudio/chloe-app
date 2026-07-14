import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import { Favorite } from '@/lib/db/schema';
import { headers } from 'next/headers';
import mongoose from 'mongoose';

export async function GET() {
  if (!process.env.MONGODB_URI || !process.env.BETTER_AUTH_SECRET) {
    return NextResponse.json(
      { error: 'Authentication is not configured.' },
      { status: 503 },
    );
  }

  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const userFavorites = await Favorite
    .find({ userId: session.user.id })
    .lean()
    .exec();

  return NextResponse.json(userFavorites.map((f) => f.activityId.toString()));
}

export async function POST(request: NextRequest) {
  if (!process.env.MONGODB_URI || !process.env.BETTER_AUTH_SECRET) {
    return NextResponse.json(
      { error: 'Authentication is not configured.' },
      { status: 503 },
    );
  }

  const session = await getAuth().api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { activityId } = await request.json();
  if (!activityId || !mongoose.isValidObjectId(activityId)) {
    return NextResponse.json({ error: 'activityId is required' }, { status: 400 });
  }

  await connectDB();

  // Atomic toggle: attempt to delete first. If a document was deleted,
  // the user unfavorited. If nothing was deleted, insert a new favorite.
  // The unique index on { userId, activityId } prevents duplicates under
  // concurrent requests.
  const deleted = await Favorite.findOneAndDelete({
    userId: session.user.id,
    activityId,
  }).exec();

  if (deleted) {
    return NextResponse.json({ favorited: false });
  }

  try {
    await Favorite.create({
      userId: session.user.id,
      activityId,
    });
    return NextResponse.json({ favorited: true });
  } catch (err: unknown) {
    // If two concurrent requests both try to create, the unique index
    // causes one to fail with duplicate key error — treat as already favorited.
    if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
      return NextResponse.json({ favorited: true });
    }
    throw err;
  }
}
