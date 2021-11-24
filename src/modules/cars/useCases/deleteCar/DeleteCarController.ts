import { Request, Response } from 'express';

import DeleteCarService from './DeleteCarService';

class DeleteCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await DeleteCarService.execute(id);

    return res.status(201).json({ message: 'Car deleted successfully' });
  }
}

export { DeleteCarController };
