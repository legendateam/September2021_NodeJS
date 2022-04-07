import { Router } from 'express';

import { commentsController } from '../controllers';
import { commentMiddleware } from '../middlewares';

export const commentsRouter = Router();

commentsRouter.get('/', commentsController.getAll);
commentsRouter.post('/', commentMiddleware.validator, commentMiddleware.userExists, commentsController.addOne);
commentsRouter.get('/:commentId', commentsController.getOne);
commentsRouter.patch('/:commentId', commentMiddleware.checkFieldsForPatching, commentsController.updateText);
commentsRouter.delete('/:commentId', commentsController.remove);
commentsRouter.get('/user/:userId', commentsController.getUserComments);
commentsRouter.get('/:commentId/action/count', commentsController.getCountAction);
