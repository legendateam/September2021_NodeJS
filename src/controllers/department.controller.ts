import { Response, NextFunction } from 'express';

import { IDepartmentAbstraction, IRequestExtended } from '../interfaces';
import { departmentModel } from '../models';
import { ErrorHandler } from '../error';

class DepartmentController implements IDepartmentAbstraction {
    public async getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            if(req.pagination) {

                const { page = 1, perPage = 50 } = req.pagination;
                const skip = perPage * (page - 1);

                const departments = await departmentModel.find().skip(skip).limit(perPage);

                if (!departments) {
                    next(new ErrorHandler('Some Wong'));
                    return;
                }

                res.json(departments);
                return;
            }
            const departments = await departmentModel.find();

            if (!departments) {
                next(new ErrorHandler('Some Wong'));
                return;
            }

            res.json(departments);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const department = await departmentModel.findById(req._id);

            if (!department) {
                next(new ErrorHandler('Some Wong'));
                return;
            }

            res.json(department);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const department = await departmentModel.create(req.department);

            if (!department) {
                next(new ErrorHandler('Some Wong'));
                return;
            }

            res.json(department);
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req;
            const deleted = await departmentModel.remove({ _id });

            if (!deleted) {
                next(new ErrorHandler('Some Wong'));
                return;
            }

            res.json(deleted);
        } catch (e) {
            next(e);
        }
    }
}

export const departmentController = new DepartmentController();
