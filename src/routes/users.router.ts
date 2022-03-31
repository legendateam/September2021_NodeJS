import { Router } from 'express';

import {
    getAll, getOne, remove, updateFields,
} from '../controllers/users.controller';
import { userPatchFieldsMiddleware } from '../middlewares/userPatchFields.middleware';
import { userUniqueValueFieldsMiddleware } from '../middlewares/userUniqueNewValueFieldsParch.middleware';

export const usersRouter = Router();

usersRouter.get('/', getAll);
usersRouter.get('/:userId', getOne);
usersRouter.patch('/:userId', userPatchFieldsMiddleware, userUniqueValueFieldsMiddleware, updateFields);
usersRouter.delete('/:userId', remove);
