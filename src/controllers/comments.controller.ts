import { NextFunction, Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { commentService } from '../services';
import { IComment, IRequestComment, ICommentControllerAbstraction } from '../interfaces';
import { ErrorHandler } from '../error';

class CommentsController implements ICommentControllerAbstraction {
    public async getAllPagination(req: Request, res:Response, next: NextFunction): Promise<void> {
        try {
            const { page = 1, perPage = 50 } = req.query;
            const comments = await commentService.getAllPagination(+page, +perPage);

            res.json(comments);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req:Request, res:Response, next: NextFunction):Promise<Response<IComment> | undefined> {
        try {
            const { commentId } = req.params;
            const id = Number(commentId);
            const comment = await commentService.getOneById(id);
            if (!comment) {
                next(new ErrorHandler('Not Found', 404));
                return;
            }
            res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req:IRequestComment, res:Response, next: NextFunction):Promise<Response<IComment> | undefined> {
        try {
            const comment = await commentService.addOne(req.comment as IComment);
            if (!comment) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(comment);
        } catch (e) {
            next(e);
        }
    }

    public async getUserComments(req:Request, res:Response, next: NextFunction):Promise<Response<IComment[]> | undefined> {
        try {
            const { userId } = req.params;
            const authorId = Number(userId);
            const userComments = await commentService.getUserComment(authorId);
            if (!userComments) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(userComments);
        } catch (e) {
            next(e);
        }
    }

    public async updateText(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined> {
        try {
            const { commentId } = req.params;
            const { text } = req.body;
            const id = Number(commentId);
            const update = await commentService.updateText(id, text);
            if (!update) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(update);
        } catch (e) {
            next(e);
        }
    }

    public async getCountAction(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined> {
        try {
            const { commentId } = req.params;
            const id = Number(commentId);
            const count = await commentService.getCountAction(id);
            if (!count) {
                next(new ErrorHandler('Not Found', 404));
                return;
            }
            res.json(count);
        } catch (e) {
            next(e);
        }
    }

    public async remove(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined> {
        try {
            const { commentId } = req.params;
            const id = Number(commentId);
            const remove = await commentService.removeComment(id);
            if (!remove) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(remove);
        } catch (e) {
            next(e);
        }
    }
}

export const commentsController = new CommentsController();
