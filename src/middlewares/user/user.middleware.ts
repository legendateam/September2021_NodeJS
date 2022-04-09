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
                next(new ErrorHandler('Data is invalid or User already exists'));
                return;
            }
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async patchFields(req:IRequestUser, res:Response, next:NextFunction):Promise<void> {
        try {
            const { error, value } = await userPatchSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler('Incorrect values or not all fields'));
            }
            req.user = value;
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async validatorLogin(req: IRequestUser, res: Response, next: NextFunction):Promise<void> {
        try {
            const userValidate = await authLoginSchema.validateAsync(req.body);
            req.user = userValidate;
            next();
        } catch (e) {
            res.json({
                status: 400,
                error: (e as Error).message,
            });
        }
    }

    public async checkUniqueFieldsValue(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
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

    public async checkUserByEmail(req:IRequestUser, res:Response, next:NextFunction):Promise<void> {
        try {
            const { email } = req.user as IUser;
            const user = await userRepository.getOneByEmailOrByPhone(email);

            if (!user) {
                throw new Error('user already exists or data is invalid');
            }

            req.user = user;
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async signIn(req:IRequestUser, res:Response, next:NextFunction):Promise<void> {
        try {
            const user = req.user as IUser;
            const { password } = req.body;

            const checkedPassword = await userService.checkPassword(password, user.password);

            if (!checkedPassword) {
                throw new Error('Wrong email or password');
            }

            next();
        } catch (e) {
            res.json({
                status: 400,
                err: (e as Error).message,
            });
        }
    }
}

export const userMiddleware = new UserMiddleware();
