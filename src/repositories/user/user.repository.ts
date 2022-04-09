import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { UsersEntity } from '../../entity';
import { IUpdateFields, IUser, IUserAbstraction } from '../../interfaces';

@EntityRepository(UsersEntity)
class UserRepository extends Repository<UsersEntity> implements IUserAbstraction {
    public async getAll():Promise<IUser[]> {
        const users = await getManager()
            .getRepository(UsersEntity)
            .find();
        return users;
    }

    public async getOne(id:number): Promise<IUser | undefined> {
        const user = await getManager()
            .getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.id = :id', { id })
            .getOne();
        return user;
    }

    public async getOneByEmailOrByPhone(email:string, phone?:string):Promise<IUser | undefined> {
        const user = await getManager()
            .getRepository(UsersEntity)
            .createQueryBuilder('user')
            .andWhere('user.email = :email', { email })
            .orWhere('user.phone = :phone', { phone })
            .getOne();
        return user;
    }

    public async addOne(user:IUser):Promise<IUser> {
        const newUsers = await getManager()
            .getRepository(UsersEntity)
            .save(user);
        return newUsers;
    }

    public async updateFields(id:number, { password, phone, email }:IUpdateFields)
        :Promise<UpdateResult> {
        const update = await getManager()
            .getRepository(UsersEntity)
            .update({ id }, {
                password,
                email,
                phone,
            });
        return update;
    }

    public async softDelete(id:number):Promise<UpdateResult> {
        const remove = await getManager()
            .getRepository(UsersEntity)
            .softDelete({ id });
        return remove;
    }
}

export const userRepository = new UserRepository();
