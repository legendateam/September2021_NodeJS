import { IRole, IUsers } from '../../interfaces';
import { roleRepository } from '../../repositories';

class RoleService {
    public async addRole(user:IUsers):Promise<IRole> {
        const role = await roleRepository.createRole(user);
        return role;
    }
}

export const roleService = new RoleService();
