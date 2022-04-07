// import { IUser } from './users.interface';
// import { IPost } from './posts.interface';
// import { IAction } from './actions.interface';

export interface IComment {
    id: number,
    text: string,
    authorId: number,
    postId: number,
    // user: IUser,
    // post: IPost,
    // actions: IAction[]
}
