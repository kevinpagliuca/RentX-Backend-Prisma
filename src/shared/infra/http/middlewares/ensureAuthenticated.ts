import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IPayload {
  sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token not provided', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: id } = verify(token, process.env.JWT_SECRET) as IPayload;

    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
      select: {
        id: true,
        is_admin: true,
        driver_license: true,
        email: true,
        name: true,
        created_at: true,
        username: true,
      },
    });

    if (!user) throw new AppError('User does not exists!', 404);

    req.user = user;
    req.token = token;

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
