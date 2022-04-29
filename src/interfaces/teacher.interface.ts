import { IUserMongoose } from './userMongoose.interface';
import {IDepartment} from "./department.interface";
import {ISubject} from "./subject.interface";
import {ICorpus} from "./corpus.interface";

export interface ITeacher extends IUserMongoose {
    department: IDepartment,
    subjects: ISubject[],
    corpus: ICorpus[]
}
