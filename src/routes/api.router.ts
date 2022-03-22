import { Router, Response } from 'express';

import { usersRouter } from './users.router';
import { postsRouter } from './posts.router';
import { commentsRouter } from './comments.router';
import { actionsRouter } from './actions.router';

export const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/actions', actionsRouter);
apiRouter.use((_, res:Response) => {
    res.status(404).render('error404Page');
});
