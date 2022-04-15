import jwt from 'jsonwebtoken';
import { DeleteResult, UpdateResult } from 'typeorm';

import { config } from '../../configs';
import {
    IForgotPasswordEntity,
    IForgotToken, IForgotTokenRepository,
    IRole, ITokenPair, ITokenServiceAbstraction, ITokensRepository, IVerifyTokens,
} from '../../interfaces';
import { forgotTokenRepository, tokensRepository } from '../../repositories';
import { JwtEnum } from '../../enums';

class TokenService implements ITokenServiceAbstraction {
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

    public async deleteTokenPair(userId:number): Promise<DeleteResult> {
        return tokensRepository.deleteUserTokenPair({ userId });
    }

    public async verifyTokens(token: string, type = JwtEnum.access): Promise<IVerifyTokens> {
        let secretWord = config.SECRET_ACCESS_KEY;

        if (type === JwtEnum.refresh) {
            secretWord = config.SECRET_REFRESH_KEY;
        }

        if (type === JwtEnum.forgot) {
            secretWord = config.SECRET_FORGOT_PASSWORD_KEY;
        }

        return jwt.verify(token, secretWord as string) as IVerifyTokens;
    }

    public async findToken(userId: number):Promise<ITokensRepository | undefined> {
        return tokensRepository.findToken(userId);
    }

    public async generateForgotToken({ userId, email }: any): Promise<IForgotToken> {
        const forgotToken = jwt.sign(
            { userId, email },
            config.SECRET_FORGOT_PASSWORD_KEY as string,
            { expiresIn: config.EXPIRES_IN_FORGOT_PASSWORD },
        );

        return { forgotToken };
    }

    public async saveForgotPasswordToken(token: IForgotTokenRepository): Promise<IForgotPasswordEntity> {
        return forgotTokenRepository.addToken(token);
    }

    public async deleteForgotPasswordToken(tokenData: Partial<IForgotTokenRepository>): Promise<DeleteResult> {
        return forgotTokenRepository.deleteToken(tokenData);
    }

    public async findForgotPasswordToken(userId: Partial<IForgotTokenRepository>): Promise<IForgotPasswordEntity | undefined> {
        return forgotTokenRepository.findToken(userId);
    }
}

export const tokenService = new TokenService();
