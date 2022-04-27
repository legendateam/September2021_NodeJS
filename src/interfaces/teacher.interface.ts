import { IStreet } from './street.interface';

export interface ITeacher {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    address: IStreet,
    role: string,
    password: string,
    department?: any,
    subjects?: any[],
    corpus?: any[]
}
