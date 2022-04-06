import { IUsers } from './users.interface';

export interface IToken {
    id:number,
    refreshToken: string,
    accessToken: string,
    userId: number,
    user? : IUsers
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
