import { Request } from 'express';

export interface IRequestForgotPassword extends Request {
    forgotPassword?: {
        email?: string,
        code?: string,
        id?: number,
        password?: string,
    },
    authorization?: string
}
