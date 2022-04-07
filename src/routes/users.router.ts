import { Router } from 'express';

import { usersController } from '../controllers';
import { userMiddleware } from '../middlewares';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getOne);
usersRouter.patch('/:userId', userMiddleware.patchFields, userMiddleware.checkUniqueFieldsValue, usersController.updateFields);
usersRouter.delete('/:userId', usersController.remove);
