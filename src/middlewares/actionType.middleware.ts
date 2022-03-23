import { Request, Response, NextFunction } from 'express';

export const actionTypeMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { commentId, userId } = req.body;
        if (typeof commentId !== 'number' || typeof userId !== 'number') {
            throw new Error('wrong data type');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
