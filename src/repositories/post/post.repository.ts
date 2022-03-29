import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { PostsEntity } from '../../entity/posts.entity';
import { IPosts } from '../../interfaces/posts.interface';
import { IPostAbstraction } from '../../interfaces/abstraction/post.interface';

@EntityRepository(PostsEntity)
class PostRepository extends Repository<PostsEntity> implements IPostAbstraction {
    getAll():Promise<IPosts[]> {
        const posts = getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('posts')
            .getMany();
        return posts;
    }

    getOneById(id:number):Promise<IPosts | undefined> {
        const post = getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .getOne();
        return post;
    }

    addOne(post:IPosts):Promise<IPosts> {
        const newPost = getManager()
            .getRepository(PostsEntity)
            .save(post);
        return newPost;
    }

    getUserPosts(userId:number):Promise<IPosts[]> {
        const posts = getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('posts')
            .where('posts.userId = :userId', { userId })
            .getMany();
        return posts;
    }

    updateFieldValue(id:number, text:string):Promise<UpdateResult> {
        const newText = getManager()
            .getRepository(PostsEntity)
            .update({ id }, {
                text,
            });
        return newText;
    }

    removeOne(id:number):Promise<UpdateResult> {
        const remove = getManager()
            .getRepository(PostsEntity)
            .softDelete({ id });
        return remove;
    }
}

export const postRepository = new PostRepository();
