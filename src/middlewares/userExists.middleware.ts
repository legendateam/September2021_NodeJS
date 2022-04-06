import { NextFunction, Response } from 'express';

import { userRepository } from '../repositories';
import { IRequestUser } from '../interfaces';

export const userExistsMiddleware = async (
    req:IRequestUser,
    res:Response,
    next:NextFunction,
) => {
    try {
        const { email } = req.body;
        const user = await userRepository.getOneByEmailOrByPhone(email);

        if (!user) {
            throw new Error('user already exists');
        }

        req.user = user;

        next();
    } catch (e) {
        if (e) {
            res.status(400).end((e as Error).message);
        }
    }
};
