import { Router } from 'express';
import { checkJwt, syncUser, requireAdmin } from '../middleware/auth';
import * as productsController from '../controllers/products.controller';

const router = Router();

// Public routes
router.get('/', productsController.listProducts);
router.get('/featured', productsController.getFeatured);
router.get('/:slug', productsController.getProduct);
router.get('/:slug/reviews', productsController.getProductReviews);

// Authenticated routes
router.post('/:slug/reviews', checkJwt, syncUser, productsController.createReview);

// Admin routes
router.post('/', checkJwt, syncUser, requireAdmin, productsController.createProduct);
router.put('/:slug', checkJwt, syncUser, requireAdmin, productsController.updateProduct);
router.delete('/:slug', checkJwt, syncUser, requireAdmin, productsController.deleteProduct);

export default router;
