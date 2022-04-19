import { NextFunction, Response } from 'express';

import { IRequestUser } from '../../request/requestUser.interface';
import { IRoleToken } from '../../token.interface';
import { IRequestAuth } from '../../request/requestAuth.interface';

export interface IAuthControllerAbstraction {
    registration(req: IRequestUser, res: Response, next: NextFunction):Promise<void>,
    logout(req: IRequestUser, res: Response, next: NextFunction): Promise<Response<string> | undefined>,
    login(req: IRequestUser, res: Response, next: NextFunction):Promise<Response<IRoleToken> | undefined>,
    refresh(req: IRequestAuth, res: Response, next: NextFunction):Promise<Response<IRoleToken> | undefined>,
}
