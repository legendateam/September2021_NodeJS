import { IAddress } from './street.interface';
import { IDepartment } from './department.interface';
import { ISubject } from './subject.interface';

export interface ICorpus {
    number: number,
    address: IAddress,
    department?: IDepartment,
    subjects?: ISubject[]
}
