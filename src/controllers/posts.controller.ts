import { Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { postService } from '../services';
import { IPosts } from '../interfaces';

class PostsController {
    public async getAll(_:any, res:Response):Promise<Response<IPosts[]>> {
        const posts = await postService.getAll();
        return res.json(posts);
    }

    public async getOne(req:Request, res:Response):Promise<Response<IPosts>> {
        const { postId } = req.params;
        const id = Number(postId);
        const post = await postService.getOne(id);
        return res.json(post);
    }

    public async addOne(req:Request, res:Response):Promise<Response<IPosts>> {
        const post = await postService.addOne(req.body);
        return res.json(post);
    }

    public async getUserPosts(req:Request, res:Response):Promise<Response<IPosts[]>> {
        const { userId } = req.params;
        const id = Number(userId);
        const posts = await postService.getUserPosts(id);
        return res.json(posts);
    }

    public async updateFieldValue(req:Request, res:Response)
        :Promise<Response<UpdateResult>> {
        const { text } = req.body;
        const { postId } = req.params;
        const id = Number(postId);
        const patch = await postService.updateFieldValue(id, text);
        return res.json(patch);
    }

    public async removeOne(req:Request, res:Response):Promise<Response<UpdateResult>> {
        const { postId } = req.params;
        const id = Number(postId);
        const remove = await postService.removeOne(id);
        return res.json(remove);
    }
}

export const postsController = new PostsController();
