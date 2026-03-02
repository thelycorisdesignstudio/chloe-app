import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';

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
        // TODO: Update business inquiry status to 'paid' based on session metadata
        console.log('Payment completed for session:', session.id);
        break;
      }
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        // TODO: Handle subscription cancellation
        console.log('Subscription cancelled:', subscription.id);
        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook verification failed' }, { status: 400 });
  }
}
