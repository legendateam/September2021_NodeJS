import { IUser } from './user.interface';
import { IComment } from './comment.interface';

export interface IPost {
    title: string,
    text: string,
    userId: number,
    user?: IUser,
    comments?: IComment[]
}
