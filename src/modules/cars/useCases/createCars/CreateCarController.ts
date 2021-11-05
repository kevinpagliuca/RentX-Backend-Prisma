import { Request, Response } from 'express';

import CreateCarService from './CreateCarService';

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      brand,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
      fuel_type,
      horse_power,
      max_velocity,
      seats,
      transmission_type,
    } = req.body;
    const car = await CreateCarService.execute({
      name,
      brand,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
      fuel_type,
      horse_power,
      max_velocity,
      seats,
      transmission_type,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
