import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IRequest {
  id: string;
  user_id: string;
  amount: number;
}

class PayRentalService {
  async execute({ id, user_id, amount }: IRequest) {
    const rental = await prismaClient.rental.findFirst({
      where: {
        id,
        user_id,
      },
      include: {
        car: true,
      },
    });

    if (rental.isPaid) {
      throw new AppError('The rental has been paid', 400);
    }

    if (!rental) {
      throw new AppError('Rental not found', 404);
    }

    if (Number(rental.total) !== Number(amount)) {
      throw new AppError('Incorrect value.', 401);
    }

    await prismaClient.rental.update({
      where: {
        id,
      },
      data: {
        isPaid: true,
      },
    });
  }
}

const payRentalService = new PayRentalService();
export { payRentalService };
