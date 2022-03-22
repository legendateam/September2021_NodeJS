import { Request, Response } from 'express';
import { getManager } from 'typeorm';
import { PostsEntity } from '../entity/posts.entity';

class PostsController {
    public static async getAll(_:any, res:Response) {
        const posts = await getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('posts')
            .getMany();
        res.json(posts);
    }

    public static async getOne(req:Request, res:Response) {
        const { postId } = req.params;
        const post = await getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('post')
            .where(`post.id = ${postId}`)
            .getOne();
        res.json(post);
    }

    public static async addOne(req:Request, res:Response) {
        const post = await getManager()
            .getRepository(PostsEntity)
            .save(req.body);
        res.json(post);
    }

    public static async getUserPosts(req:Request, res:Response) {
        const { userId } = req.params;
        const id = Number(userId);
        const posts = await getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('posts')
            .where(`posts.userId = ${id}`)
            .getMany();
        res.json(posts);
    }

    public static async updateFieldValue(req:Request, res:Response) {
        const { text } = req.body;
        const { postId } = req.params;
        const id = Number(postId);
        const patch = await getManager()
            .getRepository(PostsEntity)
            .update({ id }, {
                text,
            });
        res.json(patch);
    }

    public static async removeOne(req:Request, res:Response) {
        const { postId } = req.params;
        const id = Number(postId);
        const remove = await getManager()
            .getRepository(PostsEntity)
            .softDelete({ id });
        res.json(remove);
    }
}

export const {
    getAll, getOne, addOne, removeOne, getUserPosts, updateFieldValue,
} = PostsController;
