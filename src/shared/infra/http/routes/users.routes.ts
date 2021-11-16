import { Router } from 'express';

import { ChangeUserPasswordController } from '@modules/accounts/useCases/changeUserPassword/ChangeUserPasswordController';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { ListUsersController } from '@modules/accounts/useCases/listUsers/ListUsersController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createUsersController = new CreateUserController();
const updateUserController = new UpdateUserController();
const changeUserPasswordController = new ChangeUserPasswordController();
const listUsersController = new ListUsersController();
const usersRoutes = Router();

usersRoutes.post('/register', createUsersController.handle);
usersRoutes.put('/update', ensureAuthenticated, updateUserController.handle);
usersRoutes.put(
  '/change-password',
  ensureAuthenticated,
  changeUserPasswordController.handle
);

usersRoutes.get(
  '/all',
  ensureAuthenticated,
  ensureAdmin,
  listUsersController.handle
);

export { usersRoutes };
