import { Router } from 'express';

import { otherMiddleware, teacherMiddleware } from '../../middlewares';
import { teacherController } from '../../controllers';

const router = Router();

router.get('/', otherMiddleware.checkQueryPagination, teacherController.getAll);
router.get('/:teacherId', teacherMiddleware.validateIdByParams, teacherController.getOne);
router.post('/', teacherMiddleware.creationValidation, teacherMiddleware.checkExistsByEmail, teacherController.createOne);
router.delete('/:teacherId', teacherMiddleware.validateIdByParams, teacherMiddleware.findOneById, teacherController.removeOne);

export const teacherRouter = router;
