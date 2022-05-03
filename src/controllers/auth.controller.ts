import {NextFunction, Response} from 'express';

import {UploadedFile} from 'express-fileupload';
import {authService, emailService, s3Service, tokenService,} from '../services';
import {COOKIE, responseMessageConstant} from '../constants';
import {IAuthControllerAbstraction, IRequestAuth, IRequestUser, IRoleToken, IUser,} from '../interfaces';
import {ErrorHandler} from '../error';
import {EmailEnum, ResponseEnum, UploadFileEnum} from '../enums';

class AuthController implements IAuthControllerAbstraction {
    public async registration(req: IRequestUser, res: Response, next: NextFunction):Promise<void> {
        try {
            const user = req.user as IUser;
            const tokenPairData = await authService.registration(user);

            if (!tokenPairData) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.cookie(
                COOKIE.nameRefreshToken,
                tokenPairData.refreshToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );
            res.cookie(
                COOKIE.nameAccessToken,
                tokenPairData.accessToken,
                { maxAge: COOKIE.maxAgeRefreshToken, httpOnly: true },
            );

            if (req.files?.avatar) {
                const avatar = req.files.avatar as UploadedFile;
                const uploadFile = await s3Service.uploadFile(avatar, UploadFileEnum.USERS, tokenPairData.userId);
                console.log(uploadFile);
                console.log(uploadFile.Location);
            }

            const { firstName, lastName, email } = user;
            await emailService.sendEmail(user.email, EmailEnum.WELCOME, { firstName, lastName, email });

            res.json(tokenPairData);
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
            res.json(responseMessageConstant[ResponseEnum.LOGOUT]);
        } catch (e) {
            next(e);
        }
    }

    public async login(req: IRequestUser, res: Response, next: NextFunction):Promise<Response<IRoleToken> | undefined> {
        try {
            const user = req.user as IUser;
            const loginData = await authService.newTokens(user);

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

            await emailService.sendEmail(user.email, EmailEnum.AUTHORIZED, { firstName: user.firstName });
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
            res.clearCookie(COOKIE.nameRefreshToken);
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
