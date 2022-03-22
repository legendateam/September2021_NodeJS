import { Request, Response, NextFunction } from 'express';

export const postPatchFieldsMiddleware = (req:Request, res:Response, next:NextFunction) => {
    try {
        const { text } = req.body;

        if (typeof text !== 'string' || !text) {
            throw new Error('probably not all fields are filled');
        }
        next();
    } catch (e) {
        res.status(400).end((e as Error).message);
    }
};
