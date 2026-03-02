import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { businessInquiries } from '@/lib/db/schema';
import { z } from 'zod';

const inquirySchema = z.object({
  businessName: z.string().min(2, 'Business name is required'),
  contactPerson: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  businessType: z.string().min(1, 'Business type is required'),
  emirate: z.string().min(1, 'Emirate is required'),
  message: z.string().optional(),
  photos: z.array(z.string().min(1)).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = inquirySchema.parse(body);

    const result = await db
      .insert(businessInquiries)
      .values({
        ...validated,
        photos: validated.photos ?? [],
      })
      .returning();

    return NextResponse.json({ success: true, id: result[0].id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Business inquiry error:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}
