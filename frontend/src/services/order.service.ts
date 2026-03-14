import api from './api';

export interface CreateOrderInput {
  addressId: string;
  promoCode?: string;
}

export interface OrderResponse {
  order: any;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export async function createOrder(input: CreateOrderInput): Promise<OrderResponse> {
  const { data } = await api.post('/orders', input);
  return data.data;
}

export async function verifyPayment(orderNumber: string, paymentData: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) {
  const { data } = await api.post(`/orders/${orderNumber}/verify-payment`, paymentData);
  return data.data;
}

export async function getOrders(page = 1, limit = 10) {
  const { data } = await api.get('/orders', { params: { page, limit } });
  return data;
}

export async function getOrder(orderNumber: string) {
  const { data } = await api.get(`/orders/${orderNumber}`);
  return data.data;
}

export async function cancelOrder(orderNumber: string) {
  const { data } = await api.post(`/orders/${orderNumber}/cancel`);
  return data.data;
}
