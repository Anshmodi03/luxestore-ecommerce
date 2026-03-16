import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  firebaseUid: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'customer' | 'admin';
  provider: 'email' | 'google';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    firebaseUid: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    avatarUrl: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    provider: { type: String, enum: ['email', 'google'], default: 'email' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
