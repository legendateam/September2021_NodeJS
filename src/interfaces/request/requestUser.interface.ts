import { Request } from 'express';
import { IUsers } from '../users.interface';

export interface IRequestUser extends Request {
    user?: IUsers;
}
