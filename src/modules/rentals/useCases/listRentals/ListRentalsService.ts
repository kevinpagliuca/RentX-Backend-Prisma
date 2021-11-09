import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class ListRentalsService {
  async execute(user_id: string) {
    const rentals = await prismaClient.rental.findMany({ where: { user_id } });

    if (!rentals) {
      throw new AppError('Rentals not found', 404);
    }

    if (rentals.length === 0) {
      throw new AppError("You don't have any rental registered yet", 400);
    }

    return rentals;
  }
}

const listRentalsService = new ListRentalsService();

export { listRentalsService };
