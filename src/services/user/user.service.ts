import { UpdateResult } from 'typeorm';
import bcrypt from 'bcrypt';

import { userRepository } from '../../repositories';
import { IUpdateFields, IUser } from '../../interfaces';
import { config } from '../../configs';

class UserService {
    public async getAll():Promise<IUser[]> {
        const users = await userRepository.getAll();
        return users;
    }

    public async getOne(id:Number): Promise<IUser | undefined> {
        const user = await userRepository.getOne(id);
        return user;
    }

    public async addOne(user:IUser) {
        const { password } = user;
        const passwordHashed = await this._hashPassword(password);
        const data = { ...user, password: passwordHashed };
        const createUser = await userRepository.addOne(data);
        return createUser;
    }

    public async updateFields(id:number, newValueFields: IUpdateFields):Promise<UpdateResult> {
        const { password } = newValueFields;
        const hashPassword = await this._hashPassword(password);
        const data = { ...newValueFields, password: hashPassword };
        const update = await userRepository.updateFields(id, data);
        return update;
    }

    public async remove(id:number):Promise<UpdateResult> {
        const remove = await userRepository.softDelete(id);
        return remove;
    }

    public async checkPassword(password: string, hashPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashPassword);
    }

    private async _hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, Number(config.USER_SALT_ROUNDS));
    }
}

export const userService = new UserService();
