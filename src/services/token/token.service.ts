import jwt from 'jsonwebtoken';
import { UpdateResult } from 'typeorm';

import { config } from '../../configs';
import { IRole, ITokenPair, ITokensRepository } from '../../interfaces';
import { tokensRepository } from '../../repositories';
import { JwtEnum } from '../../enums';

class TokenService {
    public async generateTokenPair(payload:IRole):Promise<ITokenPair> {
        const accessToken = jwt.sign(
            payload,
            config.SECRET_ACCESS_KEY as string,
            { expiresIn: config.EXPIRES_IN_ACCESS },
        );
        const refreshToken = jwt.sign(
            payload,
            config.SECRET_REFRESH_KEY as string,
            { expiresIn: config.EXPIRES_IN_REFRESH },
        );

        return {
            accessToken,
            refreshToken,
        };
    }

    public async saveToken(tokensPair:ITokensRepository):Promise<ITokensRepository | UpdateResult> {
        const { userId } = tokensPair;
        const tokensFromDB = await tokensRepository.findToken(userId);
        if (tokensFromDB) {
            tokensFromDB.refreshToken = tokensPair.refreshToken;
            tokensFromDB.accessToken = tokensPair.accessToken;
            return tokensRepository.updateToken(tokensFromDB);
        }
        return tokensRepository.saveToken(tokensPair);
    }

    public async deleteTokenPair(userId:number) {
        await tokensRepository.deleteUserTokenPair({ userId });
    }

    public async verifyTokens(token: string, type = JwtEnum.access): Promise<IRole> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (type === JwtEnum.refresh) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        return jwt.verify(token, secretWord as string) as IRole;
    }

    public async findToken(userId: number):Promise<ITokensRepository | undefined> {
        return tokensRepository.findToken(userId);
    }
}

export const tokenService = new TokenService();
