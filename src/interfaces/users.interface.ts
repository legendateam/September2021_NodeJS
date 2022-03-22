import { IPosts } from './posts.interface';
import { IComments } from './comments.interface';
import { IActions } from './actions.interface';

export interface IUsers {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    phone: string,
    email: string,
    password: string,
    posts: IPosts[],
    comments: IComments[],
    actions: IActions[]
}
