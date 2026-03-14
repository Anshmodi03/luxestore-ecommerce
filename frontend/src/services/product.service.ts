import api from './api';

export interface Product {
  _id: string;
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
  images: { url: string; altText?: string; sortOrder: number }[];
  features: { icon: string; title: string; subtitle: string; sortOrder: number }[];
  specs: { category: string; title: string; description: string }[];
}

export interface ProductsResponse {
  data: Product[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ProductFilters {
  category?: string;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
  page?: number;
  limit?: number;
}

export async function getProducts(filters?: ProductFilters): Promise<ProductsResponse> {
  const { data } = await api.get('/products', { params: filters });
  return data;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data } = await api.get('/products/featured');
  return data.data;
}

export async function getProduct(slug: string): Promise<Product> {
  const { data } = await api.get(`/products/${slug}`);
  return data.data;
}

export async function getProductReviews(slug: string, page = 1, limit = 10) {
  const { data } = await api.get(`/products/${slug}/reviews`, { params: { page, limit } });
  return data;
}

export async function submitReview(slug: string, review: { rating: number; title?: string; text: string }) {
  const { data } = await api.post(`/products/${slug}/reviews`, review);
  return data.data;
}
