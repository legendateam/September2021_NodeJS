import { UpdateResult } from 'typeorm';
import { IComment } from '../../comment.interface';
import { ICountAction } from '../../countAction.interface';
import { IPagination } from '../../pagination.interface';
import { CommentsEntity } from '../../../entity';

export interface ICommentServiceAbstraction {
    getAllPagination(page: number, perPage: number):Promise<Partial<IPagination<CommentsEntity>>>,
    getOneById(id:number):Promise<IComment | undefined>,
    addOne(comment:IComment):Promise<IComment>,
    getUserComment(authorId:number):Promise<IComment[]>
    updateText(id:number, text: string):Promise<UpdateResult>,
    getCountAction(id:number):Promise<ICountAction>,
    removeComment(id:number):Promise<UpdateResult>
}
