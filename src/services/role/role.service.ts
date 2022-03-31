import { IRole } from '../../interfaces/role.inreface';
import { IUsers } from '../../interfaces/users.interface';
import { roleRepository } from '../../repositories/role/role.repository';

class RoleService {
    public async addRole(user:IUsers):Promise<IRole> {
        const role = await roleRepository.createRole(user);
        return role;
    }
}

export const roleService = new RoleService();
