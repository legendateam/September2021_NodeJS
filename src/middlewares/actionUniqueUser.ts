import { Response, Request, NextFunction } from 'express';
import { getManager } from 'typeorm';

import { ActionsEntity } from '../entity/actions.entity';

export const actionUniqueUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { commentId, userId } = req.body;
        const id = Number(userId);
        const idComment = Number(commentId);
        const action = await getManager()
            .getRepository(ActionsEntity)
            .createQueryBuilder('action')
            .where(`action.userId = ${id}`)
            .andWhere(`action.commentId = ${idComment}`)
            .getOne();

        if (action) {
            throw new Error('can\'t add a review again');
        }
        next();
    } catch (e) {
        res.status(405).end((e as Error).message);
    }
};
