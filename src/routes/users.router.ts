import { Router } from 'express';

import { usersController } from '../controllers/users.controller';

export const usersRouter = Router();

usersRouter.get('/users', usersController);
