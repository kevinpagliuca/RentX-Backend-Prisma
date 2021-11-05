import { Category } from '@prisma/client';
import { prismaClient } from '@shared/prisma';

class ListCategoriesService {
  async execute(): Promise<Category[]> {
    const categories = await prismaClient.category.findMany();
    return categories;
  }
}

export default new ListCategoriesService();
