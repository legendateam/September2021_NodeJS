import { Request, Response, NextFunction } from 'express';

import { commentSchema } from '../../helpers';
import { IComment, IRequestComment } from '../../interfaces';
import { userService } from '../../services';
import { ErrorHandler } from '../../error';

class CommentMiddleware {
    public validator(req:IRequestComment, _:Response, next:NextFunction): void {
        try {
            const { error, value } = commentSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.comment = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkFieldsForPatching(req:Request, _:Response, next:NextFunction):Promise<void> {
        try {
            const { text } = req.body;
            if (!text) {
                next(new ErrorHandler('Probably not all fields are filled'));
                return;
            }
            next();
        } catch (e) {
            if (e) {
                next(e);
            }
        }
    }

    public async userExists(req:IRequestComment, _:Response, next:NextFunction):Promise<void> {
        try {
            const { authorId } = req.comment as IComment;
            const user = await userService.getOneById(authorId);

            if (!user) {
                next(new ErrorHandler('Not Valid Data'));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const commentMiddleware = new CommentMiddleware();
