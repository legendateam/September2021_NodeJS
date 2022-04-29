import { Router } from 'express';

import { departmentMiddleware, otherMiddleware } from '../../middlewares';
import { departmentController } from '../../controllers/department.controller';

const router = Router();

router.get('/', otherMiddleware.checkQueryPagination, departmentController.getAll);
router.get('/:departmentId', departmentMiddleware.checkIdByParams, departmentController.getOne);
router.post('/', departmentMiddleware.validateQueryBody, departmentMiddleware.checkUnique, departmentController.addOne);
router.delete('/:departmentId', departmentMiddleware.checkIdByParams, departmentController.removeOne);

export const departmentRouter = router;
