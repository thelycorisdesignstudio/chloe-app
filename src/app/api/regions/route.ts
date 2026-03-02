import { NextRequest, NextResponse } from 'next/server';
import { getRegions } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  const countryCode = request.nextUrl.searchParams.get('countryCode') ?? undefined;

  try {
    const data = await getRegions(countryCode);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching regions:', error);
    return NextResponse.json({ error: 'Failed to fetch regions' }, { status: 500 });
  }
}
