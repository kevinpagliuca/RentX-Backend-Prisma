import { Request, Response } from 'express';

import UpdateUserService from './UpdateUserService';

class UpdateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user } = req;
    const { name, email, username, driver_license } = req.body;

    const userUpdated = await UpdateUserService.execute({
      id: user.id,
      name,
      email,
      username,
      driver_license,
    });

    return res.status(200).json(userUpdated);
  }
}

export { UpdateUserController };
