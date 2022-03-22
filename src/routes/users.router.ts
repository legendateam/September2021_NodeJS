import { Router } from 'express';

import {
    addOne, getAll, getOne, remove, updateFields,
} from '../controllers/users.controller';
import { userFieldsFilledMiddleware } from '../middlewares/userFieldsFilled.middleware';
import { userRegisteredMiddleware } from '../middlewares/userRegistered.middleware';
import { userPatchFieldsMiddleware } from '../middlewares/userPatchFields.middleware';
import { userUniqueValueFieldsMiddleware } from '../middlewares/userUniqueNewValueFieldsParch.middleware';

export const usersRouter = Router();

usersRouter.get('/', getAll);
usersRouter.post('/', userFieldsFilledMiddleware, userRegisteredMiddleware, addOne);
usersRouter.patch('/:userId', userPatchFieldsMiddleware, userUniqueValueFieldsMiddleware, updateFields);
usersRouter.get('/:userId', getOne);
usersRouter.delete('/:userId', remove);
