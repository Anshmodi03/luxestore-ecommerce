import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { connectDatabase } from './config/database';
import { generalLimiter } from './middleware/rateLimiter';
import { errorHandler } from './middleware/errorHandler';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/products.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/orders.routes';
import wishlistRoutes from './routes/wishlist.routes';
import userRoutes from './routes/users.routes';

const app = express();

// Security middleware
app.use(helmet());

const allowedOrigins: (string | RegExp)[] = [
  env.FRONTEND_URL,
  /https:\/\/luxestore.*\.vercel\.app$/,
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    const allowed = allowedOrigins.some(o =>
      typeof o === 'string' ? o === origin : o.test(origin)
    );
    callback(allowed ? null : new Error('CORS blocked'), allowed);
  },
  credentials: true,
}));

app.use(generalLimiter);

// Body parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/users', userRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Connect DB per-request (cached after first success — safe for serverless)
app.use(async (_req, _res, next) => {
  try {
    await connectDatabase();
    next();
  } catch (err) {
    next(err);
  }
});

export default app;
