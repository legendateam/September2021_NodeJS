import { NextFunction, Response } from 'express';

import { IRequestExtended, ITeacher, ITeacherControllerAbstraction } from '../interfaces';
import { teacherModel } from '../models';
import { ErrorHandler } from '../error';
import { responseMessageConstant } from '../constants';
import { ResponseEnum } from '../enums';

class TeacherController implements ITeacherControllerAbstraction {
    public async getAll(req: Partial<IRequestExtended>, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.pagination) {
                const { page = 1, perPage = 50 } = req.pagination;

                const skip = perPage * (page - 1);
                const teachers = await teacherModel.find().skip(skip).limit(perPage);

                if (!teachers) {
                    next(new ErrorHandler('Some Wrong'));
                    return;
                }

                res.json(teachers);
                return;
            }

            const teachers = await teacherModel.find();

            if (!teachers) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(teachers);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req._id as string;

            const teacher = await teacherModel.findById({ _id });

            if (!teacher) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(teacher);
        } catch (e) {
            next(e);
        }
    }

    public async createOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const teacher = req.teacher as ITeacher;

            const teacherAfterHashedPassword = await teacherModel.hashPassword(teacher);

            if (!teacherAfterHashedPassword) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            const teacherCreated = await teacherModel.create(teacherAfterHashedPassword);

            if (!teacherCreated) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(responseMessageConstant[ResponseEnum.CREATED](teacherCreated.firstName, teacherCreated.lastName));
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const _id = req._id as string;

            const deleted = await teacherModel.deleteOne({ _id });

            if (!deleted) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(responseMessageConstant[ResponseEnum.DELETED]);
        } catch (e) {
            next(e);
        }
    }
}

export const teacherController = new TeacherController();
