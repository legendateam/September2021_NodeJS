import { IRole, IUser } from '../../interfaces';
import { roleRepository } from '../../repositories';

class RoleService {
    public async addRole(user:IUser):Promise<IRole> {
        const role = await roleRepository.createRole(user);
        return role;
    }

    public async getRole(user:IUser):Promise<IRole | undefined> {
        const role = await roleRepository.getRole(user);
        return role;
    }
}

export const roleService = new RoleService();
