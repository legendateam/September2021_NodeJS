import { Request, Response, NextFunction } from 'express';

export const postTypeMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { title, text, userId } = req.body;
        if (typeof title !== 'string' || typeof text !== 'string' || typeof userId !== 'number') {
            throw new Error('wrong data type');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
