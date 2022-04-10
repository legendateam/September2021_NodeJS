import { IUser } from './user.interface';

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
