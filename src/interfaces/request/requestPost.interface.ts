import { Request } from 'express';

import { IPost } from '../post.interface';

export interface IRequestPost extends Request{
    post?: IPost
}
