import { Response } from 'express';
import { getManager } from 'typeorm';
import { ActionsEntity } from '../entity/actions.entity';

class actionsController {
    public static async getAll(_:any, res:Response) {
        const actions = await getManager()
            .getRepository(ActionsEntity)
            .createQueryBuilder('actions')
            .getMany();
        res.json(actions);
    }
}

export const { getAll } = actionsController;
