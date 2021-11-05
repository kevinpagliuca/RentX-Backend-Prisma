import { Request, Response } from 'express';

import AuthenticateUserService from './AuthenticateUserService';

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await AuthenticateUserService.execute({
      email,
      password,
    });

    return res.status(200).json(user);
  }
}

export { AuthenticateUserController };
