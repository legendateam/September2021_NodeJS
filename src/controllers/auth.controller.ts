import { Request, Response } from 'express';

import { authService } from '../services/auth/auth.service';
import { IRoleToken } from '../interfaces/role.interface';
import { COOKIE } from '../constans/cookie/cookie.constant';

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
}

export const authController = new AuthController();
