import { Router } from 'express';

import { actionsController } from '../controllers';
import { actionsFieldsFilledMiddleware, actionTypeMiddleware, actionUniqueUser } from '../middlewares';

export const actionsRouter = Router();

actionsRouter.get('/', actionsController.getAll);
actionsRouter.post('/', actionsFieldsFilledMiddleware, actionTypeMiddleware, actionUniqueUser, actionsController.addAction);
actionsRouter.get('/comment/:commentId', actionsController.getComments);
