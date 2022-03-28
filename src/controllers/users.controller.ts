import { Request, Response } from 'express';

import { userService } from '../services/user/user.service';

class UsersController {
    public static async getAll(_:any, res:Response):Promise<void> {
        const users = await userService.getAll();
        res.json(users);
    }

    public static async getOne(req:Request, res:Response):Promise<void> {
        const { userId } = req.params;
        const id = Number(userId);
        const user = await userService.getOne(id);
        res.json(user);
    }

    public static async addOne(req:Request, res: Response):Promise<void> {
        const user = await userService.addOne(req.body);
        res.json(user);
    }

    public static async updateFields(req:Request, res:Response):Promise<void> {
        const { password, email, phone } = req.body;
        const newValueFields = { password, email, phone };
        const { userId } = req.params;
        const id = Number(userId);
        const updateUser = await userService.updateFields(id, newValueFields);
        res.json(updateUser);
    }

    public static async remove(req:Request, res:Response):Promise<void> {
        const { userId } = req.params;
        const id = Number(userId);
        const remove = await userService.remove(id);
        res.json(remove);
    }
}

export const {
    addOne, getAll, getOne, remove, updateFields,
} = UsersController;
