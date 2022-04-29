import { NextFunction, Response } from 'express';

import { ICorpus, IRequestExtended } from '../interfaces';
import { ErrorHandler } from '../error';
import {corpusSchema, paramsMongoIdSchema} from '../helpers';
import { corpusModel } from '../models';

class CorpusMiddleware {

    public async checkUnique(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { number } = req.corpus as ICorpus;

            const corpus = await corpusModel.findOne({ number });

            if (corpus) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkParams(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            const { corpusId } = req.params;

            if (!corpusId) {
                next(new ErrorHandler('Some Wrong'));
                return;
            }

            const { error, value } = paramsMongoIdSchema.validate({ _id: corpusId });

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

    public async checkBody(req: IRequestExtended, _: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.body) {
                next(new ErrorHandler('oops'));
                return;
            }


            const { error, value } = corpusSchema.validate(req.body);

            if (error) {
                next(new ErrorHandler(error.message));
                return;
            }

            req.corpus = value;

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const corpusMiddleware = new CorpusMiddleware();
