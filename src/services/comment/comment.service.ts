import { UpdateResult } from 'typeorm';

import dayjs from 'dayjs';
import { commentRepository } from '../../repositories';
import {
    IComment, ICommentServiceAbstraction, ICountAction, IPagination,
} from '../../interfaces';
import { CommentsEntity } from '../../entity';

class CommentService implements ICommentServiceAbstraction {
    public async getAllPagination(page: number = 1, perPage: number = 50):Promise<Partial<IPagination<CommentsEntity>>> {
        const skip = perPage * (page - 1);
        const comments = await commentRepository.getAllPagination(page, perPage, skip);
        return comments;
    }

    public async getNewAll():Promise<IComment[]> {
        const date = { date: dayjs().utc().startOf('day').format() };
        return commentRepository.getNewAll(date);
    }

    public async getOneById(id:number):Promise<IComment | undefined> {
        const comment = await commentRepository.getOne(id);
        return comment;
    }

    public async addOne(comment:IComment):Promise<IComment> {
        const newComment = await commentRepository.addOne(comment);
        return newComment;
    }

    public async getUserComment(authorId:number):Promise<IComment[]> {
        const comments = await commentRepository.getUserComment(authorId);
        return comments;
    }

    public async updateText(id:number, text: string):Promise<UpdateResult> {
        const comment = await commentRepository.updateText(id, text);
        return comment;
    }

    public async getCountAction(id:number):Promise<ICountAction> {
        const countAction = await commentRepository.getCountAction(id);
        return countAction;
    }

    public async removeComment(id:number):Promise<UpdateResult> {
        const remove = await commentRepository.removeComment(id);
        return remove;
    }
}

export const commentService = new CommentService();
