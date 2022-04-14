import { UpdateResult } from 'typeorm';
import { IUpdateFields, IUser } from '../../user.interface';

export interface IUserAbstraction {
    getAll():Promise<IUser[]>,
    getOne(id:number): Promise<IUser | undefined>,
    getOneByEmailOrByPhone(email:string, phone:string):Promise<IUser | undefined>,
    addOne(user:IUser):Promise<IUser>,
    updateWithPass(id:number, { password, phone, email }:IUpdateFields)
        :Promise<UpdateResult>,
    updateWithoutPass(id:number, { phone, email }:IUpdateFields)
        :Promise<UpdateResult>,
    softDelete(id:number):Promise<UpdateResult>,
    forgotPassword(id:number, password: string):Promise<UpdateResult>
}
