import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { TokensEntity } from '../../entity';
import { IRefreshToken, ITokenAbstaction } from '../../interfaces';

@EntityRepository(TokensEntity)
class TokensRepository extends Repository<TokensEntity> implements ITokenAbstaction {
    public async saveToken(refreshToken:IRefreshToken):Promise<IRefreshToken> {
        const token = await getManager()
            .getRepository(TokensEntity)
            .save(refreshToken);
        return token;
    }

    public async updateToken(tokenRefresh: IRefreshToken):Promise<UpdateResult> {
        const { userId, refreshToken } = tokenRefresh;
        const token = await getManager()
            .getRepository(TokensEntity)
            .update({ userId }, {
                refreshToken,
            });
        return token;
    }

    public async findToken(userId:number):Promise<IRefreshToken | undefined> {
        const token = await getManager()
            .getRepository(TokensEntity)
            .findOne({ userId });
        return token;
    }
}

export const tokensRepository = new TokensRepository();
