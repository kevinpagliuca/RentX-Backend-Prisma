import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class DeleteUserService {
  async execute(id: string) {
    if (!id) {
      throw new AppError('User ID is required.', 401);
    }

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
  }
}

export default new DeleteUserService();
