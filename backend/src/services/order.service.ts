import { Order, IOrder } from '../models/Order.model';
import { Cart } from '../models/Cart.model';
import { Address } from '../models/Address.model';
import { PromoCode } from '../models/PromoCode.model';
import { stripeInstance } from '../config/stripe';
import { env, isStripeConfigured } from '../config/env';
import { generateOrderNumber } from '../utils/orderNumber';
import { AppError } from '../middleware/errorHandler';

const TAX_RATE = 0.18; // 18% GST
const FREE_SHIPPING_THRESHOLD = 5000;
const SHIPPING_COST = 499;

export async function createOrder(userId: string, addressId: string, promoCode?: string) {
  // Get user's cart
  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  // Get shipping address
  const address = await Address.findOne({ _id: addressId, user: userId });
  if (!address) {
    throw new AppError('Address not found', 404);
  }

  // Build order items with price snapshots
  const orderItems = cart.items.map((item: any) => ({
    product: item.product._id,
    name: item.product.name,
    price: item.product.price,
    image: item.product.images?.[0]?.url || '',
    quantity: item.quantity,
  }));

  // Calculate totals server-side
  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  let discount = 0;

  // Apply promo code if provided
  if (promoCode) {
    const promo = await PromoCode.findOne({ code: promoCode.toUpperCase(), isActive: true });
    if (promo) {
      if (promo.expiresAt && promo.expiresAt < new Date()) {
        throw new AppError('Promo code has expired', 400);
      }
      if (promo.maxUses && promo.currentUses >= promo.maxUses) {
        throw new AppError('Promo code usage limit reached', 400);
      }
      if (promo.minOrderValue && subtotal < promo.minOrderValue) {
        throw new AppError(`Minimum order value of ₹${promo.minOrderValue} required`, 400);
      }

      discount = promo.discountType === 'percentage'
        ? Math.round(subtotal * (promo.discountValue / 100))
        : promo.discountValue;

      promo.currentUses += 1;
      await promo.save();
    }
  }

  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + tax + shippingCost;

  const orderNumber = generateOrderNumber();
  let stripePaymentIntentId: string;
  let stripeClientSecret: string;

  if (isStripeConfigured && stripeInstance) {
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: total * 100, // Stripe expects paise (smallest currency unit)
      currency: 'inr',
      metadata: { orderNumber },
    });
    stripePaymentIntentId = paymentIntent.id;
    stripeClientSecret = paymentIntent.client_secret!;
  } else {
    // Dev mode: mock payment
    stripePaymentIntentId = `dev_pi_${orderNumber}`;
    stripeClientSecret = `dev_pi_${orderNumber}_secret_mock`;
  }

  // Create order in database
  const order = await Order.create({
    orderNumber,
    user: userId,
    shippingAddress: {
      firstName: address.firstName,
      lastName: address.lastName,
      street: address.street,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
    },
    items: orderItems,
    subtotal,
    tax,
    shippingCost,
    discount,
    total,
    promoCode: promoCode?.toUpperCase(),
    stripePaymentIntentId,
    stripeClientSecret,
  });

  return {
    order,
    clientSecret: stripeClientSecret,
    paymentIntentId: stripePaymentIntentId,
    amount: total,
    currency: 'inr',
    publishableKey: env.STRIPE_PUBLISHABLE_KEY || 'dev_pk',
  };
}

export async function verifyPayment(
  orderNumber: string,
  paymentIntentId: string,
  userId: string
): Promise<IOrder> {
  const order = await Order.findOne({ orderNumber, user: userId });
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (order.status !== 'pending') {
    throw new AppError('Order is not in pending state', 400);
  }

  if (isStripeConfigured && stripeInstance) {
    // Verify payment status via Stripe API
    const paymentIntent = await stripeInstance.paymentIntents.retrieve(paymentIntentId);
    if (paymentIntent.status !== 'succeeded') {
      throw new AppError('Payment not completed', 400);
    }
  }
  // Dev mode: skip verification, auto-confirm

  order.stripePaymentIntentId = paymentIntentId || `dev_pi_${Date.now()}`;
  order.status = 'confirmed';
  order.paidAt = new Date();
  await order.save();

  // Clear cart after successful payment
  await Cart.findOneAndUpdate({ user: userId }, { items: [] });

  return order;
}

export async function getUserOrders(userId: string, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  const [data, total] = await Promise.all([
    Order.find({ user: userId }).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Order.countDocuments({ user: userId }),
  ]);

  return {
    data,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  };
}

export async function getOrderByNumber(orderNumber: string, userId: string): Promise<IOrder | null> {
  return Order.findOne({ orderNumber, user: userId });
}

export async function cancelOrder(orderNumber: string, userId: string): Promise<IOrder> {
  const order = await Order.findOne({ orderNumber, user: userId });
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  if (!['pending', 'confirmed'].includes(order.status)) {
    throw new AppError('Order cannot be cancelled in its current state', 400);
  }

  order.status = 'cancelled';
  await order.save();
  return order;
}
