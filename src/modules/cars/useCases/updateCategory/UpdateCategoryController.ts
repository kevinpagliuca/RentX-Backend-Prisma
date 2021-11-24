import { Request, Response } from 'express';

import UpdateCategoryService from './UpdateCategoryService';

class UpdateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const { name, description } = req.body;

    const category = await UpdateCategoryService.execute({
      id,
      name,
      description,
    });
    return res.status(200).json(category);
  }
}

export { UpdateCategoryController };
