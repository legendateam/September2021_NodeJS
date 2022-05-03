import { Router } from 'express';

import { studentController } from '../../controllers';
import { otherMiddleware, studentMiddleware } from '../../middlewares';

const router = Router();

router.get('/', otherMiddleware.checkQueryPagination, studentController.getAll);
router.post('/', studentMiddleware.validateBody, studentMiddleware.checkStudentExistsByEmail, studentController.addOne);
router.get('/:studentId', studentMiddleware.validateId, studentController.getOne);
router.delete('/:studentId', studentMiddleware.validateId, studentMiddleware.findStudentById, studentController.removeOne);

export const studentRouter = router;
