import { Router } from 'express';

import { getAll, addAction, getComments } from '../controllers/actions.controller';
import { actionsFieldsFilledMiddleware } from '../middlewares/actionsFieldsFilled.middleware';
import { actionTypeMiddleware } from '../middlewares/actionType.middleware';
import { actionUniqueUser } from '../middlewares/actionUniqueUser';

export const actionsRouter = Router();

actionsRouter.get('/', getAll);
actionsRouter.post('/', actionsFieldsFilledMiddleware, actionTypeMiddleware, actionUniqueUser, addAction);
actionsRouter.get('/comment/:commentId', getComments);
