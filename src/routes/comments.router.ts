import { Router } from 'express';

import {
    getAll, addOne, getOne, getUserComments, updateText, remove, getCountAction,
} from '../controllers/comments.controller';
import { commentsFieldsFilled } from '../middlewares/commentsFieldsFilled.middleware';
import { commentsPatch } from '../middlewares/commentsPatch.middleware';
import { commentTypeMiddleware } from '../middlewares/commentType.middleware';

export const commentsRouter = Router();

commentsRouter.get('/', getAll);
commentsRouter.post('/', commentsFieldsFilled, commentTypeMiddleware, addOne);
commentsRouter.get('/:commentId', getOne);
commentsRouter.patch('/:commentId', commentsPatch, updateText);
commentsRouter.delete('/:commentId', remove);
commentsRouter.get('/user/:userId', getUserComments);
commentsRouter.get('/:commentId/action/count', getCountAction);
