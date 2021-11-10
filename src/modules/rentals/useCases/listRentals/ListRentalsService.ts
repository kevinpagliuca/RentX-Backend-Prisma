import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class ListRentalsService {
  async execute(user_id: string) {
    const rentals = await prismaClient.rental.findMany({
      where: {
        user_id,
        NOT: {
          end_date: null,
        },
      },

      include: {
        car: true,
      },
    });

    if (!rentals) {
      throw new AppError('Rentals not found', 404);
    }

    return rentals;
  }
}

const listRentalsService = new ListRentalsService();

export { listRentalsService };
