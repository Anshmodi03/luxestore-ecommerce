import mongoose from 'mongoose';
import { env } from './env';

// Cache connection across serverless invocations
const cache = (global as any).__mongoose ?? ((global as any).__mongoose = { conn: null, promise: null });

export async function connectDatabase(): Promise<typeof mongoose> {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    cache.promise = mongoose.connect(env.MONGODB_URI).then((m) => {
      console.log('✅ MongoDB connected successfully');
      m.connection.on('error', (err) => console.error('MongoDB error:', err));
      return m;
    });
  }

  try {
    cache.conn = await cache.promise;
  } catch (error) {
    cache.promise = null;
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }

  return cache.conn;
}
