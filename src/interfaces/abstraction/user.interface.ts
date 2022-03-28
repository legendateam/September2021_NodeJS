import { UpdateResult } from 'typeorm';
import { IUpdateFields, IUsers } from '../users.interface';

export interface IUserAbstraction {
    getAll():Promise<IUsers[]>,
    getOne(id:Number): Promise<IUsers | undefined>,
    getOneByEmailOrByPhone(email:string, phone:string):Promise<IUsers | undefined>,
    addOne(user:IUsers):Promise<IUsers>,
    updateFields(id:number, { password, phone, email }:IUpdateFields)
        :Promise<UpdateResult>,
    softDelete(id:number):Promise<UpdateResult>
}
