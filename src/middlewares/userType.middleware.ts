import { Request, Response, NextFunction } from 'express';

export const userTypeMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const {
            firstName, lastName, age, phone, email, password,
        } = req.body;
        if (typeof firstName !== 'string' || typeof lastName !== 'string'
            || typeof age !== 'number' || typeof phone !== 'string'
            || typeof email !== 'string' || typeof password !== 'string') {
            throw new Error('wrong data type');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
