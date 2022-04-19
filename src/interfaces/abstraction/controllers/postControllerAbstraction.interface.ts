import { NextFunction, Request, Response } from 'express';

import { UpdateResult } from 'typeorm';
import { IPost } from '../../post.interface';
import { IRequestPost } from '../../request/requestPost.interface';

export interface IPostControllerAbstraction {
    getAllPagination(_: Request, res:Response, next: NextFunction):Promise<Response<IPost[]> | undefined>,
    getOne(req:Request, res:Response, next: NextFunction):Promise<Response<IPost> | undefined>,
    addOne(req:IRequestPost, res:Response, next: NextFunction):Promise<Response<IPost> | undefined>,
    getUserPosts(req:Request, res:Response, next: NextFunction):Promise<Response<IPost[]> | undefined>,
    updateFieldValue(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined>,
    removeOne(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined>,
}
