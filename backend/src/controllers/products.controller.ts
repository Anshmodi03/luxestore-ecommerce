import { Request, Response, NextFunction } from 'express';
import * as productService from '../services/product.service';
import { Review } from '../models/Review.model';
import { Product } from '../models/Product.model';

// GET /api/products
export async function listProducts(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await productService.getProducts({
      category: req.query.category as string | undefined,
      search: req.query.search as string | undefined,
      sort: req.query.sort as any,
      page: req.query.page ? Number(req.query.page) : 1,
      limit: req.query.limit ? Number(req.query.limit) : 20,
    });
    res.json(result);
  } catch (error) {
    next(error);
  }
}

// GET /api/products/featured
export async function getFeatured(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const products = await productService.getFeaturedProducts();
    res.json({ data: products });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:slug
export async function getProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = req.params.slug as string;
    const product = await productService.getProductBySlug(slug);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

// GET /api/products/:slug/reviews
export async function getProductReviews(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = req.params.slug as string;
    const product = await Product.findOne({ slug });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    const [reviews, total] = await Promise.all([
      Review.find({ product: product._id })
        .populate('user', 'firstName lastName avatarUrl')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Review.countDocuments({ product: product._id }),
    ]);

    res.json({
      data: reviews,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
  } catch (error) {
    next(error);
  }
}

// POST /api/products/:slug/reviews
export async function createReview(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = req.params.slug as string;
    const product = await Product.findOne({ slug });
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    const { rating, title, text } = req.body;
    const review = await Review.create({
      product: product._id,
      user: req.user!._id,
      rating,
      title,
      text,
      isVerified: true,
    });

    // Update product rating stats
    const stats = await Review.aggregate([
      { $match: { product: product._id } },
      { $group: { _id: null, avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);

    if (stats.length > 0) {
      product.rating = Math.round(stats[0].avgRating * 10) / 10;
      product.reviewCount = stats[0].count;
      await product.save();
    }

    res.status(201).json({ data: review });
  } catch (error) {
    next(error);
  }
}

// POST /api/products (admin)
export async function createProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json({ data: product });
  } catch (error) {
    next(error);
  }
}

// PUT /api/products/:slug (admin)
export async function updateProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = req.params.slug as string;
    const product = await productService.updateProduct(slug, req.body);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ data: product });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/products/:slug (admin)
export async function deleteProduct(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const slug = req.params.slug as string;
    const product = await productService.deleteProduct(slug);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    next(error);
  }
}
