import { NextFunction, Request, Response } from 'express';

import { UpdateResult } from 'typeorm';
import { IUser } from '../../user.interface';
import { IRequestUser } from '../../request/requestUser.interface';
import { IPagination } from '../../pagination.interface';

export interface IUserControllerAbstraction {
    getAllPagination(
        req: IRequestUser,
        res:Response,
        next: NextFunction,
    )
        :Promise<Response<Partial<IPagination<IUser>>> | undefined>,
    getOne(req:Request, res:Response, next: NextFunction):Promise<Response<IUser> | undefined>,
    addOne(req:Request, res: Response, next: NextFunction):Promise<Response<IUser> | undefined>,
    updateFields(req:IRequestUser, res:Response, next: NextFunction):Promise<Response<IUser> | undefined>,
    remove(req:Request, res:Response, next:NextFunction):Promise<Response<UpdateResult> | undefined>,
}
