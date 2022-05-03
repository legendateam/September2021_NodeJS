import { NextFunction, Response } from 'express';

import { ratingModel } from '../models';
import { ErrorHandler } from '../error';
import { IRatingAbstraction, IRequestExtended } from '../interfaces';
import { responseMessageConstant } from '../constants';
import { ResponseEnum } from '../enums';

class RatingController implements IRatingAbstraction {
    public async getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.pagination) {
                const { page = 1, perPage = 50 } = req.pagination;

                const skip = perPage * (page - 1);

                const ratings = await ratingModel.find().skip(skip).limit(perPage);

                if (!ratings) {
                    next(new ErrorHandler('Some Wrong'));
                    return;
                }

                const countItem = await ratingModel.find().count();

                if (!countItem) {
                    next(new ErrorHandler('Some Wrong'));
                    return;
                }

                res.json({
                    page,
                    perPage,
                    countItem,
                    data: ratings,
                });
                return;
            }

            const ratings = await ratingModel.find({});

            if (!ratings) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(ratings);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req;

            const rating = await ratingModel.findById(_id);

            if (!rating) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(rating);
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req;

            const ratingDeleted = await ratingModel.remove({ _id });

            if (!ratingDeleted) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(responseMessageConstant[ResponseEnum.DELETED]);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { rating } = req;

            const ratingCreated = await ratingModel.create(rating);

            if (!ratingCreated) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            res.json(ratingCreated);
        } catch (e) {
            next(e);
        }
    }
}

export const ratingController = new RatingController();
