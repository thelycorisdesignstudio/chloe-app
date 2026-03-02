import { NextRequest, NextResponse } from 'next/server';
import { getStripe, PLANS } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { plan } = await request.json();

    if (!plan || !(plan in PLANS)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    const selectedPlan = PLANS[plan as keyof typeof PLANS];
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'aed',
            product_data: {
              name: `Chloe ${selectedPlan.name} Plan`,
              description: selectedPlan.features.join(', '),
            },
            unit_amount: selectedPlan.priceAed * 100,
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${appUrl}/forbusiness?status=success`,
      cancel_url: `${appUrl}/forbusiness?status=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
