import { Request, Response } from 'express';

import UpdateUserService from './UpdateUserService';

class UpdateUserByIdController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, email, username, driver_license, is_admin } = req.body;

    const userUpdated = await UpdateUserService.execute({
      id,
      name,
      email,
      username,
      driver_license,
      is_admin,
    });

    return res.status(200).json(userUpdated);
  }
}

export { UpdateUserByIdController };
