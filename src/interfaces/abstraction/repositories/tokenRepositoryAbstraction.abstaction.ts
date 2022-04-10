import { DeleteResult, UpdateResult } from 'typeorm';

import { IToken, ITokensRepository } from '../../token.interface';

export interface ITokenAbstraction {
    saveToken(refreshToken:ITokensRepository):Promise<ITokensRepository>,
    updateToken(tokensPair: ITokensRepository):Promise<UpdateResult>,
    findToken(userId:number):Promise<ITokensRepository | undefined>,
    deleteUserTokenPair(userId: Partial<IToken>): Promise<DeleteResult>
}
