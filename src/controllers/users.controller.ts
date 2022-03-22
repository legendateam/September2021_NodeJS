import { getManager } from 'typeorm';
import { Request, Response } from 'express';

import { UsersEntity } from '../entity/users.entity';

class UsersController {
    public static async getAll(_:any, res:Response) {
        const users = await getManager()
            .getRepository(UsersEntity)
            .find();
        res.json(users);
    }

    public static async addOne(req:Request, res: Response) {
        const user = await getManager()
            .getRepository(UsersEntity)
            .save(req.body);
        res.json(user);
    }
}

export const { addOne, getAll } = UsersController;
