import { actionRepository } from '../../repositories';
import { IAction, IActionServiceAbstraction } from '../../interfaces';

class ActionService implements IActionServiceAbstraction {
    public async getAll():Promise<IAction[]> {
        const actions = await actionRepository.getAll();
        return actions;
    }

    public async addAction(action:IAction):Promise<IAction> {
        const newAction = await actionRepository.addOne(action);
        return newAction;
    }

    public async getComments(commentId:number):Promise<IAction[]> {
        const actions = await actionRepository.getComments(commentId);
        return actions;
    }
}

export const actionService = new ActionService();
