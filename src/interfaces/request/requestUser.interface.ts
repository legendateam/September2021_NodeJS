import { Request } from 'express';

import { IUser } from '../user.interface';

export interface IPaginationUser {
    page: number,
    perPage: number,
    user: Partial<IUser>
}

export interface IRequestUser extends Request {
    user?: IUser;
    oldEmail?: string;
    pagination?: IPaginationUser
}
