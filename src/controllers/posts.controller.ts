import { Request, Response } from 'express';
import { postService } from '../services/post/post.service';

class PostsController {
    public static async getAll(_:any, res:Response):Promise<void> {
        const posts = await postService.getAll();
        res.json(posts);
    }

    public static async getOne(req:Request, res:Response):Promise<void> {
        const { postId } = req.params;
        const id = Number(postId);
        const post = await postService.getOne(id);
        res.json(post);
    }

    public static async addOne(req:Request, res:Response):Promise<void> {
        const post = await postService.addOne(req.body);
        res.json(post);
    }

    public static async getUserPosts(req:Request, res:Response) {
        const { userId } = req.params;
        const id = Number(userId);
        const posts = await postService.getUserPosts(id);
        res.json(posts);
    }

    public static async updateFieldValue(req:Request, res:Response) {
        const { text } = req.body;
        const { postId } = req.params;
        const id = Number(postId);
        const patch = await postService.updateFieldValue(id, text);
        res.json(patch);
    }

    public static async removeOne(req:Request, res:Response) {
        const { postId } = req.params;
        const id = Number(postId);
        const remove = await postService.removeOne(id);
        res.json(remove);
    }
}

export const {
    getAll, getOne, addOne, removeOne, getUserPosts, updateFieldValue,
} = PostsController;
