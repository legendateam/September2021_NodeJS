import { getManager } from 'typeorm';
import { Response } from 'express';

import { UsersEntity } from '../entity/users.entity';

class UsersController {
    public static async getAll(_:any, res:Response):Promise<void> {
        const users = await getManager()
            .getRepository(UsersEntity)
            .createQueryBuilder('Users')
            .getMany();
        res.json(users);
    }
}

export const usersController = new UsersController();
