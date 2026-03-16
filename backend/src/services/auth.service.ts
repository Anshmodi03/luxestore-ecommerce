import { User, IUser } from '../models/User.model';

export async function findOrCreateUser(firebaseUid: string, profileData?: {
  email?: string;
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
  provider?: 'email' | 'google';
  isVerified?: boolean;
}): Promise<IUser> {
  let user = await User.findOne({ firebaseUid });

  if (!user && profileData) {
    user = await User.create({
      firebaseUid,
      email: profileData.email || `${firebaseUid}@placeholder.com`,
      firstName: profileData.firstName || 'User',
      lastName: profileData.lastName || '',
      avatarUrl: profileData.avatarUrl,
      provider: profileData.provider || 'email',
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
