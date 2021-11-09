import { Car } from '@prisma/client';
import { prismaClient } from '@shared/prisma';

interface IResponse {
  cars: Car[];
  totalCount: number;
}

class ListAvailableCarsService {
  async execute(): Promise<IResponse> {
    const totalCount = await prismaClient.car.count({
      where: {
        available: true,
      },
    });

    const cars = await prismaClient.car.findMany({
      where: {
        available: {
          not: false,
        },
      },
    });

    return { totalCount, cars };
  }
}

export default new ListAvailableCarsService();
