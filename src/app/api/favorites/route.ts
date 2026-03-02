import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { favorites } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import { headers } from 'next/headers';

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userFavorites = await db
    .select()
    .from(favorites)
    .where(eq(favorites.userId, session.user.id));

  return NextResponse.json(userFavorites.map(f => f.activityId));
}

export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { activityId } = await request.json();
  if (!activityId) {
    return NextResponse.json({ error: 'activityId is required' }, { status: 400 });
  }

  const existing = await db
    .select()
    .from(favorites)
    .where(
      and(eq(favorites.userId, session.user.id), eq(favorites.activityId, activityId))
    );

  if (existing.length > 0) {
    await db
      .delete(favorites)
      .where(
        and(eq(favorites.userId, session.user.id), eq(favorites.activityId, activityId))
      );
    return NextResponse.json({ favorited: false });
  } else {
    await db.insert(favorites).values({
      userId: session.user.id,
      activityId,
    });
    return NextResponse.json({ favorited: true });
  }
}
