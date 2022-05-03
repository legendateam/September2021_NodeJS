import { Response, NextFunction } from 'express';

import { IRequestExtended, ISubject } from '../interfaces';
import { ErrorHandler } from '../error';
import { paramsMongoIdSchema, subjectSchema } from '../helpers';
import { subjectModel } from '../models';

class SubjectMiddleware {
    public checkIdByParams(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { subjectId } = req.params;

            if (!subjectId) {
                next(new ErrorHandler('Sone Wrong'));
                return;
            }

            req._id = subjectId;

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

    public checkBodyByParams(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            if (!req.body) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public validateBody(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { error, value } = subjectSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.subject = value;
            req.subject = req.body;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async findSubjectByName(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { name } = req.subject as ISubject;

            const subject = await subjectModel.findOne({ name });

            if (subject) {
                next(new ErrorHandler('Subject is already exists!'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const subjectMiddleware = new SubjectMiddleware();
