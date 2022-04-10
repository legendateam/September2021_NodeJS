import { NextFunction, Request, Response } from 'express';

import { IRequestAction } from '../../request/requestAction.interface';
import { IAction } from '../../action.interface';

export interface IActionControllerAbstraction {
    getAll(_: Request, res:Response, next: NextFunction):Promise<Response<IAction[]> | undefined>
    addAction(req:IRequestAction, res:Response, next: NextFunction):Promise<Response<IAction> | undefined>
    getComments(req:Request, res:Response, next: NextFunction):Promise<Response<IAction[]> | undefined>
}
