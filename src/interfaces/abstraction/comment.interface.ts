import { UpdateResult } from 'typeorm';

import { IComment } from '../comment.interface';
import { ICountAction } from '../countAction.interface';

export interface ICommentAbstraction {
    getAll():Promise<IComment[]>,
    getOne(commentId:number):Promise<IComment | undefined>,
    addOne(comment:IComment):Promise<IComment>,
    getUserComment(authorId:number):Promise<IComment[]>,
    updateText(id:number, text:string):Promise<UpdateResult>,
    getCountAction(id:number):Promise<ICountAction>,
    removeComment(id:number):Promise<UpdateResult>
}
