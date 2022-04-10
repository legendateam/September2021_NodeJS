import { NextFunction, Response } from 'express';

import { IRequestAuth } from '../../interfaces';
import { userRepository } from '../../repositories';
import { constants } from '../../constants';
import { tokenService } from '../../services';
import { JwtEnum } from '../../enums';
import { authTokenSchema } from '../../helpers';
import { ErrorHandler } from '../../error';

class AuthMiddleware {
    public authorization(req: IRequestAuth, _:Response, next:NextFunction): void {
        try {
            const authorization = req.get(constants.AUTHORIZATION);
            const { error, value } = authTokenSchema.validate({ authorization });

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.authorization = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isUserFromDB(req: IRequestAuth, _: Response, next:NextFunction): Promise<void> {
        try {
            const userFromToken = await userRepository.getOne(req.userId as number);

            if (!userFromToken) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.user = userFromToken;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isAccessToken(req:IRequestAuth, _:Response, next:NextFunction): Promise<void> {
        try {
            const { userId } = await tokenService.verifyTokens(req.authorization as string);
            const tokens = await tokenService.findToken(userId);

            if (tokens?.accessToken !== req.authorization) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.userId = userId;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async isRefreshToken(req:IRequestAuth, _:Response, next:NextFunction): Promise<void> {
        try {
            const { userId } = await tokenService.verifyTokens(req.authorization as string, JwtEnum.refresh);
            const tokens = await tokenService.findToken(userId);

            if (tokens?.refreshToken !== req.authorization) {
                next(new ErrorHandler('Wrong Token', 401));
                return;
            }

            req.userId = userId;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
