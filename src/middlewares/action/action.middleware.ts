import { NextFunction, Response } from 'express';

import { actionRepository } from '../../repositories';
import { actionSchema } from '../../helpers';
import { IAction, IRequestAction } from '../../interfaces';

class ActionMiddleware {
    public async fieldsFilled(req:IRequestAction, res:Response, next:NextFunction):Promise<void> {
        try {
            const { _like, _dislike } = req.body;
            if ((_like === 1 && _dislike === 1) || (_like === 0 && _dislike === 0) || (!_like && !_dislike)) {
                throw new Error('No valid action');
            }
            req.action = await actionSchema.validateAsync(req.body);
            next();
        } catch (e) {
            res.status(400).end((e as Error).message);
        }
    }

    public async checkUniqueUser(req:IRequestAction, res:Response, next:NextFunction):Promise<void> {
        try {
            const { commentId, userId } = req.action as IAction;
            const action = await actionRepository.checkUniqueUser(userId, commentId);

            if (action) {
                throw new Error('can\'t add a review again');
            }
            next();
        } catch (e) {
            res.status(405).end((e as Error).message);
        }
    }
}

export const actionMiddleware = new ActionMiddleware();
