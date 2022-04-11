import { UpdateResult } from 'typeorm';

import { IUpdateFields, IUser } from '../../user.interface';

export interface IUserServiceAbstraction {
    getAll():Promise<IUser[]>,
    getOne(id:number): Promise<IUser | undefined>,
    addOne(user:IUser): Promise<IUser>,
    updateWithPass(id:number, newValueFields: IUpdateFields):Promise<UpdateResult>,
    updateWithoutPass(id:number, newValueFields: IUpdateFields):Promise<UpdateResult>,
    remove(id:number):Promise<UpdateResult>,
    checkPassword(password: string, hashPassword: string): Promise<boolean>
}
