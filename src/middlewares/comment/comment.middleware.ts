import { Request, Response, NextFunction } from 'express';

import { commentSchema } from '../../helpers';
import { IComment, IRequestComment } from '../../interfaces';
import { userService } from '../../services';

class CommentMiddleware {
    public async validator(req:IRequestComment, res:Response, next:NextFunction):Promise<void> {
        try {
            req.comment = await commentSchema.validateAsync(req.body);
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async checkFieldsForPatching(req:Request, res:Response, next:NextFunction):Promise<void> {
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
    }

    public async userExists(req:IRequestComment, res:Response, next:NextFunction):Promise<void> {
        try {
            const { authorId } = req.comment as IComment;
            const user = await userService.getOne(authorId);

            if (!user) {
                throw new Error('not valid data');
            }
            next();
        } catch (e) {
            res.json({
                status: 400,
                err: (e as Error).message,
            });
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
