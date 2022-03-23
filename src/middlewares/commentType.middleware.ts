import { Request, Response, NextFunction } from 'express';

export const commentTypeMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { authorId, postId, text } = req.body;
        if (typeof authorId !== 'number' || typeof postId !== 'number' || typeof text !== 'string') {
            throw new Error('wrong data type');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
