import { prismaClient } from '@shared/prisma';

interface IRequest {
  id: string;
  user_id: string;
}

class ShowRentalService {
  async execute({ id, user_id }: IRequest) {
    const rental = await prismaClient.rental.findFirst({
      where: {
        id,
        user_id,
      },
      include: {
        car: true,
      },
    });

    if (!rental) {
      throw new Error('Rental not found');
    }

    return rental;
  }
}

const showRentalService = new ShowRentalService();
export { showRentalService };
