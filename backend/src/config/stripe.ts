import Stripe from 'stripe';
import { env, isStripeConfigured } from './env';

export const stripeInstance: Stripe | null = isStripeConfigured
  ? new Stripe(env.STRIPE_SECRET_KEY!, { apiVersion: '2026-02-25.clover' })
  : null;
