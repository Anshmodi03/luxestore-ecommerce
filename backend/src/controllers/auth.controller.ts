import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

// GET /api/auth/me — get current authenticated user
export async function getMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    res.json({ data: req.user });
  } catch (error) {
    next(error);
  }
}

// PUT /api/auth/me — update current user profile
export async function updateMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { firstName, lastName, phone, avatarUrl } = req.body;
    const user = await authService.updateUserProfile(req.user!._id.toString(), {
      firstName,
      lastName,
      phone,
      avatarUrl,
    });
    res.json({ data: user });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/auth/me — delete current user account
export async function deleteMe(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await authService.deleteUser(req.user!._id.toString());
    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
}
