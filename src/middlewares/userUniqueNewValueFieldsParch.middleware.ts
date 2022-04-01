import { Request, Response, NextFunction } from 'express';

import { userRepository } from '../repositories';

const userUniqueValueFieldsMiddleware = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, phone } = req.body;
        const user = await userRepository.getOneByEmailOrByPhone(email, phone);

        if (user) {
            throw new Error('patch is impossible, some data is already used by other user or data is invalid');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};

export { userUniqueValueFieldsMiddleware };
