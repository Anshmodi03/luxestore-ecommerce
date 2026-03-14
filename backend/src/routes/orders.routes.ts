import { Router } from 'express';
import { checkJwt, syncUser } from '../middleware/auth';
import { orderLimiter } from '../middleware/rateLimiter';
import * as ordersController from '../controllers/orders.controller';

const router = Router();

// All order routes require authentication
router.use(checkJwt);
router.use(syncUser);
router.use(orderLimiter);

router.post('/', ordersController.createOrder);
router.post('/:orderNumber/verify-payment', ordersController.verifyPayment);
router.get('/', ordersController.listOrders);
router.get('/:orderNumber', ordersController.getOrder);
router.post('/:orderNumber/cancel', ordersController.cancelOrder);

export default router;
