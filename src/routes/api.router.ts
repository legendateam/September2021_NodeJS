// import { Router, Response } from 'express';
import { Router } from 'express';

// import { usersRouter } from './users.router';

export const apiRouter = Router();

// apiRouter.use('/users', usersRouter);
apiRouter.use('/users', (_:any, res:any) => {
    res.end('hello');
});
// apiRouter.use((_, res:Response) => {
//     res.status(404).render('error404Page');
// });
