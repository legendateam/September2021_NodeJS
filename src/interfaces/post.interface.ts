// import { IUser } from './users.interface';
// import { IComment } from './comments.interface';

export interface IPost {
    id: number,
    title: string,
    text: string,
    userId: number,
    // user: IUser,
    // comments: IComment[]
}
