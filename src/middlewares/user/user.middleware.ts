import { NextFunction, Response } from 'express';

import { userRepository } from '../../repositories';
import { IRequestUser, IUser } from '../../interfaces';
import { userService } from '../../services';
import { authLoginSchema, authSchema, userPatchSchema } from '../../helpers';

class UserMiddleware {
    public async validatorRegistration(req:IRequestUser, res:Response, next:NextFunction): Promise<void> {
        try {
            const userValid = await authSchema.validateAsync(req.body);

            req.user = userValid;

            next();
        } catch (e) {
            if (e) {
                res.json({
                    status: 400,
                    err: (e as Error).message,
                });
            }
        }
    }

    public async patchFields(req:IRequestUser, res:Response, next:NextFunction):Promise<void> {
        try {
            req.user = await userPatchSchema.validateAsync(req.body);
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

    public async checkUniqueFieldsValue(req:IRequestUser, res:Response, next:NextFunction):Promise<void> {
        try {
            const { email, phone } = req.user as IUser;
            const user = await userRepository.getOneByEmailOrByPhone(email, phone);

            if (user) {
                throw new Error('user already exists or data is invalid');
            }
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
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

            const checkedPassword = userService.checkPassword(password, user.password);

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
