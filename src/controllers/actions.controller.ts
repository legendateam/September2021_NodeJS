import { Request, Response } from 'express';
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

    public static async addAction(req:Request, res:Response) {
        const action = await getManager()
            .getRepository(ActionsEntity)
            .save(req.body);
        res.json(action);
    }

    public static async getComments(req:Request, res:Response) {
        const { commentId } = req.params;
        const id = Number(commentId);
        const actions = await getManager()
            .getRepository(ActionsEntity)
            .createQueryBuilder('actions')
            .where(`actions.commentId = ${id}`)
            .innerJoinAndSelect('actions.comment', 'comment')
            .getMany();
        res.json(actions);
    }
}

export const { getAll, addAction, getComments } = actionsController;
