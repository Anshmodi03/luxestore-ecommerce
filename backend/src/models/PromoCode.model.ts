import { Schema, model, Document } from 'mongoose';

export interface IPromoCode extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue?: number;
  maxUses?: number;
  currentUses: number;
  expiresAt?: Date;
  isActive: boolean;
  createdAt: Date;
}

const promoCodeSchema = new Schema<IPromoCode>(
  {
    code: { type: String, required: true, unique: true, index: true, uppercase: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
    discountValue: { type: Number, required: true },
    minOrderValue: { type: Number },
    maxUses: { type: Number },
    currentUses: { type: Number, default: 0 },
    expiresAt: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const PromoCode = model<IPromoCode>('PromoCode', promoCodeSchema);
