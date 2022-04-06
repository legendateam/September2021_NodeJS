import {
    EntityRepository, getManager, Repository,
} from 'typeorm';

import { RoleEntity } from '../../entity';
import { IRole, IRoleAbstraction, IUsers } from '../../interfaces';

@EntityRepository(RoleEntity)
class RoleRepository extends Repository<RoleEntity> implements IRoleAbstraction {
    public async createRole({ id }:IUsers):Promise<IRole> {
        const role = await getManager()
            .getRepository(RoleEntity)
            .save({ userId: id });
        return role;
    }

    public async getRole({ id }:IUsers):Promise<IRole | undefined> {
        const role = await getManager()
            .getRepository(RoleEntity)
            .findOne({ userId: id });
        return role;
    }

    // public async changeRole(userId:number, role:string):Promise<UpdateResult> {
    //     const newRole = await getManager()
    //         .getRepository(RoleEntity)
    //         .update({ userId }, {
    //             role,
    //         });
    //     return newRole;
    // }
}

export const roleRepository = new RoleRepository();
