import { Router } from 'express';

import { usersController } from '../controllers';
import { userPatchFieldsMiddleware, userUniqueValueFieldsMiddleware } from '../middlewares';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getOne);
usersRouter.patch('/:userId', userPatchFieldsMiddleware, userUniqueValueFieldsMiddleware, usersController.updateFields);
usersRouter.delete('/:userId', usersController.remove);
