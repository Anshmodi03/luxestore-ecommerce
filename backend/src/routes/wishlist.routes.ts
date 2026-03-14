import { Router } from 'express';
import { checkJwt, syncUser } from '../middleware/auth';
import * as wishlistController from '../controllers/wishlist.controller';

const router = Router();

// All wishlist routes require authentication
router.use(checkJwt);
router.use(syncUser);

router.get('/', wishlistController.getWishlist);
router.post('/', wishlistController.addToWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);

export default router;
