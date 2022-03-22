import { Request, Response, NextFunction } from 'express';

export const postFieldsFilledMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { title, text, userId } = req.body;

        if (!title || !text || !userId) {
            throw new Error('probably not all fields are filled');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
