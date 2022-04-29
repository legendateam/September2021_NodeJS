import { Request } from 'express';

import { ITeacher } from '../teacher.interface';
import { IPaginationQuery } from '../pagination.interface';
import { IStudent } from '../student.interface';
import { ISubject } from '../subject.interface';
import { IRating } from '../rating.interface';
import { IGroup } from '../group.interface';
import { IDepartment } from '../department.interface';
import { ICorpus } from '../corpus.interface';

export interface IRequestExtended extends Request{
    _id?: string,
    teacher?: ITeacher,
    pagination?: Partial<IPaginationQuery<ITeacher>>,
    student?: IStudent,
    subject?: ISubject,
    rating?: IRating,
    group?: IGroup,
    department?: IDepartment,
    corpus?: ICorpus,
}
