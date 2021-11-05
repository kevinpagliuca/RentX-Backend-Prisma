import { Request, Response } from 'express';

import ChangeUserPasswordService from './ChangeUserPasswordService';

class ChangeUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      user: { id },
    } = req;

    const { current_password, new_password } = req.body;

    await ChangeUserPasswordService.execute(id, current_password, new_password);

    return res
      .status(200)
      .json({ message: 'Your password has been updated successfully' });
  }
}

export { ChangeUserPasswordController };
