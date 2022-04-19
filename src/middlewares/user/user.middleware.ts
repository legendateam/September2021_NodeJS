import { NextFunction, Response } from 'express';
import { UploadedFile } from 'express-fileupload';

import { IRequestUser, IUser } from '../../interfaces';
import { userService } from '../../services';
import {
    authLoginSchema, authSchema, paramsSchema, userPatchSchema,
} from '../../helpers';
import { ErrorHandler } from '../../error';
import { constants } from '../../constants';

class UserMiddleware {
    public async validatorRegistration(req:IRequestUser, _:Response, next:NextFunction): Promise<void> {
        try {
            const { error, value } = authSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async patchFields(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { userId } = req.params;
            const { error: errParams, value: params } = paramsSchema.validate({ userId });

            if (errParams) {
                next(new ErrorHandler(errParams.message));
                return;
            }

            const { error, value } = userPatchSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.body = { password: value.currentPassword, newPassword: value.newPassword, userId: params.userId };
            req.user = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserByParams(req: IRequestUser, _: Response, next: NextFunction) {
        try {
            if (!req.user) {
                const { userId } = req.params;
                const { error, value } = paramsSchema.validate({ userId });

                if (error) {
                    next(new ErrorHandler(error.message));
                    return;
                }

                const userFromDB = await userService.getOneById(value.userId);

                if (!userFromDB) {
                    next(new ErrorHandler('Data is invalid'));
                    return;
                }

                req.user = userFromDB;
                next();
                return;
            }
            const { userId } = req.body;
            const currentUser = await userService.getOneById(userId);

            if (!currentUser) {
                next(new ErrorHandler('Impossible patching because data is invalid'));
                return;
            }

            const { email, phone } = req.user as IUser;

            req.oldEmail = currentUser.email;
            req.user = { ...currentUser, email, phone };

            next();
        } catch (e) {
            next(e);
        }
    }

    public validatorLogin(req: IRequestUser, _: Response, next: NextFunction): void {
        try {
            const { error, value } = authLoginSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.user = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExistsEmailAndPhone(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { email, phone } = req.user as IUser;
            const user = await userService.getOneByEmailOrPhone(email, phone);

            if (user) {
                next(new ErrorHandler('Data is invalid or User already exists'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUserByEmail(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const { email } = req.user as IUser;
            const user = await userService.getOneByEmailOrPhone(email);

            if (!user) {
                next(new ErrorHandler('user already exists or data is invalid'));
                return;
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async isCurrentPassword(req:IRequestUser, _:Response, next:NextFunction):Promise<void> {
        try {
            const user = req.user as IUser;
            const { password } = req.body;

            const checkedPassword = await userService.checkPassword(password, user.password);

            if (!checkedPassword) {
                next(new ErrorHandler('Wrong email or password'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkQuery(req: IRequestUser, _: Response, next: NextFunction): void {
        try {
            if (req.query) {
                const { page = 1, perPage = 50, ...other } = req.query;

                req.pagination = { page: +page, perPage: +perPage, user: other };
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public checkAvatar(req: IRequestUser, _: Response, next: NextFunction): void {
        try {
            if (!req.files?.avatar) {
                next();
                return;
            }

            const { size, mimetype } = req.files.avatar as UploadedFile;

            if (size > constants.SIZE_AVATAR) {
                next(new ErrorHandler('Wrong file size'));
                return;
            }

            if (!constants.PHOTOS_MIMETYPES.includes(mimetype)) {
                next(new ErrorHandler('Wrong file type'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const userMiddleware = new UserMiddleware();
