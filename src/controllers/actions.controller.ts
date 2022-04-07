import { Request, Response } from 'express';

import { actionService } from '../services';
import { IAction, IRequestAction } from '../interfaces';

class ActionsController {
    public async getAll(_: Request, res:Response):Promise<Response<IAction[]>> {
        const actions = await actionService.getAll();
        return res.json(actions);
    }

    public async addAction(req:IRequestAction, res:Response):Promise<Response<IAction>> {
        const action = await actionService.addAction(req.action as IAction);
        return res.json(action);
    }

    public async getComments(req:Request, res:Response):Promise<Response<IAction[]>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const actions = await actionService.getComments(id);
        return res.json(actions);
    }
}

export const actionsController = new ActionsController();
