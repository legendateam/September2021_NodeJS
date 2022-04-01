import jwt from 'jsonwebtoken';
import { UpdateResult } from 'typeorm';

import { config } from '../../configs';
import { IRefreshToken, ITokenPair, IRole } from '../../interfaces';
import { tokensRepository } from '../../repositories';

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

    public async saveToken(refreshToken:IRefreshToken):Promise<IRefreshToken | UpdateResult> {
        const { userId } = refreshToken;
        const token = await tokensRepository.findToken(userId);
        if (token) {
            token.refreshToken = refreshToken.refreshToken;
            return tokensRepository.updateToken(token);
        }
        return tokensRepository.saveToken(refreshToken);
    }
}

export const tokenService = new TokenService();
