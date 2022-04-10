import { UpdateResult } from 'typeorm';

import { IPost } from '../../post.interface';

export interface IPostServiceAbstraction {
    getAll():Promise<IPost[]>,
    getOne(id:number):Promise<IPost | undefined>,
    addOne(post:IPost):Promise<IPost>,
    getUserPosts(id:number):Promise<IPost[]>,
    updateFieldValue(id:number, text: string):Promise<UpdateResult>,
    removeOne(id:number):Promise<UpdateResult>
}
