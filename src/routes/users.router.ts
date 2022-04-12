import { Router } from 'express';

import { usersController } from '../controllers';
import { userMiddleware } from '../middlewares';

export const usersRouter = Router();

usersRouter.get('/', usersController.getAll);
usersRouter.get('/:userId', usersController.getOne);
usersRouter.patch(
    '/:userId',
    userMiddleware.patchFields,
    userMiddleware.checkExistsEmailAndPhone,
    userMiddleware.checkUserByParams,
    userMiddleware.isCurrentPassword,
    usersController.updateFields,
);
usersRouter.delete('/:userId', userMiddleware.checkUserByParams, usersController.remove);
