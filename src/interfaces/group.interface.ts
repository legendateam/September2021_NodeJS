import { IDepartment } from './department.interface';
import { ITeacher } from './teacher.interface';
import { ISubject } from './subject.interface';
import { ICorpus } from './corpus.interface';

export interface IGroup {
    name: string,
    course: number,
    department?: IDepartment,
    curator?: ITeacher,
    subjects?: ISubject[],
    corpus?: ICorpus[]
}
