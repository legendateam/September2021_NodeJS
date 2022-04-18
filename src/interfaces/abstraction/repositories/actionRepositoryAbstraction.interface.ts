import { IAction } from '../../action.interface';
import { IDate } from '../../date.interface';

export interface IActionAbstraction {
    getAll():Promise<IAction[]>,
    getNewAll(date: IDate): Promise<IAction[]>,
    addOne(action:IAction):Promise<IAction>,
    getComments(commentId:number):Promise<IAction[]>,
    checkUniqueUser(id:number, idComment:number):Promise<IAction | undefined>
}
