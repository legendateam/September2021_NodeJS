import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../request/request.interface';

export interface ITeacherControllerAbstraction {
    getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void>,
    getOne(req: IRequestExtended, res: Response, next: NextFunction):Promise<void>,
    createOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void>,
    removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void>
}
