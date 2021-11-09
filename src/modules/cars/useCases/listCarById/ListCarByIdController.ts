import { Request, Response } from 'express';

import { listCarByIdService } from './ListCarByIdService';

class ListCarByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const car = await listCarByIdService.execute(id);

    return res.status(200).json(car);
  }
}

export { ListCarByIdController };
