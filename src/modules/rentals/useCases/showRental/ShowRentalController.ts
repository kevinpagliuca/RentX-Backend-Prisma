import { Request, Response } from 'express';

import { showRentalService } from './ShowRentalService';

class ShowRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { user } = req;

    const rental = await showRentalService.execute({ id, user_id: user.id });

    return res.status(200).json(rental);
  }
}

export { ShowRentalController };
