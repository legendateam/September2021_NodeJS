import { Router } from 'express';

import { forgotPasswordController } from '../controllers';
import { forgotPasswordMiddleware } from '../middlewares';

export const forgotPasswordRouter = Router();

forgotPasswordRouter.post('/', forgotPasswordMiddleware.isEmail, forgotPasswordController.forgotPassword);
forgotPasswordRouter.get('/:code', forgotPasswordMiddleware.checkCode, forgotPasswordController.pageForgotPassword);
forgotPasswordRouter.post(
    '/:code',
    forgotPasswordMiddleware.checkCode,
    forgotPasswordMiddleware.isUserExists,
    forgotPasswordController.gettingNewPassword,
);
