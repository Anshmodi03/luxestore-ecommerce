import { z } from 'zod/v4';
import dotenv from 'dotenv';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(5000),
  FRONTEND_URL: z.string().url().default('http://localhost:5173'),
  MONGODB_URI: z.string().min(1, 'MONGODB_URI is required'),
  AUTH0_ISSUER_BASE_URL: z.string().url().optional(),
  AUTH0_AUDIENCE: z.string().min(1).optional(),
  AUTH0_CLIENT_ID: z.string().min(1).optional(),
  AUTH0_CLIENT_SECRET: z.string().min(1).optional(),
  RAZORPAY_KEY_ID: z.string().min(1).optional(),
  RAZORPAY_KEY_SECRET: z.string().min(1).optional(),
  RAZORPAY_WEBHOOK_SECRET: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:');
  console.error(JSON.stringify(parsed.error.format(), null, 2));
  process.exit(1);
}

export const env = parsed.data;

export const isDevMode = !env.AUTH0_ISSUER_BASE_URL;
export const isRazorpayConfigured = !!(env.RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET);

if (isDevMode) {
  console.warn('⚠️  Running in DEV MODE — Auth0 disabled, using mock authentication');
  console.warn('   Use X-Dev-User-Id header to authenticate as any user');
}
if (!isRazorpayConfigured) {
  console.warn('⚠️  Razorpay not configured — using mock payments');
}
