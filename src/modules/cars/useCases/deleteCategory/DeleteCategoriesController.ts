import { Request, Response } from 'express';

import DeleteCategoriesService from './DeleteCategoriesService';

class DeleteCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const category = await DeleteCategoriesService.execute(id);

    return res.json(category);
  }
}

export { DeleteCategoryController };
