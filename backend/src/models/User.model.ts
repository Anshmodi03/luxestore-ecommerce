import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatarUrl?: string;
  role: 'customer' | 'admin';
  provider: 'auth0' | 'google';
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    auth0Id: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true, unique: true, index: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    avatarUrl: { type: String },
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
    provider: { type: String, enum: ['auth0', 'google'], default: 'auth0' },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
