import { Request, Response } from 'express';

import { prismaClient } from '@shared/prisma';

class ListAllCarsByAdminController {
  async handle(req: Request, res: Response): Promise<Response> {
    const totalCount = await prismaClient.car.count();
    const cars = await prismaClient.car.findMany();
    return res.status(200).json({ totalCount, cars });
  }
}

export { ListAllCarsByAdminController };
