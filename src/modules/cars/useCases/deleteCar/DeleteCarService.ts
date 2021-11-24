import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class DeleteCarService {
  async execute(id: string): Promise<void> {
    if (!id) {
      throw new AppError('Car ID is required.', 401);
    }

    const carExists = await prismaClient.car.findFirst({
      where: { id },
    });

    if (!carExists) {
      throw new AppError('Car not found!', 404);
    }

    await prismaClient.car.delete({
      where: {
        id,
      },
    });
  }
}

export default new DeleteCarService();
