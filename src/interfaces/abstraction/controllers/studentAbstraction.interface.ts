import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../request/request.interface';

export interface IStudentAbstraction {
    getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void>
}
