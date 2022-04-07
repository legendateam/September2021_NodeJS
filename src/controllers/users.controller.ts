import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { userService } from '../services';
import { IRequestUser, IUser } from '../interfaces';

class UsersController {
    public async getAll(_: Request, res:Response):Promise<Response<IUser[]>> {
        const users = await userService.getAll();
        return res.json(users);
    }

    public async getOne(req:Request, res:Response):Promise<Response<IUser>> {
        const { userId } = req.params;
        const id = Number(userId);
        const user = await userService.getOne(id);
        return res.json(user);
    }

    public async addOne(req:Request, res: Response):Promise<Response<IUser>> {
        const user = await userService.addOne(req.body);
        return res.json(user);
    }

    public async updateFields(req:IRequestUser, res:Response):Promise<Response<IUser>> {
        const { userId } = req.params;
        const id = Number(userId);
        const updateUser = await userService.updateFields(id, req.user as IUser);
        return res.json(updateUser);
    }

    public async remove(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { userId } = req.params;
        const id = Number(userId);
        const remove = await userService.remove(id);
        return res.json(remove);
    }
}

export const usersController = new UsersController();
