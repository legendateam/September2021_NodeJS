import { Response, NextFunction } from 'express';

import { tokenService } from '../services';
import { userRepository } from '../repositories';
import { IRequestUser } from '../interfaces';

const authLogoutMiddleware = async (req: IRequestUser, res: Response, next: NextFunction) => {
    try {
        const authorization = req.get('Authorization');

        if (!authorization) {
            throw new Error('No token');
        }

        const { userId } = await tokenService.verifyToken(authorization);
        const userFromToken = await userRepository.getOne(userId);

        if (!userFromToken) {
            throw new Error('Wrong Token');
        }

        req.user = userFromToken;

        next();
    } catch (e) {
        res.json({
            status: 400,
            error: (e as Error).message,
        });
    }
};

export { authLogoutMiddleware };
