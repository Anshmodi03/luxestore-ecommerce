import { Request, Response, NextFunction } from 'express';
import * as cartService from '../services/cart.service';

// GET /api/cart
export async function getCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const cart = await cartService.getCart(req.user!._id.toString());
    res.json({ data: cart });
  } catch (error) {
    next(error);
  }
}

// POST /api/cart/items
export async function addItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { productId, quantity } = req.body;
    const cart = await cartService.addToCart(req.user!._id.toString(), productId, quantity || 1);
    res.status(201).json({ data: cart });
  } catch (error) {
    next(error);
  }
}

// PUT /api/cart/items/:itemId
export async function updateItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { quantity } = req.body;
    const itemId = req.params.itemId as string;
    const cart = await cartService.updateCartItem(req.user!._id.toString(), itemId, quantity);
    if (!cart) {
      res.status(404).json({ error: 'Cart item not found' });
      return;
    }
    res.json({ data: cart });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/cart/items/:itemId
export async function removeItem(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const itemId = req.params.itemId as string;
    const cart = await cartService.removeFromCart(req.user!._id.toString(), itemId);
    if (!cart) {
      res.status(404).json({ error: 'Cart item not found' });
      return;
    }
    res.json({ data: cart });
  } catch (error) {
    next(error);
  }
}

// DELETE /api/cart
export async function clearCart(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    await cartService.clearCart(req.user!._id.toString());
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
}
