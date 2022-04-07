import { IAction } from '../action.interface';

export interface IActionAbstraction {
    getAll():Promise<IAction[]>,
    addOne(action:IAction):Promise<IAction>,
    getComments(commentId:number):Promise<IAction[]>,
    checkUniqueUser(id:number, idComment:number):Promise<IAction | undefined>
}
