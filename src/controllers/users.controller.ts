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

    public static async getOne(req:Request, res:Response) {
        const { userId } = req.params;
        const id = Number(userId);
        const user = await getManager()
            .getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where(`user.id = ${id}`)
            .getOne();
        res.json(user);
    }

    public static async addOne(req:Request, res: Response) {
        const user = await getManager()
            .getRepository(UsersEntity)
            .save(req.body);
        res.json(user);
    }

    public static async updateFields(req:Request, res:Response) {
        const { password, email, phone } = req.body;
        const { userId } = req.params;
        const id = Number(userId);
        const updateUser = await getManager()
            .getRepository(UsersEntity)
            .update({ id }, {
                password,
                email,
                phone,
            });
        res.json(updateUser);
    }

    public static async remove(req:Request, res:Response) {
        const { userId } = req.params;
        const id = Number(userId);
        const remove = await getManager()
            .getRepository(UsersEntity)
            .softDelete({ id });
        res.json(remove);
    }
}

export const {
    addOne, getAll, getOne, remove, updateFields,
} = UsersController;
