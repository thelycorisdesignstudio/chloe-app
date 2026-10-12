import { NextRequest, NextResponse } from 'next/server';
import { getRegionStats } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  const countryCode = request.nextUrl.searchParams.get('countryCode') ?? 'UAE';

  try {
    const data = await getRegionStats(countryCode);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching region stats:', error);
    return NextResponse.json({ error: 'Failed to fetch region stats' }, { status: 500 });
  }
}
