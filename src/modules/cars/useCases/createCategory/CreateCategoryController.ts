import { Request, Response } from 'express';

import CreateCategoryService from './CreateCategoryService';

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const category = await CreateCategoryService.execute({
      name,
      description,
    });

    return res.status(201).json(category);
  }
}

export { CreateCategoryController };
