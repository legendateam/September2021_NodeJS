import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../request/request.interface';

export interface IDepartmentAbstraction {
    getAll(_: IRequestExtended, res: Response, next: NextFunction): Promise<void>,
    getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void>,
    addOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void>,
    removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void>
}
