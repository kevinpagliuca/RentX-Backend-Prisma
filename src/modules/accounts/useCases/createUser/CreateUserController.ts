import { Request, Response } from 'express';

import CreateUserService from './CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, driver_license, email, password } = req.body;

    const user = await CreateUserService.execute({
      username,
      driver_license,
      name,
      email,
      password,
    });

    return res.status(201).json(user);
  }
}

export { CreateUserController };
