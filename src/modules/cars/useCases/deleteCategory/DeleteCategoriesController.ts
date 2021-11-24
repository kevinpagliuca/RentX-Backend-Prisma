import { Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

import DeleteCategoriesService from './DeleteCategoriesService';

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError(
        'Missing params, please send the id of the category',
        400
      );
    }

    const category = await DeleteCategoriesService.execute(id);

    return res.json(category);
  }
}

export { DeleteCategoryController };
