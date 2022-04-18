import { Request } from 'express';

import { IPost } from '../post.interface';

export interface IPaginationPost {
    page: number,
    perPage: number,
    post: Partial<IPost>
}

export interface IRepoPost {
    pagination: IPaginationPost,
    skip: number
}

export interface IRequestPost extends Request{
    post?: IPost,
    pagination?: IPaginationPost
}
