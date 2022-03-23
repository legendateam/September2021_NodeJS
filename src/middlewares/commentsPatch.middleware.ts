import { Request, Response, NextFunction } from 'express';

export const commentsPatch = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { text } = req.body;
        if (!text) {
            throw new Error('probably not all fields are filled');
        }
        next();
    } catch (e) {
        if (e) {
            res.status(400).end((e as Error).message);
        }
    }
};
