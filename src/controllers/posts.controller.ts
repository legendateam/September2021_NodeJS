import { NextFunction, Request, Response } from 'express';
import { UpdateResult } from 'typeorm';

import { postService } from '../services';
import {
    IPaginationPost, IPost, IPostControllerAbstraction, IRequestPost,
} from '../interfaces';
import { ErrorHandler } from '../error';

class PostsController implements IPostControllerAbstraction {
    public async getAll(req: IRequestPost, res:Response, next: NextFunction):Promise<Response<IPost[]> | undefined> {
        try {
            const pagination = req.pagination as IPaginationPost;
            const posts = await postService.getAllPagination(pagination);
            if (!posts) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req:Request, res:Response, next: NextFunction):Promise<Response<IPost> | undefined> {
        try {
            const { postId } = req.params;
            const id = Number(postId);
            const post = await postService.getOne(id);
            if (!post) {
                next(new ErrorHandler('Not Found', 404));
                return;
            }
            res.json(post);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req:IRequestPost, res:Response, next: NextFunction):Promise<Response<IPost> | undefined> {
        try {
            const post = await postService.addOne(req.post as IPost);
            if (!post) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(post);
        } catch (e) {
            next(e);
        }
    }

    public async getUserPosts(req:Request, res:Response, next: NextFunction):Promise<Response<IPost[]> | undefined> {
        try {
            const { userId } = req.params;
            const id = Number(userId);
            const posts = await postService.getUserPosts(id);
            if (!posts) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(posts);
        } catch (e) {
            next(e);
        }
    }

    public async updateFieldValue(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined> {
        try {
            const { text } = req.body;
            const { postId } = req.params;
            const id = Number(postId);
            const patch = await postService.updateFieldValue(id, text);
            if (!patch) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(patch);
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined> {
        try {
            const { postId } = req.params;
            const id = Number(postId);
            const remove = await postService.removeOne(id);
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

export const postsController = new PostsController();
