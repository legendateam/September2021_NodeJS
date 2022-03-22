import { IUsers } from './users.interface';
import { IPosts } from './posts.interface';
import { IActions } from './actions.interface';

export interface IComments {
    id: number,
    text: string,
    authorId: number,
    postId: number,
    user: IUsers,
    post: IPosts,
    actions: IActions[]
}
