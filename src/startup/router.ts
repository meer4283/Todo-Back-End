import { Express, Request, Response } from 'express';
import responseInterceptor from '../shared/middlewares/response-interceptor';
import { exceptionHandler } from '../shared/middlewares/exception-handling.middleware';
import { pageNotFoundExceptionHandler } from '../shared/middlewares/page-not-found-exception-handler.middleware';

import TaskRoutes from '../domain/tasks/TaskRoutes';

const routerSetup = (app: Express) =>
  app
    .set('trust proxy', true)
    .get('/', async (req: Request, res: Response) => { res.send('Landing Page'); })
    // place interceptor above all routes that you want to intercept
    // interceptor will trigger for every request
    .use(responseInterceptor)
    
    .use('/tasks', TaskRoutes)

    // asterisk handles all request paths, but because the order maters,
    // it will ignore route paths that came before
    .use('*', pageNotFoundExceptionHandler)

    // The exception handling middleware is the last one in the pipeline
    .use(exceptionHandler)

export default routerSetup;
