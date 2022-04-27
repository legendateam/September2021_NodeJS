import { Model } from 'mongoose';

import { ITeacher } from '../teacher.interface';

export interface ITeacherModel extends Model<ITeacher> {
    hashPassword(teacher : ITeacher): Promise<ITeacher>
}
