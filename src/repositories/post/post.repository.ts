import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { PostsEntity } from '../../entity';
import {
    IPagination, IPost, IPostAbstraction, IRepoPost,
} from '../../interfaces';

@EntityRepository(PostsEntity)
class PostRepository extends Repository<PostsEntity> implements IPostAbstraction {
    public async getAllPagination({ pagination: { post, perPage, page }, skip }:IRepoPost):Promise<Partial<IPagination<PostsEntity>>> {
        const [posts, countItem] = await getManager()
            .getRepository(PostsEntity)
            .findAndCount({
                where: post,
                skip,
                take: perPage,
            });

        return {
            page,
            perPage,
            countItem,
            data: posts,
        };
    }

    public async getNewAll(date: string):Promise<IPost[]> {
        const posts = await getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('posts')
            .where('posts.createAt >= :date', { date })
            .getMany();
        return posts;
    }

    public async getOneById(id:number):Promise<IPost | undefined> {
        const post = await getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .getOne();
        return post;
    }

    public async addOne(post:IPost):Promise<IPost> {
        const newPost = await getManager()
            .getRepository(PostsEntity)
            .save(post);
        return newPost;
    }

    public async getUserPosts(userId:number):Promise<IPost[]> {
        const posts = await getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('posts')
            .where('posts.userId = :userId', { userId })
            .getMany();
        return posts;
    }

    public async updateFieldValue(id:number, text:string):Promise<UpdateResult> {
        const newText = await getManager()
            .getRepository(PostsEntity)
            .update({ id }, {
                text,
            });
        return newText;
    }

    public async removeOne(id:number):Promise<UpdateResult> {
        const remove = await getManager()
            .getRepository(PostsEntity)
            .softDelete({ id });
        return remove;
    }
}

export const postRepository = new PostRepository();
