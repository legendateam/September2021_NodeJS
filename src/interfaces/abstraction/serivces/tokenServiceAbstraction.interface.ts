import { DeleteResult, UpdateResult } from 'typeorm';

import { IRole } from '../../role.interface';
import { ITokenPair, ITokensRepository, IVerifyTokens } from '../../token.interface';
import { JwtEnum } from '../../../enums';

export interface ITokenServiceAbstraction {
    generateTokenPair(payload:IRole):Promise<ITokenPair>,
    saveToken(tokensPair:ITokensRepository):Promise<ITokensRepository | UpdateResult>,
    deleteTokenPair(userId:number): Promise<DeleteResult>,
    verifyTokens(token: string, type : JwtEnum.access | JwtEnum.refresh | JwtEnum.forgot): Promise<Partial<IVerifyTokens>>,
    findToken(userId: number):Promise<ITokensRepository | undefined>
}
