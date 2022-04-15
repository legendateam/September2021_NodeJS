import { Router } from 'express';

import { forgotPasswordController } from '../controllers';
import { authMiddleware, forgotPasswordMiddleware } from '../middlewares';

export const forgotPasswordRouter = Router();

forgotPasswordRouter.post(
    '/',
    forgotPasswordMiddleware.isEmailValidator,
    forgotPasswordMiddleware.isUserExists,
    forgotPasswordMiddleware.existedToken,
    forgotPasswordController.forgotPassword,
);
forgotPasswordRouter.patch(
    '/',
    authMiddleware.authorization,
    forgotPasswordMiddleware.isPasswordValidator,
    forgotPasswordMiddleware.checkToken,
    forgotPasswordController.changePassword,
);
