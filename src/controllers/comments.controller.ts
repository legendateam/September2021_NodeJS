import { Request, Response } from 'express';

import { commentService } from '../services/comment/comment.service';

class CommentsController {
    public static async getAll(_:any, res:Response):Promise<void> {
        const comments = await commentService.getAll();
        res.json(comments);
    }

    public static async getOne(req:Request, res:Response):Promise<void> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const comment = await commentService.getOneById(id);
        res.json(comment);
    }

    public static async addOne(req:Request, res:Response):Promise<void> {
        const comment = await commentService.addOne(req.body);
        res.json(comment);
    }

    public static async getUserComments(req:Request, res:Response):Promise<void> {
        const { userId } = req.params;
        const authorId = Number(userId);
        const userComments = await commentService.getUserComment(authorId);
        res.json(userComments);
    }

    public static async updateText(req:Request, res:Response):Promise<void> {
        const { commentId } = req.params;
        const { text } = req.body;
        const id = Number(commentId);
        const update = await commentService.updateText(id, text);
        res.json(update);
    }

    public static async getCountAction(req:Request, res:Response):Promise<void> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const count = await commentService.getCountAction(id);
        res.json(count);
    }

    public static async remove(req:Request, res:Response):Promise<void> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const remove = await commentService.removeComment(id);
        res.json(remove);
    }
}

export const {
    getAll, addOne, getOne, getUserComments, updateText, getCountAction, remove,
} = CommentsController;
