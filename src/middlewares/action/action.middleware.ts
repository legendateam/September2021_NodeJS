import { NextFunction, Response } from 'express';

import { actionRepository } from '../../repositories';
import { actionSchema } from '../../helpers';
import { IAction, IRequestAction } from '../../interfaces';
import { ErrorHandler } from '../../error';

class ActionMiddleware {
    public fieldsFilled(req:IRequestAction, _:Response, next:NextFunction): void {
        try {
            const { _like, _dislike } = req.body;
            if ((_like === 1 && _dislike === 1) || (_like === 0 && _dislike === 0) || (!_like && !_dislike)) {
                next(new ErrorHandler('Data Invalid'));
                return;
            }

            const { error, value } = actionSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler('Data Invalid'));
                return;
            }

            req.action = value;
            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUniqueUser(req:IRequestAction, _:Response, next:NextFunction):Promise<void> {
        try {
            const { commentId, userId } = req.action as IAction;
            const action = await actionRepository.checkUniqueUser(userId, commentId);

            if (action) {
                next(new ErrorHandler('can\'t add a review again', 406));
                return;
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const actionMiddleware = new ActionMiddleware();
