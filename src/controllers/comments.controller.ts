import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { commentService } from '../services/comment/comment.service';
import { IComments } from '../interfaces/comments.interface';

class CommentsController {
    public static async getAll(_:any, res:Response):Promise<Response<IComments[]>> {
        const comments = await commentService.getAll();
        return res.json(comments);
    }

    public static async getOne(req:Request, res:Response):Promise<Response<IComments | undefined>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const comment = await commentService.getOneById(id);
        return res.json(comment);
    }

    public static async addOne(req:Request, res:Response):Promise<Response<IComments>> {
        const comment = await commentService.addOne(req.body);
        return res.json(comment);
    }

    public static async getUserComments(req:Request, res:Response):Promise<Response<IComments[]>> {
        const { userId } = req.params;
        const authorId = Number(userId);
        const userComments = await commentService.getUserComment(authorId);
        return res.json(userComments);
    }

    public static async updateText(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const { text } = req.body;
        const id = Number(commentId);
        const update = await commentService.updateText(id, text);
        return res.json(update);
    }

    public static async getCountAction(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const count = await commentService.getCountAction(id);
        return res.json(count);
    }

    public static async remove(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const remove = await commentService.removeComment(id);
        return res.json(remove);
    }
}

export const {
    getAll, addOne, getOne, getUserComments, updateText, getCountAction, remove,
} = CommentsController;
