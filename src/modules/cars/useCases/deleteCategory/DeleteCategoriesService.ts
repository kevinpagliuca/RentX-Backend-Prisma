import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class DeleteCategoryService {
  async execute(id: string) {
    if (!id) {
      throw new AppError('Category ID is required.', 401);
    }

    const isCategoryExists = await prismaClient.category.findFirst({
      where: { id },
    });

    if (!isCategoryExists) {
      throw new AppError('Category not found', 404);
    }

    await prismaClient.category.delete({
      where: { id },
    });

    return true;
  }
}

export default new DeleteCategoryService();
