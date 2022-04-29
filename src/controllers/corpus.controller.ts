import { NextFunction, Response } from 'express';

import { ICorpusAbstraction, IRequestExtended } from '../interfaces';
import { corpusModel } from '../models';
import { ErrorHandler } from '../error';

class CorpusController implements ICorpusAbstraction {
    public async getAll(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            if (req.pagination) {
                const { page = 1, perPage = 50 } = req.pagination;
                const skip = perPage * (page - 1);

                const corpus = await corpusModel.find({}).skip(skip).limit(perPage);

                if (!corpus) {
                    next(new ErrorHandler('Some Wong'));
                    return;
                }

                res.json(corpus);
                return;
            }

            const corpus = await corpusModel.find();

            if (!corpus) {
                next(new ErrorHandler('Some Wong'));
                return;
            }

            res.json(corpus);
        } catch (e) {
            next(e);
        }
    }

    public async getOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {

            const corpus = await corpusModel.findById(req._id);

            if (!corpus) {
                next(new ErrorHandler('Some Wong'));
                return;
            }

            res.json(corpus);
        } catch (e) {
            next(e);
        }
    }

    public async addOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const corpus = await corpusModel.create(req.corpus);

            if (!corpus) {
                next(new ErrorHandler('Some Wong'));
                return;
            }

            res.json(corpus);
        } catch (e) {
            next(e);
        }
    }

    public async removeOne(req: IRequestExtended, res: Response, next: NextFunction): Promise<void> {
        try {
            const { _id } = req;
            const deleted = await corpusModel.remove({ _id });

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

export const corpusController = new CorpusController();
