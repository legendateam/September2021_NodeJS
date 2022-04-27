import { Router } from 'express';

import { teacherMiddleware } from '../../middlewares';
import { teacherController } from '../../controllers';

const router = Router();

router.get('/', teacherMiddleware.checkQueryPagination, teacherController.getAll);
router.get('/:teacherId', teacherMiddleware.validateIdByParams, teacherController.getOne);
router.post('/', teacherMiddleware.creationValidation, teacherMiddleware.checkExistsByEmail, teacherController.createOne);
router.delete('/:teacherId', teacherMiddleware.validateIdByParams, teacherMiddleware.findOneById, teacherController.removeOne);

export const teacherRouter = router;
