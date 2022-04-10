import { NextFunction, Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { userService } from '../services';
import { IRequestUser, IUser } from '../interfaces';
import { ErrorHandler } from '../error';

class UsersController {
    public async getAll(_: Request, res:Response, next: NextFunction):Promise<Response<IUser[]> | undefined> {
        try {
            const users = await userService.getAll();
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
            const user = await userService.getOne(id);
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
            const { userId } = req.params;
            const id = Number(userId);
            const updateUser = await userService.updateFields(id, req.user as IUser);
            if (!updateUser) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(updateUser);
        } catch (e) {
            next(e);
        }
    }

    public async remove(req:Request, res:Response, next:NextFunction):Promise<Response<UpdateResult> | undefined> {
        try {
            const { userId } = req.params;
            const id = Number(userId);
            const remove = await userService.remove(id);
            if (!remove) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(remove);
        } catch (e) {
            next(e);
        }
    }
}

export const usersController = new UsersController();
