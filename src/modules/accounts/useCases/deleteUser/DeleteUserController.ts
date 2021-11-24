import { Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class DeleteUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const userExists = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new AppError('User not found', 404);
    }

    await prismaClient.user.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ message: 'User deleted successfully' });
  }
}

export { DeleteUserController };
