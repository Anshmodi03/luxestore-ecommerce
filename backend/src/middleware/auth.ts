import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User.model';
import { isDevMode } from '../config/env';

// Lazy-load Firebase admin to avoid initialization errors in dev mode
let adminAuth: import('firebase-admin/auth').Auth | null = null;

async function getAdminAuth() {
  if (!adminAuth) {
    const admin = (await import('../config/firebase')).default;
    adminAuth = admin.auth();
  }
  return adminAuth;
}

// ── JWT verification ──

export async function checkJwt(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (isDevMode) { next(); return; }

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing authorization header' });
    return;
  }

  try {
    const token = authHeader.split(' ')[1];
    const auth = await getAdminAuth();
    const decoded = await auth.verifyIdToken(token);
    (req as any).firebaseToken = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// ── Sync Firebase user to MongoDB ──

async function productionSyncUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { uid, email, name, picture, email_verified, firebase: fbInfo } = (req as any).firebaseToken;

    let user = await User.findOne({ firebaseUid: uid });

    if (!user) {
      const [firstName, ...rest] = (name || 'User').split(' ');
      user = await User.create({
        firebaseUid: uid,
        email: email || `${uid}@placeholder.com`,
        firstName,
        lastName: rest.join(' '),
        avatarUrl: picture,
        provider: fbInfo?.sign_in_provider === 'google.com' ? 'google' : 'email',
        isVerified: email_verified || false,
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

// ── Optional auth — doesn't fail if no token ──

export const optionalAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (isDevMode) {
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
  if (!authHeader?.startsWith('Bearer ')) { next(); return; }

  try {
    const token = authHeader.split(' ')[1];
    const auth = await getAdminAuth();
    const decoded = await auth.verifyIdToken(token);
    (req as any).firebaseToken = decoded;
    await productionSyncUser(req, res, next);
  } catch {
    next();
  }
};

// ── Require admin role ──

export const requireAdmin = (req: Request, res: Response, next: NextFunction): void => {
  const user = (req as any).user;
  if (!user || user.role !== 'admin') {
    res.status(403).json({ error: 'Admin access required' });
    return;
  }
  next();
};
