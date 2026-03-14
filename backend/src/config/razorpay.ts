import Razorpay from 'razorpay';
import { env, isRazorpayConfigured } from './env';

export const razorpayInstance: Razorpay | null = isRazorpayConfigured
  ? new Razorpay({
      key_id: env.RAZORPAY_KEY_ID!,
      key_secret: env.RAZORPAY_KEY_SECRET!,
    })
  : null;
