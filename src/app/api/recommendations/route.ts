import { NextRequest, NextResponse } from 'next/server';
import { getRecommendations } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  const activityId = request.nextUrl.searchParams.get('activityId');

  if (!activityId) {
    return NextResponse.json(
      { error: 'activityId query parameter is required' },
      { status: 400 }
    );
  }

  try {
    const recommendations = await getRecommendations(activityId);
    return NextResponse.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recommendations' },
      { status: 500 }
    );
  }
}
