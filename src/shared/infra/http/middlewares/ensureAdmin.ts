import { NextFunction, Request, Response } from 'express';

import { AppError } from '@shared/errors/AppError';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { user } = req;

  if (!user.is_admin) {
    throw new AppError("User isn't admin!", 401);
  }

  return next();
}
