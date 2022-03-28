import { UpdateResult } from 'typeorm';
import { userRepository } from '../../repositories/user/user.repository';
import { IUpdateFields, IUsers } from '../../interfaces/users.interface';

class UserService {
    public async getAll():Promise<IUsers[]> {
        const users = await userRepository.getAll();
        return users;
    }

    public async getOne(id:Number): Promise<IUsers | undefined> {
        const user = await userRepository.getOne(id);
        return user;
    }

    public async addOne(user:IUsers):Promise<IUsers> {
        return userRepository.addOne(user);
    }

    public async updateFields(id:number, newValueFields: IUpdateFields):Promise<UpdateResult> {
        const update = await userRepository.updateFields(id, newValueFields);
        return update;
    }

    public async remove(id:number):Promise<UpdateResult> {
        const remove = await userRepository.softDelete(id);
        return remove;
    }
}

export const userService = new UserService();
