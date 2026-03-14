import { Router } from 'express';
import { checkJwt, syncUser } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimiter';
import * as authController from '../controllers/auth.controller';

const router = Router();

// All auth routes require JWT + user sync
router.use(authLimiter);
router.use(checkJwt);
router.use(syncUser);

router.get('/me', authController.getMe);
router.put('/me', authController.updateMe);
router.delete('/me', authController.deleteMe);

export default router;
