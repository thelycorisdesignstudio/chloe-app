import { NextResponse } from 'next/server';
import { getCountries } from '@/lib/db/queries';

export async function GET() {
  try {
    const data = await getCountries();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    return NextResponse.json({ error: 'Failed to fetch countries' }, { status: 500 });
  }
}
