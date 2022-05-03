import { NextFunction, Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { emailService, userService } from '../services';
import {
    IPagination, IRequestUser, IUser, IUserControllerAbstraction,
} from '../interfaces';
import { ErrorHandler } from '../error';
import { EmailEnum, ResponseEnum } from '../enums';
import { responseMessageConstant } from '../constants';

class UsersController implements IUserControllerAbstraction {
    public async getAllPagination(
        req: IRequestUser,
        res:Response,
        next: NextFunction,
    )
        :Promise<Response<Partial<IPagination<IUser>>> | undefined> {
        try {
            const pagination = req.pagination as Partial<IRequestUser>;
            const users = await userService.getAllPagination(pagination);

            if (!users) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req:Request, res:Response, next: NextFunction):Promise<Response<IUser> | undefined> {
        try {
            const { userId } = req.params;
            const id = Number(userId);
            const user = await userService.getOneById(id);
            if (!user) {
                next(new ErrorHandler('Not Found', 404));
                return;
            }
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req:Request, res: Response, next: NextFunction):Promise<Response<IUser> | undefined> {
        try {
            const user = await userService.addOne(req.body);
            if (!user) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    public async updateFields(req:IRequestUser, res:Response, next: NextFunction):Promise<Response<IUser> | undefined> {
        try {
            const { newPassword } = req.body;

            if (newPassword) {
                const user = { ...req.user, password: newPassword } as IUser;
                const updateUser = await userService.updateWithPass(user.id, user);

                if (!updateUser) {
                    next(new ErrorHandler('Service Unavailable', 503));
                    return;
                }

                const oldEmail = req.oldEmail as string;

                await emailService.sendEmail(oldEmail, EmailEnum.OLD_EMAIL, { oldEmail, firstName: user.firstName });
                await emailService.sendEmail(user.email, EmailEnum.UPDATE_ACCOUNT_DATA, {
                    oldEmail, firstName: user.firstName, lastName: user.lastName, newPassword,
                });

                res.json(responseMessageConstant[ResponseEnum.UPDATED]);
                return;
            }

            const user = req.user as IUser;
            const updateUser = await userService.updateWithoutPass(user.id, user);

            if (!updateUser) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }

            const oldEmail = req.oldEmail as string;

            await emailService.sendEmail(oldEmail, EmailEnum.OLD_EMAIL, { oldEmail, firstName: user.firstName });
            await emailService.sendEmail(user.email, EmailEnum.UPDATE_ACCOUNT_DATA, {
                oldEmail, firstName: user.firstName, lastName: user.lastName,
            });

            res.json(responseMessageConstant[ResponseEnum.UPDATED]);
        } catch (e) {
            next(e);
        }
    }

    public async remove(req:IRequestUser, res:Response, next:NextFunction):Promise<Response<UpdateResult> | undefined> {
        try {
            const { id, email, firstName } = req.user as IUser;
            const remove = await userService.remove(id);

            if (!remove) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }

            await emailService.sendEmail(email, EmailEnum.ACCOUNT_DELETED, { firstName });

            res.json(responseMessageConstant[ResponseEnum.DELETED]);
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();
