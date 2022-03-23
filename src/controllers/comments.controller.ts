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
            .where(`comments.authorId = ${id}`)
            .innerJoinAndSelect('comments.user', 'user')
            .innerJoinAndSelect('comments.post', 'post')
            .getMany();
        res.json(user);
    }

    public static async updateText(req:Request, res:Response) {
        const { commentId } = req.params;
        const { text } = req.body;
        const id = Number(commentId);
        const update = await getManager()
            .getRepository(CommentsEntity)
            .update({ id }, {
                text,
            });
        res.json(update);
    }

    public static async getCountAction(req:Request, res:Response) {
        const { commentId } = req.params;
        const id = Number(commentId);
        const count = await getManager()
            .query(`
                SELECT COUNT(_like) as likeCount, COUNT(_dislike) as dislikeCOunt
                FROM Actions a where a.commentId=${id};
            `);
        res.json(count);
    }

    public static async remove(req:Request, res:Response) {
        const { commentId } = req.params;
        const id = Number(commentId);
        const remove = await getManager()
            .getRepository(CommentsEntity)
            .softDelete({ id });
        res.json(remove);
    }
}

export const {
    getAll, addOne, getOne, getUserComments, updateText, remove, getCountAction,
} = CommentsController;
