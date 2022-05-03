import { Response, NextFunction } from 'express';

import { ErrorHandler } from '../error';
import { IDepartment, IRequestExtended } from '../interfaces';
import { departmentSchema, paramsMongoIdSchema } from '../helpers';
import { departmentModel } from '../models';

class DepartmentMiddleware {
    public validateQueryBody(req: IRequestExtended, _: Response, next: NextFunction): void {
        try {
            if (!req.body) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            const department = req.body;

            const { error, value } = departmentSchema.validate(department);

            if (error) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            req.department = value;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkUnique(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { name } = req.department as IDepartment;

            const department = await departmentModel.findOne({ name });

            if (department) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIdByParams(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { departmentId } = req.params;

            const { error, value } = paramsMongoIdSchema.validate({ _id: departmentId });

            if (error) {
                next(new ErrorHandler('ewrkgjokerjg'));
                return;
            }

            req._id = value._id;
            next();
        } catch (e) {
            next(e);
        }
    }
}

export const departmentMiddleware = new DepartmentMiddleware();
