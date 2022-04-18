import { UpdateResult } from 'typeorm';
import { IPost } from '../../post.interface';
import { IRepoPost } from '../../request/requestPost.interface';
import { IPagination } from '../../pagination.interface';
import { PostsEntity } from '../../../entity';

export interface IPostAbstraction {
    getAllPagination({ pagination: { post, perPage, page }, skip }:IRepoPost):Promise<Partial<IPagination<PostsEntity>>>,
    getNewAll(date: string):Promise<IPost[]>,
    getOneById(id:number):Promise<IPost | undefined>,
    addOne(post:IPost):Promise<IPost>,
    getUserPosts(userId:number):Promise<IPost[]>,
    updateFieldValue(id:number, text:string):Promise<UpdateResult>,
    removeOne(id:number):Promise<UpdateResult>
}
