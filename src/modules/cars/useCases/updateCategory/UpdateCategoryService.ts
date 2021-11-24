import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IRequest {
  id: string;
  name: string;
  description: string;
}

class UpdateCategoryService {
  async execute({ id, name, description }: IRequest) {
    const isCategoryExists = await prismaClient.category.findFirst({
      where: { id },
    });

    if (!isCategoryExists) {
      throw new AppError('Category not found', 404);
    }

    const updatedCategory = await prismaClient.category.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return updatedCategory;
  }
}

export default new UpdateCategoryService();
