import { NextFunction, Response } from 'express';

import { userRepository } from '../../repositories';
import { IRequestUser, IUser } from '../../interfaces';
import { userService } from '../../services';
import { authLoginSchema, authSchema, userPatchSchema } from '../../helpers';
import { ErrorHandler } from '../../error';

class UserMiddleware {
    public async validatorRegistration(req:IRequestUser, _:Response, next:NextFunction): Promise<void> {
        try {
            const { error, value } = authSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async patchFields(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { error, value } = await userPatchSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler('Incorrect values or not all fields'));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public validatorLogin(req: IRequestUser, _: Response, next: NextFunction): void {
        try {
            const { error, value } = authLoginSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler('Incorrect values or not all fields'));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUniqueEmailAndPhone(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { email, phone } = req.user as IUser;
            const user = await userRepository.getOneByEmailOrByPhone(email, phone);

            if (user) {
                next(new ErrorHandler('Data is invalid or User already exists'));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserByEmail(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { email } = req.user as IUser;
            const user = await userRepository.getOneByEmailOrByPhone(email);

            if (!user) {
                next(new ErrorHandler('user already exists or data is invalid'));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async signIn(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const user = req.user as IUser;
            const { password } = req.body;

            const checkedPassword = await userService.checkPassword(password, user.password);

            if (!checkedPassword) {
                next(new ErrorHandler('Wrong email or password'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
