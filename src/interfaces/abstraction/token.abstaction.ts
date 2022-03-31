import { IRefreshToken } from '../token.interface';

export interface ITokenAbstaction {
    saveToken(refreshToken:IRefreshToken):Promise<IRefreshToken>,
    findToken(userId:number):Promise<IRefreshToken | undefined>
}
