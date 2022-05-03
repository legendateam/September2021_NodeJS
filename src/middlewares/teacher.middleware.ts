import { Response, NextFunction } from 'express';

import { ErrorHandler } from '../error';
import { IRequestExtended, ITeacher } from '../interfaces';
import { paramsMongoIdSchema, teacherSchema } from '../helpers';
import { teacherModel } from '../models';

class TeacherMiddleware {
    public validateIdByParams(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const { teacherId } = req.params;

            const { error, value } = paramsMongoIdSchema.validate({ _id: teacherId });

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

    public creationValidation(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            const teacher = req.body;

            const { error, value } = teacherSchema.validate(teacher);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.teacher = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkExistsByEmail(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { email } = req.teacher as ITeacher;

            const teacher = await teacherModel.findOne({ email });

            if (teacher) {
                next(new ErrorHandler('Teacher already exists!\''));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async findOneById(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req._id as string;

            const teacher = await teacherModel.findOne({ _id });

            if (!teacher) {
                next(new ErrorHandler('Teacher not Exists'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const teacherMiddleware = new TeacherMiddleware();
