import { IComment } from './comment.interface';
import { IUser } from './user.interface';

export interface IAction {
    id: number,
    commentId: number,
    userId: number,
    _like?: number,
    _dislike?: number,
    comment?: IComment,
    user?: IUser
}
