import {
    EntityRepository, getManager, Repository, UpdateResult,
} from 'typeorm';

import { TokensEntity } from '../../entity';
import { ITokensRepository, IToken, ITokenAbstaction } from '../../interfaces';

@EntityRepository(TokensEntity)
class TokensRepository extends Repository<TokensEntity> implements ITokenAbstaction {
    public async saveToken(tokensPair:ITokensRepository):Promise<ITokensRepository> {
        const token = await getManager()
            .getRepository(TokensEntity)
            .save(tokensPair);
        return token;
    }

    public async updateToken(tokensPair: ITokensRepository):Promise<UpdateResult> {
        const { userId, accessToken, refreshToken } = tokensPair;
        const token = await getManager()
            .getRepository(TokensEntity)
            .update({ userId }, {
                accessToken,
                refreshToken,
            });
        return token;
    }

    public async findToken(userId:number):Promise<ITokensRepository | undefined> {
        const token = await getManager()
            .getRepository(TokensEntity)
            .findOne({ userId });
        return token;
    }

    public async deleteUserTokenPair(userId: Partial<IToken>): Promise<void> {
        await getManager().getRepository(TokensEntity).delete(userId);
    }
}

export const tokensRepository = new TokensRepository();
