import { UpdateResult } from 'typeorm';

import { commentRepository } from '../../repositories/comment/comment.repository';
import { IComments } from '../../interfaces/comments.interface';
import { ICountAction } from '../../interfaces/countAction.interface';

class CommentService {
    public async getAll():Promise<IComments[]> {
        const comments = await commentRepository.getAll();
        return comments;
    }

    public async getOneById(id:number):Promise<IComments | undefined> {
        const comment = await commentRepository.getOne(id);
        return comment;
    }

    public async addOne(comment:IComments):Promise<IComments> {
        const newComment = await commentRepository.addOne(comment);
        return newComment;
    }

    public async getUserComment(authorId:number):Promise<IComments[]> {
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
