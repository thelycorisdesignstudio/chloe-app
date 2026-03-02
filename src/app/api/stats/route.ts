import { NextResponse } from 'next/server';
import { getStats } from '@/lib/db/queries';

export async function GET() {
  try {
    const data = await getStats();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
