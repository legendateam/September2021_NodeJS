import { Request, Response, NextFunction } from 'express';

export const commentsFieldsFilled = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { authorId, postId, text } = req.body;
        if (!authorId || !postId || !text) {
            throw new Error('probably not all fields are filled');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
