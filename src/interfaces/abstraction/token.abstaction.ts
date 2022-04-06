import { UpdateResult } from 'typeorm';

import { IToken, ITokensRepository } from '../token.interface';

export interface ITokenAbstaction {
    saveToken(refreshToken:ITokensRepository):Promise<ITokensRepository>,
    updateToken(tokensPair: ITokensRepository):Promise<UpdateResult>,
    findToken(userId:number):Promise<ITokensRepository | undefined>,
    deleteUserTokenPair(userId: Partial<IToken>): Promise<void>
}
