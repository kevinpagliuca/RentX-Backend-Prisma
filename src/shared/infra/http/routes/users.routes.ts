import { Router } from 'express';

import { ChangeUserPasswordController } from '@modules/accounts/useCases/changeUserPassword/ChangeUserPasswordController';
import { CreateUserController } from '@modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserController } from '@modules/accounts/useCases/updateUser/UpdateUserController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createUsersController = new CreateUserController();
const updateUserController = new UpdateUserController();
const changeUserPasswordController = new ChangeUserPasswordController();
const usersRoutes = Router();

usersRoutes.post('/register', createUsersController.handle);
usersRoutes.put('/update', ensureAuthenticated, updateUserController.handle);
usersRoutes.put(
  '/change-password',
  ensureAuthenticated,
  changeUserPasswordController.handle
);

export { usersRoutes };
