import { IUser } from './user.interface';
import { IPost } from './post.interface';
import { IAction } from './action.interface';

export interface IComment {
    id: number,
    text: string,
    authorId: number,
    postId: number,
    user?: IUser,
    post?: IPost,
    actions?: IAction[]
}
