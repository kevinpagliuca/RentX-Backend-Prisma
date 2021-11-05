import { Request, Response } from 'express';

import ListCategoriesService from './ListCategoriesService';

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const categories = await ListCategoriesService.execute();

    return res.status(200).json(categories);
  }
}

export { ListCategoriesController };
