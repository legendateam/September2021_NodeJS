import { IPost } from './post.interface';
import { IComment } from './comment.interface';
import { IAction } from './action.interface';
import { IRole } from './role.interface';
import { ICommonFields } from './commonFields.interface';

export interface IUser extends ICommonFields{
    firstName: string,
    lastName: string,
    age: number,
    phone: string,
    email: string,
    password: string,
    posts?: IPost[],
    comments?: IComment[],
    actions?: IAction[],
    role?: IRole
}

export interface IUpdateFields {
    password:string,
    email:string,
    phone:string
}
