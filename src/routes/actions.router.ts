import { Router } from 'express';

import { getAll } from '../controllers/actions.controller';

export const actionsRouter = Router();

actionsRouter.get('/', getAll);
