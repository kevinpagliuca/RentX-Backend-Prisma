import { Request, Response } from 'express';

import { payRentalService } from './PayRentalService';

class PayRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { id } = req.params;
    const { amount } = req.body;

    await payRentalService.execute({
      user_id: user.id,
      id,
      amount,
    });

    return res.status(200).json({ message: 'Paid successfully' });
  }
}

export { PayRentalController };
