import { DeleteResult } from 'typeorm';

import { IForgotPasswordEntity, IForgotTokenRepository } from '../../token.interface';

export interface IForgotokenRepositoryAbstraction {
    addToken(newToken: IForgotTokenRepository): Promise<IForgotPasswordEntity>,
    deleteToken(token: IForgotTokenRepository): Promise<DeleteResult>,
    findToken({ userId }: Partial<IForgotTokenRepository>): Promise<IForgotPasswordEntity | undefined>
}
