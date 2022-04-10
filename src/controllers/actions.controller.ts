import { NextFunction, Request, Response } from 'express';

import { actionService } from '../services';
import { IAction, IActionControllerAbstraction, IRequestAction } from '../interfaces';
import { ErrorHandler } from '../error';

class ActionsController implements IActionControllerAbstraction {
    public async getAll(_: Request, res:Response, next: NextFunction):Promise<Response<IAction[]> | undefined> {
        try {
            const actions = await actionService.getAll();
            if (!actions) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(actions);
        } catch (e) {
            next(e);
        }
    }

    public async addAction(req:IRequestAction, res:Response, next: NextFunction):Promise<Response<IAction> | undefined> {
        try {
            const action = await actionService.addAction(req.action as IAction);
            if (!action) {
                next(new ErrorHandler('Service Unavailable', 503));
                return;
            }
            res.json(action);
        } catch (e) {
            next(e);
        }
    }

    public async getComments(req:Request, res:Response, next: NextFunction):Promise<Response<IAction[]> | undefined> {
        try {
            const { commentId } = req.params;
            const id = Number(commentId);
            const actions = await actionService.getComments(id);
            if (!actions) {
                next(new ErrorHandler('Not Found', 404));
                return;
            }
            res.json(actions);
        } catch (e) {
            next(e);
        }
    }
}

export const actionsController = new ActionsController();
