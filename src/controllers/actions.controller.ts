import { Request, Response } from 'express';

import { actionService } from '../services/action/action.service';
import { IActions } from '../interfaces/actions.interface';

class actionsController {
    public static async getAll(_:any, res:Response):Promise<Response<IActions[]>> {
        const actions = await actionService.getAll();
        return res.json(actions);
    }

    public static async addAction(req:Request, res:Response):Promise<Response<IActions>> {
        const action = await actionService.addAction(req.body);
        return res.json(action);
    }

    public static async getComments(req:Request, res:Response):Promise<Response<IActions[]>> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const actions = await actionService.getComments(id);
        return res.json(actions);
    }
}

export const { getAll, addAction, getComments } = actionsController;
