import {
    DeleteResult, EntityRepository, getManager, Repository,
} from 'typeorm';

import { ForgotPasswordEntity } from '../../entity';
import { IForgotokenRepositoryAbstraction, IForgotPasswordEntity, IForgotTokenRepository } from '../../interfaces';

@EntityRepository(ForgotPasswordEntity)
class ForgotTokenRepository extends Repository<ForgotPasswordEntity> implements IForgotokenRepositoryAbstraction {
    public async addToken(newToken: IForgotTokenRepository): Promise<IForgotPasswordEntity> {
        const token = await getManager()
            .getRepository(ForgotPasswordEntity)
            .save(newToken);
        return token;
    }

    public async deleteToken(token: Partial<IForgotTokenRepository>): Promise<DeleteResult> {
        const deleteResult = await getManager()
            .getRepository(ForgotPasswordEntity)
            .delete(token);
        return deleteResult;
    }

    public async findToken({ userId }: Partial<IForgotTokenRepository>): Promise<IForgotPasswordEntity | undefined> {
        const find = await getManager()
            .getRepository(ForgotPasswordEntity)
            .createQueryBuilder('token')
            .where('token.userId = :userId', { userId })
            .getOne();
        return find;
    }
}

export const forgotTokenRepository = new ForgotTokenRepository();
