import { Router } from 'express';
import { checkJwt, syncUser } from '../middleware/auth';
import * as cartController from '../controllers/cart.controller';

const router = Router();

// All cart routes require authentication
router.use(checkJwt);
router.use(syncUser);

router.get('/', cartController.getCart);
router.post('/items', cartController.addItem);
router.put('/items/:itemId', cartController.updateItem);
router.delete('/items/:itemId', cartController.removeItem);
router.delete('/', cartController.clearCart);

export default router;
