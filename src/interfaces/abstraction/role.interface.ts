import { IUsers } from '../users.interface';
import { IRole } from '../role.interface';

export interface IRoleAbstraction {
    createRole({ id }:IUsers):Promise<IRole>,
    getRole({ id }:IUsers):Promise<IRole | undefined>
}
