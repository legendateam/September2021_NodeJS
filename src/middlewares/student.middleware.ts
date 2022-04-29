import { NextFunction, Response } from 'express';

import { IRequestExtended, IStudent } from '../interfaces';
import {paramsMongoIdSchema, studentSchema} from '../helpers';
import { ErrorHandler } from '../error';
import { studentModel } from '../models';

class StudentMiddleware {
    public validateId(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            if (!req.params) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            const { studentId } = req.params;

            const { error, value } = paramsMongoIdSchema.validate({ _id: studentId });

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

    public validateBody(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            if (!req.body) {
                next(new ErrorHandler('Wrong password'));
                return;
            }

            const student = req.body;

            const { error, value } = studentSchema.validate(student);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.student = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkStudentExistsByEmail(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.student as IStudent;

            const student = await studentModel.findOne({ email });

            if (student) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async findStudentById(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req._id as string;

            const student = await studentModel.findById(_id);

            if (!student) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            req.student = student;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const studentMiddleware = new StudentMiddleware();
