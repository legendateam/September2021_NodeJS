import { UpdateResult } from 'typeorm';

import { IPosts } from '../../interfaces/posts.interface';
import { postRepository } from '../../repositories/post/post.repository';

class PostService {
    public async getAll():Promise<IPosts[]> {
        const posts = await postRepository.getAll();
        return posts;
    }

    public async getOne(id:number):Promise<IPosts | undefined> {
        const post = await postRepository.getOneById(id);
        return post;
    }

    public async addOne(post:IPosts):Promise<IPosts> {
        const newPost = await postRepository.addOne(post);
        return newPost;
    }

    public async getUserPosts(id:number):Promise<IPosts[]> {
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
