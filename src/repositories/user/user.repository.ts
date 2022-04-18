import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { UsersEntity } from '../../entity';
import {
    IPagination, IPaginationUser, IUpdateFields, IUser, IUserAbstraction,
} from '../../interfaces';

dayjs.extend(utc);

@EntityRepository(UsersEntity)
class UserRepository extends Repository<UsersEntity> implements IUserAbstraction {
    public async getAllPagination({ page, perPage, user }:Partial<IPaginationUser>, skip: number): Promise<Partial<IPagination<IUser>>> {
        const [users, countItem] = await getManager()
            .getRepository(UsersEntity)
            .findAndCount({
                where: user,
                skip,
                take: perPage,
            });

        return {
            page,
            perPage,
            countItem,
            data: users,
        };
    }

    public async getNewAll():Promise<IUser[]> {
        return getManager()
            .getRepository(UsersEntity)
            .createQueryBuilder('user')
            .where('user.createAt >= :date', { date: dayjs().utc().startOf('day').format() })
            .getMany();
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
            .where('user.email = :email', { email })
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

    public async updateWithPass(id:number, { password, phone, email }:IUpdateFields)
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

    public async updateWithoutPass(id:number, { phone, email }:IUpdateFields)
        :Promise<UpdateResult> {
        const update = await getManager()
            .getRepository(UsersEntity)
            .update({ id }, {
                email,
                phone,
            });
        return update;
    }

    public async forgotPassword(id:number, password: string):Promise<UpdateResult> {
        const update = await getManager()
            .getRepository(UsersEntity)
            .update({ id }, {
                password,
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
