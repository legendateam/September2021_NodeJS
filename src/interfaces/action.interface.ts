import { IComment } from './comment.interface';
import { IUser } from './user.interface';

export interface IAction {
    commentId: number,
    userId: number,
    isLike?: number,
    isDislike?: number,
    comment?: IComment,
    user?: IUser
}
