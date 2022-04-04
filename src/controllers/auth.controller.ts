import { Request, Response } from 'express';

import { authService, tokenService } from '../services';
import { COOKIE } from '../constans';
import { IRequestUser, IRoleToken, IUsers } from '../interfaces';

class AuthController {
    public async registration(req: Request, res: Response):Promise<Response<IRoleToken>> {
        const data = await authService.registration(req.body);
        res.cookie(
            COOKIE.nameRefreshToken,
            data.refreshToken,
            { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
        );
        return res.json(data);
    }

    public async logout(req: IRequestUser, res: Response): Promise<Response<string>> {
        const { id } = req.user as IUsers;

        res.clearCookie(COOKIE.nameRefreshToken);

        await tokenService.deleteTokenPair(id);
        return res.json('OK');
    }
}

export const authController = new AuthController();
