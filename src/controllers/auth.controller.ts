import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../constans';
import {
    IRequestAuth, IRequestUser, IRoleToken, IUsers,
} from '../interfaces';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<IRoleToken>> {
        const data = await authService.registration(req.body);
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
        return res.json(data);
    }

    public async logout(req: IRequestUser, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUsers;

        res.clearCookie(COOKIE.nameAccessToken);
        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteTokenPair(id);
        return res.json('OK');
    }

    public async login(req: IRequestUser, res: Response):Promise<Response<IRoleToken>> {
        const loginData = await authService.newTokens(req.user as IUsers);
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
        return res.json(loginData);
    }

    public async refresh(req: IRequestAuth, res: Response) {
        const refresh = await authService.newTokens(req.user as IUsers);
        res.clearCookie(COOKIE.nameAccessToken);
        res.clearCookie(COOKIE.nameAccessToken);
        res.cookie(
            COOKIE.nameRefreshToken,
            'a',
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        res.cookie(
            COOKIE.nameRefreshToken,
            'a',
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(refresh);
    }
}

export const authController = new AuthController();
