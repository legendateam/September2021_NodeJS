import { Router } from 'express';

import { postsController } from '../controllers';
import { postMiddleware } from '../middlewares';

export const postsRouter = Router();

postsRouter.get('/', postMiddleware.checkQuery, postsController.getAll);
postsRouter.post('/', postMiddleware.fieldsFilled, postMiddleware.userExists, postsController.addOne);
postsRouter.get('/:postId', postsController.getOne);
postsRouter.delete('/:postId', postsController.removeOne);
postsRouter.patch('/:postId', postMiddleware.fieldsForPatching, postsController.updateFieldValue);
postsRouter.get('/user/:userId', postsController.getUserPosts);
