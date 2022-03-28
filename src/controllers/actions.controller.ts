import { Request, Response } from 'express';

import { actionService } from '../services/action/action.service';

class actionsController {
    public static async getAll(_:any, res:Response):Promise<void> {
        const actions = await actionService.getAll();
        res.json(actions);
    }

    public static async addAction(req:Request, res:Response):Promise<void> {
        const action = await actionService.addAction(req.body);
        res.json(action);
    }

    public static async getComments(req:Request, res:Response):Promise<void> {
        const { commentId } = req.params;
        const id = Number(commentId);
        const actions = await actionService.getComments(id);
        res.json(actions);
    }
}

export const { getAll, addAction, getComments } = actionsController;
