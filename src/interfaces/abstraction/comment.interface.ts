import { UpdateResult } from 'typeorm';
import { IComments } from '../comments.interface';
import { ICountAction } from '../countAction.interface';

export interface ICommentAbstraction {
    getAll():Promise<IComments[]>,
    getOne(commentId:number):Promise<IComments | undefined>,
    addOne(comment:IComments):Promise<IComments>,
    getUserComment(authorId:number):Promise<IComments[]>,
    updateText(id:number, text:string):Promise<UpdateResult>,
    getCountAction(id:number):Promise<ICountAction>,
    removeComment(id:number):Promise<UpdateResult>
}
