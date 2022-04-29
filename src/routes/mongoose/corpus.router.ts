import { Router } from 'express';

import { corpusMiddleware, otherMiddleware } from '../../middlewares';
import { corpusController } from '../../controllers';

const router = Router();

router.get('/', otherMiddleware.checkQueryPagination, corpusController.getAll);
router.get('/:corpusId', corpusMiddleware.checkParams, corpusController.getOne);
router.post('/', corpusMiddleware.checkBody, corpusMiddleware.checkUnique, corpusController.addOne);
router.delete('/:corpusId', corpusMiddleware.checkParams, corpusController.removeOne);

export const corpusRouter = router;
