import { IUser } from '../../user.interface';
import { IRole } from '../../role.interface';

export interface IRoleServiceAbstraction {
    addRole(user:IUser):Promise<IRole>,
    getRole(user:IUser):Promise<IRole | undefined>
}
