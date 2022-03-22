import { NextFunction, Request, Response } from 'express';
import { getManager } from 'typeorm';
import { UsersEntity } from '../entity/users.entity';

export const userRegisteredMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { phone, email } = req.body;
        const users = await getManager().getRepository(UsersEntity).find();
        const some = users.some((user) => user.email.toLowerCase() === email.toLowerCase()
            || user.phone === phone);

        if (some) {
            throw new Error('user already exists');
        }

        next();
    } catch (e) {
        if (e) {
            res.status(400).end((e as Error).message);
        }
    }
};
