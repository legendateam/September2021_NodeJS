import { NextFunction, Request, Response } from 'express';
import { groupModel } from '../models';
import { ErrorHandler } from '../error';
import { IGroup, IRequestExtended } from '../interfaces';
import { responseMessageConstant } from '../constants';
import { ResponseEnum } from '../enums';

class GroupController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const { page = 1, perPage = 50 } = req.query;

            const skip = Number(perPage) * (Number(page) - 1);

            const groups = await groupModel.find().skip(skip).limit(+perPage);

            if (!groups) {
                next(new ErrorHandler('Some worng'));
                return;
            }

            const countItem = await groupModel.find().count({});

            if (!countItem) {
                next(new ErrorHandler('Some worng'));
                return;
            }

            res.json({
                page,
                perPage,
                countItem,
                data: groups,
            });
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

            res.json(responseMessageConstant[ResponseEnum.DELETED]);
        } catch (e) {
            next(e);
        }
    }
}

export const groupController = new GroupController();
