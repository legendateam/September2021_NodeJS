import { Response, NextFunction } from 'express';

import { ErrorHandler } from '../error';
import { IRequestExtended } from '../interfaces';
import { groupSchema, paramsMongoIdSchema } from '../helpers';

class GroupMiddleware {
    public validateIdByParams(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { groupId } = req.params;

            if (!groupId) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            const { error, value } = paramsMongoIdSchema.validate({ _id: groupId });

            if (error) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            req._id = value._id;
            req._id = req.body;

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBody(req: IRequestExtended, _: Response, next: NextFunction) : void {
        try {
            if (!req.body) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            const group = req.body;

            const { error, value } = groupSchema.validate(group);

            if (error) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            req.group = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const groupMiddleware = new GroupMiddleware();
