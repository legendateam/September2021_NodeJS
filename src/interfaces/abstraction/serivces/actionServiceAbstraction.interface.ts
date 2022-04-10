import { IAction } from '../../action.interface';

export interface IActionServiceAbstraction {
    getAll():Promise<IAction[]>,
    addAction(action:IAction):Promise<IAction>,
    getComments(commentId:number):Promise<IAction[]>
}
