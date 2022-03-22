import { Router } from 'express';

import {
    getAll, addOne, getOne, getUserComments,
} from '../controllers/comments.controller';
import { commentsFieldsFilled } from '../middlewares/commentsFieldsFilled.middleware';

export const commentsRouter = Router();

commentsRouter.get('/', getAll);
commentsRouter.post('/', commentsFieldsFilled, addOne);
commentsRouter.get('/:commentId', getOne);
commentsRouter.get('/user/:userId', getUserComments);
