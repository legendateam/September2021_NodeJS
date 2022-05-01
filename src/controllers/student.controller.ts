import { Response, NextFunction } from 'express';

import { IRequestExtended, IStudent, IStudentAbstraction } from '../interfaces';
import { studentModel } from '../models';
import { ErrorHandler } from '../error';

class StudentController implements IStudentAbstraction {
    public async getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.pagination) {
                const { page = 1, perPage = 50 } = req.pagination;
                const skip = perPage * (page - 1);

                const students = await studentModel.find({}).skip(skip).limit(perPage);

                if (!students) {
                    next(new ErrorHandler('Some Wrong'));
                    return;
                }

                res.json(students);
                return;
            }

            const students = await studentModel.find({});

            if (!students) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(students);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req;

            const student = await studentModel.findById({ _id });

            if (!student) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(student);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const student = req.student as IStudent;

            const studentAfterHashedPassword = await studentModel.hash(student);

            if (!studentAfterHashedPassword) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            const studentCreated = await studentModel.create(studentAfterHashedPassword);

            if (!studentCreated) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json({
                message: `${studentCreated.firstName} ${studentCreated.lastName} successfully created`,
            });
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req._id as string;

            const studentDeleted = await studentModel.deleteOne({ _id });

            if (!studentDeleted) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json({
                message: 'successfully removed',
            });
        } catch (e) {
            next(e);
        }
    }
}

export const studentController = new StudentController();
