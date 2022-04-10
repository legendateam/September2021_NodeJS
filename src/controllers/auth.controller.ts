import { NextFunction, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../constants';
import {
    IRequestAuth, IRequestUser, IRoleToken, IUser,
} from '../interfaces';
import { ErrorHandler } from '../error';

class AuthController {
    public async registration(req: IRequestUser, res: Response, next: NextFunction):Promise<Response<IRoleToken> | undefined> {
        try {
            const data = await authService.registration(req.user as IUser);
            if (!data) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.cookie(
                COOKIE.nameRefreshToken,
                data.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.cookie(
                COOKIE.nameAccessToken,
                data.accessToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.json(data);
        } catch (e) {
            next(e);
        }
    }

    public async logout(req: IRequestUser, res: Response, next: NextFunction): Promise<Response<string> | undefined> {
        try {
            const { id } = req.user as IUser;

            res.clearCookie(COOKIE.nameAccessToken);
            res.clearCookie(COOKIE.nameRefreshToken);

            const deleteResult = await tokenService.deleteTokenPair(id);
            if (!deleteResult) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json('OK');
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestUser, res: Response, next: NextFunction):Promise<Response<IRoleToken> | undefined> {
        try {
            const loginData = await authService.newTokens(req.user as IUser);
            if (!loginData) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.cookie(
                COOKIE.nameAccessToken,
                loginData.accessToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.cookie(
                COOKIE.nameRefreshToken,
                loginData.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.json(loginData);
        } catch (e) {
            next(e);
        }
    }

    public async refresh(req: IRequestAuth, res: Response, next: NextFunction):Promise<Response<IRoleToken> | undefined> {
        try {
            const refresh = await authService.newTokens(req.user as IUser);
            if (!refresh) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.clearCookie(COOKIE.nameAccessToken);
            res.clearCookie(COOKIE.nameAccessToken);
            res.cookie(
                COOKIE.nameAccessToken,
                refresh.accessToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.cookie(
                COOKIE.nameRefreshToken,
                refresh.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.json(refresh);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthController();
