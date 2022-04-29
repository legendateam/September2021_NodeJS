import { Model } from 'mongoose';

import { IStudent } from '../student.interface';

export interface IStudentModel extends Model<IStudent>{
    hash(student: IStudent) : Promise<IStudent>
}
