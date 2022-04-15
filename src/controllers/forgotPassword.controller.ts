import { NextFunction, Response } from 'express';

import { emailService, tokenService, userService } from '../services';
import { EmailEnum } from '../enums';
import { IRequestForgotPassword } from '../interfaces';
import { ErrorHandler } from '../error';

class ForgotPasswordController {
    public async forgotPassword(req: IRequestForgotPassword, res:Response, next:NextFunction): Promise<void> {
        try {
            const email = req.forgotPassword?.email as string;
            const id = req.forgotPassword?.id as number;

            const { forgotToken } = await tokenService.generateForgotToken({ userId: id, email });

            if (!forgotToken) {
                next(new ErrorHandler('oops some wrong', 501));
                return;
            }

            const tokenSaved = await tokenService.saveForgotPasswordToken({ userId: id, token: forgotToken });

            if (!tokenSaved) {
                next(new ErrorHandler('oops some wrong', 501));
                return;
            }

            await emailService.sendEmail(email, EmailEnum.FORGOT_PASSWORD, { code: forgotToken });

            res.json({
                message: 'OK',
                forgotToken,
            });
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

    public async changePassword(req: IRequestForgotPassword, res:Response, next:NextFunction): Promise<void> {
        try {
            const id = req.forgotPassword?.id as number;
            const password = req.forgotPassword?.password as string;
            const email = req.forgotPassword?.email as string;

            const updateResult = await userService.forgotPassword(id, password);

            if (!updateResult) {
                next(new ErrorHandler('Oops some wrong'));
                return;
            }

            await tokenService.deleteForgotPasswordToken({ userId: id });
            await emailService.sendEmail(email, EmailEnum.CHANGED_PASSWORD, {});

            res.json('password changed');
        } catch (e) {
            next(e);
        }
    }
}

export const forgotPasswordController = new ForgotPasswordController();
