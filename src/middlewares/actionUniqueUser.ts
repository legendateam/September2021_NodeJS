import { Response, Request, NextFunction } from 'express';

import { actionRepository } from '../repositories';

export const actionUniqueUser = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const { commentId, userId } = req.body;
        const id = Number(userId);
        const idComment = Number(commentId);
        const action = await actionRepository.checkUniqueUser(id, idComment);

        if (action) {
            throw new Error('can\'t add a review again');
        }
        next();
    } catch (e) {
        res.status(405).end((e as Error).message);
    }
};
