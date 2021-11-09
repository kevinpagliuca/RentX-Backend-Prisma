import { Request, Response } from 'express';

import { listRentalsService } from './ListRentalsService';

class ListRentalsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;

    const rentals = await listRentalsService.execute(user.id);

    return res.status(200).json(rentals);
  }
}

export { ListRentalsController };
