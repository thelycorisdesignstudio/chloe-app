import { NextRequest, NextResponse } from 'next/server';
import { getActivities } from '@/lib/db/queries';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const filters = {
    country: searchParams.get('country') ?? undefined,
    region: searchParams.get('region') ?? undefined,
    category: searchParams.get('category') ?? undefined,
    ageMin: searchParams.get('ageMin') ? parseInt(searchParams.get('ageMin')!) : undefined,
    ageMax: searchParams.get('ageMax') ? parseInt(searchParams.get('ageMax')!) : undefined,
    isIndoor: searchParams.get('isIndoor') === 'true' ? true : undefined,
    isFree: searchParams.get('isFree') === 'true' ? true : undefined,
    search: searchParams.get('search') ?? undefined,
    sortBy: (searchParams.get('sortBy') as 'rating' | 'reviews' | 'name') ?? undefined,
    limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined,
    offset: searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined,
  };

  try {
    const data = await getActivities(filters);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}
