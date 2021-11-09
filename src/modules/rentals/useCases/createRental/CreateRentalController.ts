import dayjs from 'dayjs';
import { Request, Response } from 'express';

import CreateRentalService from './CreateRentalService';

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { id } = req.params;
    const { start_date, expected_return_date } = req.body;

    // const date = dayjs(expected_return_date).add(1, 'day').format('DD/MM/YYYY');

    const rental = await CreateRentalService.execute({
      user_id: user.id,
      car_id: id,
      start_date: dayjs(start_date).toDate(),
      expected_return_date: dayjs(expected_return_date).toDate(),
    });

    return res.status(201).json(rental);
  }
}
export { CreateRentalController };
