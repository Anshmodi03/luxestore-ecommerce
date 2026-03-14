import { Request, Response, NextFunction } from 'express';
import * as orderService from '../services/order.service';

// POST /api/orders
export async function createOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { addressId, promoCode } = req.body;
    const result = await orderService.createOrder(req.user!._id.toString(), addressId, promoCode);
    res.status(201).json({ data: result });
  } catch (error) {
    next(error);
  }
}

// POST /api/orders/:orderNumber/verify-payment
export async function verifyPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const orderNumber = req.params.orderNumber as string;
    const order = await orderService.verifyPayment(
      orderNumber,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      req.user!._id.toString()
    );
    res.json({ data: order, message: 'Payment verified successfully' });
  } catch (error) {
    next(error);
  }
}

// GET /api/orders
export async function listOrders(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const result = await orderService.getUserOrders(req.user!._id.toString(), page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

// GET /api/orders/:orderNumber
export async function getOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const orderNumber = req.params.orderNumber as string;
    const order = await orderService.getOrderByNumber(orderNumber, req.user!._id.toString());
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }
    res.json({ data: order });
  } catch (error) {
    next(error);
  }
}

// POST /api/orders/:orderNumber/cancel
export async function cancelOrder(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const orderNumber = req.params.orderNumber as string;
    const order = await orderService.cancelOrder(orderNumber, req.user!._id.toString());
    res.json({ data: order, message: 'Order cancelled' });
  } catch (error) {
    next(error);
  }
}
