import { UpdateResult } from 'typeorm';

import { commentRepository } from '../../repositories';
import { IComment, ICommentServiceAbstraction, ICountAction } from '../../interfaces';

class CommentService implements ICommentServiceAbstraction {
    public async getAll():Promise<IComment[]> {
        const comments = await commentRepository.getAll();
        return comments;
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
