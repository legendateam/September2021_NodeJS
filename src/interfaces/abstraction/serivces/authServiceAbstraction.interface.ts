import { IUser } from '../../user.interface';
import { IRoleToken } from '../../token.interface';

export interface IAuthServiceAbstraction {
    registration(user:IUser):Promise<IRoleToken>,
    newTokens(user:IUser): Promise<IRoleToken>,
}
