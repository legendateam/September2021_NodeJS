import { UpdateResult } from 'typeorm';
import { IPost } from '../post.interface';

export interface IPostAbstraction {
    getAll():Promise<IPost[]>,
    getOneById(id:number):Promise<IPost | undefined>,
    addOne(post:IPost):Promise<IPost>,
    getUserPosts(userId:number):Promise<IPost[]>,
    updateFieldValue(id:number, text:string):Promise<UpdateResult>,
    removeOne(id:number):Promise<UpdateResult>
}
