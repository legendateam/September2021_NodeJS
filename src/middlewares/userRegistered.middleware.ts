import { NextFunction, Request, Response } from 'express';

import { userRepository } from '../repositories';

export const userRegisteredMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, phone } = req.body;
        const user = await userRepository.getOneByEmailOrByPhone(email, phone);

        if (user) {
            throw new Error('user already exists');
        }

        next();
    } catch (e) {
        if (e) {
            res.status(400).end((e as Error).message);
        }
    }
};
