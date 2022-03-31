import { Router } from 'express';

import { authController } from '../controllers/auth.controller';
import { userRegisteredMiddleware } from '../middlewares/userRegistered.middleware';
import { userFieldsFilledMiddleware } from '../middlewares/userFieldsFilled.middleware';
import { userTypeMiddleware } from '../middlewares/userType.middleware';

export const authRouter = Router();

authRouter.post('/registration', userFieldsFilledMiddleware, userTypeMiddleware, userRegisteredMiddleware, authController.registration);
