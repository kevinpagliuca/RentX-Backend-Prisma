import { Request, Response } from 'express';

import DeleteUserService from './DeleteUserService';

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    await DeleteUserService.execute(id);

    return res.status(200).json({ message: 'User deleted successfully' });
  }
}

export { DeleteUserController };
