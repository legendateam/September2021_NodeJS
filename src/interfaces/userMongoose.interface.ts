import { IAddress } from './street.interface';

export interface IUserMongoose {
    firstName: string,
    lastName: string,
    age: number,
    email: string,
    address: IAddress,
    role: string,
    password: string,
}
