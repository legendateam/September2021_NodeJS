import { Router } from 'express';

import { actionsController } from '../controllers';
import { actionMiddleware } from '../middlewares';

export const actionsRouter = Router();

actionsRouter.get('/', actionsController.getAll);
actionsRouter.post('/', actionMiddleware.fieldsFilled, actionMiddleware.checkUniqueUser, actionsController.addAction);
actionsRouter.get('/comment/:commentId', actionsController.getComments);
