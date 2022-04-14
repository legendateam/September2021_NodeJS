import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { emailSchema, passwordSchema } from '../../helpers';
import { ErrorHandler } from '../../error';
import { IRequestForgotPassword } from '../../interfaces';
import { config } from '../../configs';
import { userService } from '../../services';

class ForgotPasswordMiddleware {
    public isEmail(req: IRequestForgotPassword, _: Response, next: NextFunction): void {
        try {
            const { email } = req.body;

            const { error, value } = emailSchema.validate({ email });

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.forgotPassword = { ...req.forgotPassword, email: value.email };

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkCode(req: IRequestForgotPassword, _: Response, next: NextFunction): void {
        try {
            const { code } = req.params;

            interface IVerifyEmail {
                email: string
            }

            const { email } = jwt.verify(code, config.SECRET_FORGOT_PASSWORD_KEY as string) as IVerifyEmail;

            if (!email) {
                next(new ErrorHandler('oops, some wrong'));
                return;
            }

            req.forgotPassword = { ...req.forgotPassword, code, email };

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUserExists(req: IRequestForgotPassword, _: Response, next:NextFunction): Promise<void | undefined> {
        try {
            const email = req.forgotPassword?.email as string;

            const { newPassword, confirmPassword } = req.body;

            if (newPassword !== confirmPassword) {
                next(new ErrorHandler('oops, some wrong'));
                return;
            }

            const { error, value } = passwordSchema.validate({ password: newPassword });

            if (error) {
                next(new ErrorHandler('ooop, some wrong'));
                return;
            }

            const user = await userService.getOneByEmailOrPhone(email);

            if (!user) {
                next(new ErrorHandler('oops, some wrong'));
                return;
            }

            const { id } = user;

            req.forgotPassword = { ...req.forgotPassword, id, password: value.password };

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const forgotPasswordMiddleware = new ForgotPasswordMiddleware();
