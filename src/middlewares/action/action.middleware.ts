import { NextFunction, Response } from 'express';

import { actionRepository } from '../../repositories';
import { actionSchema } from '../../helpers';
import { IAction, IRequestAction } from '../../interfaces';
import { ErrorHandler } from '../../error';

class ActionMiddleware {
    public fieldsFilled(req:IRequestAction, _:Response, next:NextFunction): void {
        try {
            const { isLike, isDisLike } = req.body;
            if ((isLike === 1 && isDisLike === 1) || (isLike === 0 && isDisLike === 0) || (!isLike && !isDisLike)) {
                next(new ErrorHandler('Data Invalid'));
                return;
            }

            const { error, value } = actionSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
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
