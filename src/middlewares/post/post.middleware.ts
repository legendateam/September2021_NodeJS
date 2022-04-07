import { NextFunction, Request, Response } from 'express';

import { postSchema } from '../../helpers';
import { IPost, IRequestPost } from '../../interfaces';
import { userService } from '../../services';

class PostMiddleware {
    public async fieldsFilled(req:IRequestPost, res:Response, next:NextFunction):Promise<void> {
        try {
            req.post = await postSchema.validateAsync(req.body);
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async userExists(req:IRequestPost, res: Response, next:NextFunction):Promise<void> {
        try {
            const { userId } = req.post as IPost;

            const user = await userService.getOne(userId);

            if (!user) {
                throw new Error('not valid data');
            }
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async fieldsForPatching(req:Request, res:Response, next:NextFunction):Promise<void> {
        try {
            const { text } = req.body;

            if (typeof text !== 'string' || !text) {
                throw new Error('probably not all fields are filled');
            }
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }
}

export const postMiddleware = new PostMiddleware();
