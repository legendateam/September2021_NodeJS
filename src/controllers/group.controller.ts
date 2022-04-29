import { Request, Response, NextFunction } from 'express';
import { groupModel } from '../models';
import { ErrorHandler } from '../error';
import { IGroup, IRequestExtended } from '../interfaces';

class GroupController {
    public async getAll(_: Request, res: Response, next: NextFunction) {
        try {
            const groups = await groupModel.find();

            if (!groups) {
                next(new ErrorHandler('Some worng'));
                return;
            }

            res.json(groups);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { _id } = req;
            const group = await groupModel.findById(_id);

            if (!group) {
                next(new ErrorHandler('Some worng'));
                return;
            }

            res.json(group);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const group = req.group as IGroup;
            const groupCreated = await groupModel.create(group);

            if (!groupCreated) {
                next(new ErrorHandler('Some worng'));
                return;
            }

            res.json(groupCreated);
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequestExtended, res: Response, next: NextFunction) {
        try {
            const { _id } = req;

            const group = await groupModel.remove({ _id });

            if (!group) {
                next(new ErrorHandler('Some worng'));
                return;
            }

            res.json({
                message: 'Deleted successfully!',
            });
        } catch (e) {
            next(e);
        }
    }
}

export const groupController = new GroupController();
