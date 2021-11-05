import { Request, Response } from 'express';

import ListAvailableCarsService from './ListAvailableCarsService';

class ListAvailableCarsController {
  async handle(req: Request, res: Response): Promise<Response> {
    const cars = await ListAvailableCarsService.execute();
    return res.status(200).json(cars);
  }
}

export { ListAvailableCarsController };
