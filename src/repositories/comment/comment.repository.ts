import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import { CommentsEntity } from '../../entity/comments.entity';
import { IComments } from '../../interfaces/comments.interface';
import { ICountAction } from '../../interfaces/countAction.interface';
import { ICommentAbstraction } from '../../interfaces/abstraction/comment.interface';

@EntityRepository(CommentsEntity)
class CommentRepository extends Repository<CommentsEntity> implements ICommentAbstraction {
    public async getAll():Promise<IComments[]> {
        const comments = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder()
            .getMany();
        return comments;
    }

    public async getOne(commentId:number):Promise<IComments | undefined> {
        const comment = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder('comment')
            .where('comment.id = :commentId', { commentId })
            .getOne();
        return comment;
    }

    public async addOne(comment:IComments):Promise<IComments> {
        const newComment = await getManager()
            .getRepository(CommentsEntity)
            .save(comment);
        return newComment;
    }

    public async getUserComment(authorId:number):Promise<IComments[]> {
        const comments = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder('comments')
            .where('comments.authorId = :authorId', { authorId })
            .innerJoinAndSelect('comments.user', 'user')
            .innerJoinAndSelect('comments.post', 'post')
            .getMany();
        return comments;
    }

    public async updateText(id:number, text:string):Promise<UpdateResult> {
        const comment = await getManager()
            .getRepository(CommentsEntity)
            .update({ id }, {
                text,
            });
        return comment;
    }

    public async getCountAction(id:number):Promise<ICountAction> {
        const count = getManager()
            .query(`
                SELECT COUNT(_like) as likeCount, COUNT(_dislike) as dislikeCOunt
                FROM Actions a where a.commentId=${id};
            `);
        return count;
    }

    public async removeComment(id:number):Promise<UpdateResult> {
        const remove = await getManager()
            .getRepository(CommentsEntity)
            .softDelete({ id });
        return remove;
    }
}

export const commentRepository = new CommentRepository();
