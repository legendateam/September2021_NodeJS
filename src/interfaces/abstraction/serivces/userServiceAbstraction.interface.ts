import { UpdateResult } from 'typeorm';

import { IUpdateFields, IUser } from '../../user.interface';
import { IPagination } from '../../pagination.interface';
import { IRequestUser } from '../../request/requestUser.interface';

export interface IUserServiceAbstraction {
    getAllPagination(pagination: Partial<IRequestUser>): Promise<Partial<IPagination<IUser>>>,
    getNewAll():Promise<IUser[]>,
    getOneById(id:number): Promise<IUser | undefined>,
    getOneByEmailOrPhone(email: string, phone?: string): Promise<IUser | undefined>,
    addOne(user:IUser): Promise<IUser>,
    updateWithPass(id:number, newValueFields: IUpdateFields):Promise<UpdateResult>,
    updateWithoutPass(id:number, newValueFields: IUpdateFields):Promise<UpdateResult>,
    remove(id:number):Promise<UpdateResult>,
    forgotPassword(id: number, password: string): Promise<UpdateResult>,
    checkPassword(password: string, hashPassword: string): Promise<boolean>
}
