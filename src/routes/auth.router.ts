import { Router } from 'express';

import { authController } from '../controllers';
import {
    userRegisteredMiddleware,
    userFieldsFilledMiddleware,
    userTypeMiddleware,
    authLogoutMiddleware,
    userFieldsLoginMiddleware,
    userTypeLoginMiddleware,
    tokenPairMiddleware,
    userSignInMiddleware, userExistsMiddleware, authorizationMiddleware,
} from '../middlewares';

export const authRouter = Router();

authRouter.post('/registration', userFieldsFilledMiddleware, userTypeMiddleware, userRegisteredMiddleware, authController.registration);
authRouter.post(
    '/login',
    userFieldsLoginMiddleware,
    userTypeLoginMiddleware,
    userExistsMiddleware,
    userSignInMiddleware,
    authController.login,
);
authRouter.post('/logout', authorizationMiddleware, authLogoutMiddleware, authController.logout);
authRouter.post('/refresh', authorizationMiddleware, tokenPairMiddleware, authController.refresh);
