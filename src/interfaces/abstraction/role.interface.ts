import { IUser } from '../user.interface';
import { IRole } from '../role.interface';

export interface IRoleAbstraction {
    createRole({ id }:IUser):Promise<IRole>,
    getRole({ id }:IUser):Promise<IRole | undefined>
}
