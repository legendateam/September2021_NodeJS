import { Request, Response, NextFunction } from 'express';

export const actionsFieldsFilledMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const {
            commentId, userId, _like, _dislike,
        } = req.body;
        if (!commentId || !userId || (!_like && !_dislike)) {
            throw new Error('probably not all fields are filled');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
