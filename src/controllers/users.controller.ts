import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { userService } from '../services/user/user.service';
import { IUsers } from '../interfaces/users.interface';

class UsersController {
    public static async getAll(_:any, res:Response):Promise<Response<IUsers[]>> {
        const users = await userService.getAll();
        return res.json(users);
    }

    public static async getOne(req:Request, res:Response):Promise<Response<IUsers>> {
        const { userId } = req.params;
        const id = Number(userId);
        const user = await userService.getOne(id);
        return res.json(user);
    }

    public static async addOne(req:Request, res: Response):Promise<Response<IUsers>> {
        const user = await userService.addOne(req.body);
        return res.json(user);
    }

    public static async updateFields(req:Request, res:Response):Promise<Response<IUsers>> {
        const { password, email, phone } = req.body;
        const newValueFields = { password, email, phone };
        const { userId } = req.params;
        const id = Number(userId);
        const updateUser = await userService.updateFields(id, newValueFields);
        return res.json(updateUser);
    }

    public static async remove(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { userId } = req.params;
        const id = Number(userId);
        const remove = await userService.remove(id);
        return res.json(remove);
    }
}

export const {
    addOne, getAll, getOne, remove, updateFields,
} = UsersController;
