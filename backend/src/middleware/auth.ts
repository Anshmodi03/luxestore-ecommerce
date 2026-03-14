import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import { env, isDevMode } from '../config/env';

// ── Production Auth0 middleware ──

function createCheckJwt() {
  if (isDevMode) return (_req: Request, _res: Response, next: NextFunction) => next();
  return auth({
    audience: env.AUTH0_AUDIENCE!,
    issuerBaseURL: env.AUTH0_ISSUER_BASE_URL!,
    tokenSigningAlg: 'RS256',
  });
}

export const checkJwt = createCheckJwt();

// ── Sync user to MongoDB after auth ──

async function productionSyncUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const auth0Id = (req as any).auth?.payload?.sub;

    if (!auth0Id) {
      res.status(401).json({ error: 'No user identifier in token' });
      return;
    }

    let user = await User.findOne({ auth0Id });

    if (!user) {
      const payload = (req as any).auth.payload;
      user = await User.create({
        auth0Id,
        email: payload.email || `${auth0Id}@placeholder.com`,
        firstName: payload.given_name || 'User',
        lastName: payload.family_name || '',
        avatarUrl: payload.picture,
        provider: auth0Id.startsWith('google') ? 'google' : 'auth0',
        isVerified: payload.email_verified || false,
      });
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
}

async function devSyncUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const devUserId = req.headers['x-dev-user-id'] as string;
    let user;

    if (devUserId) {
      user = await User.findById(devUserId);
    } else {
      // Default to admin user for convenience
      user = await User.findOne({ role: 'admin' });
    }

    if (!user) {
      res.status(401).json({ error: 'No dev user found. Run: npm run seed' });
      return;
    }

    (req as any).user = user;
    next();
  } catch (error) {
    next(error);
  }
}

export const syncUser = isDevMode ? devSyncUser : productionSyncUser;

// Optional auth — doesn't fail if no token, just sets req.user if present
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (isDevMode) {
    // In dev mode, try to load user from header but don't fail
    const devUserId = req.headers['x-dev-user-id'] as string;
    if (devUserId) {
      try {
        const user = await User.findById(devUserId);
        if (user) (req as any).user = user;
      } catch { /* ignore */ }
    }
    next();
    return;
  }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    next();
    return;
  }

  try {
    await new Promise<void>((resolve, reject) => {
      checkJwt(req, res, (err: any) => {
        if (err) {
          resolve(); // Silently continue without auth
        } else {
          resolve();
        }
      });
    });
    await productionSyncUser(req, res, next);
  } catch {
    next();
  }
};

// Require admin role
export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;
  if (!user || user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
};
