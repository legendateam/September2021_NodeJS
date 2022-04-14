import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../configs';
import { emailService, userService } from '../services';
import { EmailEnum } from '../enums';
import { IRequestForgotPassword } from '../interfaces';
import { ErrorHandler } from '../error';

class ForgotPasswordController {
    public async forgotPassword(req: IRequestForgotPassword, res:Response, next:NextFunction): Promise<void> {
        try {
            const email = req.forgotPassword?.email as string;

            const code = jwt.sign(
                { email },
                config.SECRET_FORGOT_PASSWORD_KEY as string,
                { expiresIn: config.EXPIRES_IN_ACCESS },
            );

            await emailService.sendEmail(email, EmailEnum.FORGOT_PASSWORD, { code });

            res.json('email sent');
        } catch (e) {
            next(e);
        }
    }

    public pageForgotPassword(req: IRequestForgotPassword, res:Response, next:NextFunction): void {
        try {
            const code = req.forgotPassword?.code as string;

            res.render('pageForgotPassword', { code });
        } catch (e) {
            next(e);
        }
    }

    public async gettingNewPassword(req: IRequestForgotPassword, res:Response, next:NextFunction): Promise<void> {
        try {
            const id = req.forgotPassword?.id as number;
            const password = req.forgotPassword?.password as string;

            const updateResult = await userService.forgotPassword(id, password);

            if (!updateResult) {
                next(new ErrorHandler('Oops some wrong'));
                return;
            }

            res.json('password changed');
        } catch (e) {
            next(e);
        }
    }
}

export const forgotPasswordController = new ForgotPasswordController();
