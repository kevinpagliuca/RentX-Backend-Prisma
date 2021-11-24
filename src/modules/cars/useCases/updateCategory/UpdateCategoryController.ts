import { Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

import EditCategoryService from './UpdateCategoryService';

class UpdateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    if (!id) {
      throw new AppError(
        'Missing params, please send the id of the category',
        400
      );
    }

    const { name, description } = req.body;

    const category = await EditCategoryService.execute({
      id,
      name,
      description,
    });
    return res.status(200).json(category);
  }
}

export { UpdateCategoryController };
