import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

import { Category } from '.prisma/client';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  async execute({ name, description }: IRequest): Promise<Category> {
    const categoryExists = await prismaClient.category.findFirst({
      where: {
        name,
      },
    });

    if (categoryExists) {
      throw new AppError('Category already exists!', 400);
    }

    const category = await prismaClient.category.create({
      data: {
        name,
        description,
      },
    });

    return category;
  }
}

export default new CreateCategoryService();
