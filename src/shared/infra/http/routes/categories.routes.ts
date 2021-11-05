import { Router } from 'express';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();
const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);
categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle);
export { categoriesRoutes };
