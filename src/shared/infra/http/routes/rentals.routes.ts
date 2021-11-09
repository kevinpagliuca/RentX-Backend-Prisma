import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { ListRentalsController } from '@modules/rentals/useCases/listRentals/ListRentalsController';
import { PayRentalController } from '@modules/rentals/useCases/payRental/PayRentalController';
import { ShowRentalController } from '@modules/rentals/useCases/showRental/ShowRentalController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const createRentalController = new CreateRentalController();
const listRentalsController = new ListRentalsController();
const showRentalController = new ShowRentalController();
const payRentalController = new PayRentalController();
const rentalsRoutes = Router();

rentalsRoutes.post('/:id', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.get('/', ensureAuthenticated, listRentalsController.handle);
rentalsRoutes.get('/:id', ensureAuthenticated, showRentalController.handle);
rentalsRoutes.post(
  '/payment/:id',
  ensureAuthenticated,
  payRentalController.handle
);

export { rentalsRoutes };
