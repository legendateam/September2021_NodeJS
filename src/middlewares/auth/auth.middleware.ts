import { NextFunction, Response } from 'express';

import { IRequestAuth } from '../../interfaces';
import { userRepository } from '../../repositories';
import { constants } from '../../constants';
import { tokenService } from '../../services';
import { JwtEnum } from '../../enums';
import { authTokenSchema } from '../../helpers';

class AuthMiddleware {
    public async authorization(req: IRequestAuth, res:Response, next:NextFunction) {
        try {
            const authorization = req.get(constants.AUTHORIZATION);
            await authTokenSchema.validateAsync({ authorization });

            req.authorization = authorization;
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async isUserFromDB(req: IRequestAuth, res: Response, next:NextFunction) {
        try {
            const userFromToken = await userRepository.getOne(req.userId as number);

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
    }

    public async isAccessToken(req:IRequestAuth, res:Response, next:NextFunction) {
        try {
            const { userId } = await tokenService.verifyTokens(req.authorization as string);
            const tokens = await tokenService.findToken(userId);

            if (tokens?.accessToken !== req.authorization) {
                throw new Error('Wrong Token');
            }

            req.userId = userId;

            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async isRefreshToken(req:IRequestAuth, res:Response, next:NextFunction) {
        try {
            const { userId } = await tokenService.verifyTokens(req.authorization as string, JwtEnum.refresh);
            const tokens = await tokenService.findToken(userId);

            if (tokens?.refreshToken !== req.authorization) {
                throw new Error('Wrong Token');
            }

            req.userId = userId;

            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
