import { Router } from 'express';

import { CreateCategoryController } from '@modules/cars/useCases/createCategory/CreateCategoryController';
import { DeleteCategoryController } from '@modules/cars/useCases/deleteCategory/DeleteCategoriesController';
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { UpdateCategoryController } from '@modules/cars/useCases/updateCategory/UpdateCategoryController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createCategoryController = new CreateCategoryController();
const listCategoriesController = new ListCategoriesController();

const deleteCategoryControll = new DeleteCategoryController();
const updateCategoryController = new UpdateCategoryController();

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.delete(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  deleteCategoryControll.handle
);

categoriesRoutes.put(
  '/:id',
  ensureAuthenticated,
  ensureAdmin,
  updateCategoryController.handle
);

categoriesRoutes.get('/', ensureAuthenticated, listCategoriesController.handle);

export { categoriesRoutes };
