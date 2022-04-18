import { UpdateResult } from 'typeorm';
import dayjs from 'dayjs';

import {
    IPagination, IPaginationPost, IPost, IPostServiceAbstraction,
} from '../../interfaces';
import { postRepository } from '../../repositories';
import { PostsEntity } from '../../entity';

class PostService implements IPostServiceAbstraction {
    public async getAllPagination(pagination: IPaginationPost):Promise<Partial<IPagination<PostsEntity>>> {
        const { page = 1, perPage = 50 } = pagination as IPaginationPost;
        const skip = perPage * (page - 1);

        return postRepository.getAllPagination({ pagination, skip });
    }

    public async getNewAll():Promise<IPost[]> {
        const date = dayjs().utc().startOf('day').format();
        const posts = await postRepository.getNewAll(date);
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
