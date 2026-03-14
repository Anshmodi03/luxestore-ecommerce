import { Product, IProduct } from '../models/Product.model';
import { ProductQueryFilters, PaginatedResponse } from '../types';

export async function getProducts(filters: ProductQueryFilters): Promise<PaginatedResponse<IProduct>> {
  const { category, search, sort, page = 1, limit = 20, isTrending, isNew, isFeatured } = filters;

  const query: Record<string, any> = {};

  if (category) query.category = category;
  if (isTrending !== undefined) query.isTrending = isTrending;
  if (isNew !== undefined) query.isNewArrival = isNew;
  if (isFeatured !== undefined) query.isFeatured = isFeatured;
  if (search) {
    query.$text = { $search: search };
  }

  let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
  switch (sort) {
    case 'price-asc':
      sortOption = { price: 1 };
      break;
    case 'price-desc':
      sortOption = { price: -1 };
      break;
    case 'newest':
      sortOption = { createdAt: -1 };
      break;
    case 'popular':
      sortOption = { reviewCount: -1, rating: -1 };
      break;
  }

  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Product.find(query).sort(sortOption).skip(skip).limit(limit),
    Product.countDocuments(query),
  ]);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getFeaturedProducts(): Promise<IProduct[]> {
  return Product.find({
    $or: [{ isTrending: true }, { isFeatured: true }, { isPopular: true }],
  }).limit(12);
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  return Product.findOne({ slug });
}

export async function createProduct(data: Partial<IProduct>): Promise<IProduct> {
  return Product.create(data);
}

export async function updateProduct(slug: string, data: Partial<IProduct>): Promise<IProduct | null> {
  return Product.findOneAndUpdate({ slug }, data, { new: true, runValidators: true });
}

export async function deleteProduct(slug: string): Promise<IProduct | null> {
  return Product.findOneAndDelete({ slug });
}
