import { Router } from 'express';

import { authController } from '../controllers';
import {
    userRegisteredMiddleware, userFieldsFilledMiddleware, userTypeMiddleware, authLogoutMiddleware,
} from '../middlewares';

export const authRouter = Router();

authRouter.post('/registration', userFieldsFilledMiddleware, userTypeMiddleware, userRegisteredMiddleware, authController.registration);
authRouter.post('/logout', authLogoutMiddleware, authController.logout);
