import { IUserMongoose } from './userMongoose.interface';
import { IDepartment } from './department.interface';
import { ISubject } from './subject.interface';
import { IRating } from './rating.interface';
import { ITeacher } from './teacher.interface';
import { IGroup } from './group.interface';

export interface IStudent extends IUserMongoose{
    formOfEducation: string,
    group: IGroup,
    department: IDepartment,
    curator: ITeacher,
    subjects: ISubject[],
    ratings: IRating[],
    teachers: ITeacher[]
}
