import { Cart, ICart } from '../models/Cart.model';
import { Types } from 'mongoose';

export async function getCart(userId: string): Promise<ICart | null> {
  return Cart.findOne({ user: userId }).populate('items.product');
}

export async function addToCart(userId: string, productId: string, quantity: number): Promise<ICart> {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({
      user: userId,
      items: [{ product: new Types.ObjectId(productId), quantity }],
    });
  } else {
    const existingItem = cart.items.find(
      (item: any) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: new Types.ObjectId(productId), quantity } as any);
    }

    await cart.save();
  }

  return cart.populate('items.product');
}

export async function updateCartItem(userId: string, itemId: string, quantity: number): Promise<ICart | null> {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  const item = (cart.items as any).id(itemId);
  if (!item) return null;

  item.quantity = quantity;
  await cart.save();

  return cart.populate('items.product');
}

export async function removeFromCart(userId: string, itemId: string): Promise<ICart | null> {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) return null;

  (cart.items as any).pull({ _id: itemId });
  await cart.save();

  return cart.populate('items.product');
}

export async function clearCart(userId: string): Promise<void> {
  await Cart.findOneAndUpdate({ user: userId }, { items: [] });
}
