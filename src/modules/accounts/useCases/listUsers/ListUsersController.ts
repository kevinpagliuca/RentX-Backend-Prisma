import { Request, Response } from 'express';

import { prismaClient } from '@shared/prisma';

class ListUsersController {
  async handle(req: Request, res: Response): Promise<Response> {
    const users = await prismaClient.user.findMany({
      select: {
        driver_license: true,
        email: true,
        name: true,
        id: true,
        username: true,
        Rentals: true,
        is_admin: true,
        created_at: true,
      },
    });

    return res.status(200).json(users);
  }
}

export { ListUsersController };
