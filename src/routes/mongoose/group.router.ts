import { Router } from 'express';

import { groupMiddleware } from '../../middlewares';
import { groupController } from '../../controllers';

const router = Router();

router.get('/', groupController.getAll);
router.get('/:groupId', groupMiddleware.validateIdByParams, groupController.getOne);
router.post('/', groupMiddleware.validateBody, groupController.addOne);
router.delete('/:groupId', groupMiddleware.validateIdByParams, groupController.removeOne);

export const groupRouter = router;
