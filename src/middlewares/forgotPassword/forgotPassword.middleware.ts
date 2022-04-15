import { NextFunction, Response } from 'express';
import { emailSchema, passwordSchema } from '../../helpers';
import { ErrorHandler } from '../../error';
import { IRequestForgotPassword, IVerifyTokens } from '../../interfaces';
import { tokenService, userService } from '../../services';
import { JwtEnum } from '../../enums';

class ForgotPasswordMiddleware {
    public isEmailValidator(req: IRequestForgotPassword, _: Response, next: NextFunction): void {
        try {
            const { email } = req.body;

            const { error, value } = emailSchema.validate({ email });

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.forgotPassword = { email: value.email };

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkToken(req: IRequestForgotPassword, _: Response, next: NextFunction): Promise<Partial<IVerifyTokens> | undefined> {
        try {
            const token = req.authorization as string;

            const { userId, email } = await tokenService.verifyTokens(token, JwtEnum.forgot);

            if (!userId || !email) {
                next(new ErrorHandler('oops, some wrong'));
                return;
            }

            const foundToken = await tokenService.findForgotPasswordToken({ userId });

            if (!foundToken) {
                next(new ErrorHandler('oops, some wrong'));
                return;
            }

            req.forgotPassword = { ...req.forgotPassword, id: userId, email };

            next();
        } catch (e) {
            next(e);
        }
    }

    public async existedToken(req: IRequestForgotPassword, _: Response, next: NextFunction): Promise<Partial<IVerifyTokens> | undefined> {
        try {
            const userId = req.forgotPassword?.id;

            const foundToken = await tokenService.findForgotPasswordToken({ userId });

            if (foundToken) {
                const deleteResult = await tokenService.deleteForgotPasswordToken({ userId });

                if (!deleteResult) {
                    next(new ErrorHandler('oops some worng', 501));
                    return;
                }
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUserExists(req: IRequestForgotPassword, _: Response, next:NextFunction): Promise<void | undefined> {
        try {
            const email = req.forgotPassword?.email as string;

            const user = await userService.getOneByEmailOrPhone(email);

            if (!user) {
                next(new ErrorHandler('oops, some wrong'));
                return;
            }

            req.forgotPassword = { ...req.forgotPassword, id: user.id };

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isPasswordValidator(req: IRequestForgotPassword, _: Response, next:NextFunction): Promise<void | undefined> {
        try {
            const { password } = req.body;

            const { error, value } = await passwordSchema.validate({ password });

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.forgotPassword = { password: value.password };

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const forgotPasswordMiddleware = new ForgotPasswordMiddleware();
