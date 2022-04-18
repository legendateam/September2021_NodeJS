import { UpdateResult } from 'typeorm';

import { IPost } from '../../post.interface';
import { IPaginationPost } from '../../request/requestPost.interface';
import { IPagination } from '../../pagination.interface';
import { PostsEntity } from '../../../entity';

export interface IPostServiceAbstraction {
    getAllPagination(pagination: Partial<IPaginationPost>):Promise<Partial<IPagination<PostsEntity>>>,
    getNewAll():Promise<IPost[]>,
    getOne(id:number):Promise<IPost | undefined>,
    addOne(post:IPost):Promise<IPost>,
    getUserPosts(id:number):Promise<IPost[]>,
    updateFieldValue(id:number, text: string):Promise<UpdateResult>,
    removeOne(id:number):Promise<UpdateResult>
}
