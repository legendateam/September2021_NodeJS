import { IComments } from './comments.interface';
import { IUsers } from './users.interface';

export interface IActions {
    id: number,
    commentId: number,
    userId: number,
    _like?: number,
    _dislike?: number,
    comment: IComments,
    user: IUsers
}
