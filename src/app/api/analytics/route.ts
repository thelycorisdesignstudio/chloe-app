import { NextRequest, NextResponse } from 'next/server';
import { trackEvent, getActivityStats } from '@/lib/db/queries';

const VALID_EVENT_TYPES = ['view', 'click', 'share', 'favorite', 'search'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, activityId, metadata } = body;

    if (!eventType || typeof eventType !== 'string') {
      return NextResponse.json({ error: 'eventType is required' }, { status: 400 });
    }

    if (!VALID_EVENT_TYPES.includes(eventType)) {
      return NextResponse.json(
        { error: `Invalid eventType. Must be one of: ${VALID_EVENT_TYPES.join(', ')}` },
        { status: 400 }
      );
    }

    if (activityId !== undefined && typeof activityId !== 'string') {
      return NextResponse.json({ error: 'activityId must be a string' }, { status: 400 });
    }

    await trackEvent(eventType, activityId, metadata);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error tracking analytics event:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const activityId = request.nextUrl.searchParams.get('activityId');

    if (!activityId) {
      return NextResponse.json({ error: 'activityId query parameter is required' }, { status: 400 });
    }

    const stats = await getActivityStats(activityId);

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching analytics stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
