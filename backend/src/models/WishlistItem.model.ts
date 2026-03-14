import { Schema, model, Document, Types } from 'mongoose';

export interface IWishlistItem extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  createdAt: Date;
}

const wishlistSchema = new Schema<IWishlistItem>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  },
  { timestamps: true }
);

wishlistSchema.index({ user: 1, product: 1 }, { unique: true });

export const WishlistItem = model<IWishlistItem>('WishlistItem', wishlistSchema);
