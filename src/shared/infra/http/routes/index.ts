import { Router } from 'express';

import { authRoutes } from './auth.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { rentalsRoutes } from './rentals.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/cars', carsRoutes);
routes.use('/user', usersRoutes);
routes.use(authRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/rentals', rentalsRoutes);

export { routes };
