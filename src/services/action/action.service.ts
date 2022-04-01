import { actionRepository } from '../../repositories';
import { IActions } from '../../interfaces';

class ActionService {
    public async getAll():Promise<IActions[]> {
        const actions = await actionRepository.getAll();
        return actions;
    }

    public async addAction(action:IActions):Promise<IActions> {
        const newAction = await actionRepository.addOne(action);
        return newAction;
    }

    public async getComments(commentId:number):Promise<IActions[]> {
        const actions = await actionRepository.getComments(commentId);
        return actions;
    }
}

export const actionService = new ActionService();
