import { Router } from 'express';

import { commentsController } from '../controllers';
import { commentsFieldsFilled, commentsPatch, commentTypeMiddleware } from '../middlewares';

export const commentsRouter = Router();

commentsRouter.get('/', commentsController.getAll);
commentsRouter.post('/', commentsFieldsFilled, commentTypeMiddleware, commentsController.addOne);
commentsRouter.get('/:commentId', commentsController.getOne);
commentsRouter.patch('/:commentId', commentsPatch, commentsController.updateText);
commentsRouter.delete('/:commentId', commentsController.remove);
commentsRouter.get('/user/:userId', commentsController.getUserComments);
commentsRouter.get('/:commentId/action/count', commentsController.getCountAction);
