import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { connectDB } from '@/lib/db';
import { BusinessInquiry } from '@/lib/db/schema';
import mongoose from 'mongoose';

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  try {
    const event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const inquiryId = session.client_reference_id ?? session.metadata?.inquiryId;
        if (inquiryId && mongoose.isValidObjectId(inquiryId)) {
          await connectDB();
          await BusinessInquiry.updateOne(
            { _id: inquiryId },
            {
              status: 'paid',
              plan: session.metadata?.plan ?? null,
              stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
              stripeSubscriptionId:
                typeof session.subscription === 'string' ? session.subscription : null,
            },
          );
        } else {
          console.warn('checkout.session.completed without a valid inquiry reference:', session.id);
        }
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        await connectDB();
        await BusinessInquiry.updateOne(
          { stripeSubscriptionId: subscription.id },
          { status: 'cancelled' },
        );
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }
}
