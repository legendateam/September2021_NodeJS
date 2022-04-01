import { Router } from 'express';

import { postsController } from '../controllers';
import { postFieldsFilledMiddleware, postPatchFieldsMiddleware, postTypeMiddleware } from '../middlewares';

export const postsRouter = Router();

postsRouter.get('/', postsController.getAll);
postsRouter.post('/', postFieldsFilledMiddleware, postTypeMiddleware, postsController.addOne);
postsRouter.get('/:postId', postsController.getOne);
postsRouter.delete('/:postId', postsController.removeOne);
postsRouter.patch('/:postId', postPatchFieldsMiddleware, postsController.updateFieldValue);
postsRouter.get('/user/:userId', postsController.getUserPosts);
