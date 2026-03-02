import Stripe from 'stripe';

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set');
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    });
  }
  return _stripe;
}

export const PLANS = {
  professional: {
    name: 'Professional',
    priceAed: 299,
    features: [
      'Priority listing in search results',
      'Detailed analytics dashboard',
      'Photo gallery (up to 20 photos)',
      'Respond to parent reviews',
      'Monthly performance reports',
    ],
  },
  premium: {
    name: 'Premium',
    priceAed: 599,
    features: [
      'Everything in Professional',
      'Featured badge on listing',
      'Top placement in category',
      'Unlimited photos',
      'Dedicated account manager',
      'Social media promotion',
    ],
  },
} as const;
