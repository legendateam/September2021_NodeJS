import { NextFunction, Response, Request } from 'express';

export const userMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const {
            firstName, lastName, age, phone, email, password,
        } = req.body;

        if (!firstName || !lastName || !age || !phone || !email || !password) {
            throw new Error('probably not all fields are filled');
        }

        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
