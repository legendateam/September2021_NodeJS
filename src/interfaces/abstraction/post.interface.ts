import { UpdateResult } from 'typeorm';
import { IPosts } from '../posts.interface';

export interface IPostAbstraction {
    getAll():Promise<IPosts[]>,
    getOneById(id:number):Promise<IPosts | undefined>,
    addOne(post:IPosts):Promise<IPosts>,
    getUserPosts(userId:number):Promise<IPosts[]>,
    updateFieldValue(id:number, text:string):Promise<UpdateResult>,
    removeOne(id:number):Promise<UpdateResult>
}
