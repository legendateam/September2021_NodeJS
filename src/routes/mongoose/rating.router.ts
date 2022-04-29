import { Router } from 'express';

import { otherMiddleware, ratingMiddleware } from '../../middlewares';
import { ratingController } from '../../controllers';

const router = Router();

router.get('/', otherMiddleware.checkQueryPagination, ratingController.getAll);
router.get('/:ratingId', ratingMiddleware.checkIdByParams, ratingMiddleware.validateIdByParams, ratingController.getOne);
router.post(
    '/',
    ratingMiddleware.checkReqBody,
    ratingMiddleware.validateBody,
    ratingController.addOne,
);
router.delete('/:ratingId', ratingMiddleware.checkIdByParams, ratingMiddleware.validateIdByParams, ratingController.removeOne);

export const ratingRouter = router;
