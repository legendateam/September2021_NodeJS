import { IActions } from '../actions.interface';

export interface IActionAbstraction {
    getAll():Promise<IActions[]>,
    addOne(action:IActions):Promise<IActions>,
    getComments(commentId:number):Promise<IActions[]>,
    checkUniqueUser(id:number, idComment:number):Promise<IActions | undefined>
}
