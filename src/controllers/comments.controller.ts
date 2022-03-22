import { Request, Response } from 'express';
import { getManager } from 'typeorm';

import { CommentsEntity } from '../entity/comments.entity';

class CommentsController {
    public static async getAll(_:any, res:Response) {
        const comments = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder()
            .getMany();
        res.json(comments);
    }

    public static async getOne(req:Request, res:Response) {
        const { commentId } = req.params;
        const id = Number(commentId);
        const comment = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder('comment')
            .where(`comment.id = ${id}`)
            .getOne();
        res.json(comment);
    }

    public static async addOne(req:Request, res:Response) {
        const comment = await getManager()
            .getRepository(CommentsEntity)
            .save(req.body);
        res.json(comment);
    }

    public static async getUserComments(req:Request, res:Response) {
        const { userId } = req.params;
        const id = Number(userId);
        const user = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder('comments')
            .innerJoinAndSelect('comments.authorId', 'user')
            .where(`comment.authorId = ${id}`)
            .getMany();
        res.json(user);
    }
}

export const {
    getAll, addOne, getOne, getUserComments,
} = CommentsController;
