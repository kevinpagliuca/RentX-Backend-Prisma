import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

import { Car } from '.prisma/client';

class ListCarByIdService {
  async execute(id: string): Promise<Car> {
    const car = await prismaClient.car.findFirst({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (!car) {
      throw new AppError('Car not found', 404);
    }

    if (!car.available) {
      throw new AppError('This car is not available', 400);
    }

    return car;
  }
}

const listCarByIdService = new ListCarByIdService();
export { listCarByIdService };
