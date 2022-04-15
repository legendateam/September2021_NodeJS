import { IUser } from './user.interface';
import { ICommonFields } from './commonFields.interface';

export interface IToken {
    refreshToken: string,
    accessToken: string,
    userId: number,
    user? : IUser
}

export interface ITokenPair {
    accessToken: string,
    refreshToken: string
}

export interface ITokensRepository {
    accessToken: string,
    refreshToken: string,
    userId: number
}

export interface IRoleToken {
    accessToken: string,
    refreshToken: string,
    userId: number,
    role: string
}

export interface IForgotToken {
    forgotToken: string,
}

export interface IForgotTokenRepository {
    token: string,
    userId: number
}

export interface IVerifyTokens extends IRoleToken {
    forgotToken: string,
    email: string,
}

export interface IForgotPasswordEntity extends ICommonFields {
    userId: number,
    token: string,
}
