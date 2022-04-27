import { Request } from 'express';

import { ITeacher } from '../teacher.interface';
import { IPaginationQuery } from '../pagination.interface';

export interface IRequestExtended extends Request{
    _id?: string,
    teacher?: ITeacher,
    pagination?: Partial<IPaginationQuery<ITeacher>>,
}
