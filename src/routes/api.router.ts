import {
    Router, Request, Response, NextFunction,
} from 'express';

import { usersRouter } from './users.router';
import { postsRouter } from './posts.router';
import { commentsRouter } from './comments.router';
import { actionsRouter } from './actions.router';
import { authRouter } from './auth.router';
import { ErrorHandler } from '../error';

export const apiRouter = Router();

apiRouter.use('/users', usersRouter);
apiRouter.use('/posts', postsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/actions', actionsRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use((_:Request, res:Response) => {
    res.status(404).render('error404Page');
});
// @ts-ignore
apiRouter.use('*', (err: ErrorHandler, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json({
        message: err.message,
    });
});
