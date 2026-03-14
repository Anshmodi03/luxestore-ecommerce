import { Request, Response, NextFunction } from 'express';
import { WishlistItem } from '../models/WishlistItem.model';

// GET /api/wishlist
export async function getWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const items = await WishlistItem.find({ user: req.user!._id }).populate('product');
    res.json({ data: items });
  } catch (error) {
    next(error);
  }
}

// POST /api/wishlist
export async function addToWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { productId } = req.body;
    const item = await WishlistItem.create({ user: req.user!._id, product: productId });
    res.status(201).json({ data: item });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/wishlist/:productId
export async function removeFromWishlist(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const result = await WishlistItem.findOneAndDelete({
      user: req.user!._id,
      product: req.params.productId,
    });
    if (!result) {
      res.status(404).json({ error: 'Wishlist item not found' });
      return;
    }
    res.json({ message: 'Removed from wishlist' });
  } catch (error) {
    next(error);
  }
}
