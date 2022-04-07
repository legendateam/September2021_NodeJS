import { Request } from 'express';

import { IComment } from '../comment.interface';

export interface IRequestComment extends Request {
    comment?: IComment
}
