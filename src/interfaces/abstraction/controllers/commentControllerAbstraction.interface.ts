import { NextFunction, Request, Response } from 'express';

import { UpdateResult } from 'typeorm';
import { IComment } from '../../comment.interface';
import { IRequestComment } from '../../request/requestComment.interface';

export interface ICommentControllerAbstraction {
    getAllPagination(req: Request, res:Response, next: NextFunction): Promise<void>,
    getOne(req:Request, res:Response, next: NextFunction):Promise<Response<IComment> | undefined>,
    addOne(req:IRequestComment, res:Response, next: NextFunction):Promise<Response<IComment> | undefined>,
    getUserComments(req:Request, res:Response, next: NextFunction):Promise<Response<IComment[]> | undefined>,
    updateText(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined>,
    getCountAction(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined>,
    remove(req:Request, res:Response, next: NextFunction):Promise<Response<UpdateResult> | undefined>
}
