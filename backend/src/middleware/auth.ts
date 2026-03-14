import { auth } from 'express-oauth2-jwt-bearer';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import { env } from '../config/env';

// Validates the JWT access token from Auth0
export const checkJwt = auth({
  audience: env.AUTH0_AUDIENCE,
  issuerBaseURL: env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: 'RS256',
});

// After JWT check — sync Auth0 user to local MongoDB
export const syncUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const auth0Id = (req as any).auth?.payload?.sub;

    if (!auth0Id) {
      res.status(401).json({ error: 'No user identifier in token' });
      return;
    }

    let user = await User.findOne({ auth0Id });

    if (!user) {
      // First-time login — create local user from token claims
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
};

// Optional auth — doesn't fail if no token, just sets req.user if present
export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
    await syncUser(req, res, next);
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
