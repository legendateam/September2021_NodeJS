import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import {CommentsEntity} from '../../entity';
import {
    IComment, ICountAction, ICommentAbstraction, IDate, IPagination,
} from '../../interfaces';

@EntityRepository(CommentsEntity)
class CommentRepository extends Repository<CommentsEntity> implements ICommentAbstraction {
    // eslint-disable-next-line default-param-last
    public async getAllPagination(page: number = 1, perPage: number = 50, skip: number = 0):Promise<Partial<IPagination<CommentsEntity>>> {
        const [comments, countItem] = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder('posts')
            .offset(skip)
            .limit(perPage)
            .getManyAndCount();

        return {
            page, perPage, countItem, data: comments,
        };
    }

    public async getNewAll({ date }: IDate):Promise<IComment[]> {
        return getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder('comments')
            .where('comments.createAt >= :date', { date })
            .getMany();
    }

    public async getOne(commentId:number):Promise<IComment | undefined> {
        const comment = await getManager()
            .getRepository(CommentsEntity)
            .createQueryBuilder('comment')
            .where('comment.id = :commentId', { commentId })
            .getOne();
        return comment;
    }

    public async addOne(comment:IComment):Promise<IComment> {
        const newComment = await getManager()
            .getRepository(CommentsEntity)
            .save(comment);
        return newComment;
    }

    public async getUserComment(authorId:number):Promise<IComment[]> {
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
                SELECT COUNT(isLike) as likeCount, COUNT(isDislike) as dislikeCount
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
