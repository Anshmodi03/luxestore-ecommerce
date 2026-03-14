import { Schema, model, Document } from 'mongoose';

interface IProductImage {
  url: string;
  altText?: string;
  sortOrder: number;
}

interface IProductFeature {
  icon: string;
  title: string;
  subtitle: string;
  sortOrder: number;
}

interface IProductSpec {
  category: string;
  title: string;
  description: string;
}

export interface IProduct extends Document {
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: string;
  badge?: string;
  badgeClass?: string;
  isNewArrival: boolean;
  isTrending: boolean;
  isPopular: boolean;
  isFeatured: boolean;
  stock: number;
  rating: number;
  reviewCount: number;
  images: IProductImage[];
  features: IProductFeature[];
  specs: IProductSpec[];
  createdAt: Date;
  updatedAt: Date;
}

const productImageSchema = new Schema<IProductImage>(
  {
    url: { type: String, required: true },
    altText: { type: String },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const productFeatureSchema = new Schema<IProductFeature>(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    sortOrder: { type: Number, default: 0 },
  },
  { _id: false }
);

const productSpecSchema = new Schema<IProductSpec>(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

const productSchema = new Schema<IProduct>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number },
    category: { type: String, required: true, index: true },
    badge: { type: String },
    badgeClass: { type: String },
    isNewArrival: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isPopular: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    images: [productImageSchema],
    features: [productFeatureSchema],
    specs: [productSpecSchema],
  },
  { timestamps: true }
);

productSchema.index({ isTrending: 1, isPopular: 1, isNewArrival: 1 });
productSchema.index({ name: 'text', description: 'text' });

export const Product = model<IProduct>('Product', productSchema);
