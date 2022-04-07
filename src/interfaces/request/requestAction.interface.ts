import { Request } from 'express';

import { IAction } from '../action.interface';

export interface IRequestAction extends Request {
    action?: IAction
}
