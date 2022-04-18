import { NextFunction, Request, Response } from 'express';

import { postSchema } from '../../helpers';
import { IPost, IRequestPost } from '../../interfaces';
import { userService } from '../../services';
import { ErrorHandler } from '../../error';

class PostMiddleware {
    public checkQuery(req: IRequestPost, _: Response, next: NextFunction): void {
        try {
            const { page: p = 1, perPage: pp = 50, ...other } = req.query;
            const page = Number(p);
            const perPage = Number(pp);
            req.pagination = { page, perPage, post: other };
            next();
        } catch (e) {
            next(e);
        }
    }

    public fieldsFilled(req:IRequestPost, _:Response, next:NextFunction): void {
        try {
            const { error, value } = postSchema.validate(req.body);
            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }
            req.post = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async userExists(req:IRequestPost, _: Response, next:NextFunction):Promise<void> {
        try {
            const { userId } = req.post as IPost;

            const user = await userService.getOneById(userId);

            if (!user) {
                next(new ErrorHandler('Data Invalid'));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }

    public async fieldsForPatching(req:Request, _:Response, next:NextFunction):Promise<void> {
        try {
            const { text } = req.body;

            if (typeof text !== 'string' || !text) {
                next(new ErrorHandler('Probably not all fields are filled'));
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const postMiddleware = new PostMiddleware();
