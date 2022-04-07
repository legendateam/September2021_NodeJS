import { IPost } from './post.interface';
import { IComment } from './comment.interface';
import { IAction } from './action.interface';

export interface IUser {
    id: number,
    firstName: string,
    lastName: string,
    age: number,
    phone: string,
    email: string,
    password: string,
    posts?: IPost[],
    comments?: IComment[],
    actions?: IAction[]
}

export interface IUpdateFields {
    password:string,
    email:string,
    phone:string
}
