import { Response, NextFunction } from 'express';

import { subjectModel } from '../models';
import { ErrorHandler } from '../error';
import { IRequestExtended, ISubjectAbstraction } from '../interfaces';

class SubjectController implements ISubjectAbstraction {
    public async getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.pagination) {
                const { page = 1, perPage = 50 } = req.pagination;

                const skip = perPage * (page - 1);

                const subjects = subjectModel.find().skip(skip).limit(perPage);

                if (!subjects) {
                    next(new ErrorHandler('Some Wrong'));
                    return;
                }

                res.json(subjects);
                return;
            }

            const subjects = subjectModel.find();

            if (!subjects) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(subjects);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req;

            const subject = subjectModel.findById(_id);

            if (!subject) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(subject);
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req;

            const subjectDeleted = subjectModel.remove({ _id });

            if (!subjectDeleted) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json({
                message: 'subject deleted successfully!',
            });
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { subject } = req;

            const subjectCreated = subjectModel.create(subject);

            if (!subjectCreated) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json({
                message: 'subject successfully created!',
            });
        } catch (e) {
            next(e);
        }
    }
}

export const subjectController = new SubjectController();
