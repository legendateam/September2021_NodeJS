import { UpdateResult } from 'typeorm';

import { IComment } from '../../comment.interface';
import { IDate } from '../../date.interface';
import { IPagination } from '../../pagination.interface';
import { CommentsEntity} from '../../../entity';
import {ICountAction} from "../../countAction.interface";

export interface ICommentAbstraction {
    getAllPagination(page: number, perPage : number, skip: number):Promise<Partial<IPagination<CommentsEntity>>>,
    getNewAll({ date }: IDate):Promise<IComment[]>,
    getOne(commentId:number):Promise<IComment | undefined>,
    addOne(comment:IComment):Promise<IComment>,
    getUserComment(authorId:number):Promise<IComment[]>,
    updateText(id:number, text:string):Promise<UpdateResult>,
    getCountAction(id:number): Promise<ICountAction>,
    removeComment(id:number):Promise<UpdateResult>
}
