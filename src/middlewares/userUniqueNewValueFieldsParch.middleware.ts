import { Request, Response, NextFunction } from 'express';
import { getManager } from 'typeorm';

import { UsersEntity } from '../entity/users.entity';

const userUniqueValueFieldsMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, phone } = req.body;
        const users = await getManager()
            .getRepository(UsersEntity)
            .find();
        const some = users.some((user) => user.email.toLowerCase() === email.toLowerCase()
            || user.phone === phone);

        if (some) {
            throw new Error('patch is impossible, some data is already used by other user or data is invalid');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};

export { userUniqueValueFieldsMiddleware };
