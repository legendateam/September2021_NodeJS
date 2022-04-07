import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { commentService } from '../services';
import { IComment, IRequestComment } from '../interfaces';

class CommentsController {
    public async getAll(_: Request, res:Response):Promise<Response<IComment[]>> {
        const comments = await commentService.getAll();
        return res.json(comments);
    }

    public async getOne(req:Request, res:Response):Promise<Response<IComment | undefined>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const comment = await commentService.getOneById(id);
        return res.json(comment);
    }

    public async addOne(req:IRequestComment, res:Response):Promise<Response<IComment>> {
        const comment = await commentService.addOne(req.comment as IComment);
        return res.json(comment);
    }

    public async getUserComments(req:Request, res:Response):Promise<Response<IComment[]>> {
        const { userId } = req.params;
        const authorId = Number(userId);
        const userComments = await commentService.getUserComment(authorId);
        return res.json(userComments);
    }

    public async updateText(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const { text } = req.body;
        const id = Number(commentId);
        const update = await commentService.updateText(id, text);
        return res.json(update);
    }

    public async getCountAction(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const count = await commentService.getCountAction(id);
        return res.json(count);
    }

    public async remove(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const remove = await commentService.removeComment(id);
        return res.json(remove);
    }
}

export const commentsController = new CommentsController();
