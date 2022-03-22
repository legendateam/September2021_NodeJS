import { Router } from 'express';

import { addOne, getAll } from '../controllers/users.controller';
import { userMiddleware } from '../middlewares/user.middleware';

export const usersRouter = Router();

usersRouter.get('/', getAll);
usersRouter.post('/', userMiddleware, addOne);
