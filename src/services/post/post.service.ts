import { UpdateResult } from 'typeorm';

import { IPost, IPostServiceAbstraction } from '../../interfaces';
import { postRepository } from '../../repositories';

class PostService implements IPostServiceAbstraction {
    public async getAll():Promise<IPost[]> {
        const posts = await postRepository.getAll();
        return posts;
    }

    public async getOne(id:number):Promise<IPost | undefined> {
        const post = await postRepository.getOneById(id);
        return post;
    }

    public async addOne(post:IPost):Promise<IPost> {
        const newPost = await postRepository.addOne(post);
        return newPost;
    }

    public async getUserPosts(id:number):Promise<IPost[]> {
        const posts = await postRepository.getUserPosts(id);
        return posts;
    }

    public async updateFieldValue(id:number, text: string):Promise<UpdateResult> {
        const patch = await postRepository.updateFieldValue(id, text);
        return patch;
    }

    public async removeOne(id:number):Promise<UpdateResult> {
        const remove = await postRepository.removeOne(id);
        return remove;
    }
}

export const postService = new PostService();
