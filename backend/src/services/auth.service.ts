import { User, IUser } from '../models/User.model';

export async function findOrCreateUser(auth0Id: string, profileData?: {
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  provider?: 'auth0' | 'google';
  isVerified?: boolean;
}): Promise<IUser> {
  let user = await User.findOne({ auth0Id });

  if (!user && profileData) {
    user = await User.create({
      auth0Id,
      email: profileData.email || `${auth0Id}@placeholder.com`,
      firstName: profileData.firstName || 'User',
      lastName: profileData.lastName || '',
      avatarUrl: profileData.avatarUrl,
      provider: profileData.provider || 'auth0',
      isVerified: profileData.isVerified || false,
    });
  }

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

export async function updateUserProfile(
  userId: string,
  updates: { firstName?: string; lastName?: string; phone?: string; avatarUrl?: string }
): Promise<IUser | null> {
  return User.findByIdAndUpdate(userId, updates, { new: true, runValidators: true });
}

export async function deleteUser(userId: string): Promise<void> {
  await User.findByIdAndDelete(userId);
}
