import { NextFunction, Response } from 'express';

import { IRequestExtended } from '../../interfaces';

class OtherMiddleware {
    public checkQueryPagination(req: Partial<IRequestExtended>, _: Response, next: NextFunction): void {
        try {
            if (req.query) {
                const { page = 1, perPage = 50, ...other } = req.query;

                req.pagination = { page: +page, perPage: +perPage, other };
            }
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const otherMiddleware = new OtherMiddleware();
