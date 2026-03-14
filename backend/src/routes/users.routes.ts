import { Router } from 'express';
import { checkJwt, syncUser } from '../middleware/auth';
import * as usersController from '../controllers/users.controller';

const router = Router();

// All user routes require authentication
router.use(checkJwt);
router.use(syncUser);

// Addresses
router.get('/me/addresses', usersController.getAddresses);
router.post('/me/addresses', usersController.createAddress);
router.put('/me/addresses/:id', usersController.updateAddress);
router.delete('/me/addresses/:id', usersController.deleteAddress);
router.put('/me/addresses/:id/default', usersController.setDefaultAddress);

export default router;
