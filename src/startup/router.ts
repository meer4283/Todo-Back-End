import { Express, Request, Response } from 'express';


//[INJECT IMPORTS WITH CONSOLE TOOL]
import responseInterceptor from '../shared/middlewares/response-interceptor';
import { exceptionHandler } from '../shared/middlewares/exception-handling.middleware';
import { pageNotFoundExceptionHandler } from '../shared/middlewares/page-not-found-exception-handler.middleware';

import AutenticationRoutes from '../domain/authentication/AutenticationRoutes';
import AdminUserRoutes from '../domain/adminUser/AdminUserRoutes';
import UserRoutes from '../domain/user/UserRoutes';

import CategoriesRoutes from '../domain/category/CategoryRoutes';
import CuisineRoutes from '../domain/cuisine/CuisineRoutes';
import DishRoutes from '../domain/dish/DishRoutes';
import VendorRoutes from '../domain/vendor/VendorRoutes';

const routerSetup = (app: Express) =>
  app
    .set('trust proxy', true)
    .get('/', async (req: Request, res: Response) => { res.send('Landing Page'); })
    // place interceptor above all routes that you want to intercept
    // interceptor will trigger for every request
    .use(responseInterceptor)
    
    .use('/auth', AutenticationRoutes)
    .use('/users', UserRoutes)
    .use('/admin-user', AdminUserRoutes)
    .use('/categories', CategoriesRoutes)
    .use('/cuisine', CuisineRoutes)
    .use('/vendor', VendorRoutes)
    .use('/dish', DishRoutes)

    // asterisk handles all request paths, but because the order maters,
    // it will ignore route paths that came before
    .use('*', pageNotFoundExceptionHandler)

    // The exception handling middleware is the last one in the pipeline
    .use(exceptionHandler)

export default routerSetup;
