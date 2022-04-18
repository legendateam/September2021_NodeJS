import { EntityRepository, getManager, Repository } from 'typeorm';

import { ActionsEntity } from '../../entity';
import { IAction, IActionAbstraction, IDate } from '../../interfaces';

@EntityRepository(ActionsEntity)
class ActionRepository extends Repository<ActionsEntity> implements IActionAbstraction {
    public async getAll():Promise<IAction[]> {
        const actions = await getManager()
            .getRepository(ActionsEntity)
            .createQueryBuilder('actions')
            .getMany();
        return actions;
    }

    public async getNewAll({ date }: IDate): Promise<IAction[]> {
        return getManager()
            .getRepository(ActionsEntity)
            .createQueryBuilder('actions')
            .where('actions.createAt >= :date', { date })
            .getMany();
    }

    public async addOne(action:IAction):Promise<IAction> {
        const newAction = await getManager()
            .getRepository(ActionsEntity)
            .save(action);
        return newAction;
    }

    public async getComments(commentId:number):Promise<IAction[]> {
        const actions = await getManager()
            .getRepository(ActionsEntity)
            .createQueryBuilder('actions')
            .where('actions.commentId = :commentId', { commentId })
            .innerJoinAndSelect('actions.comment', 'comment')
            .getMany();
        return actions;
    }

    public async checkUniqueUser(id:number, idComment:number):Promise<IAction | undefined> {
        const results = await getManager()
            .getRepository(ActionsEntity)
            .createQueryBuilder('action')
            .where('action.userId = :id', { id })
            .andWhere('action.commentId = :idComment', { idComment })
            .getOne();
        return results;
    }
}

export const actionRepository = new ActionRepository();
