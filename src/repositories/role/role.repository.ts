import {
    EntityRepository, getManager, Repository,
} from 'typeorm';

import { RoleEntity } from '../../entity/role.entity';
import { IRole } from '../../interfaces/role.inreface';
import { IUsers } from '../../interfaces/users.interface';

@EntityRepository(RoleEntity)
class RoleRepository extends Repository<RoleEntity> {
    public async createRole({ id }:IUsers):Promise<IRole> {
        const role = await getManager()
            .getRepository(RoleEntity)
            .save({ userId: id });
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
