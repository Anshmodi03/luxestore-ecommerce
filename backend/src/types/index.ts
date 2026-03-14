import { Document, Types } from 'mongoose';

// Extend Express Request to include authenticated user
declare global {
  namespace Express {
    interface Request {
      user?: import('../models/User.model').IUser;
    }
  }
}

// API response types
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiResponse<T = any> {
  data?: T;
  error?: string;
  message?: string;
}

// Product query filters
export interface ProductQueryFilters {
  category?: string;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
  isTrending?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

// Cart item for add/update operations
export interface CartItemInput {
  productId: string;
  quantity: number;
}

// Order creation input
export interface CreateOrderInput {
  addressId: string;
  promoCode?: string;
}

// Razorpay payment verification
export interface PaymentVerification {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}
