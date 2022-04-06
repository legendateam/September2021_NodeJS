import { Response, NextFunction } from 'express';

import { IRequestUser, IUsers } from '../interfaces';
import { userService } from '../services';

export const userSignInMiddleware = (req:IRequestUser, res:Response, next:NextFunction) => {
    try {
        const user = req.user as IUsers;
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
};
