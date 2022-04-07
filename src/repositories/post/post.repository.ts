import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { PostsEntity } from '../../entity';
import { IPost, IPostAbstraction } from '../../interfaces';

@EntityRepository(PostsEntity)
class PostRepository extends Repository<PostsEntity> implements IPostAbstraction {
    getAll():Promise<IPost[]> {
        const posts = getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('posts')
            .getMany();
        return posts;
    }

    getOneById(id:number):Promise<IPost | undefined> {
        const post = getManager()
            .getRepository(PostsEntity)
            .createQueryBuilder('post')
            .where('post.id = :id', { id })
            .getOne();
        return post;
    }

    addOne(post:IPost):Promise<IPost> {
        const newPost = getManager()
            .getRepository(PostsEntity)
            .save(post);
        return newPost;
    }

    getUserPosts(userId:number):Promise<IPost[]> {
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
