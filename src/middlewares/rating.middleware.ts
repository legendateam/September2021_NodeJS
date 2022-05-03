import { NextFunction, Response } from 'express';

import { IRating, IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error';
import { paramsMongoIdSchema, ratingSchema } from '../helpers';

class RatingMiddleware {
    public checkIdByParams(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { ratingId } = req.params;

            if (!ratingId) {
                next(new ErrorHandler('Soьe Wrong'));
                return;
            }

            req._id = ratingId;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateIdByParams(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { error, value } = paramsMongoIdSchema.validate({ _id: req._id });

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req._id = value._id;

            next();
        } catch (e) {
            next(e);
        }
    }

    public checkReqBody(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            if (!req.body) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            req.rating = req.body;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBody(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const rating = req.rating as IRating;

            const { error, value } = ratingSchema.validate(rating);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.rating = value;
            req.rating = req.body;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const ratingMiddleware = new RatingMiddleware();
