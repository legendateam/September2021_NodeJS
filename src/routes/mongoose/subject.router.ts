import { Router } from 'express';

import { otherMiddleware, subjectMiddleware } from '../../middlewares';
import { subjectController } from '../../controllers';

const router = Router();

router.get('/', otherMiddleware.checkQueryPagination, subjectController.getAll);
router.get('/:subjectId', subjectMiddleware.checkIdByParams, subjectMiddleware.validateIdByParams, subjectController.getOne);
router.post(
    '/',
    subjectMiddleware.checkBodyByParams,
    subjectMiddleware.validateBody,
    subjectMiddleware.findSubjectByName,
    subjectController.addOne,
);
router.delete('/:subjectId', subjectMiddleware.checkIdByParams, subjectMiddleware.validateIdByParams, subjectController.removeOne);

export const subjectRouter = router;
